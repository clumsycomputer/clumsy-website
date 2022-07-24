import {
  InterposedRhythmStructure,
  RhythmStructure,
  TerminalRhythmStructure,
} from "./models";

export interface IterateRhythmStructureApi {
  someRhythmStructure:
    | RhythmStructure
    | InterposedRhythmStructure
    | TerminalRhythmStructure;
  forEach: (
    someRhythmStructure:
      | RhythmStructure
      | InterposedRhythmStructure
      | TerminalRhythmStructure
  ) => void;
}

export function iterateRhythmStructure(api: IterateRhythmStructureApi) {
  const { someRhythmStructure, forEach } = api;
  forEach(someRhythmStructure);
  if (
    someRhythmStructure.structureType === "initial" ||
    someRhythmStructure.structureType === "interposed"
  ) {
    iterateRhythmStructure({
      forEach,
      someRhythmStructure: someRhythmStructure.subStructure,
    });
  }
}
