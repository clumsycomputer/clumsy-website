import React from 'react'
import {
  Circle,
  getMirroredRotatedLoop,
  getRotatedLoopPoints,
  getTracePoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { Polygon } from '../../../library/components/Polygon'
import { getUpdatedData } from '../../../library/getUpdatedData'
import { getNaturalCompositeRhythm } from '../../../library/rhythmStuff'
import {
  getCompositeLoopPoints,
  getDistanceBetweenPoints,
  getCompositeCenterPoint,
  getLoopGroups,
  RootLoopData,
  mapRhythmSequence,
  reduceRhythmSequence,
} from '../../../library/helperStuff'

export default {
  pageRoute: '/graphics/qux',
  PageContent: Qux,
  htmlTitle: 'qux - jmath',
  htmlDescription: 'a qux graphic',
  generatePdf: false,
  pdfFileName: 'qux',
}

const globalSampleCount = 2047
const camouflage = true
const camouflageStrokeScalar = 1 / 7
interface GetRootLoopDataApi {
  loopKey:
    | ReturnType<typeof getCoreLoopKey>
    | ReturnType<typeof getCenterLoopKey>
    | 'rightEye'
    | 'rightEar'
    | 'rightHip'
}

function getColorSequence(api: GetRootLoopDataApi): string[] {
  const { loopKey } = api
  switch (loopKey) {
    case 'default':
    case 'perimeterRight40':
    case 'rightEye':
    case 'centerMidTop':
    case 'centerOuterRight':
      return colorsB
    case 'perimeterRight90':
    case 'midBottomOuterRight':
    case 'bottomLowerRight':
    case 'perimeterRight150':
      return colorsD

    case 'centerTop':
    case 'centerInnerRight':
    case 'rightHip':
    case 'bottomUpperRight':
      return reversedColorsB
    case 'rightEar':
    case 'midBottomInnerRight':
    case 'centerBottom':
      return reversedColorsC
  }
}

const Palette = {
  primary: {
    main: '#ff2e00',
  },
  complementary: {
    main: '#00d0ff',
  },
  analogousA: {
    main: '#ff0051',
  },
  analogousB: {
    main: '#ffae00',
  },
  triadicA: {
    main: '#d0ff00',
  },
  triadicB: {
    main: '#00ff2f',
  },
}

const colorsA = [
  Palette.primary.main,
  Palette.analogousB.main,
  Palette.analogousA.main,
  Palette.primary.main,
  Palette.triadicA.main,
  Palette.triadicB.main,
  Palette.complementary.main,
]

const reversedColorsA = [...colorsA].reverse()

// const switchedColorsA = [
//   Palette.complementary.main,
//   Palette.triadicB.main,
//   Palette.triadicA.main,
//   Palette.complementary.main,
//   Palette.analogousA.main,
//   Palette.analogousB.main,
//   Palette.primary.main,
// ]

const colorsB = [
  Palette.primary.main,
  Palette.analogousA.main,
  Palette.analogousB.main,
  Palette.primary.main,
  Palette.triadicA.main,
  Palette.triadicB.main,
  Palette.complementary.main,
]

const reversedColorsB = [...colorsB].reverse()

const colorsC = [
  Palette.primary.main,
  Palette.analogousB.main,
  Palette.analogousA.main,
  Palette.primary.main,
  Palette.triadicB.main,
  Palette.triadicA.main,
  Palette.complementary.main,
]

const reversedColorsC = [...colorsC].reverse()

const colorsD = [
  Palette.primary.main,
  Palette.analogousA.main,
  Palette.analogousB.main,
  Palette.primary.main,
  Palette.triadicB.main,
  Palette.triadicA.main,
  Palette.complementary.main,
]

const reversedColorsD = [...colorsD].reverse()

function getNestRhythmGetter(
  api: GetRootLoopDataApi
): RootLoopData['getNestRhythm'] {
  const { loopKey } = api
  switch (loopKey) {
    case 'default':
    case 'perimeterRight40':
    case 'bottomLowerRight':
      return () =>
        getNaturalCompositeRhythm({
          rhythmResolution: 18,
          rhythmParts: [
            { rhythmDensity: 17, rhythmPhase: 0 },
            { rhythmDensity: 13, rhythmPhase: 0 },
            { rhythmDensity: 12, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
            {
              rhythmDensity: 7,
              rhythmPhase: 1,
            },
          ],
          rhythmPhase: 0,
        })
    case 'perimeterRight90':
    case 'midBottomOuterRight':
      return () =>
        getNaturalCompositeRhythm({
          rhythmResolution: 18,
          rhythmParts: [
            { rhythmDensity: 17, rhythmPhase: 0 },
            { rhythmDensity: 13, rhythmPhase: 0 },
            { rhythmDensity: 12, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
            {
              rhythmDensity: 7,
              rhythmPhase: 4,
            },
          ],
          rhythmPhase: 0,
        })
    case 'perimeterRight150':
    case 'centerInnerRight':
      return () =>
        getNaturalCompositeRhythm({
          rhythmResolution: 18,
          rhythmParts: [
            { rhythmDensity: 17, rhythmPhase: 0 },
            { rhythmDensity: 13, rhythmPhase: 0 },
            { rhythmDensity: 12, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
            {
              rhythmDensity: 7,
              rhythmPhase: 7,
            },
          ],
          rhythmPhase: 0,
        })
    case 'centerBottom':
    case 'rightEye':
      return () =>
        getNaturalCompositeRhythm({
          rhythmResolution: 18,
          rhythmParts: [
            { rhythmDensity: 17, rhythmPhase: 0 },
            { rhythmDensity: 13, rhythmPhase: 0 },
            { rhythmDensity: 12, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
            {
              rhythmDensity: 7,
              rhythmPhase: 9,
            },
          ],
          rhythmPhase: 0,
        })
    case 'rightHip':
    case 'bottomUpperRight':
      return () =>
        getNaturalCompositeRhythm({
          rhythmResolution: 18,
          rhythmParts: [
            { rhythmDensity: 17, rhythmPhase: 0 },
            { rhythmDensity: 13, rhythmPhase: 0 },
            { rhythmDensity: 12, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
            {
              rhythmDensity: 7,
              rhythmPhase: 3,
            },
          ],
          rhythmPhase: 0,
        })
    case 'rightEar':
    case 'midBottomInnerRight':
    case 'centerMidTop':
      return () =>
        getNaturalCompositeRhythm({
          rhythmResolution: 18,
          rhythmParts: [
            { rhythmDensity: 17, rhythmPhase: 0 },
            { rhythmDensity: 13, rhythmPhase: 0 },
            { rhythmDensity: 12, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
            {
              rhythmDensity: 7,
              rhythmPhase: 6,
            },
          ],
          rhythmPhase: 0,
        })
    case 'centerTop':
    case 'centerOuterRight':
      return () =>
        getNaturalCompositeRhythm({
          rhythmResolution: 18,
          rhythmParts: [
            { rhythmDensity: 17, rhythmPhase: 0 },
            { rhythmDensity: 13, rhythmPhase: 0 },
            { rhythmDensity: 12, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
            {
              rhythmDensity: 7,
              rhythmPhase: 0,
            },
          ],
          rhythmPhase: 0,
        })
  }
}

function getShiftAngleGetter(
  api: GetRootLoopDataApi
): RootLoopData['getShiftAngle'] {
  const { loopKey } = api
  switch (loopKey) {
    case 'centerTop':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: 0,
        })
    case 'centerMidTop':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: 0,
        })
    case 'perimeterRight40':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: -Math.PI / 3,
        })
    case 'perimeterRight90':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: Math.PI / 6,
        })
    case 'midBottomOuterRight':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: Math.PI / 3,
        })
    case 'bottomLowerRight':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: Math.PI / 7.5,
        })
    case 'perimeterRight150':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: -Math.PI / 3.5,
        })
    case 'rightEar':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: -Math.PI / 2.25,
        })
    case 'rightHip':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: Math.PI - Math.PI / 16,
        })
    case 'centerBottom':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: Math.PI,
        })
    case 'bottomUpperRight':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: -Math.PI / 7,
        })
    case 'midBottomInnerRight':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: Math.PI + Math.PI / 4.5,
        })
    case 'centerOuterRight':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: Math.PI + Math.PI / 2.5,
        })
    case 'centerInnerRight':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: Math.PI / 2 - Math.PI / 24,
        })
    case 'rightEye':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: Math.PI / 3.25,
        })
    case 'default':
      return ({ baseShiftAngle }) => baseShiftAngle
  }
}

