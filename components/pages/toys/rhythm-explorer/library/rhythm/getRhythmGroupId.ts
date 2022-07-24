import {
  RhythmGroupBaseInterposedStructure,
  RhythmGroupBaseStructure,
  RhythmGroupMemberInterposedStructure,
  RhythmGroupMemberStructure,
  RhythmGroupMemberTerminalStructure,
  RhythmGroupStructure,
} from "./models";

export interface GetRhythmGroupIdApi {
  someRhythmGroupStructure: RhythmGroupStructure;
}

export function getRhythmGroupId(api: GetRhythmGroupIdApi) {
  const { someRhythmGroupStructure } = api;
  let rhythmGroupId = "";
  iterateRhythmGroupBaseStructure({
    someRhythmGroupBaseStructure: someRhythmGroupStructure.baseStructure,
    forEach: (someBaseStructure) => {
      if (
        someBaseStructure.structureType === "initial" &&
        someBaseStructure.subStructure === undefined
      ) {
        rhythmGroupId = `${someBaseStructure.rhythmResolution}`;
      } else if (
        someBaseStructure.structureType === "initial" &&
        someBaseStructure.subStructure !== undefined
      ) {
        rhythmGroupId = `${someBaseStructure.rhythmResolution}__`;
      } else if (someBaseStructure.structureType === "interposed") {
        rhythmGroupId = `${rhythmGroupId}${someBaseStructure.rhythmDensity}_${someBaseStructure.rhythmOrientation}`;
      }
    },
  });
  rhythmGroupId = `${rhythmGroupId}___`;
  iterateRhythmGroupMemberStructure({
    someRhythmGroupMemberStructure: someRhythmGroupStructure.memberStructure,
    forEach: (someMemberStructure) => {
      if (someMemberStructure.structureType === "interposed") {
        rhythmGroupId = `${rhythmGroupId}${someMemberStructure.rhythmDensity}__`;
      } else if (someMemberStructure.structureType === "terminal") {
        rhythmGroupId = `${rhythmGroupId}${someMemberStructure.rhythmDensity}`;
      }
    },
  });
  return rhythmGroupId;
}

interface IterateRhythmGroupBaseStructureApi {
  someRhythmGroupBaseStructure:
    | RhythmGroupBaseStructure
    | RhythmGroupBaseInterposedStructure;
  forEach: (
    someBaseStructure:
      | RhythmGroupBaseStructure
      | RhythmGroupBaseInterposedStructure
  ) => void;
}

function iterateRhythmGroupBaseStructure(
  api: IterateRhythmGroupBaseStructureApi
) {
  const { someRhythmGroupBaseStructure, forEach } = api;
  forEach(someRhythmGroupBaseStructure);
  if (
    (someRhythmGroupBaseStructure.structureType === "initial" ||
      someRhythmGroupBaseStructure.structureType === "interposed") &&
    someRhythmGroupBaseStructure.subStructure !== undefined
  ) {
    iterateRhythmGroupBaseStructure({
      forEach,
      someRhythmGroupBaseStructure: someRhythmGroupBaseStructure.subStructure,
    });
  }
}

interface IterateRhythmGroupMemberStructureApi {
  someRhythmGroupMemberStructure: RhythmGroupMemberStructure;
  forEach: (
    someMemberStructure:
      | RhythmGroupMemberStructure
      | RhythmGroupMemberInterposedStructure
      | RhythmGroupMemberTerminalStructure
  ) => void;
}

function iterateRhythmGroupMemberStructure(
  api: IterateRhythmGroupMemberStructureApi
) {
  const { someRhythmGroupMemberStructure, forEach } = api;
  forEach(someRhythmGroupMemberStructure);
  if (someRhythmGroupMemberStructure.structureType === "interposed") {
    iterateRhythmGroupMemberStructure({
      forEach,
      someRhythmGroupMemberStructure:
        someRhythmGroupMemberStructure.subStructure,
    });
  }
}
