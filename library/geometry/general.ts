import { Circle, Point } from './models'

export interface GetCirclePointApi {
  someCircle: Circle
  pointAngle: number
}

export function getCirclePoint(api: GetCirclePointApi): Point {
  const { pointAngle, someCircle } = api
  const circlePoint = {
    x: Math.cos(pointAngle) * someCircle.radius + someCircle.center.x,
    y: Math.sin(pointAngle) * someCircle.radius + someCircle.center.y,
  }
  return circlePoint
}

export interface GetRotatedPointApi {
  basePoint: Point
  anchorPoint: Point
  rotationAngle: number
}

export function getRotatedPoint(api: GetRotatedPointApi) {
  const { basePoint, anchorPoint, rotationAngle } = api
  const originCenteredPoint = {
    x: basePoint.x - anchorPoint.x,
    y: basePoint.y - anchorPoint.y,
  }
  return {
    x:
      originCenteredPoint.x * Math.cos(rotationAngle) -
      originCenteredPoint.y * Math.sin(rotationAngle) +
      anchorPoint.x,
    y:
      originCenteredPoint.x * Math.sin(rotationAngle) +
      originCenteredPoint.y * Math.cos(rotationAngle) +
      anchorPoint.y,
  }
}

export interface GetNormalizedAngleBetweenPointsApi {
  basePoint: Point
  targetPoint: Point
}

export function getNormalizedAngleBetweenPoints(
  api: GetNormalizedAngleBetweenPointsApi
) {
  const { targetPoint, basePoint } = api
  return getNormalizedAngle({
    someAngle: Math.atan2(
      targetPoint.y - basePoint.y,
      targetPoint.x - basePoint.x
    ),
  })
}

export interface GetDistanceBetweenPointsApi {
  pointA: Point
  pointB: Point
}

export function getDistanceBetweenPoints(api: GetDistanceBetweenPointsApi) {
  const { pointA, pointB } = api
  const deltaX = pointB.x - pointA.x
  const deltaY = pointB.y - pointA.y
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
}

export interface GetNormalizedAngleApi {
  someAngle: number
}

export function getNormalizedAngle(api: GetNormalizedAngleApi) {
  const { someAngle } = api
  return ((someAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
}

export interface GetMidPointBetweenPointsApi {
  pointA: Point
  pointB: Point
}

export function getMidPointBetweenPoints(
  api: GetMidPointBetweenPointsApi
): Point {
  const { pointA, pointB } = api
  return {
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2,
  }
}

export interface GetMirroredPointApi {
  basePoint: Point
  originPoint: Point
  mirrorAngle: number
}

export interface GetMinimumDistanceBetweenPointAndLineApi {
  somePoint: Point
  someLine: [Point, Point]
}

export function getMinimumDistanceBetweenPointAndLine(
  api: GetMinimumDistanceBetweenPointAndLineApi
) {
  const { someLine, somePoint } = api
  const lineDeltaX = someLine[1].x - someLine[0].x
  const lineDeltaY = someLine[1].y - someLine[0].y
  return (
    Math.abs(
      lineDeltaX * (someLine[0].y - somePoint.y) -
        (someLine[0].x - somePoint.x) * lineDeltaY
    ) / Math.pow(Math.pow(lineDeltaX, 2) + Math.pow(lineDeltaY, 2), 0.5)
  )
}

export interface GetIntersectionPointApi {
  lineA: [Point, Point]
  lineB: [Point, Point]
}

// adjusted & optimized implementation of http://paulbourke.net/geometry/pointlineplane/
export function getIntersectionPoint(api: GetIntersectionPointApi): Point {
  const { lineB, lineA } = api
  const deltaYB = lineB[1].y - lineB[0].y
  const deltaXA = lineA[1].x - lineA[0].x
  const deltaXB = lineB[1].x - lineB[0].x
  const deltaYA = lineA[1].y - lineA[0].y
  const slopeA =
    (deltaXB * (lineA[0].y - lineB[0].y) -
      deltaYB * (lineA[0].x - lineB[0].x)) /
    (deltaYB * deltaXA - deltaXB * deltaYA)
  return {
    x: lineA[0].x + slopeA * deltaXA,
    y: lineA[0].y + slopeA * deltaYA,
  }
}
