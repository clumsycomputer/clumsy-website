import React, { Fragment } from 'react'
import {
  Circle,
  getMirroredPoint,
  getMirroredRotatedLoop,
  getRotatedLoopPoints,
  getTracePoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { Polygon } from '../../../library/components/Polygon'
import { getUpdatedData } from '../../../library/getUpdatedData'
import {
  CompositeLoop,
  getCompositeCenterPoint,
  getCompositeLoopPoints,
  getDistanceBetweenPoints,
  reduceRhythmSequence,
} from '../../../library/helperStuff'
import {
  DiscreteRhythm,
  getNaturalCompositeRhythm,
} from '../../../library/rhythmStuff'
import {
  getLoopContractingPattern,
  getLoopExpandingPattern,
  getLoopRayPattern,
  getOscillatedLoopPoints,
  getWaveFrequency,
} from './helpers'

export default {
  pageRoute: '/graphics/waldo',
  PageContent: Waldo,
  htmlTitle: 'waldo - jmath',
  htmlDescription: 'a waldo graphic',
  generatePdf: false,
  pdfFileName: 'waldo',
}

function Waldo() {
  const rootCircle: Circle = {
    radius: 50,
    center: { x: 50, y: 50 },
  }
  const rootLoop: RotatedLoop = {
    baseCircle: rootCircle,
    childCircle: {
      relativeRadius: 1,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: 0,
  }
  const rhythmA = getNaturalCompositeRhythm({
    rhythmResolution: 17,
    rhythmParts: [
      { rhythmDensity: 13, rhythmPhase: 0 },
      { rhythmDensity: 11, rhythmPhase: 0 },
      { rhythmDensity: 7, rhythmPhase: 0 },
    ],
    rhythmPhase: 1,
  })
  const patternA = getLoopRayPattern({
    patternId: 'A',
    baseLoop: getUpdatedData({
      baseData: rootLoop,
      dataUpdates: {
        'childCircle.relativeRadius': () => 8.75 / 12,
      },
    }),
    spacerRhythm: rhythmA,
    waveRhythm: rhythmA,
  })
  const rhythmB = getNaturalCompositeRhythm({
    rhythmResolution: 17,
    rhythmParts: [
      { rhythmDensity: 13, rhythmPhase: 0 },
      { rhythmDensity: 11, rhythmPhase: 0 },
      { rhythmDensity: 7, rhythmPhase: 0 },
    ],
    rhythmPhase: 12,
  })
  const patternB = getLoopContractingPattern({
    patternId: 'B',
    baseLoop: getUpdatedData({
      baseData: rootLoop,
      dataUpdates: {
        'childCircle.relativeRadius': () => 11 / 12,
      },
    }),
    spacerRhythm: rhythmB,
    waveRhythm: rhythmB,
  })
  const patternLoops = [...patternA, ...patternB]
    .map((somePatternCell) => {
      const cellLoopBase: RotatedLoop = {
        baseCircle: {
          center: somePatternCell.cellPoint,
          radius:
            (somePatternCell.baseLoop.baseCircle.radius /
              somePatternCell.rhythmResolution) *
            1.125,
        },
        childCircle: {
          relativeRadius: 3 / 4,
          relativeDepth:
            (somePatternCell.rhythmDensity - somePatternCell.cellWeight) /
            somePatternCell.rhythmDensity,
          phaseAngle: somePatternCell.cellAngle,
        },
        rotationAnchor: 'base',
        rotationAngle: (Math.PI / 6) * Math.exp(somePatternCell.cellAngle),
      }
      return {
        ...somePatternCell,
        cellLoop: [
          cellLoopBase,
          cellLoopBase,
          getUpdatedData({
            baseData: cellLoopBase,
            dataUpdates: {
              rotationAngle: (baseRotationAngle: number) =>
                baseRotationAngle - Math.PI / 2,
              'childCircle.phaseAngle': (basePhaseAngle: number) =>
                -basePhaseAngle,
            },
          }),
        ] as CompositeLoop,
      }
    })
    .map((somePatternCell) => {
      return {
        ...somePatternCell,
        nestShiftAngle: 0,
        nestShiftScalar: 1,
        nestRhythm: getNaturalCompositeRhythm({
          rhythmResolution: 12,
          rhythmParts: [{ rhythmDensity: 7, rhythmPhase: 0 }],
          rhythmPhase: 0,
        }),
      }
    })
  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
      }}
      viewBox={'-10 -10 120 120'}
      imageRendering={'optimizeQuality'}
    >
      <rect x={-10} y={-10} width={120} height={120} fill={'black'} />
      {patternLoops.map((somePatternStuff) => {
        return getNestCompositeLoopsPoints({
          sampleCount: 256,
          baseLoop: somePatternStuff.cellLoop,
          shiftAngle: somePatternStuff.nestShiftAngle,
          shiftScalar: somePatternStuff.nestShiftScalar,
          nestRhythm: somePatternStuff.nestRhythm,
        }).map((somePolygonPoints) => {
          const mirroredCellLoopPoints = somePolygonPoints.map((somePoint) =>
            getMirroredPoint({
              mirrorAngle: Math.PI / 2,
              originPoint: somePatternStuff.baseLoop.baseCircle.center,
              basePoint: somePoint,
            })
          )
          return (
            <Fragment>
              <Polygon
                strokeColor={'white'}
                strokeWidth={0.2}
                somePoints={somePolygonPoints}
              />
              <Polygon
                strokeColor={'red'}
                strokeWidth={0.2}
                somePoints={mirroredCellLoopPoints}
              />
            </Fragment>
          )
        })
      })}
    </svg>
  )
}

