import * as Nath from "mathjs";
import getColormap from "colormap";
import { max } from "mathjs";

export default () => {
  const baseCircle = {
    radius: 1,
    center: {
      x: 0,
      y: 0,
    },
  };
  const relativeSubCircle = {
    radius: 0.675,
    depth: 0.375,
    phase: Math.PI / 3,
  };
  const subCircleRadius = relativeSubCircle.radius * baseCircle.radius;
  const maxSubCircleDepth = baseCircle.radius - subCircleRadius;
  const subCircleDepth = relativeSubCircle.depth * maxSubCircleDepth;
  const subCircle = {
    radius: subCircleRadius,
    center: {
      x:
        subCircleDepth * Math.cos(relativeSubCircle.phase) +
        baseCircle.center.x,
      y:
        subCircleDepth * Math.sin(relativeSubCircle.phase) +
        baseCircle.center.y,
    },
  };
  const closestBaseCirclePointToSubCircle = getCirclePoint({
    someCircle: baseCircle,
    pointAngle: relativeSubCircle.phase,
  });
  const closestSubCirclePointToBaseCircle = getCirclePoint({
    someCircle: subCircle,
    pointAngle: relativeSubCircle.phase,
  });
  const closestDistanceFromSubToBase = getDistanceBetweenPoints({
    pointA: closestBaseCirclePointToSubCircle,
    pointB: closestSubCirclePointToBaseCircle,
  });
  const minIntersectionRadius = closestDistanceFromSubToBase + subCircle.radius;
  const minIntersectionCircle = {
    radius: minIntersectionRadius,
    center: subCircle.center,
  };
  const farthestBaseCirclePointToSubCircle = getCirclePoint({
    someCircle: baseCircle,
    pointAngle: relativeSubCircle.phase + Math.PI,
  });
  const closestSubCirclePointToFarthestBaseCirclePoint = getCirclePoint({
    someCircle: subCircle,
    pointAngle: relativeSubCircle.phase + Math.PI,
  });
  const farthestDistanceFromSubToBase = getDistanceBetweenPoints({
    pointA: farthestBaseCirclePointToSubCircle,
    pointB: closestSubCirclePointToFarthestBaseCirclePoint,
  });
  const maxIntersectionRadius =
    farthestDistanceFromSubToBase + subCircle.radius;
  const maxIntersectionCircle = {
    radius: maxIntersectionRadius,
    center: subCircle.center,
  };
  const baseIntersectionPoints = getBaseIntersectionPoints({
    baseCircle,
    subCircle,
    subCirclePhase: relativeSubCircle.phase,
    baseCenterToSubCenterDistance: getDistanceBetweenPoints({
      pointA: baseCircle.center,
      pointB: subCircle.center,
    }),
    minCircle: minIntersectionCircle,
    maxCircle: maxIntersectionCircle,
    depthCount: 9,
  });
  return (
    <svg viewBox={"-2 -2 4 4"} width={250} height={250}>
      <rect x={-2} y={-2} width={4} height={4} fill={"grey"} />
      <circle
        r={baseCircle.radius}
        cx={baseCircle.center.x}
        cy={baseCircle.center.y}
        fill={"transparent"}
        stroke={"darkorange"}
        strokeWidth={0.02}
      />
      <circle
        r={subCircle.radius}
        cx={subCircle.center.x}
        cy={subCircle.center.y}
        fill={"transparent"}
        stroke={"deeppink"}
        strokeWidth={0.02}
      />
      {baseIntersectionPoints}
    </svg>
  );
};

interface GetBaseIntersectionPointApi {
  minCircle: Circle;
  maxCircle: Circle;
  baseCircle: Circle;
  subCircle: Circle;
  subCirclePhase: number;
  baseCenterToSubCenterDistance: number;
  depthCount: number;
}

function getBaseIntersectionPoints(
  api: GetBaseIntersectionPointApi
): Array<any> {
  const {
    minCircle,
    maxCircle,
    baseCircle,
    baseCenterToSubCenterDistance,
    subCircle,
    subCirclePhase,
    depthCount,
  } = api;
  const currentIntersectionCircle = {
    radius: (minCircle.radius + maxCircle.radius) / 2,
    center: minCircle.center,
  };
  const baseAngle = Math.acos(
    (Math.pow(baseCircle.radius, 2) -
      Math.pow(baseCenterToSubCenterDistance, 2) -
      Math.pow(currentIntersectionCircle.radius, 2)) /
      (-2 * baseCenterToSubCenterDistance * currentIntersectionCircle.radius)
  );
  const angleA = Math.PI + subCirclePhase - baseAngle;
  const angleB = Math.PI + subCirclePhase + baseAngle;
  const pointA = {
    x: getCirclePoint({
      someCircle: currentIntersectionCircle,
      pointAngle: angleA,
    }).x,
    y: getCirclePoint({
      someCircle: subCircle,
      pointAngle: angleA,
    }).y,
  };
  const pointB = {
    x: getCirclePoint({
      someCircle: currentIntersectionCircle,
      pointAngle: angleB,
    }).x,
    y: getCirclePoint({
      someCircle: subCircle,
      pointAngle: angleB,
    }).y,
  };
  const circleA = (
    <circle cx={pointA.x} cy={pointA.y} r={0.01} fill={"black"} />
  );
  const circleB = (
    <circle cx={pointB.x} cy={pointB.y} r={0.01} fill={"black"} />
  );
  const nextDepthCount = depthCount - 1;
  if (nextDepthCount === 0) {
    return [circleA, circleB];
  } else {
    return [
      circleA,
      circleB,
      ...getBaseIntersectionPoints({
        baseCircle,
        baseCenterToSubCenterDistance,
        subCircle,
        subCirclePhase,
        minCircle,
        maxCircle: currentIntersectionCircle,
        depthCount: nextDepthCount,
      }),
      ...getBaseIntersectionPoints({
        baseCircle,
        baseCenterToSubCenterDistance,
        subCircle,
        subCirclePhase,
        maxCircle,
        minCircle: currentIntersectionCircle,
        depthCount: nextDepthCount,
      }),
    ];
  }
}

interface Circle {
  radius: number;
  center: Point;
}

interface Point {
  x: number;
  y: number;
}

interface GetDistanceBetweenPointsApi {
  pointA: Point;
  pointB: Point;
}

function getDistanceBetweenPoints(api: GetDistanceBetweenPointsApi) {
  const { pointA, pointB } = api;
  const deltaX = pointB.x - pointA.x;
  const deltaY = pointB.y - pointA.y;
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

interface GetCirclePointApi {
  someCircle: Circle;
  pointAngle: number;
}

function getCirclePoint(api: GetCirclePointApi): Point {
  const { pointAngle, someCircle } = api;
  const circlePoint = {
    x: Math.cos(pointAngle) * someCircle.radius + someCircle.center.x,
    y: Math.sin(pointAngle) * someCircle.radius + someCircle.center.y,
  };
  return circlePoint;
}
