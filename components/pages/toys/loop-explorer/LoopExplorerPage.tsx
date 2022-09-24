import { PropsWithChildren } from "react";

export interface LoopExplorerPageProps {}

export function LoopExplorerPage(props: LoopExplorerPageProps) {
  const {} = props;
  const baseCircle: Circle = {
    radius: 1,
    center: [0, 0],
  };
  const subCircle: SubCircle = {
    baseCircle,
    relativeRadius: 0.5,
    relativeDepth: 0.5,
    relativePhase: Math.PI / 4,
  };
  const baseCircleGeometry = baseCircle;
  const subCircleGeometry = getSubCircleGeometry({
    someSubCircle: subCircle,
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
          <circle
            r={baseCircleGeometry.radius}
            cx={baseCircleGeometry.center[0]}
            cy={baseCircleGeometry.center[1]}
            stroke={"red"}
            strokeWidth={0.05}
            fillOpacity={0}
          />
          <circle
            r={subCircleGeometry.radius}
            cx={subCircleGeometry.center[0]}
            cy={subCircleGeometry.center[1]}
            stroke={"blue"}
            strokeWidth={0.05}
            fillOpacity={0}
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
  someSubCircle: SubCircle;
}

function getSubCircleGeometry(api: GetSubCircleGeometryApi): Circle {
  const { someSubCircle } = api;
  const adjustedSubCircle: SubCircle = {
    baseCircle: someSubCircle.baseCircle,
    relativeRadius:
      someSubCircle.relativeRadius === 1
        ? 0.9999999
        : someSubCircle.relativeRadius === 0
        ? 0.0000001
        : someSubCircle.relativeRadius,
    relativeDepth:
      someSubCircle.relativeDepth === 0
        ? 0.0000001
        : someSubCircle.relativeDepth === 1
        ? 0.9999999
        : someSubCircle.relativeDepth,
    relativePhase: someSubCircle.relativePhase,
  };
  const subCircleRadius =
    adjustedSubCircle.relativeRadius * adjustedSubCircle.baseCircle.radius;
  const maxSubCircleDepth =
    adjustedSubCircle.baseCircle.radius - subCircleRadius;
  const subCircleDepth = adjustedSubCircle.relativeDepth * maxSubCircleDepth;
  const subCircleCenter: Point = [
    subCircleDepth * Math.cos(adjustedSubCircle.relativePhase) +
      adjustedSubCircle.baseCircle.center[0],
    subCircleDepth * Math.sin(adjustedSubCircle.relativePhase) +
      adjustedSubCircle.baseCircle.center[1],
  ];
  return {
    radius: subCircleRadius,
    center: subCircleCenter,
  };
}

type Space2 = [x: Vector2, y: Vector2];

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Circle {
  radius: number;
  center: Point;
}

interface SubCircle {
  baseCircle: Circle;
  relativeRadius: number;
  relativeDepth: number;
  relativePhase: number;
}

type Point = Vector2;

type Vector2 = [x: number, y: number];
