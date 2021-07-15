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
      const polyBaseCenter = {
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
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyBaseCenter.x - 50,
        polyBaseCenter.y - 50
      )
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 5 * timePoint,
            center: polyBaseCenter,
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: polyBaseRelativeAngle * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: polyBaseRelativeAngle * timePoint,
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
      const polyBaseCenter = {
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
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyBaseCenter.x - 50,
        polyBaseCenter.y - 50
      )
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 4 * (1 - timePoint),
            center: polyBaseCenter,
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: polyBaseRelativeAngle * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: polyBaseRelativeAngle * timePoint,
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
      const polyBaseCenter = {
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
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyBaseCenter.x - 50,
        polyBaseCenter.y - 50
      )
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 4 * (1 - timePoint),
            center: polyBaseCenter,
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: polyBaseRelativeAngle * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: polyBaseRelativeAngle * timePoint,
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
      const polyBaseCenter = {
        x:
          currentRadius *
            timePoint *
            Math.cos(Math.PI / 2.5 - (Math.PI / 2) * waveSample + Math.PI / 2) +
          50,
        y:
          currentRadius *
            timePoint *
            Math.sin(Math.PI / 2.5 - (Math.PI / 3) * waveSample + Math.PI / 2) +
          40,
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyBaseCenter.x - 50,
        polyBaseCenter.y - 50
      )
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 5 * timePoint,
            center: polyBaseCenter,
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: polyBaseRelativeAngle * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: polyBaseRelativeAngle * timePoint,
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
      const polyBaseCenter = {
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
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyBaseCenter.x - 50,
        polyBaseCenter.y - 50
      )
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 5 * timePoint,
            center: polyBaseCenter,
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: polyBaseRelativeAngle * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: polyBaseRelativeAngle * timePoint + Math.PI,
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
      const polyBaseCenter = {
        x:
          currentRadius *
            (1 - timePoint) *
            Math.cos(-Math.PI / 2.5 - (Math.PI / 2) * waveSample + Math.PI) +
          50,
        y:
          currentRadius *
            (1 - timePoint) *
            Math.sin(-Math.PI / 2.5 - (Math.PI / 5) * waveSample + Math.PI) +
          40,
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyBaseCenter.x - 50,
        polyBaseCenter.y - 50
      )
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 4 * (1 - timePoint),
            center: polyBaseCenter,
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: polyBaseRelativeAngle * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: polyBaseRelativeAngle * timePoint + Math.PI,
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
      const polyBaseCenter = {
        x:
          currentRadius *
            (1 - timePoint) *
            Math.cos(Math.PI / 2.5 + (Math.PI / 2) * waveSample + Math.PI) +
          50,
        y:
          currentRadius *
            (1 - timePoint) *
            Math.sin(Math.PI / 2.5 + (Math.PI / 5) * waveSample + Math.PI) +
          50,
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyBaseCenter.x - 50,
        polyBaseCenter.y - 50
      )
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 4 * (1 - timePoint),
            center: polyBaseCenter,
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: polyBaseRelativeAngle * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: polyBaseRelativeAngle * timePoint + Math.PI,
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
      const polyBaseCenter = {
        x:
          currentRadius *
            timePoint *
            Math.cos(Math.PI / 2.5 - (Math.PI / 2) * waveSample + Math.PI) +
          50,
        y:
          currentRadius *
            timePoint *
            Math.sin(Math.PI / 2.5 - (Math.PI / 3) * waveSample + Math.PI) +
          50,
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyBaseCenter.x - 50,
        polyBaseCenter.y - 50
      )
      return {
        someRotatedLoop: {
          baseCircle: {
            radius: 5 * timePoint,
            center: polyBaseCenter,
          },
          childCircle: {
            relativeRadius: 7 / 8,
            relativeDepth: 7 / 8,
            phaseAngle: polyBaseRelativeAngle * timePoint,
          },
          rotationAnchor: 'base',
          rotationAngle: polyBaseRelativeAngle * timePoint + Math.PI,
        } as RotatedLoop,
      }
    })
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
  const centerLoop: RotatedLoop = {
    baseCircle: {
      center: {
        x: 50,
        y: 41,
      },
      radius: 1.25,
    },
    childCircle: {
      relativeRadius: 1,
      relativeDepth: 0,
      phaseAngle: Math.PI / 2,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI,
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
        {/* <Polygon
        points={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: centerLoop,
        })}
        fill={'none'}
        stroke={'black'}
        strokeWidth={0.125}
      /> */}
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
