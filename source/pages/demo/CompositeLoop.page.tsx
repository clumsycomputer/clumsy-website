import React from 'react'
import {
  Circle,
  getRotatedLoopChildCircle,
  getRotatedLoopPoints,
  getTracePoint,
  Point,
  RotatedLoop,
} from '../../library/circleStuff'
import { Polygon } from '../../library/components/Polygon'

export default {
  pageRoute: '/demo/compositeLoop',
  PageContent: CompositeLoop,
  htmlTitle: 'composite loop - jmath',
  htmlDescription: '',
  generatePdf: false,
  pdfFileName: 'compositeLoop',
}

function CompositeLoop() {
  const rootCircle: Circle = {
    radius: 50,
    center: { x: 50, y: 50 },
  }
  const loopA: RotatedLoop = {
    baseCircle: rootCircle,
    childCircle: {
      relativeRadius: 5 / 13,
      relativeDepth: 1,
      phaseAngle: Math.PI / 3,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2,
  }
  const loopB: RotatedLoop = {
    baseCircle: rootCircle,
    childCircle: {
      relativeRadius: 5 / 13,
      relativeDepth: 1,
      phaseAngle: -Math.PI / 3,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2,
  }
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
        strokeWidth={0.3}
        somePoints={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: loopA,
        })}
      />
      <Polygon
        strokeColor={'black'}
        strokeWidth={0.3}
        somePoints={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: loopB,
        })}
      /> */}
      <Polygon
        strokeColor={'black'}
        strokeWidth={0.3}
        somePoints={getCompositeLoopPoints({
          sampleCount: 256,
          baseLoops: [loopA, loopB],
        })}
      />
    </svg>
  )
}

interface GetCompositeLoopPointsApi {
  sampleCount: number
  baseLoops: Array<RotatedLoop>
}

function getCompositeLoopPoints(api: GetCompositeLoopPointsApi): Array<Point> {
  const { baseLoops, sampleCount } = api
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
  const compositeCenter: Point = {
    x: compositeAccumulatedCenter.x / baseLoops.length,
    y: compositeAccumulatedCenter.y / baseLoops.length,
  }
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
