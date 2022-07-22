import { NextPage } from "next";
import { getAdjacentRhythmGroup } from "./library/rhythm/getAdjacentRhythmGroup";
import { getPhasedRhythmMap } from "./library/rhythm/getPhasedRhythmMap";
import { getRhythmComponents } from "./library/rhythm/getRhythmComponents";
import { getRhythmGroup } from "./library/rhythm/getRhythmGroup";
import { getRhythmIntervals } from "./library/rhythm/getRhythmIntervals";
import { getRhythmMap } from "./library/rhythm/getRhythmMap";
import { getRhythmPointWeights } from "./library/rhythm/getRhythmPointWeights";
import { getRhythmSlotWeights } from "./library/rhythm/getRhythmSlotWeights";
import { getRhythmString } from "./library/rhythm/getRhythmString";
import { getRhythmWeight } from "./library/rhythm/getRhythmWeight";
import { BasicRhythmStructure, RhythmStructure } from "./library/rhythm/models";

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
    rhythmMapSlotWeights: generalSlotWeights,
  });
  const generalRhythmWeight = getRhythmWeight({
    someRhythmMap: rhythmMap,
    rhythmMapSlotWeights: generalSlotWeights,
  });
  const structuredSlotWeights = getRhythmSlotWeights({
    someRhythmMaps: getRhythmGroup({
      someRhythmGroupStructure: {
        rhythmResolution,
        rhythmDensities: [rhythmDensityA, rhythmDensityB],
      },
    }).map((someRhythmStructure) =>
      getRhythmMap({
        someRhythmStructure,
      })
    ),
  });
  const structuredPointWeights = getRhythmPointWeights({
    someRhythmMap: rhythmMap,
    rhythmMapSlotWeights: structuredSlotWeights,
  });
  const structuredRhythmWeight = getRhythmWeight({
    someRhythmMap: rhythmMap,
    rhythmMapSlotWeights: structuredSlotWeights,
  });
  const adjacentStructuredSlotWeights = getRhythmSlotWeights({
    someRhythmMaps: getAdjacentRhythmGroup({
      someRhythmStructure: rhythmStructure,
    }).map((someRhythmStructure) => getRhythmMap({ someRhythmStructure })),
  });
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
    structuredSlotWeights: structuredSlotWeights.join(","),
    structuredPointWeights: structuredPointWeights.join(","),
    structuredRhythmWeight,
    adjacentStructuredSlotWeights: adjacentStructuredSlotWeights.join(","),
    adjacentStructuredPointWeights: getRhythmPointWeights({
      someRhythmMap: rhythmMap,
      rhythmMapSlotWeights: adjacentStructuredSlotWeights,
    }).join(","),
    adjacentStructuredRhythmWeight: getRhythmWeight({
      someRhythmMap: rhythmMap,
      rhythmMapSlotWeights: adjacentStructuredSlotWeights,
    }),
    generalSlotWeights: generalSlotWeights.join(","),
    generalPointWeights: generalPointWeights.join(","),
    generalRhythmWeight,
  };
  return <pre>{JSON.stringify(displayData, null, 2)}</pre>;
};
