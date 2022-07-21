import { getEuclideanRhythm } from "./getEuclideanRhythm";
import { BasicRhythmStructure, RhythmPoints, RhythmStructure } from "./models";

export interface GetRhythmComponentsDataApi {
  someRhythmStructure: RhythmStructure;
  rhythmComponentsDataResult?: Array<ReturnType<typeof getRhythmComponentData>>;
}

export function getRhythmComponentsData(
  api: GetRhythmComponentsDataApi
): Array<ReturnType<typeof getRhythmComponentData>> {
  const { someRhythmStructure, rhythmComponentsDataResult = [] } = api;
  const structureBasePoints = rhythmComponentsDataResult[0]
    ? rhythmComponentsDataResult[0].structurePoints
    : new Array(someRhythmStructure.rhythmResolution)
        .fill(undefined)
        .map((_, containerCellIndex) => containerCellIndex);
  const currentRhythmStructureData = getRhythmComponentData({
    structureBasePoints,
    isolatedStructure: {
      rhythmResolution: someRhythmStructure.rhythmResolution,
      rhythmPhase: someRhythmStructure.rhythmPhase,
      rhythmDensity: someRhythmStructure.subStructure.rhythmDensity,
      rhythmOrientation: someRhythmStructure.subStructure.rhythmOrientation,
    },
  });
  switch (someRhythmStructure.subStructure.structureType) {
    case "interposed":
      return getRhythmComponentsData({
        someRhythmStructure: {
          rhythmResolution: someRhythmStructure.subStructure.rhythmDensity,
          rhythmPhase: someRhythmStructure.subStructure.rhythmPhase,
          subStructure: someRhythmStructure.subStructure.subStructure,
          structureType: "initial",
        },
        rhythmComponentsDataResult: [
          currentRhythmStructureData,
          ...rhythmComponentsDataResult,
        ],
      });
    case "terminal":
      return [currentRhythmStructureData, ...rhythmComponentsDataResult];
  }
}

interface GetRhythmComponentDataApi {
  isolatedStructure: BasicRhythmStructure;
  structureBasePoints: RhythmPoints;
}

function getRhythmComponentData(api: GetRhythmComponentDataApi): {
  isolatedStructure: BasicRhythmStructure;
  isolatedPoints: RhythmPoints;
  structurePoints: RhythmPoints;
} {
  const { isolatedStructure, structureBasePoints } = api;
  const rhythmStructureDataResult = {
    isolatedStructure,
    isolatedPoints: new Array<number>(isolatedStructure.rhythmDensity),
    structurePoints: new Array<number>(isolatedStructure.rhythmDensity),
  };
  getEuclideanRhythm({
    lhsCount: isolatedStructure.rhythmDensity,
    rhsCount:
      isolatedStructure.rhythmResolution - isolatedStructure.rhythmDensity,
    lhsRhythm: [true],
    rhsRhythm: [false],
  })
    .reduce<RhythmPoints>(
      (isolatedPointsBaseResult, someRhythmSlot, rhythmSlotIndex) => {
        if (someRhythmSlot === true) {
          isolatedPointsBaseResult.push(rhythmSlotIndex);
        }
        return isolatedPointsBaseResult;
      },
      []
    )
    .forEach((someIsolatedPointBase, pointIndex, isolatedPointsBase) => {
      const isolatedOrientationPhase =
        isolatedPointsBase[isolatedStructure.rhythmOrientation]!;
      const isolatedOffset =
        (-isolatedOrientationPhase - isolatedStructure.rhythmPhase) %
        isolatedStructure.rhythmResolution;
      const isolatedPoint =
        (someIsolatedPointBase +
          isolatedOffset +
          isolatedStructure.rhythmResolution) %
        isolatedStructure.rhythmResolution;
      const structurePoint = structureBasePoints[isolatedPoint]!;
      rhythmStructureDataResult.isolatedPoints[pointIndex] = isolatedPoint;
      rhythmStructureDataResult.structurePoints[pointIndex] = structurePoint;
    });
  rhythmStructureDataResult.isolatedPoints.sort(
    (pointA, pointB) => pointA - pointB
  );
  rhythmStructureDataResult.structurePoints.sort(
    (pointA, pointB) => pointA - pointB
  );
  return rhythmStructureDataResult;
}
