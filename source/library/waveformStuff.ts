import {
  getRotatedLoopChildCircle,
  getRotatedLoopPoints,
  getTracePoint,
  Point,
  RotatedLoop,
} from './circleStuff'

export interface Waveform
  extends Pick<RotatedLoop, 'rotationAngle'>,
    Pick<
      RotatedLoop['childCircle'],
      'relativeRadius' | 'relativeDepth' | 'phaseAngle'
    > {}

export interface GetWaveformPointsAlongLine {
  baseLine: [Point, Point]
  waveformSamples: number[]
  sampleAmplifier: number
}

export function getWaveformPointsAlongLine(
  api: GetWaveformPointsAlongLine
): Array<Point> {
  const { waveformSamples, baseLine, sampleAmplifier } = api
  const [pointA, pointB] = baseLine
  const baselineDeltaY = pointB.y - pointA.y
  const baselineDeltaX = pointB.x - pointA.x
  const baseAngle = Math.atan2(baselineDeltaY, baselineDeltaX)
  const waveformSampleCount = waveformSamples.length
  const stepResolution = waveformSampleCount - 1
  const stepY = baselineDeltaY / stepResolution
  const stepX = baselineDeltaX / stepResolution
  return waveformSamples.map((someWaveformSample, sampleIndex) =>
    getWaveformPoint({
      baseAngle,
      basePoint: {
        x: stepX * sampleIndex + pointA.x,
        y: stepY * sampleIndex + pointA.y,
      },
      waveformSample: sampleAmplifier * someWaveformSample,
    })
  )
}

export interface GetWaveformPointApi {
  basePoint: Point
  baseAngle: number
  waveformSample: number
}

export function getWaveformPoint(api: GetWaveformPointApi): Point {
  const { baseAngle, waveformSample, basePoint } = api
  const waveformAngle = baseAngle - Math.PI / 2
  return {
    x: waveformSample * Math.cos(waveformAngle) + basePoint.x,
    y: waveformSample * Math.sin(waveformAngle) + basePoint.y,
  }
}

export interface GetWaveformSamplesApi
  extends Pick<GetWaveformSampleApi, 'someWaveform'> {
  sampleCount: number
}

export function getWaveformSamples(api: GetWaveformSamplesApi): number[] {
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

export function getWaveformSample(api: GetWaveformSampleApi): number {
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
