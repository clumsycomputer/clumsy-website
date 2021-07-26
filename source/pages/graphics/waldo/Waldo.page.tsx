import React, { Fragment } from 'react'
import {
  Circle,
  getMirroredPoint,
  getRotatedLoopPoint,
  GetRotatedLoopPointApi,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { reduceRhythmSequence } from '../../../library/helperStuff'
import { getNaturalCompositeRhythm } from '../../../library/rhythmStuff'

export default {
  pageRoute: '/graphics/waldo',
  PageContent: Waldo,
  htmlTitle: 'waldo - jmath',
  htmlDescription: 'a waldo graphic',
  generatePdf: false,
  pdfFileName: 'waldo',
}

const globalSampleCount = 512

function Waldo() {
  const rootCircle: Circle = {
    radius: 50,
    center: { x: 50, y: 50 },
  }
  const cellLength = 1 / 2 / 2
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
      <rect x={-10} y={-10} width={120} height={120} fill={'black'} />
      {getOscillatedLoopPoints({
        sampleCount: globalSampleCount,
        someRotatedLoop: {
          baseCircle: {
            ...rootCircle,
            radius: 12,
          },
          childCircle: {
            relativeRadius: 7 / 12,
            relativeDepth: 1,
            phaseAngle: 2 * Math.PI * (5 / 12),
          },
          rotationAnchor: 'base',
          rotationAngle: 2 * Math.PI * (5 / 12),
        },
        oscillationRadius: 0.4,
        oscillationFrequency: getWaveFrequency({
          originNote: 211,
          scaleResolution: 18,
          noteIndex: -2,
        }),
      }).map((somePoint) => {
        const mirroredPoint = getMirroredPoint({
          mirrorAngle: Math.PI / 2,
          basePoint: somePoint,
          originPoint: rootCircle.center,
        })
        return (
          <Fragment>
            <rect
              fill={'#ff2e00'}
              x={somePoint.x - cellLength / 2}
              y={somePoint.y - cellLength / 2}
              width={cellLength}
              height={cellLength}
            />
            <rect
              fill={'#ff2e00'}
              x={mirroredPoint.x - cellLength / 2}
              y={mirroredPoint.y - cellLength / 2}
              width={cellLength}
              height={cellLength}
            />
          </Fragment>
        )
      })}
      {getOscillatedLoopPoints({
        sampleCount: globalSampleCount,
        someRotatedLoop: {
          baseCircle: {
            ...rootCircle,
            radius: 12,
          },
          childCircle: {
            relativeRadius: 7 / 12,
            relativeDepth: 1,
            phaseAngle: 2 * Math.PI * (5 / 12),
          },
          rotationAnchor: 'base',
          rotationAngle: 2 * Math.PI * (5 / 12),
        },
        oscillationRadius: 0.4,
        oscillationFrequency: getWaveFrequency({
          originNote: 211,
          scaleResolution: 18,
          noteIndex: -0,
        }),
      }).map((somePoint) => {
        const mirroredPoint = getMirroredPoint({
          mirrorAngle: Math.PI / 2,
          basePoint: somePoint,
          originPoint: rootCircle.center,
        })
        return (
          <Fragment>
            <rect
              fill={'black'}
              x={somePoint.x - cellLength / 2}
              y={somePoint.y - cellLength / 2}
              width={cellLength}
              height={cellLength}
            />
            <rect
              fill={'black'}
              x={mirroredPoint.x - cellLength / 2}
              y={mirroredPoint.y - cellLength / 2}
              width={cellLength}
              height={cellLength}
            />
          </Fragment>
        )
      })}
    </svg>
  )
}

interface GetOscillatedLoopPointsApi
  extends Pick<GetRotatedLoopPointApi, 'someRotatedLoop'> {
  sampleCount: number
  oscillationRadius: number
  oscillationFrequency: number
}

function getOscillatedLoopPoints(api: GetOscillatedLoopPointsApi) {
  const {
    sampleCount,
    someRotatedLoop,
    oscillationRadius,
    oscillationFrequency,
  } = api
  return new Array(sampleCount).fill(undefined).map<Point>((_, sampleIndex) => {
    const currentSampleAngle = ((2 * Math.PI) / sampleCount) * sampleIndex
    const basePoint = getRotatedLoopPoint({
      someRotatedLoop,
      sampleAngle: currentSampleAngle,
    })
    return {
      x:
        oscillationRadius *
          Math.cos(oscillationFrequency * currentSampleAngle) +
        basePoint.x,
      y:
        oscillationRadius *
          Math.sin(oscillationFrequency * currentSampleAngle) +
        basePoint.y,
    }
  })
}

interface GetWaveFrequencyApi {
  originNote: number
  scaleResolution: number
  noteIndex: number
}

function getWaveFrequency(api: GetWaveFrequencyApi) {
  const { originNote, scaleResolution, noteIndex } = api
  return originNote * Math.pow(2, noteIndex / scaleResolution)
}
