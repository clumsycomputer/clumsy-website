import React from 'react'
import {
  Circle,
  getTracePoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { getUpdatedData } from '../../../library/getUpdatedData'
import {
  CompositeLoop,
  getCompositeCenterPoint,
  getCompositeLoopPoints,
  getDistanceBetweenPoints,
  reduceRhythmSequence,
} from '../../../library/helperStuff'
import {
  DiscreteRhythm,
  getNaturalCompositeRhythm,
} from '../../../library/rhythmStuff'
import { getWaveFrequency } from '../waldo/helpers'
import { FreakPolygon, Graphic, GraphicRectangle } from './helpers'
// @ts-ignore
import getColorMap from 'colormap'

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
    baseCircle: { ...rootCircle, radius: 23 },
    childCircle: {
      relativeRadius: 10 / 12,
      relativeDepth: 1,
      phaseAngle: Math.PI / 2 / 3,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2 / 3,
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
      {getNestCompositeLoopsPoints({
        shiftAngle: -rotatedLoopA.rotationAngle,
        shiftScalar: 2,
        sampleCount: 128,
        baseLoop: [
          rotatedLoopA,
          rotatedLoopA,
          getUpdatedData({
            baseData: rotatedLoopA,
            dataUpdates: {
              'childCircle.phaseAngle': (foo: number) => -foo,
              rotationAngle: (foo: number) => foo + Math.PI / 3,
              'childCircle.relativeRadius': (foo: number) => foo / 1.25,
            },
          }),
          getUpdatedData({
            baseData: rotatedLoopA,
            dataUpdates: {
              'childCircle.phaseAngle': (foo: number) => -foo,
              rotationAngle: (foo: number) => foo + Math.PI / 2,
              'childCircle.relativeRadius': (foo: number) => foo / 1.125,
            },
          }),
        ],
        nestRhythm: getNaturalCompositeRhythm({
          rhythmResolution: 24,
          rhythmParts: [
            { rhythmDensity: 23, rhythmPhase: 0 },
            { rhythmDensity: 11, rhythmPhase: 0 },
          ],
          rhythmPhase: 0,
        }),
      }).map((someNestLayer, layerIndex) => {
        const colorMap = getColorMap({
          colormap: 'par',
          nshades: someNestLayer.rhythmDensity,
          format: 'hex',
          alpha: 1,
        })
        const oscillationAmp = Math.log(
          ((rotatedLoopA.baseCircle.radius / someNestLayer.rhythmResolution) *
            (someNestLayer.rhythmResolution - someNestLayer.rhythmIndex)) /
            2
        )
        const squareBaseLength = oscillationAmp / 17
        const greyScale =
          (someNestLayer.rhythmDensity - layerIndex) /
          someNestLayer.rhythmDensity
        const greyValue = 255 - 255 * greyScale
        return (
          <FreakPolygon
            // fillColor={`rgb(${greyValue},${greyValue},${greyValue})`}
            fillColor={colorMap[layerIndex]}
            targetRectangle={canvasRectangle}
            polygonOrigin={someNestLayer.loopCenter}
            polygonPoints={someNestLayer.loopPoints}
            baseSquares={{
              squareBaseLength,
              oscillationAmplitude: oscillationAmp,
              oscillationSampleCount: 1024 * 5,
              oscillationFrequency: getWaveFrequency({
                baseFrequency: 211,
                scaleResolution: 1,
                frequencyIndex: 0,
              }),
              oscillationPhase: 0,
            }}
            overlaySquares={{
              // squareBaseLength: (squareBaseLength / 5) * 2,
              squareBaseLength: squareBaseLength,
              oscillationAmplitude: oscillationAmp,
              oscillationSampleCount: 1024 * 5,
              oscillationFrequency: getWaveFrequency({
                baseFrequency: 440,
                scaleResolution: 1,
                frequencyIndex: 0,
              }),
              oscillationPhase: 9,
            }}
          />
        )
      })}
    </Graphic>
  )
}

interface GetNestCompositeLoopsPointsApi {
  baseLoop: CompositeLoop
  sampleCount: number
  shiftAngle: number
  shiftScalar: number
  nestRhythm: DiscreteRhythm
}

function getNestCompositeLoopsPoints(api: GetNestCompositeLoopsPointsApi) {
  const { sampleCount, baseLoop, shiftAngle, nestRhythm, shiftScalar } = api
  const cellLoopBasePoints = getCompositeLoopPoints({
    sampleCount,
    baseLoops: baseLoop,
  })
  const compositeCenter = getCompositeCenterPoint({
    baseLoops: baseLoop,
  })
  const maxShiftPoint: Point = getTracePoint({
    somePoints: cellLoopBasePoints,
    traceAngle: shiftAngle,
    originPoint: compositeCenter,
  })
  const maxShiftRadius = getDistanceBetweenPoints({
    pointA: compositeCenter,
    pointB: maxShiftPoint,
  })
  return reduceRhythmSequence<any>({
    baseRhythm: nestRhythm,
    getCellResult: (someNestStuff) => {
      const childShiftRadius =
        shiftScalar *
        (maxShiftRadius / someNestStuff.rhythmResolution) *
        someNestStuff.rhythmIndex
      const currentCenter: Point = {
        x: childShiftRadius * Math.cos(shiftAngle) + compositeCenter.x,
        y: childShiftRadius * Math.sin(shiftAngle) + compositeCenter.y,
      }
      return {
        ...someNestStuff,
        loopCenter: currentCenter,
        loopPoints: cellLoopBasePoints.map((someBasePoint, pointIndex) => {
          const maxRadius = getDistanceBetweenPoints({
            pointA: compositeCenter,
            pointB: someBasePoint,
          })
          const currentBaseRadius =
            Math.log(
              maxRadius -
                (maxRadius / someNestStuff.rhythmResolution) *
                  someNestStuff.rhythmIndex
            ) * 5
          const currentAngle =
            ((2 * Math.PI) / cellLoopBasePoints.length) * pointIndex
          return {
            x: currentBaseRadius * Math.cos(currentAngle) + currentCenter.x,
            y: currentBaseRadius * Math.sin(currentAngle) + currentCenter.y,
          }
        }),
      }
    },
  })
}
