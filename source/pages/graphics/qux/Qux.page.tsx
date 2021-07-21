import React from 'react'
import {
  Circle,
  getMirroredRotatedLoop,
  getRotatedLoopPoint,
  getRotatedLoopPoints,
  getTracePoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { Polygon } from '../../../library/components/Polygon'
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
    getCellResult: ({ rhythmResolution, rhythmIndex }) => {
      const angleA = (Math.PI / rhythmResolution) * rhythmIndex - Math.PI / 2
      const pointA = getTracePoint({
        somePoints: getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: rootLoop,
        }),
        originPoint: rootCircle.center,
        traceAngle: angleA,
      })
      const pointB = getTracePoint({
        somePoints: getRotatedLoopPoints({
          sampleCount: 256,
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
          const lineAngle = Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x)
          const lineLength = Math.sqrt(
            Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
          )
          // const cellRadius =
          //   lineLength - (lineLength / rhythmResolution) * rhythmIndex
          const cellRadius = (lineLength / rhythmResolution) * rhythmIndex
          const newBaseCircleCenter = {
            x: cellRadius * Math.cos(lineAngle) + pointA.x,
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
          return {
            rotatedLoop: {
              baseCircle: {
                radius: 1.25 * Math.log(distanceFromRootCenter),
                // radius: 3,
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
    ...coreLoops.map((somePolygonStruff) => ({
      ...somePolygonStruff,
      rotatedLoop: getMirroredRotatedLoop({
        mirrorAngle: Math.PI / 2,
        originPoint: rootCircle.center,
        baseLoop: somePolygonStruff.rotatedLoop,
      }),
    })),
  ]
  const fooLoops = baseLoops.map(({ rotatedLoop }) => rotatedLoop)
  const conflictingLoopGroups = fooLoops.reduce<Array<Array<RotatedLoop>>>(
    (result, someLoop) => {
      if (
        result
          .flat()
          .findIndex(
            (someConflictingLoop) => someConflictingLoop === someLoop
          ) !== -1
      )
        return result
      const currentConflictingLoops = getConflictingRotatedLoops({
        currentLoop: someLoop,
        remainingLoops: fooLoops.filter(
          (someFooLoop) => someFooLoop !== someLoop
        ),
        conflictingLoops: [someLoop],
      })
      return currentConflictingLoops.length > 1
        ? [...result, currentConflictingLoops]
        : result
    },
    []
  )
  const singularLoops = baseLoops.filter(
    ({ rotatedLoop }) =>
      conflictingLoopGroups
        .flat()
        .findIndex((someLoop) => someLoop === rotatedLoop) === -1
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
    >
      <rect x={-10} y={-10} width={120} height={120} fill={'lightgrey'} />
      <g transform={'translate(0,5)'}>
        {/* <Polygon
          strokeColor={'black'}
          strokeWidth={0.2}
          somePoints={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: rootLoop,
          })}
        /> */}
        {conflictingLoopGroups.map((someLoopGroup) => (
          <Polygon
            strokeColor={'black'}
            strokeWidth={0.2}
            somePoints={getCompositeRotatedLoopPoints({
              sampleCount: 256,
              someRotatedLoops: someLoopGroup,
            })}
          />
        ))}
        {singularLoops.map(({ rotatedLoop }) => (
          <Polygon
            strokeColor={'black'}
            strokeWidth={0.2}
            somePoints={getRotatedLoopPoints({
              sampleCount: 256,
              someRotatedLoop: rotatedLoop,
            })}
          />
        ))}
      </g>
    </svg>
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

interface GetCompositeRotatedLoopPointsApi {
  someRotatedLoops: Array<RotatedLoop>
  sampleCount: number
}

function getCompositeRotatedLoopPoints(api: GetCompositeRotatedLoopPointsApi) {
  const { sampleCount, someRotatedLoops } = api
  return new Array(sampleCount).fill(undefined).map<Point>((_, sampleIndex) => {
    const currentSampleAngle = ((2 * Math.PI) / sampleCount) * sampleIndex
    const sampleSumPoint = someRotatedLoops.reduce<Point>(
      (result, someLoop) => {
        const newSamplePoint = getTracePoint({
          traceAngle: currentSampleAngle,
          somePoints: getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: someLoop,
          }),
          originPoint: someLoop.baseCircle.center,
        })
        return {
          x: newSamplePoint.x + result.x,
          y: newSamplePoint.y + result.y,
        }
      },
      { x: 0, y: 0 }
    )
    return {
      x: sampleSumPoint.x / someRotatedLoops.length,
      y: sampleSumPoint.y / someRotatedLoops.length,
    }
  })
}

interface GetConflictingRotatedLoopsApi {
  currentLoop: RotatedLoop
  remainingLoops: Array<RotatedLoop>
  conflictingLoops: Array<RotatedLoop>
}

function getConflictingRotatedLoops(
  api: GetConflictingRotatedLoopsApi
): Array<RotatedLoop> {
  const { currentLoop, remainingLoops, conflictingLoops } = api
  const [loopUnderInspection, ...nextRemainingLoops] = remainingLoops
  if (loopUnderInspection) {
    const rotatedLoopsCollide = getRotatedLoopsCollide({
      loopA: currentLoop,
      loopB: loopUnderInspection,
    })
    if (rotatedLoopsCollide) {
      const activeConflictChain = getConflictingRotatedLoops({
        currentLoop: loopUnderInspection,
        remainingLoops: nextRemainingLoops,
        conflictingLoops: [...conflictingLoops, loopUnderInspection],
      })
      return getConflictingRotatedLoops({
        currentLoop,
        remainingLoops: nextRemainingLoops.filter(
          (someLoop) =>
            activeConflictChain.findIndex(
              (someConflictLoop) => someConflictLoop === someLoop
            ) === -1
        ),
        conflictingLoops: [...conflictingLoops, ...activeConflictChain],
      })
    } else {
      return getConflictingRotatedLoops({
        currentLoop,
        remainingLoops: nextRemainingLoops,
        conflictingLoops: conflictingLoops,
      })
    }
  } else {
    return conflictingLoops
  }
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
  return loopA.baseCircle.radius >= distanceBetweenBaseCircleCenters
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
