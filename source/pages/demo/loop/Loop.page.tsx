import React from 'react'
import {
  getLoopBaseIntersection,
  getLoopChildIntersection,
  getRotatedLoopChildCircle,
  getRotatedLoopPoints,
  getTracePoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'

export default {
  pageRoute: '/demo/loop',
  PageContent: Loop,
  htmlTitle: 'loop - jmath',
  htmlDescription: 'an incomplete and broken exploration of loops',
  generatePdf: false,
  pdfFileName: 'loop',
}

function Loop() {
  const rotatedLoopA: RotatedLoop = {
    baseCircle: {
      center: { x: 50, y: 50 },
      radius: 50,
    },
    childCircle: {
      relativeRadius: 13 / 24,
      relativeDepth: 5 / 8,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: 0,
  }
  const rotatedLoopPointsA = getRotatedLoopPoints({
    sampleCount: 512,
    someRotatedLoop: rotatedLoopA,
  })
  const childCircleA = getRotatedLoopChildCircle({
    someRotatedLoop: rotatedLoopA,
  })
  const traceAngle = ((2 * Math.PI) / 512) * 32
  const childIntersectionPoint = getLoopChildIntersection({
    someLoop: rotatedLoopA,
    sampleAngle: traceAngle,
  })
  const baseIntersectionPoint = getLoopBaseIntersection({
    someLoop: rotatedLoopA,
    sampleAngle: traceAngle,
  })
  const tracePoint = getTracePoint({
    traceAngle,
    somePoints: rotatedLoopPointsA,
    originPoint: childCircleA.center,
  })!
  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
      }}
      viewBox={'-10 -10 120 320'}
      imageRendering={'optimizeQuality'}
    >
      <circle
        r={rotatedLoopA.baseCircle.radius}
        cx={rotatedLoopA.baseCircle.center.x}
        cy={rotatedLoopA.baseCircle.center.y}
        fill={'none'}
        stroke={'blue'}
        strokeWidth={0.25}
      />
      <circle
        r={0.5}
        cx={rotatedLoopA.baseCircle.center.x}
        cy={rotatedLoopA.baseCircle.center.y}
        fill={'blue'}
      />
      <polygon
        points={rotatedLoopPointsA
          .map((wavePoint) => `${wavePoint.x},${wavePoint.y}`)
          .join(' ')}
        fill={'none'}
        stroke={'black'}
        strokeWidth={0.25}
      />
      <circle
        r={childCircleA.radius}
        cx={childCircleA.center.x}
        cy={childCircleA.center.y}
        fill={'none'}
        stroke={'red'}
        strokeWidth={0.25}
      />
      <circle
        r={0.5}
        cx={childCircleA.center.x}
        cy={childCircleA.center.y}
        fill={'red'}
      />
      <line
        x1={childCircleA.center.x}
        y1={childCircleA.center.y}
        x2={baseIntersectionPoint.x}
        y2={baseIntersectionPoint.y}
        stroke={'purple'}
        strokeWidth={0.25}
      />
      <line
        x1={childIntersectionPoint.x}
        y1={childIntersectionPoint.y}
        x2={baseIntersectionPoint.x}
        y2={childIntersectionPoint.y}
        stroke={'purple'}
        strokeWidth={0.25}
      />
      <line
        x1={baseIntersectionPoint.x}
        y1={baseIntersectionPoint.y}
        x2={baseIntersectionPoint.x}
        y2={childIntersectionPoint.y}
        stroke={'purple'}
        strokeWidth={0.25}
      />
      <circle
        r={0.5}
        cx={childIntersectionPoint.x}
        cy={childIntersectionPoint.y}
        fill={'purple'}
      />
      <circle
        r={0.5}
        cx={baseIntersectionPoint.x}
        cy={baseIntersectionPoint.y}
        fill={'purple'}
      />
      <circle
        r={0.5}
        cx={baseIntersectionPoint.x}
        cy={childIntersectionPoint.y}
        fill={'purple'}
      />
      <circle r={0.5} cx={tracePoint.x} cy={tracePoint.y} fill={'purple'} />
      <polyline
        points={new Array(rotatedLoopPointsA.length)
          .fill(undefined)
          .map<Point | null>((_, sampleIndex) => {
            return getTracePoint({
              traceAngle:
                ((2 * Math.PI) / rotatedLoopPointsA.length) * sampleIndex,
              somePoints: rotatedLoopPointsA,
              originPoint: childCircleA.center,
            })
          }, [])
          .map((wavePoint, pointIndex) => ({
            x: (100 / rotatedLoopPointsA.length) * pointIndex,
            y: (wavePoint || { y: 0 }).y - childCircleA.center.y + 150,
          }))
          .map((wavePoint) => `${wavePoint.x},${wavePoint.y}`)
          .join(' ')}
        fill={'none'}
        stroke={'black'}
        strokeWidth={0.25}
      />
      <polyline
        points={rotatedLoopPointsA
          .map((wavePoint, pointIndex) => ({
            x: (100 / rotatedLoopPointsA.length) * pointIndex,
            y: wavePoint.y - childCircleA.center.y + 250,
          }))
          .map((wavePoint) => `${wavePoint.x},${wavePoint.y}`)
          .join(' ')}
        fill={'none'}
        stroke={'black'}
        strokeWidth={0.25}
      />
    </svg>
  )
}
