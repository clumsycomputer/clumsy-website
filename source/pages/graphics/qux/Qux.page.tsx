import React from 'react'
import {
  Circle,
  getMirroredRotatedLoop,
  getRotatedLoopChildCircle,
  getRotatedLoopPoints,
  getTracePoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { Polygon } from '../../../library/components/Polygon'
import { getUpdatedData } from '../../../library/getUpdatedData'
import {
  DiscreteRhythm,
  getElementIndices,
  getNaturalCompositeRhythm,
} from '../../../library/rhythmStuff'

export default {
  pageRoute: '/graphics/qux',
  PageContent: Qux,
  htmlTitle: 'qux - jmath',
  htmlDescription: 'a qux graphic',
  generatePdf: false,
  pdfFileName: 'qux',
}

const globalSampleCount = 1024
const camouflage = true
const camouflageStrokeScalar = 1 / 5
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
    case 'perimeterRight40':
      return colorsA
    case 'perimeterRight90':
      return colorsA
    case 'perimeterRight150':
      return colorsA
    case 'centerInnerRight':
      return colorsA
    case 'centerOuterRight':
      return colorsA
    case 'midBottomInnerRight':
      return colorsA
    case 'midBottomOuterRight':
      return colorsA
    case 'bottomUpperRight':
      return colorsA
    case 'bottomLowerRight':
      return colorsA
    case 'centerTop':
      return colorsA
    case 'centerMidTop':
      return colorsA
    case 'centerBottom':
      return colorsA
    case 'rightEye':
      return colorsA
    case 'rightEar':
      return colorsA
    case 'rightHip':
    case 'default':
      return colorsA
  }
}

