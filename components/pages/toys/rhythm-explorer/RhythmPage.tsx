import { NextPage } from "next";
import { getPhasedRhythmMap } from "./library/rhythm/getPhasedRhythmMap";
import { getRhythmComponents } from "./library/rhythm/getRhythmComponents";
import { getRhythmGroupStructures } from "./library/rhythm/getRhythmGroupStructures";
import { getRhythmGroupId } from "./library/rhythm/getRhythmGroupId";
import { getRhythmId } from "./library/rhythm/getRhythmId";
import { getRhythmIntervals } from "./library/rhythm/getRhythmIntervals";
import { getRhythmMap } from "./library/rhythm/getRhythmMap";
import { getRhythmPointWeights } from "./library/rhythm/getRhythmPointWeights";
import { getRhythmSlotWeights } from "./library/rhythm/getRhythmSlotWeights";
import { getRhythmString } from "./library/rhythm/getRhythmString";
import { getRhythmWeight } from "./library/rhythm/getRhythmWeight";
import { iterateRhythmStructure } from "./library/rhythm/iterateRhythmStructure";
import {
  RhythmGroupBaseInterposedStructure,
  RhythmGroupBaseStructure,
  RhythmGroupMemberInterposedStructure,
  RhythmGroupMemberStructure,
  RhythmGroupMemberTerminalStructure,
  RhythmGroupStructure,
  RhythmStructure,
} from "./library/rhythm/models";
import { getRhythmLineageStructure } from "./library/rhythm/getRhythmLineageStructure";

