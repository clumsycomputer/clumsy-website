import { getUpdatedData } from '../../../library/getUpdatedData'
import React, { SVGProps } from 'react'
import {
  getLoopChildCircle,
  getRotatedLoopChildCircle,
  getRotatedLoopPoints,
  getTracePoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import {
  getElementIndices,
  getFilteredRhythm,
  getNaturalRhythm,
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
  const waveSamplesA = new Array(loopPointsA.length).fill(undefined).map(
    (_, sampleIndex) =>
      getTracePoint({
        somePoints: loopPointsA,
        traceAngle: ((2 * Math.PI) / loopPointsA.length) * sampleIndex,
        originPoint: childCircleA.center,
      }).y - childCircleA.center.y
  )
  const loopB: RotatedLoop = {
    baseCircle: {
      center: { x: 50, y: 50 },
      radius: 6,
    },
    childCircle: {
      relativeRadius: 5 / 8,
      relativeDepth: 7 / 8,
      phaseAngle: ((2 * Math.PI) / 8) * 1.75,
    },
    rotationAnchor: 'base',
    rotationAngle: (2 * Math.PI) / 11,
  }
  const childCircleB = getRotatedLoopChildCircle({
    someRotatedLoop: loopB,
  })
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
  const spacersA = getElementIndices({
    targetValue: true,
    someSpace: rhythmA,
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
  const spacersB = getElementIndices({
    targetValue: true,
    someSpace: rhythmB,
  })
  const centerPoints = spacersA
    .map((someSpacer) => someSpacer / rhythmA.length)
    .map((timePoint) => {
      const waveSample =
        getTracePoint({
          somePoints: loopPointsA,
          traceAngle: 2 * Math.PI * timePoint,
          originPoint: childCircleA.center,
        }).y - childCircleA.center.y
      const currentRadius = 50
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 5 * timePoint,
            center: {
              x:
                currentRadius *
                  timePoint *
                  Math.cos(-Math.PI / 2.5 + (Math.PI / 2) * waveSample) +
                50,
              y:
                currentRadius *
                  timePoint *
                  Math.sin(-Math.PI / 2.5 + (Math.PI / 3) * waveSample) +
                50,
            },
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: 2 * Math.PI * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: 2 * Math.PI * timePoint - 2 * Math.PI * timePoint,
        } as RotatedLoop,
      }
    })
  const fooPoints = spacersB
    .map((someSpacer) => someSpacer / rhythmB.length)
    .map((timePoint) => {
      const waveSample =
        getTracePoint({
          somePoints: loopPointsA,
          traceAngle: 2 * Math.PI * (1 - timePoint),
          originPoint: childCircleA.center,
        }).y - childCircleA.center.y
      const currentRadius = 50
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 4 * (1 - timePoint),
            center: {
              x:
                currentRadius *
                  (1 - timePoint) *
                  Math.cos(-Math.PI / 2.5 - (Math.PI / 2) * waveSample) +
                50,
              y:
                currentRadius *
                  (1 - timePoint) *
                  Math.sin(-Math.PI / 2.5 - (Math.PI / 5) * waveSample) +
                50,
            },
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: 2 * Math.PI * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: 2 * Math.PI * timePoint - 2 * Math.PI * timePoint,
        } as RotatedLoop,
      }
    })
  const barPoints = spacersB
    .map((someSpacer) => someSpacer / rhythmB.length)
    .map((timePoint) => {
      const waveSample =
        getTracePoint({
          somePoints: loopPointsA,
          traceAngle: 2 * Math.PI * (1 - timePoint),
          originPoint: childCircleA.center,
        }).y - childCircleA.center.y
      const currentRadius = 50
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 4 * (1 - timePoint),
            center: {
              x:
                currentRadius *
                  (1 - timePoint) *
                  Math.cos(Math.PI / 2.5 + (Math.PI / 2) * waveSample) +
                50,
              y:
                currentRadius *
                  (1 - timePoint) *
                  Math.sin(Math.PI / 2.5 + (Math.PI / 5) * waveSample) +
                40,
            },
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: 2 * Math.PI * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: 2 * Math.PI * timePoint - 2 * Math.PI * timePoint,
        } as RotatedLoop,
      }
    })
  const marPoints = spacersA
    .map((someSpacer) => someSpacer / rhythmA.length)
    .map((timePoint) => {
      const waveSample =
        getTracePoint({
          somePoints: loopPointsA,
          traceAngle: 2 * Math.PI * timePoint,
          originPoint: childCircleA.center,
        }).y - childCircleA.center.y
      const currentRadius = 50
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 5 * timePoint,
            center: {
              x:
                currentRadius *
                  timePoint *
                  Math.cos(
                    Math.PI / 2.5 - (Math.PI / 2) * waveSample + Math.PI / 2
                  ) +
                50,
              y:
                currentRadius *
                  timePoint *
                  Math.sin(
                    Math.PI / 2.5 - (Math.PI / 3) * waveSample + Math.PI / 2
                  ) +
                40,
            },
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: 2 * Math.PI * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: 2 * Math.PI * timePoint - 2 * Math.PI * timePoint,
        } as RotatedLoop,
      }
    })
  const ruePoints = spacersA
    .map((someSpacer) => someSpacer / rhythmA.length)
    .map((timePoint) => {
      const waveSample =
        getTracePoint({
          somePoints: loopPointsA,
          traceAngle: 2 * Math.PI * timePoint,
          originPoint: childCircleA.center,
        }).y - childCircleA.center.y
      const currentRadius = 50
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 5 * timePoint,
            center: {
              x:
                currentRadius *
                  timePoint *
                  Math.cos(
                    -Math.PI / 2.5 + (Math.PI / 2) * waveSample + Math.PI / 2
                  ) +
                50,
              y:
                currentRadius *
                  timePoint *
                  Math.sin(
                    -Math.PI / 2.5 + (Math.PI / 3) * waveSample + Math.PI / 2
                  ) +
                40,
            },
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: 2 * Math.PI * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: 2 * Math.PI * timePoint - 2 * Math.PI * timePoint,
        } as RotatedLoop,
      }
    })
  const cuePoints = spacersB
    .map((someSpacer) => someSpacer / rhythmB.length)
    .map((timePoint) => {
      const waveSample =
        getTracePoint({
          somePoints: loopPointsA,
          traceAngle: 2 * Math.PI * (1 - timePoint),
          originPoint: childCircleA.center,
        }).y - childCircleA.center.y
      const currentRadius = 50
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 4 * (1 - timePoint),
            center: {
              x:
                currentRadius *
                  (1 - timePoint) *
                  Math.cos(
                    -Math.PI / 2.5 - (Math.PI / 2) * waveSample + Math.PI
                  ) +
                50,
              y:
                currentRadius *
                  (1 - timePoint) *
                  Math.sin(
                    -Math.PI / 2.5 - (Math.PI / 5) * waveSample + Math.PI
                  ) +
                40,
            },
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: 2 * Math.PI * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: 2 * Math.PI * timePoint - 2 * Math.PI * timePoint,
        } as RotatedLoop,
      }
    })
  const shoePoints = spacersB
    .map((someSpacer) => someSpacer / rhythmB.length)
    .map((timePoint) => {
      const waveSample =
        getTracePoint({
          somePoints: loopPointsA,
          traceAngle: 2 * Math.PI * (1 - timePoint),
          originPoint: childCircleA.center,
        }).y - childCircleA.center.y
      const currentRadius = 50
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 4 * (1 - timePoint),
            center: {
              x:
                currentRadius *
                  (1 - timePoint) *
                  Math.cos(
                    Math.PI / 2.5 + (Math.PI / 2) * waveSample + Math.PI
                  ) +
                50,
              y:
                currentRadius *
                  (1 - timePoint) *
                  Math.sin(
                    Math.PI / 2.5 + (Math.PI / 5) * waveSample + Math.PI
                  ) +
                50,
            },
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: 2 * Math.PI * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: 2 * Math.PI * timePoint - 2 * Math.PI * timePoint,
        } as RotatedLoop,
      }
    })
  const dooPoints = spacersA
    .map((someSpacer) => someSpacer / rhythmA.length)
    .map((timePoint) => {
      const waveSample =
        getTracePoint({
          somePoints: loopPointsA,
          traceAngle: 2 * Math.PI * timePoint,
          originPoint: childCircleA.center,
        }).y - childCircleA.center.y
      const currentRadius = 50
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 5 * timePoint,
            center: {
              x:
                currentRadius *
                  timePoint *
                  Math.cos(
                    Math.PI / 2.5 - (Math.PI / 2) * waveSample + Math.PI
                  ) +
                50,
              y:
                currentRadius *
                  timePoint *
                  Math.sin(
                    Math.PI / 2.5 - (Math.PI / 3) * waveSample + Math.PI
                  ) +
                50,
            },
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: 2 * Math.PI * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: 2 * Math.PI * timePoint - 2 * Math.PI * timePoint,
        } as RotatedLoop,
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
      <rect x={-10} y={-10} width={120} height={120} fill={'lightgrey'} />
      {/* <polyline
        points={waveSamplesA
          .map((waveSample, sampleIndex) => {
            const currentRadius = 60 / waveSamplesA.length
            return {
              x:
                currentRadius *
                  sampleIndex *
                  Math.cos(-Math.PI / 2.5 + (Math.PI / 2) * waveSample) +
                50,
              y:
                currentRadius *
                  sampleIndex *
                  Math.sin(-Math.PI / 2.5 + (Math.PI / 3) * waveSample) +
                50,
            }
          })
          .map((point) => {
            return `${point.x},${point.y}`
          })
          .join(' ')}
        fill={'none'}
        stroke={'black'}
        strokeWidth={0.125}
      />
      <polyline
        points={waveSamplesA
          .map((waveSample, sampleIndex) => {
            const currentRadius = 60 / waveSamplesA.length
            return `${
              currentRadius *
                sampleIndex *
                Math.cos(-Math.PI / 2.5 - (Math.PI / 2) * waveSample) +
              50
            },${
              currentRadius *
                sampleIndex *
                Math.sin(-Math.PI / 2.5 - (Math.PI / 5) * waveSample) +
              50
            }`
          })
          .join(' ')}
        fill={'none'}
        stroke={'black'}
        strokeWidth={0.125}
      />
      <Polygon
        points={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: getUpdatedData({
            baseData: loopB,
            dataUpdates: {
              'baseCircle.center': (baseCircleCenter: Point) => ({
                x: baseCircleCenter.x + (50 - childCircleB.center.x),
                y: baseCircleCenter.y + (50 - childCircleB.center.y),
              }),
            },
          }),
        })}
        fill={'none'}
        stroke={'black'}
        strokeWidth={0.125}
      /> */}
      {centerPoints.map(({ someRotatedLoop }) => (
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
      {fooPoints.map(({ someRotatedLoop }) => (
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
      {barPoints.map(({ someRotatedLoop }) => (
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
      {marPoints.map(({ someRotatedLoop }) => (
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
      {ruePoints.map(({ someRotatedLoop }) => (
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
      {cuePoints.map(({ someRotatedLoop }) => (
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
      {shoePoints.map(({ someRotatedLoop }) => (
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
      {dooPoints.map(({ someRotatedLoop }) => (
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
