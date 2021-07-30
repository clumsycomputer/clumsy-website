import React from 'react'
import {
  Circle,
  getMirroredRotatedLoop,
  getRotatedLoopPoints,
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
  ReduceRhythmSequenceApi,
} from '../../../library/helperStuff'
import {
  DiscreteRhythm,
  getNaturalCompositeRhythm,
} from '../../../library/rhythmStuff'
import {
  getLoopContractingPattern,
  getLoopExpandingPattern,
  getLoopRayPattern,
  getWaveFrequency,
} from '../waldo/helpers'
import {
  FreakPolygon,
  FreakPolygons,
  Graphic,
  GraphicRectangle,
  MirroredFreakPolygons,
} from './helpers'
// @ts-ignore
import getColorMap from 'colormap'
import { Polygon } from '../../../library/components/Polygon'

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
      <g transform={'translate(-75 -80) scale(2.5 2.5)'}>
        {getFred({
          canvasRectangle,
          patternCenter: rootCircle.center,
          loopSampleCount: 128,
          loopShiftScalar: 1,
        })}
      </g>
    </Graphic>
  )
}

interface GetFredApi {
  canvasRectangle: GraphicRectangle
  patternCenter: Point
  loopSampleCount: number
  loopShiftScalar: number
}

function getFred(api: GetFredApi) {
  const { patternCenter, canvasRectangle, loopSampleCount, loopShiftScalar } =
    api
  const rotatedLoopA: RotatedLoop = {
    baseCircle: {
      center: patternCenter,
      radius: 57,
    },
    childCircle: {
      relativeRadius: 16 / 17,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI,
  }
  const rootRhythmResolution = 19
  const colorMap = getColorMap({
    colormap: 'par',
    format: 'hex',
    alpha: 1,
    nshades: rootRhythmResolution,
  })
  const rhythmA = getNaturalCompositeRhythm({
    rhythmResolution: rootRhythmResolution,
    rhythmParts: [
      {
        rhythmDensity: 17,
        rhythmPhase: 0,
      },
      {
        rhythmDensity: 13,
        rhythmPhase: 0,
      },
      {
        rhythmDensity: 11,
        rhythmPhase: 0,
      },
      {
        rhythmDensity: 7,
        rhythmPhase: 0,
      },
      {
        rhythmDensity: 5,
        rhythmPhase: 2,
      },
    ],
    rhythmPhase: 7,
  })
  const loopPatternA = getLoopExpandingPattern({
    patternId: 'A',
    baseLoop: rotatedLoopA,
    spacerRhythm: rhythmA,
    waveRhythm: rhythmA,
  })
    .map((someStuff) => {
      const relativeAngle = Math.atan2(
        someStuff.cellPoint.y - someStuff.baseLoop.baseCircle.center.y,
        someStuff.cellPoint.x - someStuff.baseLoop.baseCircle.center.x
      )
      return {
        ...someStuff,
        baseCellLoop: {
          baseCircle: {
            radius: 12,
            center: someStuff.cellPoint,
          },
          childCircle: {
            relativeRadius: 5 / 12,
            relativeDepth: 1,
            phaseAngle: relativeAngle,
          },
          rotationAnchor: 'base',
          rotationAngle: Math.exp(relativeAngle) + Math.PI / 6,
        } as RotatedLoop,
      }
    })
    .map((someStuff) => {
      return {
        ...someStuff,
        baseCompositeCellLoop: [
          someStuff.baseCellLoop,
          someStuff.baseCellLoop,
          getUpdatedData({
            baseData: someStuff.baseCellLoop,
            dataUpdates: {
              'childCircle.phaseAngle': (foo: number) => -foo,
              rotationAngle: (foo: number) => foo - Math.PI / 2,
            },
          }),
          getUpdatedData({
            baseData: someStuff.baseCellLoop,
            dataUpdates: {
              'childCircle.phaseAngle': (foo: number) => -foo,
              rotationAngle: (foo: number) => foo + Math.PI / 2,
            },
          }),
        ] as CompositeLoop,
      }
    })
    .map((someStuff) => {
      return {
        ...someStuff,
        layerLoops: getNestCompositeLoopsPoints({
          sampleCount: loopSampleCount,
          nestRhythm: rhythmA,
          baseLoop: someStuff.baseCompositeCellLoop,
          getShiftAngle: (shiftIndex: number) => -someStuff.cellAngle,
          // + (Math.PI / 8) * Math.sin(2 * Math.PI * shiftIndex),
          shiftScalar: loopShiftScalar,
        }),
      }
    })
  const loopLayers = loopPatternA.reduce<
    Array<Array<Element<Element<typeof loopPatternA>['layerLoops']>>>
  >(
    (result, someStuff) => {
      someStuff.layerLoops.forEach((someLayerStuff) => {
        result[someLayerStuff.rhythmIndex]!.push({
          ...someLayerStuff,
        })
      })
      return result
    },
    new Array(rootRhythmResolution).fill(undefined).map(() => [])
  )
  return loopLayers.map((someLoopLayer, layerIndex) => {
    if (someLoopLayer.length === 0) return null
    return (
      <MirroredFreakPolygons
        key={Math.random()}
        fillColor={colorMap[layerIndex]}
        mirrorAngle={Math.PI / 2}
        mirrorOrigin={rotatedLoopA.baseCircle.center}
        targetRectangle={canvasRectangle}
        polygonLayers={someLoopLayer.map((someLayerLoop) => {
          const oscillationSampleCount = 512 * 6
          const oscillationAmplitude = 0.65
          const squareBaseLength = oscillationAmplitude / 10.5
          return {
            baseSquares: {
              oscillationSampleCount,
              oscillationAmplitude,
              oscillationFrequency: 211,
              oscillationPhase: 0,
              squareBaseLength: squareBaseLength,
            },
            overlaySquares: {
              oscillationSampleCount,
              oscillationAmplitude,
              oscillationFrequency: 211,
              oscillationPhase: 9,
              squareBaseLength: squareBaseLength,
            },
            polygonOrigin: someLayerLoop.loopCenter,
            polygonPoints: someLayerLoop.loopPoints,
          }
        })}
      />
    )
  })
}

type Element<SomeArray extends Array<any>> = SomeArray extends Array<
  infer SomeElement
>
  ? SomeElement
  : never

interface GetThingApi {
  canvasRectangle: GraphicRectangle
  baseLoop: RotatedLoop
}

function getThing(api: GetThingApi) {
  const { baseLoop, canvasRectangle } = api
  return getNestCompositeLoopsPoints({
    getShiftAngle: (shiftIndex: number) =>
      -Math.PI / 6 - (2 * Math.PI * shiftIndex) / 10,
    shiftScalar: 2,
    sampleCount: 128,
    baseLoop: [
      baseLoop,
      baseLoop,
      getUpdatedData({
        baseData: baseLoop,
        dataUpdates: {
          'childCircle.phaseAngle': (foo: number) => -foo,
          rotationAngle: (foo: number) => foo + Math.PI / 3,
          'childCircle.relativeRadius': (foo: number) => foo / 1.25,
        },
      }),
      getUpdatedData({
        baseData: baseLoop,
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
        { rhythmDensity: 7, rhythmPhase: 0 },
      ],
      rhythmPhase: 0,
    }),
  }).map((someNestLayer, layerIndex) => {
    const colorMap = getColorMap({
      colormap: 'par',
      format: 'hex',
      alpha: 1,
      nshades: someNestLayer.rhythmResolution,
    })
    const oscillationAmp = Math.log(
      ((baseLoop.baseCircle.radius / someNestLayer.rhythmResolution) *
        (someNestLayer.rhythmResolution - someNestLayer.rhythmIndex)) /
        2
    )
    const squareBaseLength = oscillationAmp / 17
    return (
      <FreakPolygon
        fillColor={colorMap[someNestLayer.rhythmIndex]}
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
  })
}

interface GetNestCompositeLoopsPointsApi {
  baseLoop: CompositeLoop
  sampleCount: number
  getShiftAngle: (foo: number) => number
  shiftScalar: number
  nestRhythm: DiscreteRhythm
}

function getNestCompositeLoopsPoints(api: GetNestCompositeLoopsPointsApi) {
  const { sampleCount, baseLoop, getShiftAngle, nestRhythm, shiftScalar } = api
  const cellLoopBasePoints = getCompositeLoopPoints({
    sampleCount,
    baseLoops: baseLoop,
  })
  const compositeCenter = getCompositeCenterPoint({
    baseLoops: baseLoop,
  })
  return reduceRhythmSequence<
    Parameters<ReduceRhythmSequenceApi<unknown>['getCellResult']>[0] & {
      loopCenter: Point
      loopPoints: Array<Point>
    }
  >({
    baseRhythm: nestRhythm,
    getCellResult: (someNestStuff) => {
      const shiftAngle = getShiftAngle(
        someNestStuff.rhythmIndex / someNestStuff.rhythmResolution
      )
      const maxShiftPoint: Point = getTracePoint({
        somePoints: cellLoopBasePoints,
        traceAngle: shiftAngle,
        originPoint: compositeCenter,
      })
      const maxShiftRadius = getDistanceBetweenPoints({
        pointA: compositeCenter,
        pointB: maxShiftPoint,
      })
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
