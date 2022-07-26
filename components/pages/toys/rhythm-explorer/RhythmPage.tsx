import { NextPage } from "next";
import { getGroupRhythmStructures } from "./library/rhythm/getGroupRhythmStructures";
import { getLineageGroupStructures } from "./library/rhythm/getLineageGroupStructures";
import { getPhasedRhythmMap } from "./library/rhythm/getPhasedRhythmMap";
import { getRhythmComponents } from "./library/rhythm/getRhythmComponents";
import { getRhythmGroupId } from "./library/rhythm/getRhythmGroupId";
import { getRhythmId } from "./library/rhythm/getRhythmId";
import { getRhythmIntervals } from "./library/rhythm/getRhythmIntervals";
import { getRhythmMap } from "./library/rhythm/getRhythmMap";
import { getRhythmPointWeights } from "./library/rhythm/getRhythmPointWeights";
import { getRhythmSlotWeights } from "./library/rhythm/getRhythmSlotWeights";
import { getRhythmString } from "./library/rhythm/getRhythmString";
import { getRhythmWeight } from "./library/rhythm/getRhythmWeight";
import { RhythmStructure } from "./library/rhythm/models";

export const RhythmPage: NextPage = () => {
  const activeRhythmStructure: RhythmStructure = {
    structureType: "initial",
    rhythmResolution: 12,
    rhythmPhase: 0,
    subStructure: {
      structureType: "interposed",
      rhythmDensity: 7,
      rhythmOrientation: 0,
      rhythmPhase: 0,
      subStructure: {
        structureType: "terminal",
        rhythmDensity: 3,
        rhythmOrientation: 0,
      },
    },
  };
  const activeRhythmComponents = getRhythmComponents({
    someRhythmStructure: activeRhythmStructure,
  });
  const activeRhythmMap = getRhythmMap({
    someRhythmStructure: activeRhythmStructure,
  });
  const generalSlotWeights = getRhythmSlotWeights({
    someRhythmMaps: activeRhythmMap.rhythmPoints.map((someRhythmPoint) => {
      return getPhasedRhythmMap({
        someRhythmMap: activeRhythmMap,
        rhythmPhase: someRhythmPoint,
      });
    }),
  });
  const generalPointWeights = getRhythmPointWeights({
    someRhythmMap: activeRhythmMap,
    slotWeights: generalSlotWeights,
  });
  const displayData = {
    activeRhythm: {
      rhythmId: getRhythmId({
        someRhythmStructure: activeRhythmStructure,
      }),
      rhythmStructure: activeRhythmStructure,
      rhythmComponents: activeRhythmComponents
        .reverse()
        .map((someRhythmComponent) => {
          return {
            ...someRhythmComponent,
            isolatedMap: {
              ...someRhythmComponent.isolatedMap,
              rhythmPoints:
                someRhythmComponent.isolatedMap.rhythmPoints.join(","),
            },
            structuredMap: {
              ...someRhythmComponent.structuredMap,
              rhythmPoints:
                someRhythmComponent.structuredMap.rhythmPoints.join(","),
            },
          };
        }),
      rhythmMap: {
        ...activeRhythmMap,
        rhythmPoints: activeRhythmMap.rhythmPoints.join(","),
      },
      rhythmString: getRhythmString({
        someRhythmMap: activeRhythmMap,
      }),
      rhythmIntervals: getRhythmIntervals({
        someRhythmMap: activeRhythmMap,
      }).join(","),
      generalSlotWeights: generalSlotWeights.join(","),
      generalPointWeights: generalPointWeights.join(","),
      generalRhythmWeight: getRhythmWeight({
        someRhythmMap: activeRhythmMap,
        rhythmMapSlotWeights: generalSlotWeights,
      }),
      rhythmLineage: getLineageGroupStructures({
        someRhythmStructure: activeRhythmStructure,
      }).map((someRhythmGroupStructure) => {
        const groupRhythmStructures = getGroupRhythmStructures({
          someRhythmGroupStructure,
        });
        const groupRhythmMaps = groupRhythmStructures.map(
          (someRhythmStructure) => {
            return {
              id: getRhythmId({ someRhythmStructure }),
              map: getRhythmMap({ someRhythmStructure }),
            };
          }
        );
        const groupSlotWeights = getRhythmSlotWeights({
          someRhythmMaps: groupRhythmMaps.map(({ map }) => map),
        });
        const groupRhythmWeights = groupRhythmMaps.map((someRhythmMap) => ({
          id: someRhythmMap.id,
          weight: getRhythmWeight({
            someRhythmMap: someRhythmMap.map,
            rhythmMapSlotWeights: groupSlotWeights,
          }),
        }));
        return {
          groupId: getRhythmGroupId({ someRhythmGroupStructure }),
          // groupStructure: someRhythmGroupStructure,
          groupSlotWeights: groupSlotWeights.join(","),
          groupWeightDistributions: groupRhythmWeights.reduce<any>(
            (weightDistributionsResult, someRhythmWeight) => {
              const currentMemberData =
                weightDistributionsResult[someRhythmWeight.weight];
              weightDistributionsResult[someRhythmWeight.weight] =
                currentMemberData
                  ? {
                      count: currentMemberData.count + 1,
                      members: [
                        ...currentMemberData.members,
                        someRhythmWeight.id,
                      ],
                    }
                  : {
                      count: 1,
                      members: [someRhythmWeight.id],
                    };
              return weightDistributionsResult;
            },
            {}
          ),
          activePointWeights: getRhythmPointWeights({
            someRhythmMap: activeRhythmMap,
            slotWeights: groupSlotWeights,
          }).join(","),
          activeRhythmWeight: getRhythmWeight({
            someRhythmMap: activeRhythmMap,
            rhythmMapSlotWeights: groupSlotWeights,
          }),
          groupMembers: groupRhythmStructures.reduce<any>(
            (groupMembersResult, someRhythmStructure, structureIndex) => {
              const targetRhythmMap = groupRhythmMaps[structureIndex];
              groupMembersResult[targetRhythmMap.id] = {
                rhythmId: targetRhythmMap.id,
                // rhythmStructure: someRhythmStructure,
                // rhythmMap: {
                //   ...targetRhythmMap,
                //   rhythmPoints: targetRhythmMap.rhythmPoints.join(","),
                // },
                rhythmString: getRhythmString({
                  someRhythmMap: targetRhythmMap.map,
                }),
                rhythmPointWeights: getRhythmPointWeights({
                  someRhythmMap: targetRhythmMap.map,
                  slotWeights: groupSlotWeights,
                }).join(","),
                rhythmWeight: groupRhythmWeights[structureIndex].weight,
              };
              return groupMembersResult;
            },
            {}
          ),
        };
      }),
    },
  };
  return <pre>{JSON.stringify(displayData, null, 2)}</pre>;
};
