import {
  getRotatedLoopChildCircle,
  getRotatedLoopPoint,
  GetRotatedLoopPointApi,
  getTracePoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
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
  getCommonalityWave,
} from '../../../library/rhythmStuff'

export interface GetStupidPatternApi<PatternId extends string>
  extends GetLoopPatternApi<PatternId> {}

export function getStupidPattern<PatternId extends string>(
  api: GetStupidPatternApi<PatternId>
) {
  return [getLoopRayPattern, getLoopContractingPattern, getLoopExpandingPattern]
    .map((somePatternGetter) => somePatternGetter(api))
    .flat()
}

export interface GetLoopRayPattern<PatternId extends string>
  extends GetLoopPatternApi<PatternId> {}

export function getLoopRayPattern<PatternId extends string>(
  api: GetLoopRayPattern<PatternId>
) {
  return getLoopPatternBase({
    ...api,
    getOriginPoint: ({ baseLoop, originAngle }) =>
      getRotatedLoopPoint({
        someRotatedLoop: baseLoop,
        sampleAngle: originAngle,
      }),
    getTargetPoint: ({ baseLoop, originAngle }) =>
      getRotatedLoopPoint({
        someRotatedLoop: baseLoop,
        sampleAngle: originAngle + Math.PI,
      }),
    getCellScalar: ({ cellWeight, rhythmResolution, lineLength }) =>
      (cellWeight / rhythmResolution) * lineLength,
  })
}

export interface GetLoopExpandingPatternApi<PatternId extends string>
  extends GetLoopPatternApi<PatternId> {}

export function getLoopExpandingPattern<PatternId extends string>(
  api: GetLoopExpandingPatternApi<PatternId>
) {
  return getLoopPatternBase({
    ...api,
    getOriginPoint: ({ baseLoop, originAngle }) =>
      getRotatedLoopChildCircle({
        someRotatedLoop: baseLoop,
      }).center,
    getTargetPoint: ({ baseLoop, originAngle }) =>
      getRotatedLoopPoint({
        someRotatedLoop: baseLoop,
        sampleAngle: originAngle,
      }),
    getCellScalar: ({ cellWeight, rhythmResolution, lineLength }) =>
      (cellWeight / rhythmResolution) * lineLength,
  })
}

export interface GetLoopContractingPatternApi<PatternId extends string>
  extends GetLoopPatternApi<PatternId> {}

export function getLoopContractingPattern<PatternId extends string>(
  api: GetLoopContractingPatternApi<PatternId>
) {
  return getLoopPatternBase({
    ...api,
    getOriginPoint: ({ baseLoop, originAngle }) =>
      getRotatedLoopPoint({
        someRotatedLoop: baseLoop,
        sampleAngle: originAngle,
      }),
    getTargetPoint: ({ baseLoop }) =>
      getRotatedLoopChildCircle({
        someRotatedLoop: baseLoop,
      }).center,
    getCellScalar: ({ cellWeight, rhythmResolution, lineLength }) =>
      (cellWeight / rhythmResolution) * lineLength,
  })
}

export interface GetLoopPatternApi<PatternId extends string>
  extends Pick<
    GetLoopPatternBaseApi<PatternId>,
    'patternId' | 'baseLoop' | 'spacerRhythm' | 'waveRhythm'
  > {}

export interface GetLoopPatternBaseApi<PatternId extends string> {
  patternId: PatternId
  baseLoop: RotatedLoop
  spacerRhythm: DiscreteRhythm // needs to be same resolution as waveRhythm
  waveRhythm: DiscreteRhythm // needs to be same resolution as spacerRhythm
  getOriginPoint: (api: { originAngle: number; baseLoop: RotatedLoop }) => Point
  getTargetPoint: (api: { originAngle: number; baseLoop: RotatedLoop }) => Point
  getCellScalar: (
    api: Parameters<
      ReduceRhythmSequenceApi<PatternCell<PatternId>>['getCellResult']
    >[0] & {
      lineLength: number
      cellWeight: number
    }
  ) => number
}

export type PatternCell<PatternId extends string> = PatternCellBase<PatternId> &
  Parameters<ReduceRhythmSequenceApi<unknown>['getCellResult']>[0]

export interface PatternCellBase<PatternId extends string> {
  baseLoop: RotatedLoop
  cellKey: CellKey<PatternId>
  cellOriginPoint: Point
  cellTargetPoint: Point
  cellAngle: number
  cellWeight: number
  cellScalar: number
  cellPoint: Point
}

