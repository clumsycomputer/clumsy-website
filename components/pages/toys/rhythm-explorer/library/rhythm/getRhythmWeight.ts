import { RhythmMap, RhythmSlotWeights } from "./models";

export interface GetRhythmWeightApi {
  someRhythmMap: RhythmMap;
  rhythmMapSlotWeights: RhythmSlotWeights;
}

export function getRhythmWeight(api: GetRhythmWeightApi) {
  const { someRhythmMap, rhythmMapSlotWeights } = api;
  return someRhythmMap.rhythmPoints.reduce(
    (rhythmWeightResult, someRhythmPoint) =>
      rhythmWeightResult + rhythmMapSlotWeights[someRhythmPoint],
    0
  );
}
