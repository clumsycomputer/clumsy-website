import { NextPage } from "next";
import { getPhasedRhythmMap } from "./library/rhythm/getPhasedRhythmMap";
import { getRhythmIntervals } from "./library/rhythm/getRhythmIntervals";
import { getRhythmMap } from "./library/rhythm/getRhythmMap";
import { getRhythmPointWeights } from "./library/rhythm/getRhythmPointWeights";
import { getRhythmSlotWeights } from "./library/rhythm/getRhythmSlotWeights";
import { getRhythmString } from "./library/rhythm/getRhythmString";
import { getRhythmWeight } from "./library/rhythm/getRhythmWeight";
import { RhythmStructure } from "./library/rhythm/models";

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
  const displayData = {
    rhythmStructure,
    rhythmMap: {
      ...rhythmMap,
      rhythmPoints: rhythmMap.rhythmPoints.join(","),
    },
    rhythmString: getRhythmString({
      someRhythmMap: rhythmMap,
    }),
    pointIntervals: rhythmIntervals.join(","),
    generalSlotWeights: generalSlotWeights.join(","),
    generalPointWeights: generalPointWeights.join(","),
    generalRhythmWeight: generalRhythmWeight,
  };
  return <pre>{JSON.stringify(displayData, null, 2)}</pre>;
};
