import { getEuclideanRhythm } from "./getEuclideanRhythm";
import { BasicRhythmStructure, RhythmPoints, RhythmStructure } from "./models";

export interface GetRhythmComponentsApi
  extends Pick<_GetRhythmComponentsApi, "someRhythmStructure"> {}

export function getRhythmComponents(api: GetRhythmComponentsApi) {
  const { someRhythmStructure } = api;
  return _getRhythmComponents({
    someRhythmStructure,
    rhythmComponentsDataResult: [],
    structuredBasePoints: new Array(someRhythmStructure.rhythmResolution)
      .fill(undefined)
      .map((_, containerCellIndex) => containerCellIndex),
  });
}

interface _GetRhythmComponentsApi
  extends Pick<GetRhythmComponentDataApi, "structuredBasePoints"> {
  someRhythmStructure: RhythmStructure;
  rhythmComponentsDataResult: Array<ReturnType<typeof getRhythmComponentData>>;
}

function _getRhythmComponents(
  api: _GetRhythmComponentsApi
): Array<ReturnType<typeof getRhythmComponentData>> {
  const {
    structuredBasePoints,
    someRhythmStructure,
    rhythmComponentsDataResult,
  } = api;
  const currentRhythmStructureData = getRhythmComponentData({
    structuredBasePoints,
    isolatedStructure: {
      rhythmResolution: someRhythmStructure.rhythmResolution,
      rhythmPhase: someRhythmStructure.rhythmPhase,
      rhythmDensity: someRhythmStructure.subStructure.rhythmDensity,
      rhythmOrientation: someRhythmStructure.subStructure.rhythmOrientation,
    },
  });
  switch (someRhythmStructure.subStructure.structureType) {
    case "interposed":
      return _getRhythmComponents({
        structuredBasePoints: currentRhythmStructureData.structuredPoints,
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
  structuredBasePoints: RhythmPoints;
}

function getRhythmComponentData(api: GetRhythmComponentDataApi): {
  isolatedStructure: BasicRhythmStructure;
  isolatedPoints: RhythmPoints;
  structuredPoints: RhythmPoints;
} {
  const { isolatedStructure, structuredBasePoints } = api;
  const rhythmComponentDataResult = {
    isolatedStructure,
    isolatedPoints: new Array<number>(isolatedStructure.rhythmDensity),
    structuredPoints: new Array<number>(isolatedStructure.rhythmDensity),
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
      const structuredPoint = structuredBasePoints[isolatedPoint]!;
      rhythmComponentDataResult.isolatedPoints[pointIndex] = isolatedPoint;
      rhythmComponentDataResult.structuredPoints[pointIndex] = structuredPoint;
    });
  rhythmComponentDataResult.isolatedPoints.sort(
    (pointA, pointB) => pointA - pointB
  );
  rhythmComponentDataResult.structuredPoints.sort(
    (pointA, pointB) => pointA - pointB
  );
  return rhythmComponentDataResult;
}
