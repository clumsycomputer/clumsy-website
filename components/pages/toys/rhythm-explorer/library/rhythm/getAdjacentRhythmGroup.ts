import { RhythmStructure } from "./models";

export interface GetAdjacentRhythmGroupApi {
  someRhythmStructure: RhythmStructure;
}

export function getAdjacentRhythmGroup(api: GetAdjacentRhythmGroupApi) {
  const { someRhythmStructure } = api;
  const terminalDensity = getTerminalDensity(someRhythmStructure.subStructure);
  return new Array(terminalDensity)
    .fill(undefined)
    .map((_, someTerminalOrientation) => {
      const foo = {
        ...someRhythmStructure,
        subStructure: { ...someRhythmStructure.subStructure },
      };
      const adjacentRhythmStructureResult = getRhythmStructureCopy(
        foo,
        foo.subStructure
      );
      return getUpdatedRhythmStructure(
        adjacentRhythmStructureResult,
        adjacentRhythmStructureResult.subStructure,
        someTerminalOrientation
      );
    });
}

function getTerminalDensity(someSubStructure: any): number {
  return someSubStructure.structureType === "interposed"
    ? getTerminalDensity(someSubStructure.subStructure)
    : someSubStructure.rhythmDensity;
}

function getRhythmStructureCopy(
  someRhythmStructure: any,
  subRhythmStructure: any
): RhythmStructure {
  if (subRhythmStructure.structureType === "terminal") {
    return someRhythmStructure;
  } else {
    const copiedSubStructure = { ...subRhythmStructure.subStructure };
    subRhythmStructure.subStructure = copiedSubStructure;
    return getRhythmStructureCopy(someRhythmStructure, copiedSubStructure);
  }
}

function getUpdatedRhythmStructure(
  someRhythmStructure: any,
  rhythmSubStructure: any,
  updatedOrientation: number
): RhythmStructure {
  if (rhythmSubStructure.structureType === "terminal") {
    rhythmSubStructure.rhythmOrientation = updatedOrientation;
    return someRhythmStructure;
  } else {
    return getUpdatedRhythmStructure(
      someRhythmStructure,
      rhythmSubStructure.subStructure,
      updatedOrientation
    );
  }
}
