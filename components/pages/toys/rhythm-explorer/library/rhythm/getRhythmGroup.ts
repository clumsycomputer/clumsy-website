import { RhythmStructure } from "./models";

export interface GetRhythmGroupApi {
  someRhythmGroupStructure: RhythmGroupStructure;
}

export function getRhythmGroup(api: GetRhythmGroupApi) {
  const { someRhythmGroupStructure } = api;
  return _getRhythmGroup({
    rhythmGroupResult: [],
    currentStructure: [],
    rhythmResolution: someRhythmGroupStructure.rhythmResolution,
    remainingDensities: [...someRhythmGroupStructure.rhythmDensities],
  });
}

interface _GetRhythmGroupApi {
  rhythmResolution: number;
  remainingDensities: Array<number>;
  currentStructure: Array<{
    density: number;
    orientation: number;
  }>;
  rhythmGroupResult: Array<RhythmStructure>;
}

function _getRhythmGroup(api: _GetRhythmGroupApi): Array<RhythmStructure> {
  const {
    remainingDensities,
    currentStructure,
    rhythmGroupResult,
    rhythmResolution,
  } = api;
  const nextRhythmGroupResult = [...rhythmGroupResult];
  if (remainingDensities.length === 0) {
    const rhythmStructureResult: any = {
      structureType: "initial",
      rhythmResolution,
      rhythmPhase: 0,
    };
    currentStructure.reduce<any>(
      (rhythmStructureResult, someComponentParts, componentIndex) => {
        rhythmStructureResult.subStructure =
          componentIndex === currentStructure.length - 1
            ? {
                structureType: "terminal",
                rhythmDensity: someComponentParts.density,
                rhythmOrientation: someComponentParts.orientation,
              }
            : {
                structureType: "interposed",
                rhythmPhase: 0,
                rhythmDensity: someComponentParts.density,
                rhythmOrientation: someComponentParts.orientation,
              };
        return rhythmStructureResult.subStructure;
      },
      rhythmStructureResult
    );
    nextRhythmGroupResult.push(rhythmStructureResult);
  } else if (remainingDensities.length > 0) {
    const [componentDensity, ...nextRemainingDensities] = remainingDensities;
    for (
      let componentOrientation = 0;
      componentOrientation < componentDensity;
      componentOrientation++
    ) {
      nextRhythmGroupResult.push(
        ..._getRhythmGroup({
          rhythmResolution,
          rhythmGroupResult,
          remainingDensities: nextRemainingDensities,
          currentStructure: [
            ...currentStructure,
            {
              density: componentDensity,
              orientation: componentOrientation,
            },
          ],
        })
      );
    }
  }
  return nextRhythmGroupResult;
}

interface RhythmGroupStructure {
  rhythmResolution: number;
  rhythmDensities: Array<number>;
}
