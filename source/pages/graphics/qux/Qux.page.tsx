import React from 'react'
import {
  Circle,
  getMirroredRotatedLoop,
  getRotatedLoopPoints,
  getTracePoint,
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
      relativeRadius: 1,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: -Math.PI / 2,
  }
  const basePolyCenters = mapRhythmSequence<
    Array<{
      rotatedLoop: RotatedLoop
    }>
  >({
    baseRhythm: getNaturalCompositeRhythm({
      rhythmResolution: 12,
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
          rhythmResolution: 12,
          rhythmParts: [
            { rhythmDensity: 7, rhythmPhase: 1 },
            { rhythmDensity: 3, rhythmPhase: 1 },
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
          const cellRadius = (lineLength / rhythmResolution) * rhythmIndex
          const newBaseCircleCenter = {
            x: cellRadius * Math.cos(lineAngle) + pointA.x,
            y: cellRadius * Math.sin(lineAngle) + pointA.y,
          }
          const relativeAngleToCenter = Math.atan2(
            newBaseCircleCenter.y - rootCircle.center.y,
            newBaseCircleCenter.x - rootCircle.center.x
          )
          const openRhythmRatio =
            (rhythmResolution - rhythmDensity) / rhythmResolution
          const ratioStep = openRhythmRatio / rhythmDensity
          return {
            rotatedLoop: {
              baseCircle: {
                radius: 3,
                center: newBaseCircleCenter,
              },
              childCircle: {
                relativeRadius: 7 / 12 + ratioStep * nestIndex * (4 / 12),
                relativeDepth: 1 - ratioStep * nestIndex * (4 / 12),
                phaseAngle: relativeAngleToCenter,
              },
              rotationAnchor: 'base',
              rotationAngle: relativeAngleToCenter * Math.PI + Math.PI / 2,
            },
          }
        },
      })
    },
  }).flat()
  // const rootWave = getCommonalityWave({
  //   baseRhythm: getNaturalCompositeRhythm({
  //     rhythmResolution: 12,
  //     rhythmParts: [{ rhythmDensity: 7, rhythmPhase: 0 }],
  //     rhythmPhase: 0,
  //   }),
  // })
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
      {/* <Polygon
        strokeColor={'black'}
        strokeWidth={0.2}
        somePoints={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: rootLoop,
        })}
      /> */}
      {basePolyCenters.map(({ rotatedLoop }) => (
        <Polygon
          strokeColor={'black'}
          strokeWidth={0.2}
          somePoints={getRotatedLoopPoints({
            sampleCount: 256,
            someRotatedLoop: rotatedLoop,
          })}
        />
      ))}
      {basePolyCenters
        .map((somePolygonStruff) => ({
          ...somePolygonStruff,
          rotatedLoop: getMirroredRotatedLoop({
            mirrorAngle: Math.PI / 2,
            originPoint: rootCircle.center,
            baseLoop: somePolygonStruff.rotatedLoop,
          }),
        }))
        .map(({ rotatedLoop }) => (
          <Polygon
            strokeColor={'black'}
            strokeWidth={0.2}
            somePoints={getRotatedLoopPoints({
              sampleCount: 256,
              someRotatedLoop: rotatedLoop,
            })}
          />
        ))}
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
