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
  const baseSubCenterDistance = getDistanceBetweenPoints({
    pointA: baseCircle.center,
    pointB: subCircle.center,
  });
  const subBaseMinBasePoint = getCirclePoint({
    someCircle: baseCircle,
    pointAngle: relativeSubCircle.phase,
  });
  const subBaseMinSubPoint = getCirclePoint({
    someCircle: subCircle,
    pointAngle: relativeSubCircle.phase,
  });
  const subBaseMinDistance = getDistanceBetweenPoints({
    pointA: subBaseMinBasePoint,
    pointB: subBaseMinSubPoint,
  });
  const minIntersectionRadius = subBaseMinDistance + subCircle.radius;
  const subBaseMaxBasePoint = getCirclePoint({
    someCircle: baseCircle,
    pointAngle: relativeSubCircle.phase + Math.PI,
  });
  const subBaseMaxSubPoint = getCirclePoint({
    someCircle: subCircle,
    pointAngle: relativeSubCircle.phase + Math.PI,
  });
  const subBaseMaxDistance = getDistanceBetweenPoints({
    pointA: subBaseMaxBasePoint,
    pointB: subBaseMaxSubPoint,
  });
  const maxIntersectionRadius = subBaseMaxDistance + subCircle.radius;
  const minMaxIntersectionRadiusRangeDistance =
    maxIntersectionRadius - minIntersectionRadius;
  const intersectionCircleCount = 128;
  const intersectionRadiusStep =
    minMaxIntersectionRadiusRangeDistance / (intersectionCircleCount - 1);
  const loopPoints = new Array(intersectionCircleCount - 2)
    .fill(null)
    .reduce<Array<Point>>(
      (loopPointsResult, _, circleIndex) => {
        const intersectionCircle = {
          radius:
            intersectionRadiusStep * (circleIndex + 1) + minIntersectionRadius,
          center: subCircle.center,
        };
        const intersectionAngleBase = Math.acos(
          (Math.pow(baseCircle.radius, 2) -
            Math.pow(baseSubCenterDistance, 2) -
            Math.pow(intersectionCircle.radius, 2)) /
            (-2 * baseSubCenterDistance * intersectionCircle.radius)
        );
        const intersectionAngleA =
          Math.PI + relativeSubCircle.phase - intersectionAngleBase;
        const intersectionPointA = getCirclePoint({
          someCircle: intersectionCircle,
          pointAngle: intersectionAngleA,
        });
        const subPointA = getCirclePoint({
          someCircle: subCircle,
          pointAngle: intersectionAngleA,
        });
        const loopPointA = {
          x: intersectionPointA.x,
          y: subPointA.y,
        };
        const intersectionAngleB =
          Math.PI + relativeSubCircle.phase + intersectionAngleBase;
        const intersectionPointB = getCirclePoint({
          someCircle: intersectionCircle,
          pointAngle: intersectionAngleB,
        });
        const subPointB = getCirclePoint({
          someCircle: subCircle,
          pointAngle: intersectionAngleB,
        });
        const loopPointB = {
          x: intersectionPointB.x,
          y: subPointB.y,
        };
        loopPointsResult.unshift(loopPointA);
        loopPointsResult.push(loopPointB);
        return loopPointsResult;
      },
      [
        {
          x: getCirclePoint({
            someCircle: {
              radius: minIntersectionRadius,
              center: subCircle.center,
            },
            pointAngle: relativeSubCircle.phase,
          }).x,
          y: getCirclePoint({
            someCircle: subCircle,
            pointAngle: relativeSubCircle.phase,
          }).y,
        },
      ]
    );
  loopPoints.push({
    x: getCirclePoint({
      someCircle: {
        radius: maxIntersectionRadius,
        center: subCircle.center,
      },
      pointAngle: relativeSubCircle.phase + Math.PI,
    }).x,
    y: getCirclePoint({
      someCircle: subCircle,
      pointAngle: relativeSubCircle.phase + Math.PI,
    }).y,
  });
  const traceRelativeIntersectionRadius = 0.5;
  const traceIntersectionCircle = {
    radius:
      traceRelativeIntersectionRadius * minMaxIntersectionRadiusRangeDistance +
      minIntersectionRadius,
    center: subCircle.center,
  };
  const traceIntersectionAngleBase = Math.acos(
    (Math.pow(baseCircle.radius, 2) -
      Math.pow(baseSubCenterDistance, 2) -
      Math.pow(traceIntersectionCircle.radius, 2)) /
      (-2 * baseSubCenterDistance * traceIntersectionCircle.radius)
  );
  const traceIntersectionAngleA =
    Math.PI + relativeSubCircle.phase - traceIntersectionAngleBase;
  const traceIntersectionPointA = getCirclePoint({
    someCircle: traceIntersectionCircle,
    pointAngle: traceIntersectionAngleA,
  });
  const traceSubPointA = getCirclePoint({
    someCircle: subCircle,
    pointAngle: traceIntersectionAngleA,
  });
  const traceLoopPointA = {
    x: traceIntersectionPointA.x,
    y: traceSubPointA.y,
  };
  const traceIntersectionAngleB =
    Math.PI + relativeSubCircle.phase + traceIntersectionAngleBase;
  const intersectionPointB = getCirclePoint({
    someCircle: traceIntersectionCircle,
    pointAngle: traceIntersectionAngleB,
  });
  const traceSubPointB = getCirclePoint({
    someCircle: subCircle,
    pointAngle: traceIntersectionAngleB,
  });
  const traceLoopPointB = {
    x: intersectionPointB.x,
    y: traceSubPointB.y,
  };
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
      <circle
        r={traceIntersectionCircle.radius}
        cx={traceIntersectionCircle.center.x}
        cy={traceIntersectionCircle.center.y}
        fill={"transparent"}
        stroke={"deepskyblue"}
        strokeWidth={0.02}
      />
      <polygon
        points={loopPoints
          .map((somePoint) => `${somePoint.x},${somePoint.y}`)
          .join(" ")}
        fill={"transparent"}
        stroke={"yellow"}
        strokeWidth={0.02}
      />
      <circle
        cx={traceIntersectionPointA.x}
        cy={traceIntersectionPointA.y}
        r={0.025}
        fill={"lime"}
      />
      <circle
        cx={traceSubPointA.x}
        cy={traceSubPointA.y}
        r={0.025}
        fill={"lime"}
      />
      <circle
        cx={traceLoopPointA.x}
        cy={traceLoopPointA.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={intersectionPointB.x}
        cy={intersectionPointB.y}
        r={0.025}
        fill={"lime"}
      />
      <circle
        cx={traceSubPointB.x}
        cy={traceSubPointB.y}
        r={0.025}
        fill={"lime"}
      />
      <circle
        cx={traceLoopPointB.x}
        cy={traceLoopPointB.y}
        r={0.025}
        fill={"black"}
      />
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
