import { getEuclideanRhythm } from "./getEuclideanRhythm";
import {
  BasicRhythmStructure,
  RhythmComponent,
  RhythmMap,
  RhythmPoints,
  RhythmStructure,
} from "./models";

export interface GetRhythmComponentsApi
  extends Pick<_GetRhythmComponentsApi, "someRhythmStructure"> {}

export function getRhythmComponents(api: GetRhythmComponentsApi) {
  const { someRhythmStructure } = api;
  return _getRhythmComponents({
    someRhythmStructure,
    rhythmComponentsResult: [],
    baseStructuredMap: {
      rhythmResolution: someRhythmStructure.rhythmResolution,
      rhythmPoints: new Array(someRhythmStructure.rhythmResolution)
        .fill(undefined)
        .map((_, containerCellIndex) => containerCellIndex),
    },
  });
}

interface _GetRhythmComponentsApi
  extends Pick<GetRhythmComponentDataApi, "baseStructuredMap"> {
  someRhythmStructure: RhythmStructure;
  rhythmComponentsResult: Array<ReturnType<typeof getRhythmComponentData>>;
}

function _getRhythmComponents(
  api: _GetRhythmComponentsApi
): Array<ReturnType<typeof getRhythmComponentData>> {
  const { baseStructuredMap, someRhythmStructure, rhythmComponentsResult } =
    api;
  const currentRhythmStructureData = getRhythmComponentData({
    baseStructuredMap,
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
        baseStructuredMap: currentRhythmStructureData.structuredMap,
        someRhythmStructure: {
          rhythmResolution: someRhythmStructure.subStructure.rhythmDensity,
          rhythmPhase: someRhythmStructure.subStructure.rhythmPhase,
          subStructure: someRhythmStructure.subStructure.subStructure,
          structureType: "initial",
        },
        rhythmComponentsResult: [
          currentRhythmStructureData,
          ...rhythmComponentsResult,
        ],
      });
    case "terminal":
      return [currentRhythmStructureData, ...rhythmComponentsResult];
  }
}

interface GetRhythmComponentDataApi {
  isolatedStructure: BasicRhythmStructure;
  baseStructuredMap: RhythmMap;
}

function getRhythmComponentData(
  api: GetRhythmComponentDataApi
): RhythmComponent {
  const { isolatedStructure, baseStructuredMap } = api;
  const rhythmComponentDataResult: RhythmComponent = {
    isolatedStructure,
    isolatedMap: {
      rhythmResolution: isolatedStructure.rhythmResolution,
      rhythmPoints: new Array<number>(isolatedStructure.rhythmDensity),
    },
    structuredMap: {
      ...baseStructuredMap,
      rhythmPoints: new Array<number>(isolatedStructure.rhythmDensity),
    },
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
      const structuredPoint = baseStructuredMap.rhythmPoints[isolatedPoint]!;
      rhythmComponentDataResult.isolatedMap.rhythmPoints[pointIndex] =
        isolatedPoint;
      rhythmComponentDataResult.structuredMap.rhythmPoints[pointIndex] =
        structuredPoint;
    });
  rhythmComponentDataResult.isolatedMap.rhythmPoints.sort(
    (pointA, pointB) => pointA - pointB
  );
  rhythmComponentDataResult.structuredMap.rhythmPoints.sort(
    (pointA, pointB) => pointA - pointB
  );
  return rhythmComponentDataResult;
}
