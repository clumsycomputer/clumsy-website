import { RhythmMap } from "./models";

interface GetRhythmSlotWeightsApi {
  someRhythmMaps: Array<RhythmMap>;
}

export function getRhythmSlotWeights(api: GetRhythmSlotWeightsApi) {
  const { someRhythmMaps } = api;
  return someRhythmMaps.reduce(
    (rhythmPointDistributionsResult, someRhythmMap) => {
      someRhythmMap.rhythmPoints.forEach((someRhythmPoint) => {
        rhythmPointDistributionsResult[someRhythmPoint] += 1;
      });
      return rhythmPointDistributionsResult;
    },
    new Array(someRhythmMaps[0].rhythmResolution).fill(0)
  );
}