export type CellKey<
  PatternId extends string,
  RhythmResolution extends number = number,
  RhythmDensity extends number = number,
  RhythmIndex extends number = number,
  CellIndex extends number = number
> = `${PatternId}-${RhythmResolution}-${RhythmDensity}-${RhythmIndex}-${CellIndex}`

export function getLoopPatternBase<PatternId extends string>(
  api: GetLoopPatternBaseApi<PatternId>
) {
  const {
    spacerRhythm,
    patternId,
    baseLoop,
    getOriginPoint,
    getTargetPoint,
    getCellScalar,
    waveRhythm,
  } = api
  const baseWave = getCommonalityWave({
    baseRhythm: waveRhythm,
  })
  return reduceRhythmSequence<PatternCell<PatternId>>({
    baseRhythm: spacerRhythm,
    getCellResult: (someCellStuff) => {
      const cellKey: CellKey<PatternId> = `${patternId}-${someCellStuff.rhythmResolution}-${someCellStuff.rhythmDensity}-${someCellStuff.rhythmIndex}-${someCellStuff.nestIndex}`
      const originAngle =
        ((2 * Math.PI) / someCellStuff.rhythmResolution) *
        (someCellStuff.rhythmResolution - someCellStuff.rhythmIndex)
      const cellOriginPoint = getOriginPoint({
        baseLoop,
        originAngle,
      })
      const cellTargetPoint = getTargetPoint({
        baseLoop,
        originAngle,
      })
      const cellAngle = Math.atan2(
        cellTargetPoint.y - cellOriginPoint.y,
        cellTargetPoint.x - cellOriginPoint.x
      )
      const lineLength = getDistanceBetweenPoints({
        pointA: cellOriginPoint,
        pointB: cellTargetPoint,
      })
      const cellWeight = baseWave[someCellStuff.rhythmIndex]!
      const cellScalar = getCellScalar({
        ...someCellStuff,
        lineLength,
        cellWeight,
      })
      const cellPoint = {
        x: cellScalar * Math.cos(cellAngle) + cellOriginPoint.x,
        y: cellScalar * Math.sin(cellAngle) + cellOriginPoint.y,
      }
      return {
        ...someCellStuff,
        baseLoop,
        cellKey,
        cellOriginPoint,
        cellTargetPoint,
        cellAngle,
        cellWeight,
        cellScalar,
        cellPoint,
      }
    },
  })
}

export interface GetOscillatedLoopPointsApi {
  loopPoints: Array<Point>
  loopCenter: Point
  sampleCount: number
  oscillationRadius: number
  oscillationFrequency: number
}

export function getOscillatedLoopPoints(api: GetOscillatedLoopPointsApi) {
  const {
    sampleCount,
    loopPoints,
    loopCenter,
    oscillationRadius,
    oscillationFrequency,
  } = api
  return new Array(sampleCount).fill(undefined).map<Point>((_, sampleIndex) => {
    const currentSampleAngle = ((2 * Math.PI) / sampleCount) * sampleIndex
    const basePoint = getTracePoint({
      somePoints: loopPoints,
      originPoint: loopCenter,
      traceAngle: currentSampleAngle,
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

export interface GetWaveFrequencyApi {
  baseFrequency: number
  scaleResolution: number
  frequencyIndex: number
}

export function getWaveFrequency(api: GetWaveFrequencyApi) {
  const { baseFrequency, frequencyIndex, scaleResolution } = api
  return baseFrequency * Math.pow(2, frequencyIndex / scaleResolution)
}

export interface GetNestCompositeLoopsPointsApi {
  baseLoop: CompositeLoop
  sampleCount: number
  shiftAngle: number
  shiftScalar: number
  nestRhythm: DiscreteRhythm
}

export function getNestCompositeLoopsPoints(
  api: GetNestCompositeLoopsPointsApi
) {
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
  return reduceRhythmSequence<{
    loopCenter: Point
    loopPoints: Array<Point>
  }>({
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
        loopCenter: currentCenter,
        loopPoints: cellLoopBasePoints.map((someBasePoint, pointIndex) => {
          const maxRadius = getDistanceBetweenPoints({
            pointA: compositeCenter,
            pointB: someBasePoint,
          })
          const currentBaseRadius =
            maxRadius -
            (maxRadius / someNestStuff.rhythmResolution) *
              someNestStuff.rhythmIndex
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