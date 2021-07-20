import { Loop } from './circleStuff'
import { PolygonProps } from './components/Polygon'
import { DiscreteRhythm, getElementIndices } from './rhythmStuff'

export interface GetRhythmLoopSequenceApi<RhythmLoop extends Loop> {
  baseRhythm: DiscreteRhythm
  getRhythmLoop: (
    api: GetRhythmLoopApi
  ) => RhythmLoopPolygonProps<RhythmLoop>['rhythmLoop']
  getStrokeColor: (
    api: GetRhythmLoopStrokeColorApi
  ) => RhythmLoopPolygonProps<RhythmLoop>['strokeColor']
  getStrokeWidth: (
    api: GetRhythmLoopStrokeWidthApi
  ) => RhythmLoopPolygonProps<RhythmLoop>['strokeWidth']
}

interface GetRhythmLoopApi extends PropertyGetterBaseApi {}

interface GetRhythmLoopStrokeColorApi extends PropertyGetterBaseApi {}

interface GetRhythmLoopStrokeWidthApi extends PropertyGetterBaseApi {}

interface PropertyGetterBaseApi {
  rhythmResolution: number
  rhythmDensity: number
  rhythmIndex: number
  nestIndex: number
}

export interface RhythmLoopPolygonProps<RhythmLoop extends Loop>
  extends Pick<NonNullable<PolygonProps>, 'strokeColor' | 'strokeWidth'> {
  rhythmLoop: RhythmLoop
}

export function getRhythmLoopSequence<RhythmLoop extends Loop = Loop>(
  api: GetRhythmLoopSequenceApi<RhythmLoop>
): Array<RhythmLoopPolygonProps<RhythmLoop>> {
  const { baseRhythm, getRhythmLoop, getStrokeColor, getStrokeWidth } = api
  const rhythmIndices = getElementIndices({
    targetValue: true,
    someSpace: baseRhythm,
  })
  const rhythmResolution = baseRhythm.length
  const rhythmDensity = rhythmIndices.length
  return rhythmIndices.map((rhythmIndex, nestIndex) => {
    return {
      rhythmLoop: getRhythmLoop({
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
