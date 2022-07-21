import { getRhythmComponents } from "./getRhythmComponents";
import { RhythmMap, RhythmStructure } from "./models";

export interface GetRhythmMapApi {
  someRhythmStructure: RhythmStructure;
}

export function getRhythmMap(api: GetRhythmMapApi): RhythmMap {
  const { someRhythmStructure } = api;
  const rhythmComponents = getRhythmComponents({
    someRhythmStructure,
  });
  return {
    rhythmResolution: someRhythmStructure.rhythmResolution,
    rhythmPoints: rhythmComponents[0]!.structuredPoints,
  };
}
