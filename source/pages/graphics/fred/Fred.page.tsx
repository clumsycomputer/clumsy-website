import React from 'react'
import {
  Circle,
  getRotatedLoopChildCircle,
  getRotatedLoopPoints,
  RotatedLoop,
} from '../../../library/circleStuff'
import {
  FreakPolygon,
  FreakPolygons,
  Graphic,
  GraphicRectangle,
} from './helpers'

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
      relativeRadius: 7 / 12,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2,
  }
  const rotatedLoopB: RotatedLoop = {
    baseCircle: rootCircle,
    childCircle: {
      relativeRadius: 1,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2,
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
      <FreakPolygons
        fillColor={'white'}
        targetRectangle={canvasRectangle}
        polygonLayers={[
          {
            baseSquares: {
              oscillationSampleCount: 2048,
              oscillationAmplitude: 5,
              oscillationFrequency: 220,
              oscillationPhase: Math.PI / 2,
              squareBaseLength: 0.5,
            },
            overlaySquares: {
              oscillationSampleCount: 2048,
              oscillationAmplitude: 4,
              oscillationFrequency: 220,
              oscillationPhase: Math.PI / 2,
              squareBaseLength: 0.5,
            },
            polygonOrigin: getRotatedLoopChildCircle({
              someRotatedLoop: rotatedLoopA,
            }).center,
            polygonPoints: getRotatedLoopPoints({
              sampleCount: 4,
              someRotatedLoop: rotatedLoopA,
            }),
          },
          {
            baseSquares: {
              oscillationSampleCount: 2048,
              oscillationAmplitude: 4,
              oscillationFrequency: 220,
              oscillationPhase: Math.PI / 2,
              squareBaseLength: 0.5,
            },
            overlaySquares: {
              oscillationSampleCount: 2048,
              oscillationAmplitude: 3,
              oscillationFrequency: 220,
              oscillationPhase: Math.PI / 2 - Math.PI / 12,
              squareBaseLength: 0.5,
            },
            polygonOrigin: getRotatedLoopChildCircle({
              someRotatedLoop: rotatedLoopB,
            }).center,
            polygonPoints: getRotatedLoopPoints({
              sampleCount: 3,
              someRotatedLoop: rotatedLoopB,
            }),
          },
        ]}
      />
    </Graphic>
  )
}