function getNestRhythmGetter(
  api: GetRootLoopDataApi
): RootLoopData['getNestRhythm'] {
  const { loopKey } = api
  switch (loopKey) {
    case 'centerTop':
    case 'centerMidTop':
    case 'centerBottom':
      return () =>
        getNaturalCompositeRhythm({
          rhythmResolution: 23,
          rhythmParts: [
            { rhythmDensity: 19, rhythmPhase: 0 },
            { rhythmDensity: 17, rhythmPhase: 0 },
            { rhythmDensity: 13, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
            { rhythmDensity: 7, rhythmPhase: 10 },
          ],
          rhythmPhase: 1,
        })
    case 'perimeterRight40':
    case 'perimeterRight90':
    case 'perimeterRight150':
    case 'centerInnerRight':
    case 'centerOuterRight':
    case 'midBottomInnerRight':
    case 'midBottomOuterRight':
    case 'bottomUpperRight':
    case 'bottomLowerRight':
    case 'rightEye':
    case 'rightEar':
    case 'rightHip':
    case 'default':
      return () =>
        getNaturalCompositeRhythm({
          rhythmResolution: 23,
          rhythmParts: [
            { rhythmDensity: 17, rhythmPhase: 0 },
            { rhythmDensity: 13, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
            { rhythmDensity: 7, rhythmPhase: 0 },
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
          shiftAngle: Math.PI,
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
          shiftAngle: Math.PI / 12,
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
          shiftAngle: Math.PI / 2 + Math.PI / 6,
        })
    case 'midBottomInnerRight':
      return ({ baseCenter }) =>
        getStoopShiftAngle({
          baseCenter,
          shiftAngle: Math.PI / 2 - Math.PI / 6,
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
          shiftAngle: Math.PI / 3.5,
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
    case 'rightEye':
    case 'rightEar':
    case 'rightHip':
    case 'default':
      return () => 1
  }
}

const PaletteB = {
  primary: {
    main: '#e6784d',
  },
  complementary: {
    main: '#4dbbe6',
  },
  analogousA: {
    main: '#e64d6e',
  },
  analogousB: {
    main: '#e6c54d',
  },
  triadicA: {
    main: '#bbe64d',
  },
  triadicB: {
    main: '#4de678',
  },
}

const colorsA = [
  PaletteB.primary.main,
  PaletteB.analogousB.main,
  PaletteB.analogousA.main,
  PaletteB.complementary.main,
  PaletteB.triadicB.main,
  PaletteB.triadicA.main,
  PaletteB.complementary.main,
]

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
        case 1: // midCenter
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

interface RootLoopData {
  getShiftAngle: (api: { baseShiftAngle: number; baseCenter: Point }) => number
  getRelativeShiftScalar: () => number
  getStrokeColor: (api: { nestIndex: number }) => string
  getStrokeWidth: (api: { nestIndex: number }) => number
  getNestRhythm: (api: { defaultRhythm: DiscreteRhythm }) => DiscreteRhythm
  rootLoop: CompositeLoop
}

interface ReduceRhythmSequenceApi<SomeCellResult extends any> {
  baseRhythm: DiscreteRhythm
  getCellResult: (api: {
    rhythmResolution: number
    rhythmDensity: number
    rhythmIndex: number
    nestIndex: number
    previousCellResults: Array<SomeCellResult>
  }) => SomeCellResult
}

function reduceRhythmSequence<SomeCellResult extends any>(
  api: ReduceRhythmSequenceApi<SomeCellResult>
): Array<SomeCellResult> {
  const { baseRhythm, getCellResult } = api
  const rhythmIndices = getElementIndices({
    targetValue: true,
    someSpace: baseRhythm,
  })
  const rhythmResolution = baseRhythm.length
  const rhythmDensity = rhythmIndices.length
  return rhythmIndices.reduce<Array<SomeCellResult>>(
    (result, rhythmIndex, nestIndex) => [
      ...result,
      getCellResult({
        rhythmResolution,
        rhythmDensity,
        rhythmIndex,
        nestIndex,
        previousCellResults: result,
      }),
    ],
    []
  )
}

export interface MapRhythmSequenceApi<SomeCellResult extends any> {
  baseRhythm: DiscreteRhythm
  getCellResult: (api: {
    rhythmResolution: number
    rhythmDensity: number
    rhythmIndex: number
    nestIndex: number
  }) => SomeCellResult
}

function mapRhythmSequence<SomePropertyResult extends any>(
  api: MapRhythmSequenceApi<SomePropertyResult>
): Array<SomePropertyResult> {
  const { baseRhythm, getCellResult } = api
  const rhythmIndices = getElementIndices({
    targetValue: true,
    someSpace: baseRhythm,
  })
  const rhythmResolution = baseRhythm.length
  const rhythmDensity = rhythmIndices.length
  return rhythmIndices.map((rhythmIndex, nestIndex) =>
    getCellResult({
      rhythmResolution,
      rhythmDensity,
      rhythmIndex,
      nestIndex,
    })
  )
}

interface CompositeLoop extends Array<RotatedLoop> {}

interface GetCompositeLoopPointsApi {
  sampleCount: number
  baseLoops: CompositeLoop
}

function getCompositeLoopPoints(api: GetCompositeLoopPointsApi): Array<Point> {
  const { baseLoops, sampleCount } = api
  const compositeCenter = getCompositeCenterPoint({
    baseLoops,
  })
  const childCircles = baseLoops.map((someLoop) =>
    getRotatedLoopChildCircle({
      someRotatedLoop: someLoop,
    })
  )
  return new Array(sampleCount).fill(undefined).map<Point>((_, sampleIndex) => {
    const [accumulatedVectorX, accumulatedVectorY] = baseLoops.reduce<
      [x: number, y: number]
    >(
      ([resultX, resultY], someLoop, loopIndex) => {
        const loopChildCenter = childCircles[loopIndex]!.center
        const loopPoint = getTracePoint({
          originPoint: loopChildCenter,
          somePoints: getRotatedLoopPoints({
            sampleCount,
            someRotatedLoop: someLoop,
          }),
          traceAngle: ((2 * Math.PI) / sampleCount) * sampleIndex,
        })
        const distanceX = loopPoint.x - loopChildCenter.x
        const distanceY = loopPoint.y - loopChildCenter.y
        return [distanceX + resultX, distanceY + resultY]
      },
      [0, 0]
    )
    return {
      x: accumulatedVectorX / baseLoops.length + compositeCenter.x,
      y: accumulatedVectorY / baseLoops.length + compositeCenter.y,
    }
  })
}

interface GetCompositeCenterPointApi {
  baseLoops: Array<RotatedLoop>
}

function getCompositeCenterPoint(api: GetCompositeCenterPointApi) {
  const { baseLoops } = api
  const childCircles = baseLoops.map((someLoop) =>
    getRotatedLoopChildCircle({
      someRotatedLoop: someLoop,
    })
  )
  const compositeAccumulatedCenter = childCircles.reduce<Point>(
    (result, someChildCircle) => {
      return {
        x: someChildCircle.center.x + result.x,
        y: someChildCircle.center.y + result.y,
      }
    },
    { x: 0, y: 0 }
  )
  return {
    x: compositeAccumulatedCenter.x / baseLoops.length,
    y: compositeAccumulatedCenter.y / baseLoops.length,
  }
}

interface GetLoopGroupsApi {
  someLoops: Array<RotatedLoop>
}

function getLoopGroups(api: GetLoopGroupsApi) {
  const { someLoops } = api
  return someLoops.reduce<Array<Array<RotatedLoop>>>(
    (result, someLoop, loopIndex) => {
      const remainingLoops = someLoops.filter(
        (_, otherLoopIndex) =>
          otherLoopIndex !== loopIndex &&
          result.findIndex((someLoopGroup) =>
            someLoopGroup.find(
              (someConflictLoop) => someConflictLoop === someLoop
            )
          ) === -1
      )
      const conflictingLoops = getConflictingRotatedLoops({
        remainingLoops,
        rootLoops: remainingLoops,
        currentLoop: someLoop,
        conflictingLoops: [],
      })
      return conflictingLoops.length > 0
        ? [...result, [...conflictingLoops, someLoop]]
        : result
    },
    []
  )
}

interface GetConflictingRotatedLoopsApi {
  rootLoops: Array<RotatedLoop>
  currentLoop: RotatedLoop
  remainingLoops: Array<RotatedLoop>
  conflictingLoops: Array<RotatedLoop>
}

function getConflictingRotatedLoops(
  api: GetConflictingRotatedLoopsApi
): Array<RotatedLoop> {
  const { rootLoops, currentLoop, remainingLoops, conflictingLoops } = api
  const [loopUnderInspection, ...nextRemainingLoops] = remainingLoops
  return loopUnderInspection
    ? getRotatedLoopsCollide({
        loopA: currentLoop,
        loopB: loopUnderInspection,
      })
      ? getConflictingRotatedLoops({
          rootLoops,
          currentLoop,
          remainingLoops: nextRemainingLoops,
          conflictingLoops: [
            loopUnderInspection,
            ...conflictingLoops,
            ...getConflictingRotatedLoops({
              rootLoops,
              currentLoop: loopUnderInspection,
              remainingLoops: rootLoops.filter(
                (someLoop) =>
                  someLoop !== currentLoop && someLoop !== loopUnderInspection
              ),
              conflictingLoops: [],
            }),
          ],
        })
      : getConflictingRotatedLoops({
          rootLoops,
          currentLoop,
          conflictingLoops,
          remainingLoops: nextRemainingLoops,
        })
    : conflictingLoops
}

interface GetRotatedLoopsCollideApi {
  loopA: RotatedLoop
  loopB: RotatedLoop
}

function getRotatedLoopsCollide(api: GetRotatedLoopsCollideApi): boolean {
  const { loopA, loopB } = api
  const distanceBetweenBaseCircleCenters = getDistanceBetweenPoints({
    pointA: loopA.baseCircle.center,
    pointB: loopB.baseCircle.center,
  })
  return (
    loopA.baseCircle.radius + loopB.baseCircle.radius >=
    distanceBetweenBaseCircleCenters
  )
}

interface GetDistanceBetweenPointsApi {
  pointA: Point
  pointB: Point
}

function getDistanceBetweenPoints(api: GetDistanceBetweenPointsApi): number {
  const { pointA, pointB } = api
  const deltaX = pointB.x - pointA.x
  const deltaY = pointB.y - pointA.y
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
}