interface GetNestCompositeLoopsPointsApi {
  baseLoop: CompositeLoop
  sampleCount: number
  shiftAngle: number
  shiftScalar: number
  nestRhythm: DiscreteRhythm
}

function getNestCompositeLoopsPoints(api: GetNestCompositeLoopsPointsApi) {
  const { sampleCount, baseLoop, shiftAngle, nestRhythm, shiftScalar } = api
  const cellLoopBasePoints = getCompositeLoopPoints({
    sampleCount,
    baseLoops: baseLoop,
  })
  const compositeCenter = getCompositeCenterPoint({
    baseLoops: baseLoop,
  })
  const maxShiftPoint: Point = getTracePoint({
    somePoints: cellLoopBasePoints,
    traceAngle: shiftAngle,
    originPoint: compositeCenter,
  })
  const maxShiftRadius = getDistanceBetweenPoints({
    pointA: compositeCenter,
    pointB: maxShiftPoint,
  })
  return reduceRhythmSequence<Array<Point>>({
    baseRhythm: nestRhythm,
    getCellResult: (someNestStuff) => {
      const childShiftRadius =
        shiftScalar *
        (maxShiftRadius / someNestStuff.rhythmResolution) *
        someNestStuff.rhythmIndex
      const currentCenter: Point = {
        x: childShiftRadius * Math.cos(shiftAngle) + compositeCenter.x,
        y: childShiftRadius * Math.sin(shiftAngle) + compositeCenter.y,
      }
      return cellLoopBasePoints.map((someBasePoint, pointIndex) => {
        const maxRadius = getDistanceBetweenPoints({
          pointA: compositeCenter,
          pointB: someBasePoint,
        })
        const currentBaseRadius =
          maxRadius -
          (maxRadius / someNestStuff.rhythmResolution) *
            someNestStuff.rhythmIndex
        const currentAngle =
          ((2 * Math.PI) / cellLoopBasePoints.length) * pointIndex
        return {
          x: currentBaseRadius * Math.cos(currentAngle) + currentCenter.x,
          y: currentBaseRadius * Math.sin(currentAngle) + currentCenter.y,
        }
      })
    },
  })
}

// interface MirroredPointSquaresProps {
//   somePoints: Array<Point>
//   mirrorOriginPoint: Point
//   mirrorAngle: number
//   squareRootLength: number
//   fillColor: string
// }
//
// function MirroredPointSquares(props: MirroredPointSquaresProps) {
//   const {
//     somePoints,
//     mirrorOriginPoint,
//     mirrorAngle,
//     squareRootLength,
//     fillColor,
//   } = props
//   return (
//     <Fragment>
//       {somePoints.map((somePoint) => {
//         const mirroredPoint = getMirroredPoint({
//           originPoint: mirrorOriginPoint,
//           mirrorAngle: mirrorAngle,
//           basePoint: somePoint,
//         })
//         return (
//           <Fragment>
//             <rect
//               fill={fillColor}
//               x={somePoint.x - squareRootLength}
//               y={somePoint.y - squareRootLength}
//               width={2 * squareRootLength}
//               height={2 * squareRootLength}
//             />
//             <rect
//               fill={fillColor}
//               x={mirroredPoint.x - squareRootLength}
//               y={mirroredPoint.y - squareRootLength}
//               width={2 * squareRootLength}
//               height={2 * squareRootLength}
//             />
//           </Fragment>
//         )
//       })}
//     </Fragment>
//   )
// }
//
// function foo() {
// const patternPointsA = patternLoopsA.map((someCellStuff) => {
//   const loopSampleCount = 256
//   const cellOscillationRadius = 1 / 3
//   const cellRootBase = cellOscillationRadius / 4
//   return {
//     ...someCellStuff,
//     cellRootBase,
//     cellRootOverlay: cellRootBase,
//     cellPointsBase: getOscillatedLoopPoints({
//       someRotatedLoop: someCellStuff.cellLoop,
//       sampleCount: loopSampleCount,
//       oscillationRadius: cellOscillationRadius,
//       oscillationFrequency: getWaveFrequency({
//         baseFrequency: 211,
//         scaleResolution: someCellStuff.rhythmResolution,
//         frequencyIndex: 0,
//       }),
//     }),
//     cellPointsOverlay: getOscillatedLoopPoints({
//       someRotatedLoop: someCellStuff.cellLoop,
//       sampleCount: loopSampleCount,
//       oscillationRadius: cellOscillationRadius,
//       oscillationFrequency: getWaveFrequency({
//         baseFrequency: 211,
//         scaleResolution: someCellStuff.rhythmResolution,
//         frequencyIndex: 1,
//       }),
//     }),
//   }
// })
// }
