import { getUpdatedData } from '../../../library/getUpdatedData'
import React, { SVGProps } from 'react'
import {
  Circle,
  getLoopChildCircle,
  getOscillatedRotatedLoopPoints,
  getRotatedLoopPoints,
  getTracePoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import {
  getElementIndices,
  getFilteredRhythm,
  getNaturalRhythm,
  DiscreteRhythm,
} from '../../../library/rhythmStuff'

export default {
  pageRoute: '/graphics/bar',
  PageContent: Bar,
  htmlTitle: 'bar - jmath',
  htmlDescription: 'a bar graphic',
  generatePdf: false,
  pdfFileName: 'bar',
}

const PaletteB = {
  primary: {
    main: '#b65520',
  },
  complementary: {
    main: '#2082b6',
  },
  analogousA: {
    main: '#b62037',
  },
  analogousB: {
    main: '#b6a020',
  },
  triadicA: {
    main: '#82b620',
  },
  triadicB: {
    main: '#20b655',
  },
}

const colorsA = [
  PaletteB.primary.main,
  PaletteB.analogousB.main,
  PaletteB.analogousA.main,
  PaletteB.complementary.main,
  PaletteB.analogousB.main,
  PaletteB.analogousA.main,
  PaletteB.complementary.main,
]

const reversedColorsA = [...colorsA].reverse()

const colorsB = [
  PaletteB.primary.main,
  PaletteB.analogousA.main,
  PaletteB.analogousB.main,
  PaletteB.complementary.main,
  PaletteB.analogousA.main,
  PaletteB.analogousB.main,
  PaletteB.complementary.main,
]

const reversedColorsB = [...colorsB].reverse()

interface GetNestLoopsApi {
  globalSide: 'left' | 'right'
  rotatedLoop: RotatedLoop
  rhythmIndex: number
}

function Bar() {
  const rootCircle: Circle = {
    center: {
      x: 50,
      y: 50,
    },
    radius: 50,
  }
  const rhythmA = getFilteredRhythm({
    rhythmSequence: [
      getNaturalRhythm({
        rhythmResolution: 12,
        rhythmDensity: 7,
        rhythmPhase: 1,
      }),
      getNaturalRhythm({
        rhythmResolution: 7,
        rhythmDensity: 3,
        rhythmPhase: 4,
      }),
    ],
  })
  const rhythmB = getFilteredRhythm({
    rhythmSequence: [
      getNaturalRhythm({
        rhythmResolution: 12,
        rhythmDensity: 7,
        rhythmPhase: 0,
      }),
      getNaturalRhythm({
        rhythmResolution: 7,
        rhythmDensity: 5,
        rhythmPhase: 0,
      }),
    ],
  })
  const waveGroups = {
    neck: {
      rightBaseLoops: getWaveLoops({
        rootCircle,
        spacerRhythm: rhythmA,
        baseCircleTranslation: rootCircle.center,
        reverseRhythmDirection: false,
        flipRotationAngle: false,
        getBaseCircleCenterCosineAngle: (waveSample) =>
          -Math.PI / 2.5 + (Math.PI / 2) * waveSample,
        getBaseCircleSineAngle: (waveSample) =>
          -Math.PI / 2.5 + (Math.PI / 3) * waveSample,
        getBaseCircleRadius: (adjustedTimeSample) => 5 * adjustedTimeSample,
      }),
      leftBaseLoops: getWaveLoops({
        rootCircle,
        spacerRhythm: rhythmA,
        baseCircleTranslation: rootCircle.center,
        reverseRhythmDirection: false,
        flipRotationAngle: true,
        getBaseCircleCenterCosineAngle: (waveSample) =>
          Math.PI / 2.5 - (Math.PI / 2) * waveSample + Math.PI,
        getBaseCircleSineAngle: (waveSample) =>
          Math.PI / 2.5 - (Math.PI / 3) * waveSample + Math.PI,
        getBaseCircleRadius: (adjustedTimeSample) => 5 * adjustedTimeSample,
      }),
      getNestLoops: ({
        globalSide,
        rotatedLoop,
        rhythmIndex,
      }: GetNestLoopsApi) => {
        const nestRhythm = getFilteredRhythm({
          rhythmSequence: [
            getNaturalRhythm({
              rhythmResolution: 24,
              rhythmDensity: 23,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 23,
              rhythmDensity: 13,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 13,
              rhythmDensity: 12,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 12,
              rhythmDensity: 7,
              rhythmPhase: rhythmIndex,
            }),
          ],
        })
        const nestIndices = getElementIndices({
          targetValue: true,
          someSpace: nestRhythm,
        })
        return nestIndices.map((nestIndex, colorIndex) => {
          return {
            rotatedLoop: getUpdatedData({
              baseData: rotatedLoop,
              dataUpdates: {
                'baseCircle.radius': (baseValue: number) =>
                  (baseValue * (nestRhythm.length - nestIndex)) /
                  nestRhythm.length,
                'baseCircle.center.x': (
                  baseValue: number,
                  rootValue: RotatedLoop
                ) =>
                  baseValue +
                  (globalSide === 'left' ? -0.025 : 0.025) *
                    rootValue.baseCircle.radius *
                    nestIndex,
                'baseCircle.center.y': (
                  baseValue: number,
                  rootValue: RotatedLoop
                ) =>
                  baseValue + -0.01 * rootValue.baseCircle.radius * nestIndex,
              },
            }),
            strokeColor: colorsB[colorIndex % colorsB.length],
          }
        })
      },
    },
    arm: {
      rightBaseLoops: getWaveLoops({
        rootCircle,
        spacerRhythm: rhythmB,
        baseCircleTranslation: rootCircle.center,
        reverseRhythmDirection: true,
        flipRotationAngle: false,
        getBaseCircleCenterCosineAngle: (waveSample) =>
          -Math.PI / 2.5 - (Math.PI / 2) * waveSample,
        getBaseCircleSineAngle: (waveSample) =>
          -Math.PI / 2.5 - (Math.PI / 5) * waveSample,
        getBaseCircleRadius: (adjustedTimeSample) => 4 * adjustedTimeSample,
      }),
      leftBaseLoops: getWaveLoops({
        rootCircle,
        spacerRhythm: rhythmB,
        baseCircleTranslation: rootCircle.center,
        reverseRhythmDirection: true,
        flipRotationAngle: true,
        getBaseCircleCenterCosineAngle: (waveSample) =>
          Math.PI / 2.5 + (Math.PI / 2) * waveSample + Math.PI,
        getBaseCircleSineAngle: (waveSample) =>
          Math.PI / 2.5 + (Math.PI / 5) * waveSample + Math.PI,
        getBaseCircleRadius: (adjustedTimeSample) => 4 * adjustedTimeSample,
      }),
      getNestLoops: ({
        globalSide,
        rotatedLoop,
        rhythmIndex,
      }: GetNestLoopsApi) => {
        const {
          rhythmDensity,
          rhythmPhase,
          nestTranslation,
          strokeWidth = 0.15,
        } = rhythmIndex === 8
          ? {
              rhythmDensity: 7,
              rhythmPhase: 0,
              strokeWidth: 0.125,
              nestTranslation: {
                x: 0.015,
                y: -0.03,
              },
            }
          : rhythmIndex === 6
          ? {
              rhythmDensity: 7,
              rhythmPhase: 0,
              nestTranslation: {
                x: 0.025,
                y: 0.03,
              },
            }
          : rhythmIndex === 3
          ? {
              rhythmDensity: 7,
              rhythmPhase: 0,
              nestTranslation: {
                x: -0.0375,
                y: 0.01,
              },
            }
          : rhythmIndex === 1
          ? {
              rhythmDensity: 7,
              rhythmPhase: 0,
              nestTranslation: {
                x: -0.03,
                y: -0.025,
              },
            }
          : {
              rhythmDensity: 7,
              rhythmPhase: 0,
              nestTranslation: {
                x: 0.03,
                y: -0.03,
              },
            }
        const nestRhythm = getFilteredRhythm({
          rhythmSequence: [
            getNaturalRhythm({
              rhythmResolution: 24,
              rhythmDensity: 23,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 23,
              rhythmDensity: 13,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 13,
              rhythmDensity: 12,
              rhythmPhase: rhythmPhase,
            }),
            getNaturalRhythm({
              rhythmResolution: 12,
              rhythmDensity: rhythmDensity,
              rhythmPhase: rhythmPhase,
            }),
          ],
        })
        const nestIndices = getElementIndices({
          targetValue: true,
          someSpace: nestRhythm,
        })
        return nestIndices.map((nestIndex, colorIndex) => {
          return {
            strokeWidth,
            rotatedLoop: getUpdatedData({
              baseData: rotatedLoop,
              dataUpdates: {
                'baseCircle.radius': (baseValue: number) =>
                  (baseValue * (nestRhythm.length - nestIndex)) /
                  nestRhythm.length,
                'baseCircle.center.x': (
                  baseValue: number,
                  rootValue: RotatedLoop
                ) =>
                  baseValue +
                  (2 * (-rhythmIndex % 2) + 1) *
                    (globalSide === 'left'
                      ? -nestTranslation.x
                      : nestTranslation.x) *
                    rootValue.baseCircle.radius *
                    nestIndex,
                //   +
                // (rhythmIndex === 8 ? 0 : 0) *
                //   (globalSide === 'left' ? 1 : -1),
                'baseCircle.center.y': (
                  baseValue: number,
                  rootValue: RotatedLoop
                ) =>
                  baseValue +
                  (-2 * (rhythmIndex % 2) + 1) *
                    nestTranslation.y *
                    rootValue.baseCircle.radius *
                    nestIndex,
                // + (rhythmIndex === 8 ? 0 : 0)
              },
            }),
            strokeColor: (rhythmIndex === 1 || rhythmIndex === 3
              ? reversedColorsB
              : rhythmIndex === 8
              ? ['black', 'black', 'black', 'black', 'black', 'black', 'black']
              : // colorsB
                colorsB)[colorIndex],
          }
        })
      },
    },
    hip: {
      leftBaseLoops: getWaveLoops({
        rootCircle,
        spacerRhythm: rhythmA,
        reverseRhythmDirection: false,
        flipRotationAngle: false,
        baseCircleTranslation: {
          ...rootCircle.center,
          y: rootCircle.center.y - 10,
        },
        getBaseCircleCenterCosineAngle: (waveSample) =>
          Math.PI / 2.5 - (Math.PI / 2) * waveSample + Math.PI / 2,
        getBaseCircleSineAngle: (waveSample) =>
          Math.PI / 2.5 - (Math.PI / 3) * waveSample + Math.PI / 2,
        getBaseCircleRadius: (adjustedTimeSample) => 5 * adjustedTimeSample,
      }),
      rightBaseLoops: getWaveLoops({
        rootCircle,
        spacerRhythm: rhythmA,
        reverseRhythmDirection: false,
        flipRotationAngle: true,
        baseCircleTranslation: {
          ...rootCircle.center,
          y: rootCircle.center.y - 10,
        },
        getBaseCircleCenterCosineAngle: (waveSample) =>
          -Math.PI / 2.5 + (Math.PI / 2) * waveSample + Math.PI / 2,
        getBaseCircleSineAngle: (waveSample) =>
          -Math.PI / 2.5 + (Math.PI / 3) * waveSample + Math.PI / 2,
        getBaseCircleRadius: (adjustedTimeSample) => 5 * adjustedTimeSample,
      }),
      getNestLoops: ({
        globalSide,
        rotatedLoop,
        rhythmIndex,
      }: GetNestLoopsApi) => {
        const { rhythmDensity, rhythmPhase, nestTranslation } =
          rhythmIndex === 9
            ? {
                // outerUpper
                rhythmDensity: 7,
                rhythmPhase: 0,
                nestTranslation: {
                  x: -0.02,
                  y: -0.02,
                },
              }
            : rhythmIndex === 5
            ? {
                // innerLower
                rhythmDensity: 7,
                rhythmPhase: 0,
                nestTranslation: {
                  x: -0.02,
                  y: -0.02,
                },
              }
            : {
                // zero radius
                rhythmDensity: 1,
                rhythmPhase: 0,
                nestTranslation: { x: 0, y: 0 },
              }
        const nestRhythm = getFilteredRhythm({
          rhythmSequence: [
            getNaturalRhythm({
              rhythmResolution: 24,
              rhythmDensity: 23,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 23,
              rhythmDensity: 13,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 13,
              rhythmDensity: 12,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 12,
              rhythmDensity: rhythmDensity,
              rhythmPhase: rhythmPhase,
            }),
          ],
        })
        const nestIndices = getElementIndices({
          targetValue: true,
          someSpace: nestRhythm,
        })
        return nestIndices.map((nestIndex, colorIndex) => {
          return {
            rotatedLoop: getUpdatedData({
              baseData: rotatedLoop,
              dataUpdates: {
                'baseCircle.radius': (baseValue: number) =>
                  (baseValue * (nestRhythm.length - nestIndex)) /
                  nestRhythm.length,
                'baseCircle.center.x': (
                  baseValue: number,
                  rootValue: RotatedLoop
                ) =>
                  baseValue +
                  (2 * (-rhythmIndex % 2) + 1) *
                    (globalSide === 'left'
                      ? -nestTranslation.x
                      : nestTranslation.x) *
                    rootValue.baseCircle.radius *
                    nestIndex,
                'baseCircle.center.y': (
                  baseValue: number,
                  rootValue: RotatedLoop
                ) =>
                  baseValue +
                  (-2 * (rhythmIndex % 2) + 1) *
                    nestTranslation.y *
                    rootValue.baseCircle.radius *
                    nestIndex,
              },
            }),
            strokeColor: (rhythmIndex === 9 ? colorsA : colorsB)[colorIndex],
          }
        })
      },
    },
    leg: {
      rightBaseLoops: getWaveLoops({
        rootCircle,
        spacerRhythm: rhythmB,
        reverseRhythmDirection: true,
        flipRotationAngle: false,
        baseCircleTranslation: {
          ...rootCircle.center,
          y: rootCircle.center.y - 10,
        },
        getBaseCircleCenterCosineAngle: (waveSample) =>
          Math.PI / 2.5 + (Math.PI / 2) * waveSample,
        getBaseCircleSineAngle: (waveSample) =>
          Math.PI / 2.5 + (Math.PI / 5) * waveSample,
        getBaseCircleRadius: (adjustedTimeSample) => 4 * adjustedTimeSample,
      }),
      leftBaseLoops: getWaveLoops({
        rootCircle,
        spacerRhythm: rhythmB,
        reverseRhythmDirection: true,
        flipRotationAngle: true,
        baseCircleTranslation: {
          ...rootCircle.center,
          y: rootCircle.center.y - 10,
        },
        getBaseCircleCenterCosineAngle: (waveSample) =>
          -Math.PI / 2.5 - (Math.PI / 2) * waveSample + Math.PI,
        getBaseCircleSineAngle: (waveSample) =>
          -Math.PI / 2.5 - (Math.PI / 5) * waveSample + Math.PI,
        getBaseCircleRadius: (adjustedTimeSample) => 4 * adjustedTimeSample,
      }),
      getNestLoops: ({
        globalSide,
        rotatedLoop,
        rhythmIndex,
      }: GetNestLoopsApi) => {
        const {
          rhythmDensity,
          rhythmPhase,
          nestTranslation,
          strokeWidth = 0.15,
        } = rhythmIndex === 8
          ? {
              rhythmDensity: 7,
              rhythmPhase: 0,
              strokeWidth: 0.125,
              nestTranslation: {
                x: -0.015,
                y: -0.02,
              },
            }
          : rhythmIndex === 6
          ? {
              rhythmDensity: 7,
              rhythmPhase: 0,
              nestTranslation: {
                x: -0.02,
                y: -0.02,
              },
            }
          : rhythmIndex === 3
          ? {
              rhythmDensity: 7,
              rhythmPhase: 0,
              nestTranslation: {
                x: -0.0375,
                y: -0.01,
              },
            }
          : rhythmIndex === 1
          ? {
              rhythmDensity: 7,
              rhythmPhase: 0,
              nestTranslation: {
                x: 0.03,
                y: 0.015,
              },
            }
          : {
              rhythmDensity: 7,
              rhythmPhase: 0,
              nestTranslation: {
                x: -0.03,
                y: -0.02,
              },
            }
        const nestRhythm = getFilteredRhythm({
          rhythmSequence: [
            getNaturalRhythm({
              rhythmResolution: 24,
              rhythmDensity: 23,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 23,
              rhythmDensity: 13,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 13,
              rhythmDensity: 12,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 12,
              rhythmDensity: rhythmDensity,
              rhythmPhase: rhythmPhase,
            }),
          ],
        })
        const nestIndices = getElementIndices({
          targetValue: true,
          someSpace: nestRhythm,
        })
        return nestIndices.map((nestIndex, colorIndex) => {
          return {
            strokeWidth,
            rotatedLoop: getUpdatedData({
              baseData: rotatedLoop,
              dataUpdates: {
                'baseCircle.radius': (baseValue: number) =>
                  (baseValue * (nestRhythm.length - nestIndex)) /
                  nestRhythm.length,
                'baseCircle.center.x': (
                  baseValue: number,
                  rootValue: RotatedLoop
                ) =>
                  baseValue +
                  (2 * (-rhythmIndex % 2) + 1) *
                    (globalSide === 'left'
                      ? -nestTranslation.x
                      : nestTranslation.x) *
                    rootValue.baseCircle.radius *
                    nestIndex,
                'baseCircle.center.y': (
                  baseValue: number,
                  rootValue: RotatedLoop
                ) =>
                  baseValue +
                  (-2 * (rhythmIndex % 2) + 1) *
                    -nestTranslation.y *
                    rootValue.baseCircle.radius *
                    nestIndex,
              },
            }),
            strokeColor: (rhythmIndex === 8 ? colorsB : reversedColorsA)[
              colorIndex
            ],
          }
        })
      },
    },
  }
  const topLoopA: RotatedLoop = {
    baseCircle: {
      center: {
        x: 50,
        y: -2,
      },
      radius: 6,
    },
    childCircle: {
      relativeRadius: 3 / 4,
      relativeDepth: 7 / 8,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2,
  }
  const topLoopB: RotatedLoop = {
    baseCircle: {
      center: {
        x: 50,
        y: 18,
      },
      radius: 3,
    },
    childCircle: {
      relativeRadius: 0.875,
      relativeDepth: 0.875,
      phaseAngle: Math.PI / 2,
    },
    rotationAnchor: 'base',
    rotationAngle: 0,
  }
  const rightWingLoopA: RotatedLoop = {
    baseCircle: {
      center: {
        x: 84,
        y: 58,
      },
      radius: 9,
    },
    childCircle: {
      relativeRadius: 5 / 12,
      relativeDepth: 7 / 12,
      phaseAngle: Math.PI / 3,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI + Math.PI / 7,
  }
  const leftLoopA = getUpdatedData({
    baseData: rightWingLoopA,
    dataUpdates: {
      'baseCircle.center.x': (baseValue: number) => 50 + (50 - baseValue),
      'childCircle.phaseAngle': -Math.PI / 3,
      rotationAngle: -Math.PI / 7,
    },
  })
  const rightShoulderLoopA: RotatedLoop = {
    baseCircle: {
      center: {
        x: 71.5,
        y: 40,
      },
      radius: 5,
    },
    childCircle: {
      relativeRadius: 7 / 13,
      relativeDepth: 0.5,
      phaseAngle: Math.PI - Math.PI / 5,
    },
    rotationAnchor: 'base',
    rotationAngle: -Math.PI / 3.5,
  }
  const leftShoulderLoopA = getUpdatedData({
    baseData: rightShoulderLoopA,
    dataUpdates: {
      'baseCircle.center.x': (baseValue: number) => 50 + (50 - baseValue),
      'childCircle.phaseAngle': Math.PI + Math.PI / 5,
      rotationAngle: Math.PI / 3.5 + Math.PI,
    },
  })
  const rightKneeLoopA: RotatedLoop = {
    baseCircle: {
      center: {
        x: 50 + 4 + 12.5,
        y: 69,
      },
      radius: 5,
    },
    childCircle: {
      relativeRadius: 6 / 8,
      relativeDepth: 11 / 12,
      phaseAngle: Math.PI / 3,
    },
    rotationAnchor: 'base',
    rotationAngle: -Math.PI / 2 + Math.PI / 4,
  }
  const leftKneeLoopA = getUpdatedData({
    baseData: rightKneeLoopA,
    dataUpdates: {
      'baseCircle.center.x': (baseValue: number) => 50 - 4 - 12.5,
      'childCircle.phaseAngle': -Math.PI / 3,
      rotationAngle: -Math.PI / 2 - Math.PI / 4,
    },
  })
  const rightEarLoop: RotatedLoop = {
    baseCircle: {
      center: {
        x: 90,
        y: 22,
      },
      radius: 7,
    },
    childCircle: {
      relativeRadius: 7 / 12,
      relativeDepth: 9 / 12,
      phaseAngle: Math.PI / 3,
    },
    rotationAnchor: 'base',
    rotationAngle: -Math.PI / 5,
  }
  const leftEarLoop = getUpdatedData({
    baseData: rightEarLoop,
    dataUpdates: {
      'baseCircle.center.x': (baseValue: number) => 50 + (50 - baseValue),
      'childCircle.phaseAngle': -Math.PI / 3,
      rotationAngle: Math.PI + Math.PI / 5,
    },
  })
  const decorationLoops: {
    rotatedLoop: RotatedLoop
    strokeColor: string | undefined
    strokeWidth?: number | undefined
  }[] = [
    {
      key: 'topTop',
      rotatedLoop: topLoopA,
    },
    {
      key: 'midTop',
      rotatedLoop: topLoopB,
    },
    {
      key: 'rightWing',
      rotatedLoop: rightWingLoopA,
    },
    {
      key: 'leftWing',
      rotatedLoop: leftLoopA,
    },
    {
      key: 'rightShoulder',
      rotatedLoop: rightShoulderLoopA,
    },
    {
      key: 'leftShoulder',
      rotatedLoop: leftShoulderLoopA,
    },
    {
      key: 'rightKnee',
      rotatedLoop: rightKneeLoopA,
    },
    {
      key: 'leftKnee',
      rotatedLoop: leftKneeLoopA,
    },
    {
      key: 'rightEar',
      rotatedLoop: rightEarLoop,
    },
    {
      key: 'leftEar',
      rotatedLoop: leftEarLoop,
    },
  ]
    .map(({ key, rotatedLoop }, someIndex) => {
      const decorationIndex = Math.floor(someIndex / 2)
      switch (key) {
        case 'topTop':
          return getDefaultDecorationNest({
            rotatedLoop,
            colorSequence: reversedColorsA,
            nestTranslation: { x: 0, y: -0.125 },
            nestRhythm: getFilteredRhythm({
              rhythmSequence: [
                getNaturalRhythm({
                  rhythmResolution: 24,
                  rhythmDensity: 23,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 23,
                  rhythmDensity: 13,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 13,
                  rhythmDensity: 12,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 12,
                  rhythmDensity: 7,
                  rhythmPhase: 5,
                }),
              ],
            }),
          })
        case 'midTop':
          return getDefaultDecorationNest({
            rotatedLoop,
            colorSequence: colorsB,
            nestTranslation: { x: -0.0, y: 0.06 },
            nestRhythm: getFilteredRhythm({
              rhythmSequence: [
                getNaturalRhythm({
                  rhythmResolution: 24,
                  rhythmDensity: 23,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 23,
                  rhythmDensity: 13,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 13,
                  rhythmDensity: 12,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 12,
                  rhythmDensity: 7,
                  rhythmPhase: 0,
                }),
              ],
            }),
          })
        case 'leftEar':
        case 'rightEar':
          return getDefaultDecorationNest({
            rotatedLoop,
            colorSequence: reversedColorsB,
            nestTranslation:
              key === 'leftEar'
                ? { x: -0.15, y: -0.15 }
                : { x: 0.15, y: -0.15 },
            nestRhythm: getFilteredRhythm({
              rhythmSequence: [
                getNaturalRhythm({
                  rhythmResolution: 24,
                  rhythmDensity: 23,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 23,
                  rhythmDensity: 13,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 13,
                  rhythmDensity: 12,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 12,
                  rhythmDensity: 7,
                  rhythmPhase: 4,
                }),
              ],
            }),
          })
        case 'leftShoulder':
        case 'rightShoulder':
          return getDefaultDecorationNest({
            rotatedLoop,
            colorSequence: reversedColorsB,
            nestTranslation:
              key === 'leftShoulder'
                ? { x: 0.125, y: 0.1 }
                : { x: -0.125, y: 0.1 },
            nestRhythm: getFilteredRhythm({
              rhythmSequence: [
                getNaturalRhythm({
                  rhythmResolution: 24,
                  rhythmDensity: 23,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 23,
                  rhythmDensity: 13,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 13,
                  rhythmDensity: 12,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 12,
                  rhythmDensity: 7,
                  rhythmPhase: 5,
                }),
              ],
            }),
          })
        case 'leftWing':
        case 'rightWing':
          return getDefaultDecorationNest({
            rotatedLoop,
            colorSequence: reversedColorsA,
            nestTranslation:
              key === 'leftWing'
                ? {
                    x: 0.125,
                    y: -0.175,
                  }
                : {
                    x: -0.125,
                    y: -0.175,
                  },
            nestRhythm: getFilteredRhythm({
              rhythmSequence: [
                getNaturalRhythm({
                  rhythmResolution: 24,
                  rhythmDensity: 23,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 23,
                  rhythmDensity: 13,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 13,
                  rhythmDensity: 12,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 12,
                  rhythmDensity: 7,
                  rhythmPhase: 4,
                }),
              ],
            }),
          })
        case 'leftKnee':
        case 'rightKnee':
          return getDefaultDecorationNest({
            rotatedLoop,
            colorSequence: reversedColorsB,
            nestTranslation:
              key === 'leftKnee'
                ? { x: -0.12, y: -0.125 }
                : { x: 0.12, y: -0.125 },
            nestRhythm: getFilteredRhythm({
              rhythmSequence: [
                getNaturalRhythm({
                  rhythmResolution: 24,
                  rhythmDensity: 23,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 23,
                  rhythmDensity: 13,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 13,
                  rhythmDensity: 12,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 12,
                  rhythmDensity: 7,
                  rhythmPhase: 0,
                }),
              ],
            }),
          })
        default:
          return getDefaultDecorationNest({
            rotatedLoop,
            colorSequence: colorsB,
            nestTranslation: { x: 0, y: 0 },
            nestRhythm: getFilteredRhythm({
              rhythmSequence: [
                getNaturalRhythm({
                  rhythmResolution: 24,
                  rhythmDensity: 13,
                  rhythmPhase: 0,
                }),
                getNaturalRhythm({
                  rhythmResolution: 13,
                  rhythmDensity: 7,
                  rhythmPhase: decorationIndex,
                }),
              ],
            }),
          })
      }
    })
    .flat()
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
      {/* <line
        x1={50}
        y1={0}
        x2={50}
        y2={100}
        stroke={'white'}
        strokeWidth={0.125}
      /> */}
      <g transform={'translate(0, 7)'}>
        {Object.values(waveGroups)
          .map((someWaveGroup) => {
            return [
              ...someWaveGroup.leftBaseLoops.map(
                ({ rotatedLoop, rhythmIndex }) =>
                  someWaveGroup.getNestLoops({
                    rotatedLoop,
                    rhythmIndex,
                    globalSide: 'left',
                  })
              ),
              ...someWaveGroup.rightBaseLoops.map(
                ({ rotatedLoop, rhythmIndex }) =>
                  someWaveGroup.getNestLoops({
                    rotatedLoop,
                    rhythmIndex,
                    globalSide: 'right',
                  })
              ),
            ]
          })
          .flat()
          .flat()
          .map(({ rotatedLoop, strokeColor, strokeWidth = 0.2 }: any) => (
            <Polygon
              points={getOscillatedRotatedLoopPoints({
                sampleCount: 256,
                oscillatedRotatedLoop: {
                  ...rotatedLoop,
                  getRelativeOscillation: () => 0,
                  // getRelativeOscillation: () => Math.random() / 24,
                },
              })}
              fill={'none'}
              stroke={strokeColor}
              strokeWidth={0.2}
            />
          ))}
        {decorationLoops.map(({ rotatedLoop, strokeColor }) => (
          <Polygon
            points={getOscillatedRotatedLoopPoints({
              sampleCount: 256,
              oscillatedRotatedLoop: {
                ...rotatedLoop,
                getRelativeOscillation: () => 0,
                // getRelativeOscillation: () => Math.random() / 24,
              },
            })}
            fill={'none'}
            stroke={strokeColor}
            strokeWidth={0.2}
          />
        ))}
      </g>
    </svg>
  )
}

interface PolygonPolygonProps
  extends Pick<SVGProps<SVGPolygonElement>, 'fill' | 'stroke' | 'strokeWidth'> {
  points: Point[]
}

function Polygon(props: PolygonPolygonProps) {
  const { points, ...polygonProps } = props
  return (
    <polygon
      {...polygonProps}
      strokeLinejoin={'round'}
      points={points
        .map((polygonPoint) => `${polygonPoint.x},${polygonPoint.y}`)
        .join(' ')}
    />
  )
}

interface GetWaveLoopsApi {
  // getBaseWaveSample: (adjustedTimeSample: number) => number
  getBaseCircleCenterCosineAngle: (waveSample: number) => number
  getBaseCircleSineAngle: (waveSample: number) => number
  getBaseCircleRadius: (adjustedTimeSample: number) => number
  spacerRhythm: DiscreteRhythm
  rootCircle: Circle
  reverseRhythmDirection: boolean
  flipRotationAngle: boolean
  baseCircleTranslation: Point
}

function getWaveLoops(api: GetWaveLoopsApi): {
  rotatedLoop: RotatedLoop
  rhythmIndex: number
}[] {
  const {
    spacerRhythm,
    rootCircle,
    baseCircleTranslation,
    reverseRhythmDirection,
    getBaseCircleCenterCosineAngle,
    getBaseCircleSineAngle,
    getBaseCircleRadius,
    flipRotationAngle,
  } = api
  const rhythmIndices = getElementIndices({
    targetValue: true,
    someSpace: spacerRhythm,
  })
  const loopA: RotatedLoop = {
    baseCircle: { center: { x: 0, y: 0 }, radius: 1 },
    childCircle: {
      relativeRadius: 3 / 8,
      relativeDepth: 2 / 8,
      phaseAngle: (2 * Math.PI) / 2,
    },
    rotationAnchor: 'base',
    rotationAngle: (2 * Math.PI) / 1,
  }
  const childCircleA = getLoopChildCircle({
    someLoop: loopA,
  })
  const loopPointsA = getRotatedLoopPoints({
    sampleCount: 256,
    someRotatedLoop: loopA,
  })
  return rhythmIndices
    .map((rhythmIndex) => {
      return {
        rhythmIndex,
        timeSample: rhythmIndex / spacerRhythm.length,
      }
    })
    .map(({ timeSample, rhythmIndex }) => {
      const adjustedTimeSample = reverseRhythmDirection
        ? 1 - timeSample
        : timeSample
      const waveSample =
        getTracePoint({
          somePoints: loopPointsA,
          traceAngle: 2 * Math.PI * adjustedTimeSample,
          originPoint: childCircleA.center,
        }).y - childCircleA.center.y
      const polyBaseCenter = {
        x:
          rootCircle.radius *
            adjustedTimeSample *
            Math.cos(getBaseCircleCenterCosineAngle(waveSample)) +
          baseCircleTranslation.x,
        y:
          rootCircle.radius *
            adjustedTimeSample *
            Math.sin(getBaseCircleSineAngle(waveSample)) +
          baseCircleTranslation.y,
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyBaseCenter.x - rootCircle.center.x,
        polyBaseCenter.y - rootCircle.center.y
      )
      return {
        rhythmIndex,
        rotatedLoop: {
          baseCircle: {
            radius: getBaseCircleRadius(adjustedTimeSample),
            center: polyBaseCenter,
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: polyBaseRelativeAngle * timeSample,
          },
          rotationAnchor: 'base',
          rotationAngle:
            polyBaseRelativeAngle * timeSample +
            (flipRotationAngle ? Math.PI : 0),
        },
      }
    })
}

interface GetDefaultDecorationNestApi {
  rotatedLoop: RotatedLoop
  nestTranslation: Point
  nestRhythm: DiscreteRhythm
  colorSequence: string[]
}

function getDefaultDecorationNest(api: GetDefaultDecorationNestApi) {
  const { nestRhythm, rotatedLoop, nestTranslation, colorSequence } = api
  const nestIndices = getElementIndices({
    targetValue: true,
    someSpace: nestRhythm,
  })
  return nestIndices.map((nestIndex, sequenceIndex) => {
    return {
      rotatedLoop: getUpdatedData({
        baseData: rotatedLoop,
        dataUpdates: {
          'baseCircle.center': (baseValue: Point) => ({
            x: baseValue.x + nestTranslation.x * nestIndex,
            y: baseValue.y + nestTranslation.y * nestIndex,
          }),
          'baseCircle.radius': (baseValue: number) =>
            (baseValue * (nestRhythm.length - nestIndex)) / nestRhythm.length,
        },
      }),
      strokeColor: colorSequence[sequenceIndex % colorSequence.length],
    }
  })
}
