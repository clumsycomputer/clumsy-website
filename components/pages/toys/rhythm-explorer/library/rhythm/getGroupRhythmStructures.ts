import {
  iterateRhythmGroupBaseStructure,
  iterateRhythmGroupMemberStructure,
} from "./getRhythmGroupId";
import { RhythmGroupStructure, RhythmStructure } from "./models";

export interface GetGroupRhythmStructuresApi {
  someRhythmGroupStructure: RhythmGroupStructure;
}

export function getGroupRhythmStructures(
  api: GetGroupRhythmStructuresApi
): Array<RhythmStructure> {
  const { someRhythmGroupStructure } = api;
  const initialBaseStructure: Array<any> = [];
  iterateRhythmGroupBaseStructure({
    someRhythmGroupBaseStructure: someRhythmGroupStructure.baseStructure,
    forEach: (someScopedStructure) => {
      const { subStructure, ...scopedStructureResult } = someScopedStructure;
      initialBaseStructure.push(scopedStructureResult);
    },
  });
  let baseStructures: Array<Array<any>> = [initialBaseStructure];
  iterateRhythmGroupMemberStructure({
    someRhythmGroupMemberStructure: someRhythmGroupStructure.memberStructure,
    forEach: (someScopedMemberStructure) => {
      const nextBaseStructures: Array<Array<any>> = [];
      for (let someBaseStructure of baseStructures) {
        for (
          let someOrientation = 0;
          someOrientation < someScopedMemberStructure.rhythmDensity;
          someOrientation++
        ) {
          nextBaseStructures.push([
            ...someBaseStructure,
            {
              structureType: someScopedMemberStructure.structureType,
              rhythmDensity: someScopedMemberStructure.rhythmDensity,
              rhythmOrientation: someOrientation,
            },
          ]);
        }
      }
      baseStructures = nextBaseStructures;
    },
  });
  return baseStructures.map((someBaseStructure) => {
    const rhythmStructureResult = {};
    someBaseStructure.reduce<any>(
      (rhythmStructureTailRef, someScopedStructure) => {
        if (someScopedStructure.structureType === "initial") {
          rhythmStructureTailRef.structureType =
            someScopedStructure.structureType;
          rhythmStructureTailRef.rhythmResolution =
            someScopedStructure.rhythmResolution;
          rhythmStructureTailRef.rhythmPhase = 0;
          return rhythmStructureTailRef;
        } else if (someScopedStructure.structureType === "interposed") {
          rhythmStructureTailRef.subStructure = {
            structureType: someScopedStructure.structureType,
            rhythmDensity: someScopedStructure.rhythmDensity,
            rhythmOrientation: someScopedStructure.rhythmOrientation,
            rhythmPhase: 0,
          };
          return rhythmStructureTailRef.subStructure;
        } else if (someScopedStructure.structureType === "terminal") {
          rhythmStructureTailRef.subStructure = {
            structureType: someScopedStructure.structureType,
            rhythmDensity: someScopedStructure.rhythmDensity,
            rhythmOrientation: someScopedStructure.rhythmOrientation,
          };
          return rhythmStructureTailRef.subStructure;
        }
        return rhythmStructureResult;
      },
      rhythmStructureResult
    );
    return rhythmStructureResult as RhythmStructure;
  });
}
