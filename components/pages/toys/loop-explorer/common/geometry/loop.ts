import { Circle, Loop, LoopPoint, Point } from "./encodings";
import {
  getCirclePoint,
  getDifferenceOfNormalizedAngles,
  getDistanceBetweenPoints,
  getNormalizedAngle,
} from "./general";

export interface GetLoopGeometryApi {
  someLoop: Loop;
  intersectionCircleCount: number;
  precomputedGeometry: {
    baseCircle: Circle;
    subCircle: Circle;
  };
}

export function getLoopGeometry(api: GetLoopGeometryApi): Array<LoopPoint> {
  const { precomputedGeometry, someLoop, intersectionCircleCount } = api;
  const baseSubCenterDistance = getDistanceBetweenPoints({
    pointA: precomputedGeometry.baseCircle.center,
    pointB: precomputedGeometry.subCircle.center,
  });
  const {
    minIntersectionRadius,
    intersectionRadiusMinMaxDelta,
    maxIntersectionRadius,
  } = getIntersectionRadiusData({
    baseCircle: precomputedGeometry.baseCircle,
    subCircle: precomputedGeometry.subCircle,
    relativeSubCirclePhase: someLoop.subCircle.relativePhase,
  });
  const loopGeometry = new Array(intersectionCircleCount - 2)
    .fill(null)
    .reduce<Array<LoopPoint>>(
      (loopPointsResult, _, circleIndex) => {
        const intersectionCircle = getIntersectionCircle({
          minIntersectionRadius,
          intersectionRadiusMinMaxDelta,
          subCircleCenter: precomputedGeometry.subCircle.center,
          relativeIntersectionRadius: Math.sin(
            (Math.PI / 2) * ((circleIndex + 1) / intersectionCircleCount)
          ),
        });
        const baseIntersectionAngleBase = getBaseIntersectionAngleBase({
          baseSubCenterDistance,
          baseCircleRadius: precomputedGeometry.baseCircle.radius,
          intersectionCircleRadius: intersectionCircle.radius,
        });
        const loopPointA = getLoopPoint({
          subCircle: precomputedGeometry.subCircle,
          intersectionCircle,
          baseIntersectionAngle: getNormalizedAngle({
            someAngle:
              Math.PI +
              someLoop.subCircle.relativePhase -
              baseIntersectionAngleBase,
          }),
        });
        const loopPointB = getLoopPoint({
          intersectionCircle,
          subCircle: precomputedGeometry.subCircle,
          baseIntersectionAngle: getNormalizedAngle({
            someAngle:
              Math.PI +
              someLoop.subCircle.relativePhase +
              baseIntersectionAngleBase,
          }),
        });
        loopPointsResult.unshift(loopPointA);
        loopPointsResult.push(loopPointB);
        return loopPointsResult;
      },
      [
        getLoopPoint({
          subCircle: precomputedGeometry.subCircle,
          intersectionCircle: {
            radius: minIntersectionRadius,
            center: precomputedGeometry.subCircle.center,
          },
          baseIntersectionAngle: someLoop.subCircle.relativePhase,
        }),
      ]
    );
  loopGeometry.push(
    getLoopPoint({
      subCircle: precomputedGeometry.subCircle,
      intersectionCircle: {
        radius: maxIntersectionRadius,
        center: precomputedGeometry.subCircle.center,
      },
      baseIntersectionAngle: someLoop.subCircle.relativePhase + Math.PI,
    })
  );
  loopGeometry.sort((loopPointA, loopPointB) => loopPointA[5] - loopPointB[5]);
  return loopGeometry;
}

interface GetLoopPointApi {
  subCircle: Circle;
  intersectionCircle: Circle;
  baseIntersectionAngle: number;
}

function getLoopPoint(api: GetLoopPointApi): LoopPoint {
  const { intersectionCircle, baseIntersectionAngle, subCircle } = api;
  const xComponent =
    intersectionCircle.radius * Math.cos(baseIntersectionAngle) +
    subCircle.center[0];
  const yComponent =
    subCircle.radius * Math.sin(baseIntersectionAngle) + subCircle.center[1];
  const cosineComponent = xComponent - subCircle.center[0];
  const sineComponent = yComponent - subCircle.center[1];
  const loopSubAngle = getNormalizedAngle({
    someAngle: Math.atan2(sineComponent, cosineComponent),
  });
  const loopRadius = getDistanceBetweenPoints({
    pointA: subCircle.center,
    pointB: [xComponent, yComponent],
  });
  const subIntersectionRadiusDelta =
    intersectionCircle.radius - subCircle.radius;
  const sandwichComponent =
    (loopRadius - subCircle.radius) / subIntersectionRadiusDelta;
  const pendulumComponent = getDifferenceOfNormalizedAngles({
    normalizedAngleA: baseIntersectionAngle,
    normalizedAngleB: loopSubAngle,
  });
  return [
    xComponent,
    yComponent,
    cosineComponent,
    sineComponent,
    baseIntersectionAngle,
    loopSubAngle,
    loopRadius,
    subIntersectionRadiusDelta,
    sandwichComponent,
    pendulumComponent,
  ];
}

