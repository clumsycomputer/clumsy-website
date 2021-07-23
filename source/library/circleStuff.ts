import { checkIntersection } from 'line-intersect'
import { getUpdatedData } from './getUpdatedData'
export interface Point {
  x: number
  y: number
}

export interface Circle {
  center: Point
  radius: number
}

export interface Loop {
  baseCircle: Circle
  childCircle: {
    relativeRadius: number
    relativeDepth: number
    phaseAngle: number
  }
}

export interface RotatedLoop extends Loop {
  rotationAnchor: 'base' | 'child'
  rotationAngle: number
}

export interface OscillatedRotatedLoop extends RotatedLoop {
  getRelativeOscillation: (sampleAngle: number) => number
}

export interface GetMirroredRotatedLoopApi {
  baseLoop: RotatedLoop
  originPoint: Point
  mirrorAngle: number
}

export function getMirroredRotatedLoop(api: GetMirroredRotatedLoopApi) {
  const { baseLoop, originPoint, mirrorAngle } = api
  return getUpdatedData({
    baseData: baseLoop,
    dataUpdates: {
      'baseCircle.center': (currentCenter: Point) =>
        getMirroredPoint({
          originPoint,
          mirrorAngle,
          basePoint: currentCenter,
        }),
      'childCircle.phaseAngle': (currentAngle: number) => -currentAngle,
      rotationAngle: (currentAngle: number) =>
        mirrorAngle - (currentAngle - mirrorAngle),
    },
  })
}

export interface GetMirroredPointApi {
  basePoint: Point
  originPoint: Point
  mirrorAngle: number
}

export function getMirroredPoint(api: GetMirroredPointApi): Point {
  const { basePoint, originPoint, mirrorAngle } = api
  const baseAngle = Math.atan2(
    basePoint.y - originPoint.y,
    basePoint.x - originPoint.x
  )
  const deltaAngle = baseAngle - mirrorAngle
  const deltaRadius = Math.sqrt(
    Math.pow(basePoint.x - originPoint.x, 2) +
      Math.pow(basePoint.y - originPoint.y, 2)
  )
  return {
    x: deltaRadius * Math.cos(mirrorAngle - deltaAngle) + originPoint.x,
    y: deltaRadius * Math.sin(mirrorAngle - deltaAngle) + originPoint.y,
  }
}

export interface GetOscillatedRotatedLoopPointsApi {
  sampleCount: number
  oscillatedRotatedLoop: OscillatedRotatedLoop
}

export function getOscillatedRotatedLoopPoints(
  api: GetOscillatedRotatedLoopPointsApi
) {
  const { sampleCount, oscillatedRotatedLoop } = api
  return new Array(sampleCount).fill(undefined).map((_, sampleIndex) =>
    getOscillatedRotatedLoopPoint({
      oscillatedRotatedLoop,
      sampleAngle: ((2 * Math.PI) / sampleCount) * sampleIndex,
    })
  )
}

interface GetOscillatedRotatedLoopPointApi {
  oscillatedRotatedLoop: OscillatedRotatedLoop
  sampleAngle: number
}

function getOscillatedRotatedLoopPoint(api: GetOscillatedRotatedLoopPointApi) {
  const { sampleAngle, oscillatedRotatedLoop } = api
  return getRotatedPoint({
    basePoint: getOscillatedPoint({
      originPoint: getLoopChildCircle({
        someLoop: oscillatedRotatedLoop,
      }).center,
      basePoint: getLoopPoint({
        sampleAngle,
        someLoop: oscillatedRotatedLoop,
      }),
      relativeOscillation:
        oscillatedRotatedLoop.getRelativeOscillation(sampleAngle),
    }),
    rotationAngle: oscillatedRotatedLoop.rotationAngle,
    anchorPoint:
      oscillatedRotatedLoop.rotationAnchor === 'base'
        ? oscillatedRotatedLoop.baseCircle.center
        : getLoopChildCircle({
            someLoop: oscillatedRotatedLoop,
          }).center,
  })
}

