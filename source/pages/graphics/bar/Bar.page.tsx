import { getUpdatedData } from '../../../library/getUpdatedData'
import React, { SVGProps } from 'react'
import {
  Circle,
  getLoopChildCircle,
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
  const waveLoopsSet = {
    a: getWaveLoops({
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
    b: getWaveLoops({
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
    c: getWaveLoops({
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
    d: getWaveLoops({
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
    e: getWaveLoops({
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
    f: getWaveLoops({
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
    g: getWaveLoops({
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
    h: getWaveLoops({
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
        x: 66.5,
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
    rotationAngle: -Math.PI / 2 + Math.PI / 6,
  }
  const leftKneeLoopA = getUpdatedData({
    baseData: rightKneeLoopA,
    dataUpdates: {
      'baseCircle.center.x': (baseValue: number) => 50 + (50 - baseValue),
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
      <rect x={-10} y={-10} width={120} height={120} fill={'lightgrey'} />
      <g transform={'translate(0, 7)'}>
        {Object.values(waveLoopsSet)
          .flat()
          .map(({ someRotatedLoop }) => (
            <Polygon
              points={getRotatedLoopPoints({
                sampleCount: 256,
                someRotatedLoop: someRotatedLoop,
              })}
              fill={'none'}
              stroke={'black'}
              strokeWidth={0.125}
            />
          ))}
        <Polygon
          points={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: topLoopA,
          })}
          fill={'none'}
          stroke={'black'}
          strokeWidth={0.125}
        />
        <Polygon
          points={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: topLoopB,
          })}
          fill={'none'}
          stroke={'black'}
          strokeWidth={0.125}
        />
        <Polygon
          points={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: rightEarLoop,
          })}
          fill={'none'}
          stroke={'black'}
          strokeWidth={0.125}
        />
        <Polygon
          points={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: rightWingLoopA,
          })}
          fill={'none'}
          stroke={'black'}
          strokeWidth={0.125}
        />
        <Polygon
          points={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: rightShoulderLoopA,
          })}
          fill={'none'}
          stroke={'black'}
          strokeWidth={0.125}
        />
        <Polygon
          points={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: leftLoopA,
          })}
          fill={'none'}
          stroke={'black'}
          strokeWidth={0.125}
        />
        <Polygon
          points={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: leftShoulderLoopA,
          })}
          fill={'none'}
          stroke={'black'}
          strokeWidth={0.125}
        />
        <Polygon
          points={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: rightKneeLoopA,
          })}
          fill={'none'}
          stroke={'black'}
          strokeWidth={0.125}
        />
        <Polygon
          points={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: leftKneeLoopA,
          })}
          fill={'none'}
          stroke={'black'}
          strokeWidth={0.125}
        />
        <Polygon
          points={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: leftEarLoop,
          })}
          fill={'none'}
          stroke={'black'}
          strokeWidth={0.125}
        />
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

function getWaveLoops(
  api: GetWaveLoopsApi
): { someRotatedLoop: RotatedLoop }[] {
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
    .map((someRhythmIndex) => someRhythmIndex / spacerRhythm.length)
    .map((timeSample) => {
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
        someRotatedLoop: {
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