interface GetIntersectionRadiusDataApi {
  baseCircle: Circle;
  subCircle: Circle;
  relativeSubCirclePhase: number;
}

function getIntersectionRadiusData(api: GetIntersectionRadiusDataApi) {
  const { baseCircle, relativeSubCirclePhase, subCircle } = api;
  const subBaseMinBasePoint = getCirclePoint({
    someCircle: baseCircle,
    pointAngle: relativeSubCirclePhase,
  });
  const subBaseMinSubPoint = getCirclePoint({
    someCircle: subCircle,
    pointAngle: relativeSubCirclePhase,
  });
  const subBaseMinDistance = getDistanceBetweenPoints({
    pointA: subBaseMinBasePoint,
    pointB: subBaseMinSubPoint,
  });
  const minIntersectionRadius = subBaseMinDistance + subCircle.radius;
  const subBaseMaxBasePoint = getCirclePoint({
    someCircle: baseCircle,
    pointAngle: relativeSubCirclePhase + Math.PI,
  });
  const subBaseMaxSubPoint = getCirclePoint({
    someCircle: subCircle,
    pointAngle: relativeSubCirclePhase + Math.PI,
  });
  const subBaseMaxDistance = getDistanceBetweenPoints({
    pointA: subBaseMaxBasePoint,
    pointB: subBaseMaxSubPoint,
  });
  const maxIntersectionRadius = subBaseMaxDistance + subCircle.radius;
  const intersectionRadiusMinMaxDelta =
    maxIntersectionRadius - minIntersectionRadius;
  return {
    minIntersectionRadius,
    maxIntersectionRadius,
    intersectionRadiusMinMaxDelta,
  };
}

interface GetIntersectionCircleApi {
  subCircleCenter: Point;
  minIntersectionRadius: number;
  relativeIntersectionRadius: number;
  intersectionRadiusMinMaxDelta: number;
}

function getIntersectionCircle(api: GetIntersectionCircleApi): Circle {
  const {
    subCircleCenter,
    relativeIntersectionRadius,
    intersectionRadiusMinMaxDelta,
    minIntersectionRadius,
  } = api;
  return {
    center: subCircleCenter,
    radius:
      relativeIntersectionRadius * intersectionRadiusMinMaxDelta +
      minIntersectionRadius,
  };
}

interface GetBaseIntersectionAngleBaseApi {
  baseCircleRadius: number;
  baseSubCenterDistance: number;
  intersectionCircleRadius: number;
}

function getBaseIntersectionAngleBase(
  api: GetBaseIntersectionAngleBaseApi
): number {
  const { baseCircleRadius, baseSubCenterDistance, intersectionCircleRadius } =
    api;
  const numerator =
    Math.pow(baseCircleRadius, 2) -
    Math.pow(baseSubCenterDistance, 2) -
    Math.pow(intersectionCircleRadius, 2);
  const denominator = -2 * baseSubCenterDistance * intersectionCircleRadius;
  return (
    Math.acos(numerator / denominator) ||
    // weird js math precision workaround
    Math.acos(
      (numerator > 0 && denominator > 0) || (numerator < 0 && denominator < 0)
        ? 1
        : -1
    )
  );
}

export interface GetSubCircleGeometryApi {
  someLoop: Loop;
}

export function getSubCircleGeometry(api: GetSubCircleGeometryApi): Circle {
  const { someLoop } = api;
  const adjustedLoop: Loop = {
    baseCircle: someLoop.baseCircle,
    subCircle: {
      relativeRadius:
        someLoop.subCircle.relativeRadius === 1
          ? 0.9999999
          : someLoop.subCircle.relativeRadius === 0
          ? 0.0000001
          : someLoop.subCircle.relativeRadius,
      relativeDepth:
        someLoop.subCircle.relativeDepth === 0
          ? 0.0000001
          : someLoop.subCircle.relativeDepth === 1
          ? 0.9999999
          : someLoop.subCircle.relativeDepth,
      relativePhase: someLoop.subCircle.relativePhase,
    },
  };
  const subCircleRadius =
    adjustedLoop.subCircle.relativeRadius * adjustedLoop.baseCircle.radius;
  const maxSubCircleDepth = adjustedLoop.baseCircle.radius - subCircleRadius;
  const subCircleDepth =
    adjustedLoop.subCircle.relativeDepth * maxSubCircleDepth;
  const subCircleCenter: Point = [
    subCircleDepth * Math.cos(adjustedLoop.subCircle.relativePhase) +
      adjustedLoop.baseCircle.center[0],
    subCircleDepth * Math.sin(adjustedLoop.subCircle.relativePhase) +
      adjustedLoop.baseCircle.center[1],
  ];
  return {
    radius: subCircleRadius,
    center: subCircleCenter,
  };
}
