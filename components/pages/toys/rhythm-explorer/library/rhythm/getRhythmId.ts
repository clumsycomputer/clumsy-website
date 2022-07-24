import { iterateRhythmStructure } from "./iterateRhythmStructure";
import { RhythmStructure } from "./models";

export interface GetRhythmIdApi {
  someRhythmStructure: RhythmStructure;
}

export function getRhythmId(api: GetRhythmIdApi) {
  const { someRhythmStructure } = api;
  let rhythmIdResult = "";
  iterateRhythmStructure({
    someRhythmStructure,
    forEach: (scopedRhythmStructure) => {
      if (scopedRhythmStructure.structureType === "initial") {
        rhythmIdResult = `${scopedRhythmStructure.rhythmResolution}_${scopedRhythmStructure.rhythmPhase}__`;
      } else if (scopedRhythmStructure.structureType === "interposed") {
        rhythmIdResult = `${rhythmIdResult}${scopedRhythmStructure.rhythmDensity}_${scopedRhythmStructure.rhythmOrientation}_${scopedRhythmStructure.rhythmPhase}__`;
      } else if (scopedRhythmStructure.structureType === "terminal") {
        rhythmIdResult = `${rhythmIdResult}${scopedRhythmStructure.rhythmDensity}_${scopedRhythmStructure.rhythmOrientation}`;
      }
    },
  });
  return rhythmIdResult;
}
