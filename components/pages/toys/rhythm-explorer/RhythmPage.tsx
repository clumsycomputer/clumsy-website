import { NextPage } from "next";
import { getPhasedRhythmMap } from "./library/rhythm/getPhasedRhythmMap";
import { getRhythmMap } from "./library/rhythm/getRhythmMap";
import { getRhythmSlotWeights } from "./library/rhythm/getRhythmSlotsWeights";
import { RhythmStructure } from "./library/rhythm/models";

export const RhythmPage: NextPage = () => {
  const rhythmStructure: RhythmStructure = {
    structureType: "initial",
    rhythmResolution: 12,
    rhythmPhase: 0,
    subStructure: {
      structureType: "terminal",
      rhythmDensity: 7,
      rhythmOrientation: 0,
    },
  };
  const rhythmMap = getRhythmMap({
    someRhythmStructure: {
      structureType: "initial",
      rhythmResolution: 12,
      rhythmPhase: 0,
      subStructure: {
        structureType: "terminal",
        rhythmDensity: 7,
        rhythmOrientation: 0,
      },
    },
  });
  const rhythmPointIntervals = rhythmMap.rhythmPoints.map(
    (someRhythmPoint, pointIndex) =>
      (rhythmMap.rhythmPoints[(pointIndex + 1) % rhythmMap.rhythmResolution] ||
        rhythmMap.rhythmResolution) - someRhythmPoint
  );
  const rhythmSlotWeights = getRhythmSlotWeights({
    someRhythmMaps: rhythmMap.rhythmPoints.map((someRhythmPoint) => {
      return getPhasedRhythmMap({
        someRhythmMap: rhythmMap,
        rhythmPhase: someRhythmPoint,
      });
    }),
  });
  const rhythmPointWeights = rhythmMap.rhythmPoints.map(
    (someRhythmPoint) => rhythmSlotWeights[someRhythmPoint]
  );
  const rhythmWeight = rhythmMap.rhythmPoints.reduce(
    (rhythmWeightResult, someRhythmPoint) =>
      rhythmWeightResult + rhythmSlotWeights[someRhythmPoint],
    0
  );
  const displayData = {
    rhythmStructure,
    rhythmMap: {
      ...rhythmMap,
      // rhythmPoints: rhythmMap.rhythmPoints.map(
      //   (someRhythmPoint, someRhythmPointIndex) => {
      //     return {
      //       slotIndex: someRhythmPoint,
      //       pointInterval: rhythmPointIntervals[someRhythmPointIndex],
      //       pointWeight: rhythmPointWeights[someRhythmPointIndex],
      //     };
      //   }
      // ),
      rhythmPoints: rhythmMap.rhythmPoints.join(","),
      rhythmPointIntervals: rhythmPointIntervals.join(","),
      rhythmPointWeights: rhythmPointWeights.join(","),
    },
    rhythmString: rhythmMap.rhythmPoints
      .reduce((rhythmStringResult, someRhythmPoint) => {
        rhythmStringResult[someRhythmPoint] = 1;
        return rhythmStringResult;
      }, new Array(rhythmMap.rhythmResolution).fill(0))
      .join(""),
    rhythmSlotWeights: rhythmSlotWeights.join(","),
    rhythmWeight: rhythmWeight,
  };
  return <pre>{JSON.stringify(displayData, null, 2)}</pre>;
};
