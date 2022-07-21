import { RhythmMap, RhythmSlotWeights } from "./models";

interface GetRhythmSlotWeightsApi {
  someRhythmMaps: Array<RhythmMap>;
}

export function getRhythmSlotWeights(
  api: GetRhythmSlotWeightsApi
): RhythmSlotWeights {
  const { someRhythmMaps } = api;
  return someRhythmMaps.reduce((rhythmSlotWeightsResult, someRhythmMap) => {
    someRhythmMap.rhythmPoints.forEach((someRhythmPoint) => {
      rhythmSlotWeightsResult[someRhythmPoint] += 1;
    });
    return rhythmSlotWeightsResult;
  }, new Array(someRhythmMaps[0].rhythmResolution).fill(0));
}
