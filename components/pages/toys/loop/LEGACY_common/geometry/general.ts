import { Circle, Point } from "./encodings";

export interface GetCirclePointApi {
  someCircle: Circle;
  pointAngle: number;
}

export function getCirclePoint(api: GetCirclePointApi): Point {
  const { pointAngle, someCircle } = api;
  return [
    Math.cos(pointAngle) * someCircle.radius + someCircle.center[0],
    Math.sin(pointAngle) * someCircle.radius + someCircle.center[1],
  ];
}

export interface GetIntersectionPointApi {
  lineA: [Point, Point];
  lineB: [Point, Point];
}

// adjusted & optimized implementation of http://paulbourke.net/geometry/pointlineplane/
export function getIntersectionPoint(api: GetIntersectionPointApi): Point {
  const { lineB, lineA } = api;
  const deltaYB = lineB[1][1] - lineB[0][1];
  const deltaXA = lineA[1][0] - lineA[0][0];
  const deltaXB = lineB[1][0] - lineB[0][0];
  const deltaYA = lineA[1][1] - lineA[0][1];
  const slopeA =
    (deltaXB * (lineA[0][1] - lineB[0][1]) -
      deltaYB * (lineA[0][0] - lineB[0][0])) /
    (deltaYB * deltaXA - deltaXB * deltaYA);
  return [lineA[0][0] + slopeA * deltaXA, lineA[0][1] + slopeA * deltaYA];
}

export interface GetDistanceBetweenPointsApi {
  pointA: Point;
  pointB: Point;
}

export function getDistanceBetweenPoints(api: GetDistanceBetweenPointsApi) {
  const { pointA, pointB } = api;
  const deltaX = pointB[0] - pointA[0];
  const deltaY = pointB[1] - pointA[1];
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

export interface GetNormalizedAngleApi {
  someAngle: number;
}

export function getNormalizedAngle(api: GetNormalizedAngleApi) {
  const { someAngle } = api;
  return (someAngle + 2 * Math.PI) % (2 * Math.PI);
}

export interface GetDifferenceOfNormalizedAnglesApi {
  normalizedAngleA: number;
  normalizedAngleB: number;
}

export function getDifferenceOfNormalizedAngles(
  api: GetDifferenceOfNormalizedAnglesApi
) {
  const { normalizedAngleB, normalizedAngleA } = api;
  return normalizedAngleB < Math.PI && normalizedAngleA > Math.PI
    ? 2 * Math.PI + normalizedAngleB - normalizedAngleA
    : normalizedAngleB - normalizedAngleA;
}

export interface GetNormalizedAngleBetweenPointsApi {
  basePoint: Point;
  targetPoint: Point;
}

export function getNormalizedAngleBetweenPoints(
  api: GetNormalizedAngleBetweenPointsApi
) {
  const { targetPoint, basePoint } = api;
  return getNormalizedAngle({
    someAngle: Math.atan2(
      targetPoint[1] - basePoint[1],
      targetPoint[0] - basePoint[0]
    ),
  });
}
