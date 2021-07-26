import {
  getRotatedLoopChildCircle,
  getRotatedLoopPoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import {
  getDistanceBetweenPoints,
  reduceRhythmSequence,
  ReduceRhythmSequenceApi,
} from '../../../library/helperStuff'
import { DiscreteRhythm, DiscreteWave } from '../../../library/rhythmStuff'

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
    'patternId' | 'baseLoop' | 'baseRhythm' | 'baseWave'
  > {}

export interface GetLoopPatternBaseApi<PatternId extends string> {
  patternId: PatternId
  baseLoop: RotatedLoop
  baseRhythm: DiscreteRhythm
  baseWave: DiscreteWave
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
    baseRhythm,
    patternId,
    baseLoop,
    getOriginPoint,
    getTargetPoint,
    getCellScalar,
    baseWave,
  } = api
  return reduceRhythmSequence<PatternCell<PatternId>>({
    baseRhythm,
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
