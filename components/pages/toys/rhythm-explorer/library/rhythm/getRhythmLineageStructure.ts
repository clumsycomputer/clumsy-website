import { iterateRhythmStructure } from "./iterateRhythmStructure";
import {
  RhythmGroupBaseInterposedStructure,
  RhythmGroupBaseStructure,
  RhythmGroupMemberInterposedStructure,
  RhythmGroupMemberStructure,
  RhythmGroupMemberTerminalStructure,
  RhythmGroupStructure,
  RhythmStructure,
} from "./models";

export interface GetRhythmLineageStructureApi {
  someRhythmStructure: RhythmStructure;
}

export function getRhythmLineageStructure(
  api: GetRhythmLineageStructureApi
): Array<RhythmGroupStructure> {
  const { someRhythmStructure } = api;
  const lineageGroupStructuresResult: Array<RhythmGroupStructure> = [];
  let baseStructureRef: RhythmGroupBaseStructure | null = null;
  let baseSubStructureRef:
    | RhythmGroupBaseStructure
    | RhythmGroupBaseInterposedStructure
    | null = null;
  let memberStructureRef = getInitialMemberStructureRef({
    someRhythmStructure,
  });
  iterateRhythmStructure({
    someRhythmStructure,
    forEach: (someScopedRhythmStructure) => {
      if (someScopedRhythmStructure.structureType === "initial") {
        baseStructureRef = {
          structureType: someScopedRhythmStructure.structureType,
          rhythmResolution: someScopedRhythmStructure.rhythmResolution,
        };
        baseSubStructureRef = baseStructureRef;
        memberStructureRef = memberStructureRef;
        lineageGroupStructuresResult.push({
          baseStructure: JSON.parse(JSON.stringify(baseStructureRef)),
          memberStructure: JSON.parse(JSON.stringify(memberStructureRef)),
        });
      } else if (someScopedRhythmStructure.structureType === "interposed") {
        baseSubStructureRef!.subStructure = {
          structureType: someScopedRhythmStructure.structureType,
          rhythmDensity: someScopedRhythmStructure.rhythmDensity,
          rhythmOrientation: someScopedRhythmStructure.rhythmOrientation,
        };
        baseSubStructureRef = baseSubStructureRef!.subStructure;
        memberStructureRef = (
          memberStructureRef as RhythmGroupMemberInterposedStructure
        ).subStructure;
        lineageGroupStructuresResult.push({
          baseStructure: JSON.parse(JSON.stringify(baseStructureRef)),
          memberStructure: JSON.parse(JSON.stringify(memberStructureRef)),
        });
      } else if (someScopedRhythmStructure.structureType === "terminal") {
        // no-op
      }
    },
  });
  return lineageGroupStructuresResult;
}

interface GetInitialMemberStructureRefApi {
  someRhythmStructure: RhythmStructure;
}

function getInitialMemberStructureRef(
  api: GetInitialMemberStructureRefApi
): RhythmGroupMemberStructure {
  const { someRhythmStructure } = api;
  let initialMemberStructureRef:
    | Omit<RhythmGroupMemberInterposedStructure, "subStructure">
    | RhythmGroupMemberTerminalStructure
    | null = null;
  let scopedMemberStructureRef: any = null;
  // | Omit<RhythmGroupMemberInterposedStructure, "subStructure">
  // | RhythmGroupMemberTerminalStructure
  // | null = null;
  iterateRhythmStructure({
    someRhythmStructure: someRhythmStructure.subStructure,
    forEach: (someScopeRhythmStructure) => {
      if (
        initialMemberStructureRef === null &&
        (someScopeRhythmStructure.structureType === "interposed" ||
          someScopeRhythmStructure.structureType === "terminal")
      ) {
        initialMemberStructureRef = {
          structureType: someScopeRhythmStructure.structureType,
          rhythmDensity: someScopeRhythmStructure.rhythmDensity,
        };
        scopedMemberStructureRef = initialMemberStructureRef;
      } else if (someScopeRhythmStructure.structureType === "interposed") {
        scopedMemberStructureRef!.subStructure = {
          structureType: someScopeRhythmStructure.structureType,
          rhythmDensity: someScopeRhythmStructure.rhythmDensity,
        };
        scopedMemberStructureRef = scopedMemberStructureRef!.subStructure;
      } else if (someScopeRhythmStructure.structureType === "terminal") {
        scopedMemberStructureRef!.subStructure = {
          structureType: someScopeRhythmStructure.structureType,
          rhythmDensity: someScopeRhythmStructure.rhythmDensity,
        };
      }
    },
  });
  return initialMemberStructureRef as unknown as RhythmGroupMemberStructure;
}
