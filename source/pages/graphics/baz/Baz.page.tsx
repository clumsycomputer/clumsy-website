import React, { SVGProps } from 'react'
import {
  Circle,
  getOscillatedRotatedLoopPoints,
  getRotatedLoopChildCircle,
  getRotatedLoopPoint,
  getRotatedLoopPoints,
  getTracePoint,
  Loop,
  OscillatedRotatedLoop,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { getUpdatedData } from '../../../library/getUpdatedData'
import {
  DiscreteRhythm,
  getElementIndices,
  getFilteredRhythm,
  getNaturalRhythm,
  GetNaturalRhythmApi,
  getPhasedSpace,
} from '../../../library/rhythmStuff'

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
    baseCircle: {
      radius: 10,
      center: { x: 23, y: 23 },
    },
    childCircle: {
      relativeRadius: 3 / 12,
      relativeDepth: 11 / 12,
      phaseAngle: Math.PI / 7,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 7,
  }
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
      <Polygon
        strokeColor={'black'}
        strokeWidth={0.4}
        polygonPoints={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: loopA,
        })}
      />
      <Polygon
        strokeColor={'black'}
        strokeWidth={0.4}
        polygonPoints={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: getMirroredRotatedLoop({
            baseLoop: loopA,
            originPoint: rootCircle.center,
            mirrorAngle: Math.PI / 12,
          }),
        })}
      />
    </svg>
  )
}

interface GetLoopNestApi<RhythmLoop extends Loop> {
  nestRhythm: DiscreteRhythm
  getRhythmLoop: (
    api: GetNestLoopApi
  ) => NestLoopPolygonProps<RhythmLoop>['nestLoop']
  getStrokeColor: (
    api: GetNestStrokeColorApi
  ) => NestLoopPolygonProps<RhythmLoop>['strokeColor']
  getStrokeWidth: (
    api: GetNestStrokeWidthApi
  ) => NestLoopPolygonProps<RhythmLoop>['strokeWidth']
}

interface GetNestLoopApi extends PropertyGetterBaseApi {}

interface GetNestStrokeColorApi extends PropertyGetterBaseApi {}

interface GetNestStrokeWidthApi extends PropertyGetterBaseApi {}

interface PropertyGetterBaseApi {
  rhythmResolution: number
  rhythmDensity: number
  rhythmIndex: number
  nestIndex: number
}

interface NestLoopPolygonProps<RhythmLoop extends Loop>
  extends Pick<NonNullable<PolygonProps>, 'strokeColor' | 'strokeWidth'> {
  nestLoop: RhythmLoop
}

function getRhythmLoopSequence<RhythmLoop extends Loop = Loop>(
  api: GetLoopNestApi<RhythmLoop>
): Array<NestLoopPolygonProps<RhythmLoop>> {
  const { nestRhythm, getRhythmLoop, getStrokeColor, getStrokeWidth } = api
  const rhythmIndices = getElementIndices({
    targetValue: true,
    someSpace: nestRhythm,
  })
  const rhythmResolution = nestRhythm.length
  const rhythmDensity = rhythmIndices.length
  return rhythmIndices.map((rhythmIndex, nestIndex) => {
    return {
      nestLoop: getRhythmLoop({
        rhythmResolution,
        rhythmDensity,
        rhythmIndex,
        nestIndex,
      }),
      strokeColor: getStrokeColor({
        rhythmResolution,
        rhythmDensity,
        rhythmIndex,
        nestIndex,
      }),
      strokeWidth: getStrokeWidth({
        rhythmResolution,
        rhythmDensity,
        rhythmIndex,
        nestIndex,
      }),
    }
  })
}

interface GetNaturalCompositeRhythmApi
  extends Pick<GetNaturalRhythmApi, 'rhythmResolution' | 'rhythmPhase'> {
  rhythmParts: Array<Pick<GetNaturalRhythmApi, 'rhythmDensity' | 'rhythmPhase'>>
}

function getNaturalCompositeRhythm(api: GetNaturalCompositeRhythmApi) {
  const { rhythmResolution, rhythmParts, rhythmPhase } = api
  return getPhasedSpace({
    baseSpace: getFilteredRhythm({
      rhythmSequence: rhythmParts.map((someRhythmPart, rhythmIndex) =>
        getNaturalRhythm({
          ...someRhythmPart,
          rhythmResolution:
            rhythmIndex === 0
              ? rhythmResolution
              : rhythmParts[rhythmIndex - 1]!.rhythmDensity,
        })
      ),
    }),
    spacePhase: rhythmPhase,
  })
}

interface PolygonProps {
  strokeColor: NonNullable<SVGProps<SVGPolygonElement>['stroke']>
  strokeWidth: NonNullable<SVGProps<SVGPolygonElement>['strokeWidth']>
  polygonPoints: Point[]
}

