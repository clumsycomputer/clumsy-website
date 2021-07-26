import React, { Fragment } from 'react'
import {
  Circle,
  getMirroredPoint,
  getMirroredRotatedLoop,
  getRotatedLoopChildCircle,
  getRotatedLoopPoint,
  GetRotatedLoopPointApi,
  getRotatedLoopPoints,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { Polygon } from '../../../library/components/Polygon'
import {
  getDistanceBetweenPoints,
  reduceRhythmSequence,
  ReduceRhythmSequenceApi,
} from '../../../library/helperStuff'
import {
  DiscreteRhythm,
  DiscreteWave,
  getCommonalityWave,
  getNaturalCompositeRhythm,
} from '../../../library/rhythmStuff'
import { getLoopExpandingPattern, getStupidPattern } from './helpers'

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
    rhythmResolution: 12,
    rhythmParts: [
      { rhythmDensity: 11, rhythmPhase: 0 },
      { rhythmDensity: 7, rhythmPhase: 0 },
    ],
    rhythmPhase: 0,
  })
  const waveA = getCommonalityWave({
    baseRhythm: rhythmA,
  })
  const rayPatternA = getLoopExpandingPattern({
    patternId: 'A',
    baseLoop: rootLoop,
    baseRhythm: rhythmA,
    baseWave: waveA,
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
            radius: somePatternCell.cellWeight,
          },
          childCircle: {
            relativeRadius: 7 / 11,
            relativeDepth: 7 / 13,
            phaseAngle:
              2 *
              Math.PI *
              (somePatternCell.cellWeight / somePatternCell.rhythmDensity),
          },
          rotationAnchor: 'base',
          rotationAngle: Math.atan2(
            somePatternCell.cellOriginPoint.y - rootCircle.center.y,
            somePatternCell.cellOriginPoint.x - rootCircle.center.x
          ),
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
