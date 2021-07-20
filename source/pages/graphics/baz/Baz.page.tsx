import React from 'react'
import {
  Circle,
  getMirroredPoint,
  getRotatedLoopPoint,
  RotatedLoop,
} from '../../../library/circleStuff'
import {
  getWaveformPointsAlongLine,
  getWaveformSamples,
} from '../../../library/waveformStuff'

export default {
  pageRoute: '/graphics/baz',
  PageContent: Baz,
  htmlTitle: 'baz - jmath',
  htmlDescription: 'a baz graphic',
  generatePdf: false,
  pdfFileName: 'baz',
}

function Baz() {
  const rootCircle: Circle = {
    radius: 50,
    center: {
      x: 50,
      y: 50,
    },
  }
  const loopA: RotatedLoop = {
    baseCircle: rootCircle,
    childCircle: {
      relativeRadius: 11 / 13,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: -Math.PI / 2,
  }
  const pointA = getRotatedLoopPoint({
    someRotatedLoop: loopA,
    sampleAngle: 0,
  })
  const pointB = getRotatedLoopPoint({
    someRotatedLoop: loopA,
    sampleAngle: (Math.PI / 3) * 2,
  })
  const pointD = getRotatedLoopPoint({
    someRotatedLoop: loopA,
    sampleAngle: Math.PI,
  })
  const pointE = getRotatedLoopPoint({
    someRotatedLoop: loopA,
    sampleAngle: Math.PI / 3,
  })
  const pointF = getRotatedLoopPoint({
    someRotatedLoop: loopA,
    sampleAngle: -Math.PI / 3,
  })
  const waveformPointsA = getWaveformPointsAlongLine({
    baseLine: [pointA, pointB],
    waveformSamples: getWaveformSamples({
      sampleCount: 256,
      someWaveform: {
        ...loopA,
        ...loopA.childCircle,
      },
    }).reverse(),
    sampleAmplifier: 13.75,
  })
  const waveformPointsB = waveformPointsA.map((somePoint) =>
    getMirroredPoint({
      basePoint: somePoint,
      mirrorAngle: -Math.PI / 2,
      originPoint: rootCircle.center,
    })
  )
  const waveformPointsC = getWaveformPointsAlongLine({
    baseLine: [pointD, pointE],
    waveformSamples: getWaveformSamples({
      sampleCount: 256,
      someWaveform: {
        ...loopA,
        ...loopA.childCircle,
      },
    }),
    sampleAmplifier: 17,
  })
  const waveformPointsD = waveformPointsC.map((somePoint) =>
    getMirroredPoint({
      basePoint: somePoint,
      mirrorAngle: -Math.PI / 2,
      originPoint: rootCircle.center,
    })
  )
  const waveformPointsE = getWaveformPointsAlongLine({
    baseLine: [pointB, pointF],
    waveformSamples: getWaveformSamples({
      sampleCount: 256,
      someWaveform: {
        ...loopA,
        ...loopA.childCircle,
      },
    }).reverse(),
    sampleAmplifier: 21,
  })
  const waveformPointsF = waveformPointsE.map((somePoint) =>
    getMirroredPoint({
      basePoint: somePoint,
      mirrorAngle: -Math.PI / 2,
      originPoint: rootCircle.center,
    })
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
      <polygon
        fill={'pink'}
        stroke={'black'}
        strokeWidth={1}
        strokeLinejoin={'round'}
        points={[
          ...waveformPointsF.reverse(),
          ...waveformPointsB.reverse(),
          ...waveformPointsA,
          ...waveformPointsE,
          ...waveformPointsD.reverse(),
          ...waveformPointsC,
        ]
          .map((somePoint) => `${somePoint.x},${somePoint.y}`)
          .join(' ')}
      />
    </svg>
  )
}