function Polygon(props: PolygonProps) {
  const { strokeColor, strokeWidth, polygonPoints } = props
  return (
    <polygon
      fill={'none'}
      strokeLinejoin={'round'}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      points={polygonPoints
        .map(
          (somePolygonPoint) => `${somePolygonPoint.x},${somePolygonPoint.y}`
        )
        .join(' ')}
    />
  )
}

interface GetMirroredRotatedLoopApi {
  baseLoop: RotatedLoop
  originPoint: Point
  mirrorAngle: number
}

function getMirroredRotatedLoop(api: GetMirroredRotatedLoopApi) {
  const { baseLoop, originPoint, mirrorAngle } = api
  return getUpdatedData({
    baseData: baseLoop,
    dataUpdates: {
      'baseCircle.center': (currentCenter: Point) =>
        getMirroredPoint({
          originPoint,
          mirrorAngle,
          basePoint: currentCenter,
        }),
      'childCircle.phaseAngle': (currentAngle: number) => -currentAngle,
      rotationAngle: (currentAngle: number) =>
        mirrorAngle - (currentAngle - mirrorAngle),
    },
  })
}

interface GetMirroredPointApi {
  basePoint: Point
  originPoint: Point
  mirrorAngle: number
}

function getMirroredPoint(api: GetMirroredPointApi): Point {
  const { basePoint, originPoint, mirrorAngle } = api
  const baseAngle = Math.atan2(
    basePoint.y - originPoint.y,
    basePoint.x - originPoint.x
  )
  const deltaAngle = baseAngle - mirrorAngle
  const deltaRadius = Math.sqrt(
    Math.pow(basePoint.x - originPoint.x, 2) +
      Math.pow(basePoint.y - originPoint.y, 2)
  )
  return {
    x: deltaRadius * Math.cos(mirrorAngle - deltaAngle) + originPoint.x,
    y: deltaRadius * Math.sin(mirrorAngle - deltaAngle) + originPoint.y,
  }
}

interface GetWaveformPointsAlongLine {
  baseLine: [Point, Point]
  waveformSamples: number[]
  sampleAmplifier: number
}

function getWaveformPointsAlongLine(
  api: GetWaveformPointsAlongLine
): Array<Point> {
  const { waveformSamples, baseLine, sampleAmplifier } = api
  const [pointA, pointB] = baseLine
  const waveformSampleCount = waveformSamples.length
  return waveformSamples.map((someWaveformSample, sampleIndex) => {
    const baselineDeltaY = pointB.y - pointA.y
    const baselineDeltaX = pointB.x - pointA.x
    const stepResolution = waveformSampleCount - 1
    const stepY = baselineDeltaY / stepResolution
    const stepX = baselineDeltaX / stepResolution
    const baseY = stepY * sampleIndex + pointA.y
    const baseX = stepX * sampleIndex + pointA.x
    const baseAngle = Math.atan2(baselineDeltaY, baselineDeltaX)
    const waveformAngle = baseAngle - Math.PI / 2
    return {
      x: sampleAmplifier * someWaveformSample * Math.cos(waveformAngle) + baseX,
      y: sampleAmplifier * someWaveformSample * Math.sin(waveformAngle) + baseY,
    }
  })
}

interface GetWaveformSamplesApi
  extends Pick<GetWaveformSampleApi, 'someWaveform'> {
  sampleCount: number
}

function getWaveformSamples(api: GetWaveformSamplesApi): number[] {
  const { sampleCount, someWaveform } = api
  return new Array(sampleCount).fill(undefined).map((_, sampleIndex) =>
    getWaveformSample({
      someWaveform,
      sampleAngle: ((2 * Math.PI) / (sampleCount - 1)) * sampleIndex,
    })
  )
}

interface GetWaveformSampleApi {
  someWaveform: Waveform
  sampleAngle: number
}

interface Waveform
  extends Pick<RotatedLoop, 'rotationAngle'>,
    Pick<
      RotatedLoop['childCircle'],
      'relativeRadius' | 'relativeDepth' | 'phaseAngle'
    > {}

function getWaveformSample(api: GetWaveformSampleApi): number {
  const { someWaveform, sampleAngle } = api
  const waveformLoop: RotatedLoop = {
    baseCircle: {
      radius: 1,
      center: { x: 0, y: 0 },
    },
    childCircle: {
      relativeRadius: someWaveform.relativeRadius,
      relativeDepth: someWaveform.relativeDepth,
      phaseAngle: someWaveform.phaseAngle,
    },
    rotationAnchor: 'base',
    rotationAngle: someWaveform.rotationAngle,
  }
  const waveformChildCircle = getRotatedLoopChildCircle({
    someRotatedLoop: waveformLoop,
  })
  return (
    getTracePoint({
      traceAngle: sampleAngle,
      somePoints: getRotatedLoopPoints({
        sampleCount: 256,
        someRotatedLoop: waveformLoop,
      }),
      originPoint: waveformChildCircle.center,
    }).y - waveformChildCircle.center.y
  )
}