interface GetOscillatedPointApi {
  originPoint: Point
  basePoint: Point
  relativeOscillation: number
}

function getOscillatedPoint(api: GetOscillatedPointApi): Point {
  const { basePoint, originPoint, relativeOscillation } = api
  const deltaX = basePoint.x - originPoint.x
  const deltaY = basePoint.y - originPoint.y
  const relativeAngle = Math.atan2(deltaX, deltaY) - Math.PI / 2
  const relativeBaseLength = Math.sqrt(
    Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
  )
  const nextLength =
    relativeOscillation * relativeBaseLength + relativeBaseLength
  return {
    x: nextLength * Math.cos(-relativeAngle) + originPoint.x,
    y: nextLength * Math.sin(-relativeAngle) + originPoint.y,
  }
}

export interface GetRotatedLoopPointsApi {
  someRotatedLoop: RotatedLoop
  sampleCount: number
}

export function getRotatedLoopPoints(api: GetRotatedLoopPointsApi) {
  const { sampleCount, someRotatedLoop } = api
  return new Array(sampleCount).fill(undefined).map((_, sampleIndex) =>
    getRotatedLoopPoint({
      someRotatedLoop,
      sampleAngle: ((2 * Math.PI) / sampleCount) * sampleIndex,
    })
  )
}

export interface GetRotatedLoopPointApi {
  someRotatedLoop: RotatedLoop
  sampleAngle: number
}

