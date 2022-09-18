import * as Nath from "mathjs";

export default () => {
  const baseCircle = {
    radius: 1,
    center: {
      x: 0,
      y: 0,
    },
  };
  const relativeSubCircle = {
    radius: 0.125,
    depth: 0.5,
  };
  const subCircleRadius = relativeSubCircle.radius * baseCircle.radius;
  const maxSubCircleDepth = baseCircle.radius - subCircleRadius;
  const subCircleDepth = relativeSubCircle.depth * maxSubCircleDepth;
  const subCircle = {
    radius: subCircleRadius,
    center: {
      x: subCircleDepth + baseCircle.center.x,
      y: baseCircle.center.y,
    },
  };
  const loopPointsCount = 256;
  const loopPoints = new Array(loopPointsCount)
    .fill(null)
    .map((_, sampleIndex) => {
      const angleStep = (2 * Math.PI) / loopPointsCount;
      const sampleAngle = sampleIndex * angleStep;
      const subCirclePoint = {
        x: subCircle.radius * Math.cos(sampleAngle) + subCircle.center.x,
        y: subCircle.radius * Math.sin(sampleAngle) + subCircle.center.y,
      };
      const baseCirclePoint = getBaseCirclePoint({
        baseCircle,
        subCirclePoint,
        subCircleCenter: subCircle.center,
      });
      return {
        x: baseCirclePoint.x,
        y: subCirclePoint.y,
      };
    })
    .slice(1);
  const nearestBaseCirclePointFromSubCircle = {
    x: baseCircle.radius,
    y: baseCircle.center.y,
  };
  const nearestSubCirclePointFromBaseCircle = {
    x: subCircle.radius + subCircle.center.x,
    y: subCircle.center.y,
  };
  const farthestBaseCirclePointFromSubCircle = {
    x: -baseCircle.radius,
    y: baseCircle.center.y,
  };
  const nearestSubCirclePointToBaseCircleFarthestPoint = {
    x: -subCircle.radius + subCircle.center.x,
    y: subCircle.center.y,
  };
  const smallGlueCircle = {
    radius: nearestBaseCirclePointFromSubCircle.x - subCircle.center.x,
    center: subCircle.center,
  };
  const bigGlueCircle = {
    radius: Math.abs(
      farthestBaseCirclePointFromSubCircle.x - subCircle.center.x
    ),
    center: subCircle.center,
  };
  const midGlueCircle = {
    radius: (smallGlueCircle.radius + bigGlueCircle.radius) / 2,
    center: subCircle.center,
  };
  const baseMaximumPoint = {
    x: baseCircle.radius * Math.cos(Math.PI / 2) + baseCircle.center.x,
    y: baseCircle.radius * Math.sin(Math.PI / 2) + baseCircle.center.y,
  };
  const subBaseMaximumAngle = getNormalizedAngleBetweenPoints({
    basePoint: subCircle.center,
    targetPoint: baseMaximumPoint,
  });
  const subBaseMaximumPoint = {
    x: subCircle.radius * Math.cos(subBaseMaximumAngle) + subCircle.center.x,
    y: subCircle.radius * Math.sin(subBaseMaximumAngle) + subCircle.center.y,
  };
  const smallGlueBaseMaximumPoint = {
    x:
      smallGlueCircle.radius * Math.cos(subBaseMaximumAngle) +
      smallGlueCircle.center.x,
    y:
      smallGlueCircle.radius * Math.sin(subBaseMaximumAngle) +
      smallGlueCircle.center.y,
  };
  const bigGlueBaseMaximumPoint = {
    x:
      bigGlueCircle.radius * Math.cos(subBaseMaximumAngle) +
      bigGlueCircle.center.x,
    y:
      bigGlueCircle.radius * Math.sin(subBaseMaximumAngle) +
      bigGlueCircle.center.y,
  };
  const subMaximumAngle = Math.PI / 2;
  const subMaximumPoint = getCirclePoint({
    someCircle: subCircle,
    pointAngle: subMaximumAngle,
  });
  const smallGlueMaximumPoint = getCirclePoint({
    someCircle: smallGlueCircle,
    pointAngle: subMaximumAngle,
  });
  const bigGlueMaximumPoint = getCirclePoint({
    someCircle: bigGlueCircle,
    pointAngle: subMaximumAngle,
  });
  const glueDelta = bigGlueCircle.radius - smallGlueCircle.radius;
  const baseMidPointRadius = glueDelta / 2 + smallGlueCircle.radius;
  const baseMidPointAngle =
    Math.PI -
    Math.acos(
      (Math.pow(baseCircle.radius, 2) -
        Math.pow(subCircle.center.x, 2) -
        Math.pow(baseMidPointRadius, 2)) /
        (-2 * subCircle.center.x * baseMidPointRadius)
    );
  const baseMidPoint = {
    x: baseMidPointRadius * Math.cos(baseMidPointAngle) + subCircle.center.x,
    y: baseMidPointRadius * Math.sin(baseMidPointAngle) + subCircle.center.y,
  };
  const fooPointAngle = (subMaximumAngle + subBaseMaximumAngle) / 2;
  const fooPoint = {
    x: baseMidPointRadius * Math.cos(fooPointAngle) + subCircle.center.x,
    y: baseMidPointRadius * Math.sin(fooPointAngle) + subCircle.center.y,
  };
  const traceAngle = -Math.PI / 3;
  const traceSubPoint = getCirclePoint({
    someCircle: subCircle,
    pointAngle: traceAngle,
  });
  const traceSmallGluePoint = getCirclePoint({
    someCircle: smallGlueCircle,
    pointAngle: traceAngle,
  });
  const traceBigGluePoint = getCirclePoint({
    someCircle: bigGlueCircle,
    pointAngle: traceAngle,
  });
  const traceBasePoint = getBaseCirclePoint({
    baseCircle,
    subCirclePoint: traceSubPoint,
    subCircleCenter: subCircle.center,
  });
  return (
    <svg viewBox={"-2 -2 4 4"} width={250} height={250}>
      <rect x={-2} y={-2} width={4} height={4} fill={"grey"} />
      <polygon
        points={loopPoints
          .map((somePoint) => {
            if (isFinite(somePoint.x) && isFinite(somePoint.y)) {
              return `${somePoint.x},${somePoint.y}`;
            }
          })
          .join(" ")}
        fill={"transparent"}
        stroke={"yellow"}
        strokeWidth={0.02}
      />
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
        r={smallGlueCircle.radius}
        cx={smallGlueCircle.center.x}
        cy={smallGlueCircle.center.y}
        fill={"transparent"}
        stroke={"deepskyblue"}
        strokeWidth={0.02}
      />
      <circle
        r={bigGlueCircle.radius}
        cx={bigGlueCircle.center.x}
        cy={bigGlueCircle.center.y}
        fill={"transparent"}
        stroke={"greenyellow"}
        strokeWidth={0.02}
      />
      <circle
        r={midGlueCircle.radius}
        cx={midGlueCircle.center.x}
        cy={midGlueCircle.center.y}
        fill={"transparent"}
        stroke={"darkviolet"}
        strokeWidth={0.02}
      />
      <circle
        cx={nearestBaseCirclePointFromSubCircle.x}
        cy={nearestBaseCirclePointFromSubCircle.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={nearestSubCirclePointFromBaseCircle.x}
        cy={nearestSubCirclePointFromBaseCircle.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={farthestBaseCirclePointFromSubCircle.x}
        cy={farthestBaseCirclePointFromSubCircle.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={nearestSubCirclePointToBaseCircleFarthestPoint.x}
        cy={nearestSubCirclePointToBaseCircleFarthestPoint.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={subBaseMaximumPoint.x}
        cy={subBaseMaximumPoint.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={smallGlueBaseMaximumPoint.x}
        cy={smallGlueBaseMaximumPoint.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={bigGlueBaseMaximumPoint.x}
        cy={bigGlueBaseMaximumPoint.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={baseMaximumPoint.x}
        cy={baseMaximumPoint.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={subMaximumPoint.x}
        cy={subMaximumPoint.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={smallGlueMaximumPoint.x}
        cy={smallGlueMaximumPoint.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={bigGlueMaximumPoint.x}
        cy={bigGlueMaximumPoint.y}
        r={0.025}
        fill={"black"}
      />
      <circle cx={fooPoint.x} cy={fooPoint.y} r={0.025} fill={"yellow"} />
      <circle
        cx={baseMidPoint.x}
        cy={baseMidPoint.y}
        r={0.025}
        fill={"black"}
      />
      <circle
        cx={subCircle.center.x}
        cy={subCircle.center.y}
        r={0.025}
        fill={"white"}
      />
      <circle
        cx={traceSubPoint.x}
        cy={traceSubPoint.y}
        r={0.025}
        fill={"white"}
      />
      <circle
        cx={traceSmallGluePoint.x}
        cy={traceSmallGluePoint.y}
        r={0.025}
        fill={"white"}
      />
      <circle
        cx={traceBigGluePoint.x}
        cy={traceBigGluePoint.y}
        r={0.025}
        fill={"white"}
      />
      <circle
        cx={traceBasePoint.x}
        cy={traceBasePoint.y}
        r={0.025}
        fill={"white"}
      />
    </svg>
  );
};

interface getBaseCirclePointApi {
  baseCircle: Circle;
  subCircleCenter: Point;
  subCirclePoint: Point;
}

function getBaseCirclePoint(api: getBaseCirclePointApi) {
  const { baseCircle, subCirclePoint, subCircleCenter } = api;
  const childDepth = getDistanceBetweenPoints({
    pointA: baseCircle.center,
    pointB: subCircleCenter,
  });
  const childRadius = getDistanceBetweenPoints({
    pointA: subCircleCenter,
    pointB: subCirclePoint,
  });
  const childPointAngle = getNormalizedAngleBetweenPoints({
    basePoint: subCircleCenter,
    targetPoint: subCirclePoint,
  });
  if (childDepth === 0) {
    return getCirclePoint({
      someCircle: baseCircle,
      pointAngle: childPointAngle,
    });
  } else {
    const baseCircleCenterToChildCirclePointLength = Math.sqrt(
      Math.pow(subCirclePoint.x - baseCircle.center.x, 2) +
        Math.pow(subCirclePoint.y - baseCircle.center.y, 2)
    );
    const baseCircleCenterToBaseCirclePointAngle = Math.acos(
      (Math.pow(childDepth, 2) +
        Math.pow(childRadius, 2) -
        Math.pow(baseCircleCenterToChildCirclePointLength, 2)) /
        (2 * childDepth * childRadius)
    );
    const baseCircleCenterToChildCircleCenterAngle = Math.asin(
      (Math.sin(baseCircleCenterToBaseCirclePointAngle) / baseCircle.radius) *
        childDepth
    );
    const childCircleCenterToBaseCirclePointAngle =
      Math.PI -
      baseCircleCenterToBaseCirclePointAngle -
      baseCircleCenterToChildCircleCenterAngle;
    const childCircleCenterToBaseCirclePointLength =
      Math.sin(childCircleCenterToBaseCirclePointAngle) *
      (baseCircle.radius / Math.sin(baseCircleCenterToBaseCirclePointAngle));
    return {
      x:
        childCircleCenterToBaseCirclePointLength * Math.cos(childPointAngle) +
        subCircleCenter.x,
      y:
        childCircleCenterToBaseCirclePointLength * Math.sin(childPointAngle) +
        subCircleCenter.y,
    };
  }
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

interface GetNormalizedAngleBetweenPointsApi {
  basePoint: Point;
  targetPoint: Point;
}

function getNormalizedAngleBetweenPoints(
  api: GetNormalizedAngleBetweenPointsApi
) {
  const { targetPoint, basePoint } = api;
  return getNormalizedAngle({
    someAngle: Math.atan2(
      targetPoint.y - basePoint.y,
      targetPoint.x - basePoint.x
    ),
  });
}

interface GetNormalizedAngleApi {
  someAngle: number;
}

function getNormalizedAngle(api: GetNormalizedAngleApi) {
  const { someAngle } = api;
  return ((someAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
}

interface Circle {
  center: Point;
  radius: number;
}

interface Point {
  x: number;
  y: number;
}
