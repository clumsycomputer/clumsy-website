import { PropsWithChildren } from "react";
import {
  Circle,
  Loop,
  LoopPoint,
  Point,
  Rectangle,
  Space2,
  Vector2,
} from "./common/math/encodings";
import {
  getCirclePoint,
  getDifferenceOfNormalizedAngles,
  getDistanceBetweenPoints,
  getNormalizedAngle,
} from "./common/math/general";

export interface LoopExplorerPageProps {}

export function LoopExplorerPage(props: LoopExplorerPageProps) {
  const {} = props;
  const activeLoop: Loop = {
    baseCircle: {
      radius: 1,
      center: [0, 0],
    },
    subCircle: {
      relativeRadius: 0.5,
      relativeDepth: 0.5,
      relativePhase: Math.PI / 4,
    },
  };
  const baseCircleGeometry = activeLoop.baseCircle;
  const subCircleGeometry = getSubCircleGeometry({
    someLoop: activeLoop,
  });
  const loopGeometry = getLoopGeometry({
    intersectionCircleCount: 256,
    someLoop: activeLoop,
    precomputedGeometry: {
      baseCircle: baseCircleGeometry,
      subCircle: subCircleGeometry,
    },
  });
  return (
    <div>
      <div style={{ width: 256, height: 256 }}>
        <Graphic
          viewAspectRatio={[1, 1]}
          clientSpace={[
            [-2, 2],
            [-2, 2],
          ]}
        >
          <rect fill={"lightgray"} x={-2} width={4} y={-2} height={4} />
          <circle
            stroke={"red"}
            strokeWidth={0.05}
            fillOpacity={0}
            r={baseCircleGeometry.radius}
            cx={baseCircleGeometry.center[0]}
            cy={baseCircleGeometry.center[1]}
          />
          <circle
            stroke={"blue"}
            strokeWidth={0.05}
            fillOpacity={0}
            r={subCircleGeometry.radius}
            cx={subCircleGeometry.center[0]}
            cy={subCircleGeometry.center[1]}
          />
          <polygon
            stroke={"gold"}
            strokeWidth={0.05}
            fillOpacity={0}
            points={loopGeometry
              .map((someLoopPoint) => `${someLoopPoint[0]},${someLoopPoint[1]}`)
              .join(" ")}
          />
        </Graphic>
      </div>
    </div>
  );
}

interface GraphicProps extends Pick<Required<PropsWithChildren>, "children"> {
  viewAspectRatio: Vector2;
  clientSpace: Space2;
}

function Graphic(props: GraphicProps) {
  const { children, viewAspectRatio, clientSpace } = props;
  const viewBoxRectangle = {
    x: 0,
    y: 0,
    width: viewAspectRatio[0],
    height: viewAspectRatio[1],
  };
  const clientRectangle = getSpaceRectangle({
    someSpace: clientSpace,
  });
  return (
    <svg
      viewBox={getViewBox({
        someRectangle: viewBoxRectangle,
      })}
    >
      <g
        transform={`scale(${viewBoxRectangle.width / clientRectangle.width},${
          viewBoxRectangle.height / clientRectangle.height
        }) translate(${viewBoxRectangle.x - clientRectangle.x}, ${
          viewBoxRectangle.y - clientRectangle.y
        }) scale(1,-1)`}
      >
        {children}
      </g>
    </svg>
  );
}

interface GetViewBoxApi {
  someRectangle: Rectangle;
}

function getViewBox(
  api: GetViewBoxApi
): `${number} ${number} ${number} ${number}` {
  const { someRectangle } = api;
  return `${someRectangle.x} ${someRectangle.y} ${someRectangle.width} ${someRectangle.height}`;
}

interface GetSpaceRectangelApi {
  someSpace: Space2;
}

function getSpaceRectangle(api: GetSpaceRectangelApi): Rectangle {
  const { someSpace } = api;
  return {
    x: someSpace[0][0],
    y: someSpace[1][0],
    width: someSpace[0][1] - someSpace[0][0],
    height: someSpace[1][1] - someSpace[1][0],
  };
}

interface GetSubCircleGeometryApi {
  someLoop: Loop;
}

function getSubCircleGeometry(api: GetSubCircleGeometryApi): Circle {
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

interface GetLoopGeometryApi {
  someLoop: Loop;
  intersectionCircleCount: number;
  precomputedGeometry: {
    baseCircle: Circle;
    subCircle: Circle;
  };
}

function getLoopGeometry(api: GetLoopGeometryApi): Array<LoopPoint> {
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