export function getRotatedLoopPoint(api: GetRotatedLoopPointApi) {
  const { sampleAngle, someRotatedLoop } = api
  return getRotatedPoint({
    basePoint: getLoopPoint({
      sampleAngle,
      someLoop: someRotatedLoop,
    }),
    rotationAngle: someRotatedLoop.rotationAngle,
    anchorPoint:
      someRotatedLoop.rotationAnchor === 'base'
        ? someRotatedLoop.baseCircle.center
        : getLoopChildCircle({
            someLoop: someRotatedLoop,
          }).center,
  })
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

export interface GetLoopPointApi {
  someLoop: Loop
  sampleAngle: number
}

export function getLoopPoint(api: GetLoopPointApi) {
  const { someLoop, sampleAngle } = api
  const baseIntersection = getLoopBaseIntersection({
    someLoop,
    sampleAngle,
  })
  const childIntersection = getLoopChildIntersection({
    someLoop,
    sampleAngle,
  })
  return {
    x: baseIntersection.x,
    y: childIntersection.y,
  }
}

export interface GetRotatedLoopChildCircleApi {
  someRotatedLoop: RotatedLoop
}

export function getRotatedLoopChildCircle(api: GetRotatedLoopChildCircleApi) {
  const { someRotatedLoop } = api
  const unrotatedCircle = getLoopChildCircle({
    someLoop: someRotatedLoop,
  })
  return {
    ...unrotatedCircle,
    center: getRotatedPoint({
      rotationAngle: someRotatedLoop.rotationAngle,
      basePoint: unrotatedCircle.center,
      anchorPoint:
        someRotatedLoop.rotationAnchor === 'base'
          ? someRotatedLoop.baseCircle.center
          : unrotatedCircle.center,
    }),
  }
}

export interface GetLoopChildCircleApi {
  someLoop: Loop
}

export function getLoopChildCircle(api: GetLoopChildCircleApi) {
  const { someLoop } = api
  const childCircleRadius =
    someLoop.baseCircle.radius * someLoop.childCircle.relativeRadius
  const maxChildCircleDepth = someLoop.baseCircle.radius - childCircleRadius
  const childCircleDepth =
    someLoop.childCircle.relativeDepth * maxChildCircleDepth
  return {
    radius: childCircleRadius,
    center: {
      x:
        childCircleDepth * Math.cos(someLoop.childCircle.phaseAngle) +
        someLoop.baseCircle.center.x,
      y:
        childCircleDepth * Math.sin(someLoop.childCircle.phaseAngle) +
        someLoop.baseCircle.center.y,
    },
  }
}

export interface GetLoopBaseIntersectionApi {
  someLoop: Loop
  sampleAngle: number
}

export function getLoopBaseIntersection(api: GetLoopBaseIntersectionApi) {
  const { someLoop, sampleAngle } = api
  const childCircle = getLoopChildCircle({ someLoop })
  const adjustedSampleAngle = getAdjustedSampleAngle({ sampleAngle })
  const lineSlope = Math.tan(adjustedSampleAngle)
  const lineInterceptY = childCircle.center.y - lineSlope * childCircle.center.x
  const expressionA =
    someLoop.baseCircle.center.x +
    someLoop.baseCircle.center.y * lineSlope -
    lineSlope * lineInterceptY
  const expressionB = Math.sqrt(
    Math.pow(someLoop.baseCircle.radius, 2) * (1 + Math.pow(lineSlope, 2)) -
      Math.pow(
        someLoop.baseCircle.center.y -
          lineSlope * someLoop.baseCircle.center.x -
          lineInterceptY,
        2
      )
  )
  const expressionC = Math.pow(lineSlope, 2) + 1
  const baseIntersectionX =
    adjustedSampleAngle >= 2 * Math.PI * 0.25 &&
    adjustedSampleAngle < 2 * Math.PI * 0.75
      ? (expressionA - expressionB) / expressionC
      : (expressionA + expressionB) / expressionC
  const baseIntersectionY = lineSlope * baseIntersectionX + lineInterceptY
  return {
    x: baseIntersectionX,
    y: baseIntersectionY,
  }
}

export interface GetLoopChildIntersectionApi {
  someLoop: Loop
  sampleAngle: number
}

export function getLoopChildIntersection(api: GetLoopChildIntersectionApi) {
  const { someLoop, sampleAngle } = api
  const childCircle = getLoopChildCircle({ someLoop })
  const adjustedSampleAngle = getAdjustedSampleAngle({ sampleAngle })
  return {
    x:
      childCircle.radius * Math.cos(adjustedSampleAngle) + childCircle.center.x,
    y:
      childCircle.radius * Math.sin(adjustedSampleAngle) + childCircle.center.y,
  }
}

export interface GetAdjustedSampleAngleApi {
  sampleAngle: number
}

export function getAdjustedSampleAngle(api: GetAdjustedSampleAngleApi) {
  const { sampleAngle } = api
  const positiveSampleAngle =
    ((sampleAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
  return positiveSampleAngle === (2 * Math.PI) / 4 ||
    positiveSampleAngle === ((2 * Math.PI) / 4) * 3
    ? positiveSampleAngle + 0.00000000000001
    : positiveSampleAngle
}

export interface GetTracePointApi {
  somePoints: Point[]
  originPoint: Point
  traceAngle: number
}

export function getTracePoint(api: GetTracePointApi): Point {
  const { somePoints, traceAngle, originPoint } = api
  const targetPoint: Point = {
    x: Number.MAX_SAFE_INTEGER * Math.cos(traceAngle) + originPoint.x,
    y: Number.MAX_SAFE_INTEGER * Math.sin(traceAngle) + originPoint.y,
  }
  const tracePoint = somePoints.reduce<Point | null>(
    (result, pointC, indexC) => {
      if (result) return result
      const pointD = somePoints[(indexC + 1) % somePoints.length]!
      const intersectionResult = checkIntersection(
        originPoint.x,
        originPoint.y,
        targetPoint.x,
        targetPoint.y,
        pointC.x,
        pointC.y,
        pointD.x,
        pointD.y
      )
      if (intersectionResult.type === 'intersecting')
        return intersectionResult.point
      return null
    },
    null
  )
  // hacky workaround of failed checkIntersection result
  return tracePoint
    ? tracePoint
    : getTracePoint({
        somePoints,
        originPoint,
        traceAngle: traceAngle + 0.0000001 * Math.random(),
      })
}
