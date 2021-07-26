import React, { Fragment } from 'react'
import {
  Circle,
  getMirroredRotatedLoop,
  getRotatedLoopPoint,
  GetRotatedLoopPointApi,
  getRotatedLoopPoints,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { Polygon } from '../../../library/components/Polygon'
import { getNaturalCompositeRhythm } from '../../../library/rhythmStuff'
import { getLoopRayPattern } from './helpers'

export default {
  pageRoute: '/graphics/waldo',
  PageContent: Waldo,
  htmlTitle: 'waldo - jmath',
  htmlDescription: 'a waldo graphic',
  generatePdf: false,
  pdfFileName: 'waldo',
}

function Waldo() {
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
    rotationAngle: 0,
  }
  const rhythmA = getNaturalCompositeRhythm({
    rhythmResolution: 18,
    rhythmParts: [
      // { rhythmDensity: 13, rhythmPhase: 0 },
      { rhythmDensity: 12, rhythmPhase: 0 },
      { rhythmDensity: 11, rhythmPhase: 0 },
      { rhythmDensity: 7, rhythmPhase: 0 },
    ],
    rhythmPhase: 0,
  })
  const rayPatternA = getLoopRayPattern({
    patternId: 'A',
    baseLoop: rootLoop,
    spacerRhythm: rhythmA,
    waveRhythm: rhythmA,
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
      <rect x={-10} y={-10} width={120} height={120} fill={'black'} />
      {/* <Polygon
        strokeColor={'white'}
        strokeWidth={0.3}
        somePoints={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: rootLoop,
        })}
      /> */}
      {rayPatternA.map((somePatternCell) => {
        const cellLoop: RotatedLoop = {
          baseCircle: {
            center: somePatternCell.cellPoint,
            radius: 5,
          },
          childCircle: {
            relativeRadius: 3 / 4,
            relativeDepth:
              somePatternCell.cellWeight / somePatternCell.rhythmDensity,
            phaseAngle: somePatternCell.cellAngle,
          },
          rotationAnchor: 'base',
          rotationAngle: somePatternCell.cellAngle,
        }
        return (
          <Fragment>
            <Polygon
              strokeColor={'white'}
              strokeWidth={0.3}
              somePoints={getRotatedLoopPoints({
                sampleCount: 256,
                someRotatedLoop: cellLoop,
              })}
            />
            <Polygon
              strokeColor={'white'}
              strokeWidth={0.3}
              somePoints={getRotatedLoopPoints({
                sampleCount: 256,
                someRotatedLoop: getMirroredRotatedLoop({
                  baseLoop: cellLoop,
                  mirrorAngle: Math.PI / 2,
                  originPoint: rootCircle.center,
                }),
              })}
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
