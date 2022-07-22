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
  return rhythmComponents[0]!.structuredMap;
}
