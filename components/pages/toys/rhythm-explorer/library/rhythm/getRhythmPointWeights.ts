import { RhythmMap, RhythmSlotWeights } from "./models";

export interface GetRhythmPointWeightsApi {
  someRhythmMap: RhythmMap;
  slotWeights: RhythmSlotWeights;
}

export function getRhythmPointWeights(api: GetRhythmPointWeightsApi) {
  const { someRhythmMap, slotWeights } = api;
  return someRhythmMap.rhythmPoints.map(
    (someRhythmPoint) => slotWeights[someRhythmPoint]
  );
}
