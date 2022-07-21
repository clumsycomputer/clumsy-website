import { RhythmIntervals, RhythmMap } from "./models";

export interface GetRhythmIntervalsApi {
  someRhythmMap: RhythmMap;
}

export function getRhythmIntervals(
  api: GetRhythmIntervalsApi
): RhythmIntervals {
  const { someRhythmMap } = api;
  return someRhythmMap.rhythmPoints.map((currentRhythmPoint, pointIndex) => {
    const nextRhythmPoint =
      someRhythmMap.rhythmPoints[
        (pointIndex + 1) % someRhythmMap.rhythmResolution
      ];
    const nextRhythmPointOrRhythmResolution = nextRhythmPoint
      ? nextRhythmPoint
      : someRhythmMap.rhythmResolution;
    return nextRhythmPointOrRhythmResolution - currentRhythmPoint;
  });
}
