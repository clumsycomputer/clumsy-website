import React from 'react'
import { Circle, getRotatedLoopPoints, RotatedLoop } from './circleStuff'

export default {
  pageRoute: '/graphics/foo',
  PageContent: Foo,
  htmlTitle: 'foo - jmath',
  htmlDescription: 'a foo graphic',
  generatePdf: false,
  pdfFileName: 'foo',
}

function Foo() {
  const baseCircleA: Circle = {
    radius: 25,
    center: {
      x: 50,
      y: 50,
    },
  }
  const rotatedLoopA: RotatedLoop = {
    baseLoop: {
      baseCircle: baseCircleA,
      childCircle: {
        relativeRadius: 0.675,
        relativeDepth: 0.875,
        phaseAngle: (2 * Math.PI) / 5,
      },
    },
    rotationAnchor: 'child',
    rotationAngle: (2 * Math.PI) / 3,
  }
  const rotatedLoopB: RotatedLoop = {
    baseLoop: {
      baseCircle: {
        ...baseCircleA,
        radius: 23,
      },
      childCircle: {
        relativeRadius: 0.675,
        relativeDepth: 0.875,
        phaseAngle: (2 * Math.PI) / 5,
      },
    },
    rotationAnchor: 'child',
    rotationAngle: (2 * Math.PI) / 7,
  }
  const loopPointsA = getRotatedLoopPoints({
    sampleCount: 256,
    someRotatedLoop: rotatedLoopA,
  })
  const loopPointsB = getRotatedLoopPoints({
    sampleCount: 256,
    someRotatedLoop: rotatedLoopB,
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
      <polygon
        points={loopPointsA
          .map((someLoopPoint) => `${someLoopPoint.x},${someLoopPoint.y}`)
          .join(' ')}
        stroke={'black'}
        strokeWidth={0.25}
        fill={'none'}
      />
      <polygon
        points={loopPointsB
          .map((someLoopPoint) => `${someLoopPoint.x},${someLoopPoint.y}`)
          .join(' ')}
        stroke={'black'}
        strokeWidth={0.25}
        fill={'none'}
      />
    </svg>
  )
}
