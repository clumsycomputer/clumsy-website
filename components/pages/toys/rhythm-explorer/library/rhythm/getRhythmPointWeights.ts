import { RhythmMap, RhythmSlotWeights } from "./models";

export interface GetRhythmPointWeightsApi {
  someRhythmMap: RhythmMap;
  rhythmMapSlotWeights: RhythmSlotWeights;
}

export function getRhythmPointWeights(api: GetRhythmPointWeightsApi) {
  const { someRhythmMap, rhythmMapSlotWeights } = api;
  return someRhythmMap.rhythmPoints.map(
    (someRhythmPoint) => rhythmMapSlotWeights[someRhythmPoint]
  );
}
