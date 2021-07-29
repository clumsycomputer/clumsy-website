import React, { Fragment } from 'react'
import {
  Circle,
  getMirroredPoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { getUpdatedData } from '../../../library/getUpdatedData'
import { CompositeLoop } from '../../../library/helperStuff'
import { getNaturalCompositeRhythm } from '../../../library/rhythmStuff'
import {
  getLoopContractingPattern,
  getLoopRayPattern,
  getNestCompositeLoopsPoints,
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

const Palette = {
  primary: {
    main: '#ff0092',
  },
  complementary: {
    main: '#00ff6e',
  },
  analogousA: {
    main: '#ee00ff',
  },
  analogousB: {
    main: '#ff0011',
  },
  triadicA: {
    main: '#ff6f00',
  },
  triadicB: {
    main: '#91ff00',
  },
}

const colors = [
  Palette.primary.main,
  Palette.analogousA.main,
  Palette.analogousB.main,
  Palette.primary.main,
  Palette.triadicA.main,
  Palette.triadicB.main,
  Palette.complementary.main,
]

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
    rhythmPhase: 9,
  })
  const rhythmB = getNaturalCompositeRhythm({
    rhythmResolution: 17,
    rhythmParts: [
      { rhythmDensity: 13, rhythmPhase: 0 },
      { rhythmDensity: 11, rhythmPhase: 0 },
      { rhythmDensity: 7, rhythmPhase: 0 },
    ],
    rhythmPhase: 1,
  })
  const patternLoops = [
    ...getLoopRayPattern({
      patternId: 'A',
      baseLoop: getUpdatedData({
        baseData: rootLoop,
        dataUpdates: {
          'childCircle.relativeRadius': () => 8.75 / 12,
        },
      }),
      spacerRhythm: rhythmA,
      waveRhythm: rhythmA,
    }),
    ...getLoopContractingPattern({
      patternId: 'B',
      baseLoop: getUpdatedData({
        baseData: rootLoop,
        dataUpdates: {
          'childCircle.relativeRadius': () => 11 / 12,
        },
      }),
      spacerRhythm: rhythmB,
      waveRhythm: rhythmB,
    }),
  ]
    .map((somePatternCell) => {
      const cellLoopBase: RotatedLoop = {
        baseCircle: {
          center: somePatternCell.cellPoint,
          radius:
            (somePatternCell.baseLoop.baseCircle.radius /
              somePatternCell.rhythmResolution) *
            3,
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
        cellLoopBase,
        cellLoopComposition: [
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
        nestShiftAngle: Math.log(somePatternCell.cellLoopBase.rotationAngle),
        nestShiftScalar: 0.5,
        nestRhythm: getNaturalCompositeRhythm({
          rhythmResolution: 19,
          rhythmParts: [
            { rhythmDensity: 17, rhythmPhase: 0 },
            { rhythmDensity: 13, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
            { rhythmDensity: 7, rhythmPhase: 0 },
            // { rhythmDensity: 5, rhythmPhase: 4 },
          ],
          rhythmPhase: 0,
        }),
      }
    })
    .map((somePatternCell) => {
      const oscillationRadius =
        somePatternCell.cellLoopBase.baseCircle.radius / 8
      const oscillationBaseBaseLength = oscillationRadius / 14
      const oscillationBaseOverlayLength = oscillationBaseBaseLength
      return {
        ...somePatternCell,
        oscillationRadius,
        oscillationBaseBaseLength,
        oscillationBaseOverlayLength,
        oscillationSampleCount: 2048 * 2,
        oscillationBaseFrequency: getWaveFrequency({
          baseFrequency: 211,
          scaleResolution: somePatternCell.rhythmResolution,
          frequencyIndex: 0,
        }),
        oscillationOverlayFrequency: getWaveFrequency({
          baseFrequency: 211 / 2,
          scaleResolution: somePatternCell.rhythmResolution,
          frequencyIndex: 9,
        }),
      }
    })
  const patternLayers = patternLoops.reduce<Array<Array<any>>>(
    (result, somePatternStuff) => {
      getNestCompositeLoopsPoints({
        sampleCount: 256,
        baseLoop: somePatternStuff.cellLoopComposition,
        shiftAngle: somePatternStuff.nestShiftAngle,
        shiftScalar: somePatternStuff.nestShiftScalar,
        nestRhythm: somePatternStuff.nestRhythm,
      }).forEach((nestLoopPointsData, layerIndex) => {
        result[layerIndex]!.push({
          ...somePatternStuff,
          ...nestLoopPointsData,
        })
      })
      return result
    },
    Array(7)
      .fill(undefined)
      .map(() => [])
  )
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
      {patternLayers.map((someLayerCells, layerIndex) => {
        const maskId = `${layerIndex}`
        return (
          <Fragment>
            <mask id={maskId}>
              {someLayerCells.map((someCellStuff) => {
                return (
                  <MirroredPointSquares
                    fillColor={'white'}
                    mirrorAngle={Math.PI / 2}
                    mirrorOriginPoint={someCellStuff.baseLoop.baseCircle.center}
                    squareRootLength={someCellStuff.oscillationBaseBaseLength}
                    somePoints={getOscillatedLoopPoints({
                      loopCenter: someCellStuff.loopCenter,
                      loopPoints: someCellStuff.loopPoints,
                      sampleCount: someCellStuff.oscillationSampleCount,
                      oscillationRadius: someCellStuff.oscillationRadius,
                      oscillationFrequency:
                        someCellStuff.oscillationBaseFrequency,
                    })}
                  />
                )
              })}
              {someLayerCells.map((someCellStuff) => {
                return (
                  <MirroredPointSquares
                    fillColor={'black'}
                    mirrorAngle={Math.PI / 2}
                    mirrorOriginPoint={someCellStuff.baseLoop.baseCircle.center}
                    squareRootLength={
                      someCellStuff.oscillationBaseOverlayLength
                    }
                    somePoints={getOscillatedLoopPoints({
                      loopCenter: someCellStuff.loopCenter,
                      loopPoints: someCellStuff.loopPoints,
                      sampleCount: someCellStuff.oscillationSampleCount,
                      oscillationRadius: someCellStuff.oscillationRadius,
                      oscillationFrequency:
                        someCellStuff.oscillationOverlayFrequency,
                    })}
                  />
                )
              })}
            </mask>
            <rect
              x={-10}
              y={-10}
              width={120}
              height={120}
              mask={`url(#${maskId})`}
              fill={colors[layerIndex]!}
            />
          </Fragment>
        )
      })}
      )
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