export const RhythmPage: NextPage = () => {
  const rhythmResolution = 12;
  const rhythmDensityA = 7;
  const rhythmDensityB = 3;
  const rhythmStructure: RhythmStructure = {
    structureType: "initial",
    rhythmResolution,
    rhythmPhase: 0,
    subStructure: {
      structureType: "interposed",
      rhythmDensity: rhythmDensityA,
      rhythmOrientation: 0,
      rhythmPhase: 0,
      subStructure: {
        structureType: "terminal",
        rhythmDensity: rhythmDensityB,
        rhythmOrientation: 0,
      },
    },
  };
  const rhythmComponents = getRhythmComponents({
    someRhythmStructure: rhythmStructure,
  });
  const rhythmMap = getRhythmMap({
    someRhythmStructure: rhythmStructure,
  });
  const rhythmIntervals = getRhythmIntervals({
    someRhythmMap: rhythmMap,
  });
  const generalSlotWeights = getRhythmSlotWeights({
    someRhythmMaps: rhythmMap.rhythmPoints.map((someRhythmPoint) => {
      return getPhasedRhythmMap({
        someRhythmMap: rhythmMap,
        rhythmPhase: someRhythmPoint,
      });
    }),
  });
  const generalPointWeights = getRhythmPointWeights({
    someRhythmMap: rhythmMap,
    slotWeights: generalSlotWeights,
  });
  const generalRhythmWeight = getRhythmWeight({
    someRhythmMap: rhythmMap,
    rhythmMapSlotWeights: generalSlotWeights,
  });
  // const structuredSlotWeights = getRhythmSlotWeights({
  //   someRhythmMaps: getRhythmGroupStructures({
  //     someRhythmGroupStructure: {
  //       rhythmResolution,
  //       rhythmDensities: [rhythmDensityA, rhythmDensityB],
  //     },
  //   }).map((someRhythmStructure) =>
  //     getRhythmMap({
  //       someRhythmStructure,
  //     })
  //   ),
  // });
  // const structuredPointWeights = getRhythmPointWeights({
  //   someRhythmMap: rhythmMap,
  //   slotWeights: structuredSlotWeights,
  // });
  // const structuredRhythmWeight = getRhythmWeight({
  //   someRhythmMap: rhythmMap,
  //   rhythmMapSlotWeights: structuredSlotWeights,
  // });
  // const adjacentRhythmGroup = getAdjacentRhythmGroup({
  //   someRhythmStructure: rhythmStructure,
  // });
  // const adjacentStructuredSlotWeights = getRhythmSlotWeights({
  //   someRhythmMaps: adjacentRhythmGroup.map((someRhythmStructure) =>
  //     getRhythmMap({ someRhythmStructure })
  //   ),
  // });
  const displayData = {
    rhythmStructure,
    rhythmComponents: rhythmComponents.reverse().map((someRhythmComponent) => {
      return {
        ...someRhythmComponent,
        isolatedMap: {
          ...someRhythmComponent.isolatedMap,
          rhythmPoints: someRhythmComponent.isolatedMap.rhythmPoints.join(","),
        },
        structuredMap: {
          ...someRhythmComponent.structuredMap,
          rhythmPoints:
            someRhythmComponent.structuredMap.rhythmPoints.join(","),
        },
      };
    }),
    rhythmMap: {
      ...rhythmMap,
      rhythmPoints: rhythmMap.rhythmPoints.join(","),
    },
    rhythmString: getRhythmString({
      someRhythmMap: rhythmMap,
    }),
    pointIntervals: rhythmIntervals.join(","),
    // structuredSlotWeights: structuredSlotWeights.join(","),
    // structuredPointWeights: structuredPointWeights.join(","),
    // structuredRhythmWeight,
    // adjacentStructuredSlotWeights: adjacentStructuredSlotWeights.join(","),
    // adjacentStructuredPointWeights: getRhythmPointWeights({
    //   someRhythmMap: rhythmMap,
    //   slotWeights: adjacentStructuredSlotWeights,
    // }).join(","),
    // adjacentStructuredRhythmWeight: getRhythmWeight({
    //   someRhythmMap: rhythmMap,
    //   rhythmMapSlotWeights: adjacentStructuredSlotWeights,
    // }),
    generalSlotWeights: generalSlotWeights.join(","),
    generalPointWeights: generalPointWeights.join(","),
    generalRhythmWeight,
    // adjacentRhythmGroup: {
    //   rhythmGroupId: getRhythmGroupId({
    //     someRhythmGroupStructure: {
    //       baseStructure: {
    //         structureType: "initial",
    //         rhythmResolution,
    //         subStructure: {
    //           structureType: "interposed",
    //           rhythmDensity: rhythmDensityA,
    //           rhythmOrientation: 0,
    //         },
    //       },
    //       memberStructure: {
    //         structureType: "terminal",
    //         rhythmDensity: rhythmDensityB,
    //       },
    //     },
    //   }),
    //   groupSlotWeights: adjacentStructuredSlotWeights.join(","),
    //   groupMembers: adjacentRhythmGroup.map((someRhythmStructure) => {
    //     const someRhythmMap = getRhythmMap({
    //       someRhythmStructure,
    //     });
    //     return {
    //       rhythmId: getRhythmId({
    //         someRhythmStructure,
    //       }),
    //       // rhythmStructure: someRhythmStructure,
    //       // rhythmMap: {
    //       //   ...someRhythmMap,
    //       //   rhythmPoints: someRhythmMap.rhythmPoints.join(","),
    //       // },
    //       rhythmString: getRhythmString({
    //         someRhythmMap,
    //       }),
    //       rhythmIntervals: getRhythmIntervals({
    //         someRhythmMap,
    //       }).join(","),
    //       pointWeights: getRhythmPointWeights({
    //         someRhythmMap,
    //         slotWeights: adjacentStructuredSlotWeights,
    //       }).join(","),
    //       groupWeight: getRhythmWeight({
    //         someRhythmMap,
    //         rhythmMapSlotWeights: adjacentStructuredSlotWeights,
    //       }),
    //     };
    //   }),
    // },
    rhythmLineage: getRhythmLineageStructure({
      someRhythmStructure: rhythmStructure,
    }).map((someRhythmGroupStructure) => {
      return {
        groupId: getRhythmGroupId({ someRhythmGroupStructure }),
        groupStructure: someRhythmGroupStructure,
      };
    }),
  };
  return <pre>{JSON.stringify(displayData, null, 2)}</pre>;
};