function getRelativeShiftScalarGetter(
  api: GetRootLoopDataApi
): RootLoopData['getRelativeShiftScalar'] {
  const { loopKey } = api
  switch (loopKey) {
    case 'perimeterRight40':
    case 'perimeterRight90':
    case 'perimeterRight150':
    case 'centerInnerRight':
    case 'centerOuterRight':
    case 'midBottomInnerRight':
    case 'midBottomOuterRight':
    case 'bottomUpperRight':
    case 'bottomLowerRight':
    case 'centerTop':
    case 'centerMidTop':
    case 'centerBottom':
    case 'rightEar':
    case 'rightHip':
    case 'default':
      return () => 0.75
    case 'rightEye':
      return () => 1
  }
}

function Qux() {
  const rootCircle: Circle = {
    radius: 50,
    center: { x: 50, y: 50 },
  }
  const rootLoop: RotatedLoop = {
    baseCircle: rootCircle,
    childCircle: {
      relativeRadius: 12 / 13,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: -Math.PI / 2,
  }
  const coreLoops = mapRhythmSequence<
    Array<{
      getStrokeWidth: RootLoopData['getStrokeWidth']
      getStrokeColor: RootLoopData['getStrokeColor']
      getNestRhythm: RootLoopData['getNestRhythm']
      getShiftAngle: RootLoopData['getShiftAngle']
      getRelativeShiftScalar: RootLoopData['getRelativeShiftScalar']
      rotatedLoop: RotatedLoop
    }>
  >({
    baseRhythm: getNaturalCompositeRhythm({
      rhythmResolution: 11,
      rhythmParts: [
        { rhythmDensity: 7, rhythmPhase: 1 },
        { rhythmDensity: 4, rhythmPhase: 0 },
      ],
      rhythmPhase: 0,
    }),
    getCellResult: ({ rhythmResolution, rhythmIndex, nestIndex }) => {
      const tangentIndex = nestIndex
      const angleA = (Math.PI / rhythmResolution) * rhythmIndex - Math.PI / 2
      const pointA = getTracePoint({
        somePoints: getRotatedLoopPoints({
          sampleCount: globalSampleCount,
          someRotatedLoop: rootLoop,
        }),
        originPoint: rootCircle.center,
        traceAngle: angleA,
      })
      const pointB = getTracePoint({
        somePoints: getRotatedLoopPoints({
          sampleCount: globalSampleCount,
          someRotatedLoop: rootLoop,
        }),
        originPoint: rootCircle.center,
        traceAngle: angleA + Math.PI,
      })
      return mapRhythmSequence({
        baseRhythm: getNaturalCompositeRhythm({
          rhythmResolution: 13,
          rhythmParts: [
            { rhythmDensity: 7, rhythmPhase: 1 },
            { rhythmDensity: 3, rhythmPhase: 2 },
          ],
          rhythmPhase: 0, // 3
        }),
        getCellResult: ({
          rhythmResolution,
          rhythmIndex,
          rhythmDensity,
          nestIndex,
        }) => {
          const orthogonalIndex = nestIndex
          const lineAngle = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x)
          const lineLength = Math.sqrt(
            Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
          )
          const cellRadius = (lineLength / rhythmResolution) * rhythmIndex
          const newBaseCircleCenter = {
            x:
              cellRadius * Math.cos(lineAngle) +
              pointA.x -
              (tangentIndex === 2 && nestIndex === 0 ? 5 : 0),
            y: cellRadius * Math.sin(lineAngle) + pointA.y,
          }
          const distanceFromRootCenter = Math.sqrt(
            Math.pow(newBaseCircleCenter.x - rootCircle.center.x, 2) +
              Math.pow(newBaseCircleCenter.y - rootCircle.center.y, 2)
          )
          const relativeAngleToCenter = Math.atan2(
            newBaseCircleCenter.y - rootCircle.center.y,
            newBaseCircleCenter.x - rootCircle.center.x
          )
          const openRhythmRatio =
            (rhythmResolution - rhythmDensity) / rhythmResolution
          const nestRatioStep = openRhythmRatio / rhythmDensity
          const rhythmRatioStep = openRhythmRatio / rhythmResolution
          const baseRadiusScalar =
            tangentIndex === 2 && nestIndex === 0 ? 1.75 : 1.25
          return {
            getStrokeWidth: () => 0.2,
            getStrokeColor: ({ nestIndex }) =>
              getColorSequence({
                loopKey: getCoreLoopKey({
                  tangentIndex,
                  orthogonalIndex,
                }),
              })[nestIndex]!,
            getNestRhythm: getNestRhythmGetter({
              loopKey: getCoreLoopKey({
                tangentIndex,
                orthogonalIndex,
              }),
            }),
            getShiftAngle: getShiftAngleGetter({
              loopKey: getCoreLoopKey({
                tangentIndex,
                orthogonalIndex,
              }),
            }),
            getRelativeShiftScalar: getRelativeShiftScalarGetter({
              loopKey: getCoreLoopKey({
                tangentIndex,
                orthogonalIndex,
              }),
            }),
            rotatedLoop: {
              baseCircle: {
                radius: baseRadiusScalar * Math.log(distanceFromRootCenter),
                center: newBaseCircleCenter,
              },
              childCircle: {
                relativeRadius:
                  7 / 12 + rhythmRatioStep * rhythmIndex * (5 / 12),
                relativeDepth: 1 - nestRatioStep * nestIndex * (4 / 12),
                phaseAngle: relativeAngleToCenter,
              },
              rotationAnchor: 'base',
              rotationAngle:
                (relativeAngleToCenter / 2) * Math.PI * Math.PI + Math.PI / 2,
            },
          }
        },
      })
    },
  }).flat()
  const baseLoops = [
    ...coreLoops,
    ...coreLoops.map((someCoreLoopData) => ({
      ...someCoreLoopData,
      rotatedLoop: getMirroredRotatedLoop({
        mirrorAngle: Math.PI / 2,
        originPoint: rootCircle.center,
        baseLoop: someCoreLoopData.rotatedLoop,
      }),
    })),
  ]
  const loopGroups = getLoopGroups({
    someLoops: baseLoops.map(({ rotatedLoop }) => rotatedLoop),
  }).map((someLoopGroup, groupIndex) =>
    someLoopGroup
      .map((someLoop) => {
        return groupIndex === 0 // top
          ? [
              someLoop,
              someLoop,
              getUpdatedData({
                baseData: someLoop,
                dataUpdates: {
                  rotationAngle: (fooAngle: number) => -fooAngle / 2,
                  'baseCircle.radius': () => 9,
                },
              }),
              getUpdatedData({
                baseData: someLoop,
                dataUpdates: {
                  rotationAngle: (fooAngle: number) => fooAngle / 2,
                  'baseCircle.radius': () => 9,
                },
              }),
            ]
          : groupIndex === 2 // bottom
          ? [
              someLoop,
              someLoop,
              getUpdatedData({
                baseData: someLoop,
                dataUpdates: {
                  rotationAngle: (fooAngle: number) => -Math.PI / 3,
                  'childCircle.relativeRadius': (foo: number) => foo / 1.5,
                  'baseCircle.radius': () => 8,
                  'childCircle.phaseAngle': (foo: number) => -foo,
                },
              }),
              getUpdatedData({
                baseData: someLoop,
                dataUpdates: {
                  rotationAngle: (fooAngle: number) => Math.PI / 3,
                  'childCircle.relativeRadius': (foo: number) => foo / 1.5,
                  'baseCircle.radius': () => 8,
                  'childCircle.phaseAngle': (foo: number) => -foo,
                },
              }),
            ]
          : [
              // mid
              someLoop,
              getUpdatedData({
                baseData: someLoop,
                dataUpdates: {
                  'baseCircle.radius': () => 6,
                },
              }),
            ]
      })
      .flat()
  )
  const singularLoops = baseLoops.filter(
    ({ rotatedLoop }) =>
      loopGroups.flat().findIndex((someLoop) => someLoop === rotatedLoop) === -1
  )
  const rightEyeLoop: RotatedLoop = {
    baseCircle: {
      center: { x: 60, y: 18 },
      radius: 5,
    },
    childCircle: {
      relativeRadius: 1,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: 0,
  }
  const rightEarLoop: RotatedLoop = {
    baseCircle: {
      center: { x: 83, y: 23.5 },
      radius: 5,
    },
    childCircle: {
      relativeRadius: 7 / 8,
      relativeDepth: 1,
      phaseAngle: Math.PI / 2 / 2,
    },
    rotationAnchor: 'base',
    rotationAngle: -Math.PI / 4,
  }
  const rightHipLoop: RotatedLoop = {
    baseCircle: {
      center: { x: 84, y: 63.5 },
      radius: 10,
    },
    childCircle: {
      relativeRadius: 4 / 12,
      relativeDepth: 1,
      phaseAngle: Math.PI / 2 / 2,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2 + Math.PI / 23,
  }
  const coreDecorationLoops: Array<RootLoopData> = [
    [
      rightEyeLoop,
      getUpdatedData({
        baseData: rightEyeLoop,
        dataUpdates: {
          'childCircle.relativeRadius': () => 2.5 / 8,
          rotationAngle: () => Math.PI / 4 + Math.PI,
          'childCircle.phaseAngle': () => -Math.PI / 3,
          'baseCircle.radius': () => 7,
        },
      }),
    ],
    [
      rightEarLoop,
      getUpdatedData({
        baseData: rightEarLoop,
        dataUpdates: {
          'childCircle.relativeRadius': () => 3 / 8,
          rotationAngle: () => -Math.PI / 3,
          'baseCircle.radius': () => 5,
        },
      }),
    ],
    [
      rightHipLoop,
      getUpdatedData({
        baseData: rightHipLoop,
        dataUpdates: {
          'childCircle.relativeRadius': () => 7 / 12,
          rotationAngle: () => 0,
          'baseCircle.radius': () => 6,
        },
      }),
    ],
  ].map((someCompositeLoop, decorationIndex) => {
    switch (decorationIndex) {
      case 0:
      case 1:
      case 2:
        return {
          rootLoop: someCompositeLoop,
          getStrokeWidth: () => 0.2,
          getStrokeColor: ({ nestIndex }) =>
            getColorSequence({
              loopKey: getDecorationLoopKey({
                decorationIndex,
              }),
            })[nestIndex]!,
          getShiftAngle: getShiftAngleGetter({
            loopKey: getDecorationLoopKey({
              decorationIndex,
            }),
          }),
          getRelativeShiftScalar: getRelativeShiftScalarGetter({
            loopKey: getDecorationLoopKey({
              decorationIndex,
            }),
          }),
          getNestRhythm: getNestRhythmGetter({
            loopKey: getDecorationLoopKey({
              decorationIndex,
            }),
          }),
        }
      default:
        throw Error('wtf decoration rootLoopData')
    }
  })
  const fooLoopGroups: Array<RootLoopData> = [
    ...loopGroups.map<RootLoopData>((someCompositeLoop, groupIndex) => {
      switch (groupIndex) {
        case 0:
        case 1:
        case 2:
          return {
            rootLoop: someCompositeLoop,
            getStrokeWidth: () => 0.2,
            getStrokeColor: ({ nestIndex }) =>
              getColorSequence({
                loopKey: getCenterLoopKey({
                  centerIndex: groupIndex,
                }),
              })[nestIndex]!,
            getShiftAngle: getShiftAngleGetter({
              loopKey: getCenterLoopKey({
                centerIndex: groupIndex,
              }),
            }),
            getRelativeShiftScalar: getRelativeShiftScalarGetter({
              loopKey: getCenterLoopKey({
                centerIndex: groupIndex,
              }),
            }),
            getNestRhythm: getNestRhythmGetter({
              loopKey: getCenterLoopKey({
                centerIndex: groupIndex,
              }),
            }),
          }
        default:
          throw Error('wtf loopGroup rootLoopData')
      }
    }),
    ...singularLoops.map<RootLoopData>(
      ({
        getStrokeWidth,
        getStrokeColor,
        getNestRhythm,
        getShiftAngle,
        getRelativeShiftScalar,
        rotatedLoop,
      }) => {
        const rootLoop = [
          rotatedLoop,
          rotatedLoop,
          rotatedLoop,
          rotatedLoop,
          getUpdatedData({
            baseData: rotatedLoop,
            dataUpdates: {
              rotationAngle: (fooAngle: number) => -fooAngle,
              'childCircle.relativeRadius': (foo: number) => foo / 1.5,
              'childCircle.phaseAngle': (fooAngle: number) => -fooAngle,
            },
          }),
        ]
        return {
          getStrokeWidth,
          getStrokeColor,
          getNestRhythm,
          getShiftAngle,
          getRelativeShiftScalar,
          rootLoop,
        }
      }
    ),
    ...coreDecorationLoops,
    ...coreDecorationLoops.map((someRootLoopData) => ({
      ...someRootLoopData,
      rootLoop: someRootLoopData.rootLoop.map((someLoop) =>
        getMirroredRotatedLoop({
          baseLoop: someLoop,
          originPoint: rootCircle.center,
          mirrorAngle: Math.PI / 2,
        })
      ),
    })),
  ]
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
    >
      <rect x={-10} y={-10} width={120} height={120} fill={'black'} />
      <g transform={'translate(0,5)'}>
        {fooLoopGroups.map(
          ({
            rootLoop,
            getShiftAngle,
            getRelativeShiftScalar,
            getStrokeWidth,
            getStrokeColor,
            getNestRhythm,
          }) => {
            const basePoints = getCompositeLoopPoints({
              sampleCount: globalSampleCount,
              baseLoops: rootLoop,
            })
            const compositeCenter = getCompositeCenterPoint({
              baseLoops: rootLoop,
            })
            const baseShiftAngle = Math.atan2(
              compositeCenter.y - rootCircle.center.y,
              compositeCenter.x - rootCircle.center.x
            )
            const shiftAngle = getShiftAngle({
              baseShiftAngle,
              baseCenter: compositeCenter,
            })
            const maxShiftPoint: Point = getTracePoint({
              somePoints: basePoints,
              traceAngle: shiftAngle,
              originPoint: compositeCenter,
            })
            const maxShiftRadius = getDistanceBetweenPoints({
              pointA: compositeCenter,
              pointB: maxShiftPoint,
            })
            const shiftScalar = getRelativeShiftScalar()
            return reduceRhythmSequence<{
              strokeWidth: number
              strokeColor: string
              parentCenter: Point
              parentPoints: Array<Point>
            }>({
              baseRhythm: getNestRhythm({
                defaultRhythm: getNaturalCompositeRhythm({
                  rhythmResolution: 24,
                  rhythmParts: [
                    { rhythmDensity: 23, rhythmPhase: 0 },
                    { rhythmDensity: 19, rhythmPhase: 0 },
                    { rhythmDensity: 17, rhythmPhase: 0 },
                    { rhythmDensity: 13, rhythmPhase: 0 },
                    { rhythmDensity: 11, rhythmPhase: 0 },
                    { rhythmDensity: 7, rhythmPhase: 0 },
                    { rhythmDensity: 5, rhythmPhase: 0 },
                  ],
                  rhythmPhase: 0,
                }),
              }),
              getCellResult: ({ rhythmResolution, rhythmIndex, nestIndex }) => {
                const childShiftRadius =
                  shiftScalar *
                  (maxShiftRadius / rhythmResolution) *
                  rhythmIndex
                const currentCenter: Point = {
                  x:
                    childShiftRadius * Math.cos(shiftAngle) + compositeCenter.x,
                  y:
                    childShiftRadius * Math.sin(shiftAngle) + compositeCenter.y,
                }
                return {
                  strokeWidth: getStrokeWidth({ nestIndex }),
                  strokeColor: getStrokeColor({ nestIndex }),
                  parentCenter: currentCenter,
                  parentPoints: basePoints.map((someBasePoint, pointIndex) => {
                    const maxRadius = getDistanceBetweenPoints({
                      pointA: compositeCenter,
                      pointB: someBasePoint,
                    })
                    const currentBaseRadius =
                      maxRadius - (maxRadius / rhythmResolution) * rhythmIndex
                    const currentAngle =
                      ((2 * Math.PI) / basePoints.length) * pointIndex
                    return {
                      x:
                        currentBaseRadius * Math.cos(currentAngle) +
                        currentCenter.x,
                      y:
                        currentBaseRadius * Math.sin(currentAngle) +
                        currentCenter.y,
                    }
                  }),
                }
              },
            }).map(
              (
                { strokeColor, strokeWidth, parentCenter, parentPoints },
                loopIndex
              ) => (
                <Polygon
                  fillColor={'none'}
                  strokeColor={strokeColor}
                  strokeWidth={
                    !camouflage
                      ? strokeWidth
                      : strokeWidth * camouflageStrokeScalar
                  }
                  somePoints={parentPoints.map((somePoint, pointIndex) => {
                    const baseRadius = getDistanceBetweenPoints({
                      pointA: parentCenter,
                      pointB: somePoint,
                    })
                    const pointAngle =
                      ((2 * Math.PI) / parentPoints.length) * pointIndex
                    const pointRadius =
                      baseRadius +
                      Math.log(baseRadius) *
                        Math.random() *
                        (camouflage ? 0.75 : 0)
                    return {
                      x: pointRadius * Math.cos(pointAngle) + parentCenter.x,
                      y: pointRadius * Math.sin(pointAngle) + parentCenter.y,
                    }
                  })}
                />
              )
            )
          }
        )}
      </g>
    </svg>
  )
}

function getCoreLoopKey(api: any) {
  const { tangentIndex, orthogonalIndex } = api
  if (tangentIndex === 1 && orthogonalIndex === 0) {
    return 'perimeterRight40'
  } else if (tangentIndex === 1 && orthogonalIndex === 1) {
    return 'centerInnerRight'
  } else if (tangentIndex === 1 && orthogonalIndex === 2) {
    return 'bottomLowerRight'
  } else if (tangentIndex === 2 && orthogonalIndex === 0) {
    return 'perimeterRight90'
  } else if (tangentIndex === 2 && orthogonalIndex === 1) {
    return 'midBottomInnerRight'
  } else if (tangentIndex === 2 && orthogonalIndex === 2) {
    return 'midBottomOuterRight'
  } else if (tangentIndex === 3 && orthogonalIndex === 0) {
    return 'perimeterRight150'
  } else if (tangentIndex === 3 && orthogonalIndex === 1) {
    return 'bottomUpperRight'
  } else if (tangentIndex === 3 && orthogonalIndex === 2) {
    return 'centerOuterRight'
  } else {
    return 'default'
  }
}

interface GetCenterLoopIndex {
  centerIndex: 0 | 1 | 2
}

function getCenterLoopKey(api: GetCenterLoopIndex) {
  const { centerIndex } = api
  switch (centerIndex) {
    case 0:
      return 'centerTop'
    case 1:
      return 'centerMidTop'
    case 2:
      return 'centerBottom'
  }
}

interface GetDecorationLoopKeyApi {
  decorationIndex: 0 | 1 | 2
}

function getDecorationLoopKey(api: GetDecorationLoopKeyApi) {
  const { decorationIndex } = api
  switch (decorationIndex) {
    case 0:
      return 'rightEye'
    case 1:
      return 'rightEar'
    case 2:
      return 'rightHip'
  }
}

function getStoopShiftAngle(api: any) {
  const { baseCenter, shiftAngle } = api
  return baseCenter.x < 50
    ? -Math.PI / 2 - shiftAngle
    : -Math.PI / 2 + shiftAngle
}
