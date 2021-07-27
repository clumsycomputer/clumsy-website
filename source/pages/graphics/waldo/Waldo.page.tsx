import React, { Fragment } from 'react'
import {
  Circle,
  getMirroredPoint,
  getMirroredRotatedLoop,
  getRotatedLoopPoints,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { Polygon } from '../../../library/components/Polygon'
import { getUpdatedData } from '../../../library/getUpdatedData'
import { getNaturalCompositeRhythm } from '../../../library/rhythmStuff'
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
        'childCircle.relativeRadius': () => 8.5 / 12,
      },
    }),
    spacerRhythm: rhythmA,
    waveRhythm: rhythmA,
  })
  const patternLoopsA = patternA.map((somePatternCell) => ({
    ...somePatternCell,
    cellLoop: {
      baseCircle: {
        center: somePatternCell.cellPoint,
        radius:
          (somePatternCell.baseLoop.baseCircle.radius /
            somePatternCell.rhythmResolution) *
          1.25,
      },
      childCircle: {
        relativeRadius: 3 / 4,
        relativeDepth:
          somePatternCell.cellWeight / somePatternCell.rhythmDensity,
        phaseAngle: somePatternCell.cellAngle,
      },
      rotationAnchor: 'base',
      rotationAngle: somePatternCell.cellAngle,
    } as RotatedLoop,
  }))
  const rhythmB = getNaturalCompositeRhythm({
    rhythmResolution: 17,
    rhythmParts: [
      { rhythmDensity: 13, rhythmPhase: 0 },
      { rhythmDensity: 11, rhythmPhase: 0 },
      { rhythmDensity: 7, rhythmPhase: 0 },
      // { rhythmDensity: 5, rhythmPhase: 0 },
    ],
    rhythmPhase: 12,
  })
  const patternB = getLoopContractingPattern({
    patternId: 'A',
    baseLoop: getUpdatedData({
      baseData: rootLoop,
      dataUpdates: {
        'childCircle.relativeRadius': () => 11 / 12,
      },
    }),
    spacerRhythm: rhythmB,
    waveRhythm: rhythmB,
  })
  const patternLoopsB = patternB.map((somePatternCell) => ({
    ...somePatternCell,
    cellLoop: {
      baseCircle: {
        center: somePatternCell.cellPoint,
        radius:
          (somePatternCell.baseLoop.baseCircle.radius /
            somePatternCell.rhythmResolution) *
          1.25,
      },
      childCircle: {
        relativeRadius: 3 / 4,
        relativeDepth:
          somePatternCell.cellWeight / somePatternCell.rhythmDensity,
        phaseAngle: somePatternCell.cellAngle,
      },
      rotationAnchor: 'base',
      rotationAngle: somePatternCell.cellAngle,
    } as RotatedLoop,
  }))
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
      {patternLoopsA.map((somePatternStuff) => {
        return (
          <Fragment>
            <Polygon
              strokeColor={'white'}
              strokeWidth={0.3}
              somePoints={getRotatedLoopPoints({
                sampleCount: 256,
                someRotatedLoop: somePatternStuff.cellLoop,
              })}
            />
            <Polygon
              strokeColor={'white'}
              strokeWidth={0.3}
              somePoints={getRotatedLoopPoints({
                sampleCount: 256,
                someRotatedLoop: getMirroredRotatedLoop({
                  mirrorAngle: Math.PI / 2,
                  originPoint: somePatternStuff.baseLoop.baseCircle.center,
                  baseLoop: somePatternStuff.cellLoop,
                }),
              })}
            />
          </Fragment>
        )
      })}
      {patternLoopsB.map((somePatternStuff) => {
        return (
          <Fragment>
            <Polygon
              strokeColor={'white'}
              strokeWidth={0.3}
              somePoints={getRotatedLoopPoints({
                sampleCount: 256,
                someRotatedLoop: somePatternStuff.cellLoop,
              })}
            />
            <Polygon
              strokeColor={'white'}
              strokeWidth={0.3}
              somePoints={getRotatedLoopPoints({
                sampleCount: 256,
                someRotatedLoop: getMirroredRotatedLoop({
                  mirrorAngle: Math.PI / 2,
                  originPoint: somePatternStuff.baseLoop.baseCircle.center,
                  baseLoop: somePatternStuff.cellLoop,
                }),
              })}
            />
          </Fragment>
        )
      })}
    </svg>
  )
}

interface MirroredPointSquaresProps {
  somePoints: Array<Point>
  mirrorOriginPoint: Point
  mirrorAngle: number
  squareRootLength: number
  fillColor: string
}

function MirroredPointSquares(props: MirroredPointSquaresProps) {
  const {
    somePoints,
    mirrorOriginPoint,
    mirrorAngle,
    squareRootLength,
    fillColor,
  } = props
  return (
    <Fragment>
      {somePoints.map((somePoint) => {
        const mirroredPoint = getMirroredPoint({
          originPoint: mirrorOriginPoint,
          mirrorAngle: mirrorAngle,
          basePoint: somePoint,
        })
        return (
          <Fragment>
            <rect
              fill={fillColor}
              x={somePoint.x - squareRootLength}
              y={somePoint.y - squareRootLength}
              width={2 * squareRootLength}
              height={2 * squareRootLength}
            />
            <rect
              fill={fillColor}
              x={mirroredPoint.x - squareRootLength}
              y={mirroredPoint.y - squareRootLength}
              width={2 * squareRootLength}
              height={2 * squareRootLength}
            />
          </Fragment>
        )
      })}
    </Fragment>
  )
}

// function foo() {
//   const patternPointsA = patternLoopsA.map((someCellStuff) => {
//     const loopSampleCount = 256
//     const cellOscillationRadius = 1 / 3
//     const cellRootBase = cellOscillationRadius / 4
//     return {
//       ...someCellStuff,
//       cellRootBase,
//       cellRootOverlay: cellRootBase,
//       cellPointsBase: getOscillatedLoopPoints({
//         someRotatedLoop: someCellStuff.cellLoop,
//         sampleCount: loopSampleCount,
//         oscillationRadius: cellOscillationRadius,
//         oscillationFrequency: getWaveFrequency({
//           baseFrequency: 211,
//           scaleResolution: someCellStuff.rhythmResolution,
//           frequencyIndex: 0,
//         }),
//       }),
//       cellPointsOverlay: getOscillatedLoopPoints({
//         someRotatedLoop: someCellStuff.cellLoop,
//         sampleCount: loopSampleCount,
//         oscillationRadius: cellOscillationRadius,
//         oscillationFrequency: getWaveFrequency({
//           baseFrequency: 211,
//           scaleResolution: someCellStuff.rhythmResolution,
//           frequencyIndex: 1,
//         }),
//       }),
//     }
//   })
// }
