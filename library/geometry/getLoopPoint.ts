import {
  getCirclePoint,
  getDistanceBetweenPoints,
  getNormalizedAngleBetweenPoints,
  getRotatedPoint,
} from './general'
import { Circle, InterposedLoopStructure, LoopStructure, Point } from './models'

export interface GetLoopPointApi {
  someLoopStructure: LoopStructure
  pointAngle: number
}

export function getLoopPoint(api: GetLoopPointApi): Point {
  const { pointAngle, someLoopStructure } = api
  return getBaseLoopStructurePoint({
    pointAngle,
    baseCircle: someLoopStructure.loopBase,
    someBaseLoopStructure: someLoopStructure,
  })
}

interface GetBaseLoopStructurePointApi {
  pointAngle: number
  baseCircle: Circle
  someBaseLoopStructure: LoopStructure | InterposedLoopStructure
}

function getBaseLoopStructurePoint(api: GetBaseLoopStructurePointApi): Point {
  const { someBaseLoopStructure, baseCircle, pointAngle } = api
  const foundationCircleDepth =
    someBaseLoopStructure.subStructure.relativeSubDepth * baseCircle.radius
  const unrotatedFoundationCircle: Circle = {
    center: {
      x:
        foundationCircleDepth *
          Math.cos(someBaseLoopStructure.subStructure.subPhaseAngle) +
        baseCircle.center.x,
      y:
        foundationCircleDepth *
          Math.sin(someBaseLoopStructure.subStructure.subPhaseAngle) +
        baseCircle.center.y,
    },
    radius:
      someBaseLoopStructure.subStructure.relativeSubRadius *
      (baseCircle.radius - foundationCircleDepth),
  }
  const subLoopPoint =
    someBaseLoopStructure.subStructure.structureType === 'interposedStructure'
      ? getBaseLoopStructurePoint({
          pointAngle,
          baseCircle: unrotatedFoundationCircle,
          someBaseLoopStructure: someBaseLoopStructure.subStructure,
        })
      : getCirclePoint({
          pointAngle,
          someCircle: unrotatedFoundationCircle,
        })
  const { loopBaseCirclePoint } = getLoopBaseCirclePoint({
    baseCircle,
    subLoopPoint,
    unrotatedFoundationCircleCenter: unrotatedFoundationCircle.center,
  })
  return getRotatedPoint({
    rotationAngle: someBaseLoopStructure.subLoopRotationAngle,
    anchorPoint: getRotatedPoint({
      anchorPoint: baseCircle.center,
      basePoint: unrotatedFoundationCircle.center,
      rotationAngle: someBaseLoopStructure.subStructure.baseOrientationAngle,
    }),
    basePoint: getRotatedPoint({
      anchorPoint: baseCircle.center,
      rotationAngle: someBaseLoopStructure.subStructure.baseOrientationAngle,
      basePoint: {
        x: loopBaseCirclePoint.x,
        y: subLoopPoint.y,
      },
    }),
  })
}

interface getLoopBaseCirclePointApi {
  baseCircle: Circle
  unrotatedFoundationCircleCenter: Point
  subLoopPoint: Point
}

function getLoopBaseCirclePoint(api: getLoopBaseCirclePointApi) {
  const { baseCircle, subLoopPoint, unrotatedFoundationCircleCenter } = api
  const childDepth = getDistanceBetweenPoints({
    pointA: baseCircle.center,
    pointB: unrotatedFoundationCircleCenter,
  })
  const childRadius = getDistanceBetweenPoints({
    pointA: unrotatedFoundationCircleCenter,
    pointB: subLoopPoint,
  })
  const childPointAngle = getNormalizedAngleBetweenPoints({
    basePoint: unrotatedFoundationCircleCenter,
    targetPoint: subLoopPoint,
  })
  if (childDepth === 0) {
    return {
      loopBaseCirclePoint: getCirclePoint({
        someCircle: baseCircle,
        pointAngle: childPointAngle,
      }),
    }
  } else {
    const baseCircleCenterToChildCirclePointLength = Math.sqrt(
      Math.pow(subLoopPoint.x - baseCircle.center.x, 2) +
        Math.pow(subLoopPoint.y - baseCircle.center.y, 2)
    )
    const baseCircleCenterToBaseCirclePointAngle = Math.acos(
      (Math.pow(childDepth, 2) +
        Math.pow(childRadius, 2) -
        Math.pow(baseCircleCenterToChildCirclePointLength, 2)) /
        (2 * childDepth * childRadius)
    )
    const baseCircleCenterToChildCircleCenterAngle = Math.asin(
      (Math.sin(baseCircleCenterToBaseCirclePointAngle) / baseCircle.radius) *
        childDepth
    )
    const childCircleCenterToBaseCirclePointAngle =
      Math.PI -
      baseCircleCenterToBaseCirclePointAngle -
      baseCircleCenterToChildCircleCenterAngle
    const childCircleCenterToBaseCirclePointLength =
      Math.sin(childCircleCenterToBaseCirclePointAngle) *
      (baseCircle.radius / Math.sin(baseCircleCenterToBaseCirclePointAngle))
    return {
      loopBaseCirclePoint: {
        x:
          childCircleCenterToBaseCirclePointLength * Math.cos(childPointAngle) +
          unrotatedFoundationCircleCenter.x,
        y:
          childCircleCenterToBaseCirclePointLength * Math.sin(childPointAngle) +
          unrotatedFoundationCircleCenter.y,
      },
    }
  }
}
