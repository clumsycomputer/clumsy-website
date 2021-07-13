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

interface GetRotatedPointApi {
  basePoint: Point
  anchorPoint: Point
  rotationAngle: number
}

function getRotatedPoint(api: GetRotatedPointApi) {
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

interface GetLoopPointApi {
  someLoop: Loop
  sampleAngle: number
}

function getLoopPoint(api: GetLoopPointApi) {
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

interface GetRotatedLoopChildCircleApi {
  someRotatedLoop: RotatedLoop
}

function getRotatedLoopChildCircle(api: GetRotatedLoopChildCircleApi) {
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

interface GetLoopChildCircleApi {
  someLoop: Loop
}

function getLoopChildCircle(api: GetLoopChildCircleApi) {
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

interface GetLoopBaseIntersectionApi {
  someLoop: Loop
  sampleAngle: number
}

function getLoopBaseIntersection(api: GetLoopBaseIntersectionApi) {
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

interface GetLoopChildIntersectionApi {
  someLoop: Loop
  sampleAngle: number
}

function getLoopChildIntersection(api: GetLoopChildIntersectionApi) {
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

interface GetAdjustedSampleAngleApi {
  sampleAngle: number
}

function getAdjustedSampleAngle(api: GetAdjustedSampleAngleApi) {
  const { sampleAngle } = api
  const positiveSampleAngle =
    ((sampleAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
  return positiveSampleAngle === (2 * Math.PI) / 4 ||
    positiveSampleAngle === ((2 * Math.PI) / 4) * 3
    ? positiveSampleAngle + 0.00000000000001
    : positiveSampleAngle
}
