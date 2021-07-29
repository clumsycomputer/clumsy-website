import React from 'react'
import {
  Circle,
  getRotatedLoopChildCircle,
  getRotatedLoopPoints,
  RotatedLoop,
} from '../../../library/circleStuff'
import { FreakPolygon, Graphic, GraphicRectangle } from './helpers'

export default {
  pageRoute: '/graphics/fred',
  PageContent: Fred,
  htmlTitle: 'fred - jmath',
  htmlDescription: 'a fred graphic',
  generatePdf: false,
  pdfFileName: 'fred',
}

function Fred() {
  const canvasRectangle: GraphicRectangle = {
    x: -10,
    y: -10,
    width: 120,
    height: 120,
  }
  const rootCircle: Circle = {
    radius: 50,
    center: { x: 50, y: 50 },
  }
  const rotatedLoopA: RotatedLoop = {
    baseCircle: rootCircle,
    childCircle: {
      relativeRadius: 1,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: 0,
  }
  return (
    <Graphic
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
      }}
      canvasRectangle={canvasRectangle}
    >
      <rect fill={'black'} {...canvasRectangle} />
      <FreakPolygon
        fillColor={'white'}
        targetRectangle={canvasRectangle}
        baseSquares={{
          oscillationSampleCount: 2048,
          oscillationAmplitude: 2,
          oscillationFrequency: 220,
          oscillationPhase: 0,
          squareBaseLength: 0.2,
        }}
        overlaySquares={{
          oscillationSampleCount: 2048,
          oscillationAmplitude: 1,
          oscillationFrequency: 440,
          oscillationPhase: Math.PI / 3,
          squareBaseLength: 0.2,
        }}
        polygonOrigin={
          getRotatedLoopChildCircle({
            someRotatedLoop: rotatedLoopA,
          }).center
        }
        polygonPoints={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: rotatedLoopA,
        })}
      />
    </Graphic>
  )
}
