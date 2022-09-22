import getColormap from "colormap";
import { number } from "mathjs";
import { SVGAttributes, useEffect, useMemo, useRef, useState } from "react";
import Zod from "zod";

export default () => {
  const baseCircleNode = getCircleNode({
    nodeId: 0,
    nodeName: "baseCircle",
    nodeEncoding: {
      radius: 1,
      center: [0, 0],
    },
    nodeAttributes: {
      stroke: "darkorange",
    },
  });
  const subCircleNode = getRelativeCircleNode({
    nodeId: 1,
    nodeName: "subCircle",
    nodeEncoding: {
      baseCircleNode: baseCircleNode,
      relativeRadius: 0.675,
      relativeDepth: 0.5,
      relativePhase: Math.PI / 3,
    },
    nodeAttributes: {
      stroke: "deeppink",
    },
  });
  const loopNode: LoopNode = getLoopNode({
    nodeId: 2,
    nodeName: "loop",
    nodeEncoding: {
      baseCircle: baseCircleNode,
      subCircle: subCircleNode,
    },
    nodeAttributes: {
      stroke: "yellow",
    },
  });
  const [traceStamp, setTraceStamp] = useState(0);
  const traceIntersectionCircleNode = getCircleNode({
    nodeId: 3,
    nodeName: "traceCircle",
    nodeEncoding: getIntersectionCircle({
      ...getIntersectionRadiusData({
        baseCircle: baseCircleNode.nodeGeometry,
        subCircle: subCircleNode.nodeGeometry,
        relativeSubCirclePhase: subCircleNode.nodeEncoding.relativePhase,
      }),
      subCircleCenter: subCircleNode.nodeGeometry.center,
      relativeIntersectionRadius: Math.sin(Math.PI * traceStamp),
    }),
    nodeAttributes: {
      stroke: "deepskyblue",
    },
  });
  const traceIntersectionAngle = getNormalizedAngle({
    someAngle:
      Math.PI +
      subCircleNode.nodeEncoding.relativePhase -
      getIntersectionBaseAngle({
        baseCircleRadius: baseCircleNode.nodeGeometry.radius,
        intersectionCircleRadius:
          traceIntersectionCircleNode.nodeGeometry.radius,
        baseSubCenterDistance: getDistanceBetweenPoints({
          pointA: baseCircleNode.nodeGeometry.center,
          pointB: subCircleNode.nodeGeometry.center,
        }),
      }) *
        (Math.sin(2 * Math.PI * traceStamp) >= 0 ? 1 : -1),
  });
  const traceBasePointNode = getPointNode({
    nodeId: 4,
    nodeName: "traceBasePoint",
    nodeEncoding: getCirclePoint({
      someCircle: traceIntersectionCircleNode.nodeGeometry,
      pointAngle: traceIntersectionAngle,
    }),
    nodeAttributes: {
      fill: "lime",
    },
  });
  const traceSubPointNode = getPointNode({
    nodeId: 6,
    nodeName: "traceSubPoint",
    nodeEncoding: getCirclePoint({
      someCircle: subCircleNode.nodeGeometry,
      pointAngle: traceIntersectionAngle,
    }),
    nodeAttributes: {
      fill: "lime",
    },
  });
  const traceLoopPointNode = getPointNode({
    nodeId: 7,
    nodeName: "traceLoopPoint",
    nodeEncoding: [
      traceBasePointNode.nodeGeometry[0],
      traceSubPointNode.nodeGeometry[1],
    ],
    nodeAttributes: {
      fill: "black",
    },
  });
  const linearTraceLoopPointNode = getPointNode({
    nodeId: 8,
    nodeName: "linearTraceLoopPoint",
    nodeEncoding: getLoopTracePoint({
      baseCircle: baseCircleNode.nodeGeometry,
      subCircle: subCircleNode.nodeGeometry,
      loopPoints: loopNode.nodeGeometry,
      traceAngle: traceIntersectionAngle,
    }),
    nodeAttributes: {
      fill: "white",
    },
  });
  const basicLoopDiagram = [
    baseCircleNode,
    subCircleNode,
    traceIntersectionCircleNode,
    loopNode,
    traceBasePointNode,
    traceSubPointNode,
    traceLoopPointNode,
    linearTraceLoopPointNode,
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div style={{ padding: 8 }}>
        <KnobInput
          inputSize={40}
          knobAngleOffset={subCircleNode.nodeEncoding.relativePhase}
          minValue={0}
          maxValue={1}
          value={traceStamp}
          onChange={(nextValue) => {
            setTraceStamp(nextValue);
          }}
        />
      </div>
      <svg viewBox={"-2 -2 4 4"} width={512} height={512}>
        <rect x={-2} y={-2} width={4} height={4} fill={"grey"} />
        {basicLoopDiagram.map((someGeometryNode) => {
          if (someGeometryNode.nodeType === "point") {
            return (
              <circle
                {...someGeometryNode.nodeAttributes}
                key={someGeometryNode.nodeId}
                cx={someGeometryNode.nodeGeometry[0]}
                cy={someGeometryNode.nodeGeometry[1]}
              />
            );
          } else if (
            someGeometryNode.nodeType === "circle" ||
            someGeometryNode.nodeType === "relativeCircle"
          ) {
            return (
              <circle
                {...someGeometryNode.nodeAttributes}
                key={someGeometryNode.nodeId}
                r={someGeometryNode.nodeGeometry.radius}
                cx={someGeometryNode.nodeGeometry.center[0]}
                cy={someGeometryNode.nodeGeometry.center[1]}
              />
            );
          } else if (someGeometryNode.nodeType === "loop") {
            return (
              <polygon
                {...someGeometryNode.nodeAttributes}
                key={someGeometryNode.nodeId}
                points={someGeometryNode.nodeGeometry
                  .map(
                    (someLoopPoint) => `${someLoopPoint[0]},${someLoopPoint[1]}`
                  )
                  .join(" ")}
              />
            );
          } else {
            throw new Error("invalid path reached: geometry node render");
          }
        })}
      </svg>
    </div>
  );
};

interface KnobInputProps {
  minValue: number;
  maxValue: number;
  value: number;
  onChange: (nextValue: number) => void;
  knobAngleOffset: number;
  inputSize: number;
}

function KnobInput(props: KnobInputProps) {
  const { value, onChange, maxValue, minValue, knobAngleOffset, inputSize } =
    props;
  const knobGraphicRef = useRef<SVGSVGElement>(null);
  const trackingPointerRef = useRef(false);
  useEffect(() => {
    const pointerMoveHandler = (somePointerEvent: PointerEvent) => {
      if (knobGraphicRef.current && trackingPointerRef.current === true) {
        changeKnobValue({
          onChange,
          knobAngleOffset,
          somePointerEvent,
          knobClientRect: knobGraphicRef.current.getBoundingClientRect(),
        });
      }
    };
    const pointerUpHandler = (somePointerEvent: PointerEvent) => {
      if (knobGraphicRef.current && trackingPointerRef.current === true) {
        trackingPointerRef.current = false;
        changeKnobValue({
          onChange,
          knobAngleOffset,
          somePointerEvent,
          knobClientRect: knobGraphicRef.current.getBoundingClientRect(),
        });
      }
    };
    window.addEventListener("pointermove", pointerMoveHandler);
    window.addEventListener("pointerup", pointerUpHandler);
    return () => {
      window.removeEventListener("pointermove", pointerMoveHandler);
      window.removeEventListener("pointerup", pointerUpHandler);
    };
  }, []);
  const knobPoint = useMemo(() => {
    const knobStamp = (value - minValue) / (maxValue - minValue);
    const knobAngle = 2 * Math.PI * knobStamp + knobAngleOffset;
    return [Math.cos(knobAngle), Math.sin(knobAngle)];
  }, [minValue, maxValue, value]);
  return (
    <svg
      ref={knobGraphicRef}
      viewBox={"-1.5 -1.5 3 3"}
      width={inputSize}
      height={inputSize}
      style={{
        cursor: "pointer",
      }}
      onPointerDown={() => {
        trackingPointerRef.current = true;
      }}
    >
      <circle
        r={1}
        cx={0}
        cy={0}
        stroke={"black"}
        strokeWidth={0.15}
        fillOpacity={0}
      />
      <g>
        <circle r={0.3} cx={knobPoint[0]} cy={knobPoint[1]} fill={"black"} />
        <circle r={0.2} cx={knobPoint[0]} cy={knobPoint[1]} fill={"white"} />
        <circle r={0.125} cx={knobPoint[0]} cy={knobPoint[1]} fill={"black"} />
      </g>
    </svg>
  );
}

interface ChangeKnobValueApi
  extends Pick<KnobInputProps, "onChange" | "knobAngleOffset"> {
  somePointerEvent: PointerEvent;
  knobClientRect: DOMRect;
}
function changeKnobValue(api: ChangeKnobValueApi) {
  const { somePointerEvent, knobClientRect, onChange, knobAngleOffset } = api;
  const targetPoint = [somePointerEvent.clientX, somePointerEvent.clientY];
  const centerPoint = [
    (knobClientRect.left + knobClientRect.right) / 2,
    (knobClientRect.top + knobClientRect.bottom) / 2,
  ];
  const knobAngle = getNormalizedAngle({
    someAngle:
      Math.atan2(
        targetPoint[1] - centerPoint[1],
        targetPoint[0] - centerPoint[0]
      ) - knobAngleOffset,
  });
  onChange(knobAngle / (2 * Math.PI));
}

type Point = [x: number, y: number];

type LoopPoint = [x: number, y: number, outputAngle: number];

interface Circle {
  radius: number;
  center: Point;
}

interface PointNode extends GeometryNode<"point", Point, Point> {}

interface GetPointNodeApi
  extends Pick<
    PointNode,
    "nodeId" | "nodeName" | "nodeEncoding" | "nodeAttributes"
  > {}

function getPointNode(api: GetPointNodeApi): PointNode {
  const { nodeId, nodeName, nodeEncoding, nodeAttributes } = api;
  return {
    nodeId,
    nodeName,
    nodeEncoding,
    nodeType: "point",
    nodeAttributes: {
      r: 0.05,
      ...nodeAttributes,
    },
    get nodeGeometry(): Point {
      return this.nodeEncoding;
    },
  };
}

interface CircleNode extends GeometryNode<"circle", Circle, Circle> {}

interface GetCircleNodeApi
  extends Pick<
    CircleNode,
    "nodeId" | "nodeName" | "nodeEncoding" | "nodeAttributes"
  > {}

function getCircleNode(api: GetCircleNodeApi): CircleNode {
  const { nodeId, nodeName, nodeEncoding, nodeAttributes } = api;
  return {
    nodeId,
    nodeName,
    nodeEncoding,
    nodeType: "circle",
    nodeAttributes: {
      ...getDefaultPathNodeAttributes(),
      ...nodeAttributes,
    },
    get nodeGeometry(): Circle {
      return this.nodeEncoding;
    },
  };
}

interface RelativeCircleNode
  extends GeometryNode<
    "relativeCircle",
    {
      baseCircleNode: CircleNode;
      relativeRadius: number;
      relativeDepth: number;
      relativePhase: number;
    },
    Circle
  > {}

interface GetRelativeCircleNodeApi
  extends Pick<
    RelativeCircleNode,
    "nodeId" | "nodeName" | "nodeEncoding" | "nodeAttributes"
  > {}

function getRelativeCircleNode(
  api: GetRelativeCircleNodeApi
): RelativeCircleNode {
  const { nodeId, nodeName, nodeEncoding, nodeAttributes } = api;
  return {
    nodeId,
    nodeName,
    nodeEncoding,
    nodeType: "relativeCircle",
    nodeAttributes: {
      ...getDefaultPathNodeAttributes(),
      ...nodeAttributes,
    },
    get nodeGeometry(): Circle {
      const { baseCircleNode, relativeRadius, relativeDepth, relativePhase } =
        this.nodeEncoding;
      const baseCircle = baseCircleNode.nodeGeometry;
      const subCircleRadius = relativeRadius * baseCircle.radius;
      const maxSubCircleDepth = baseCircle.radius - subCircleRadius;
      const subCircleDepth =
        relativeDepth === 0 || maxSubCircleDepth === 0
          ? 0.00000001
          : relativeDepth * maxSubCircleDepth;
      return {
        radius:
          subCircleRadius === baseCircle.radius
            ? subCircleRadius - 0.00000001
            : subCircleRadius,
        center: [
          subCircleDepth * Math.cos(relativePhase) + baseCircle.center[0],
          subCircleDepth * Math.sin(relativePhase) + baseCircle.center[1],
        ],
      };
    },
  };
}

interface LoopNode
  extends GeometryNode<
    "loop",
    {
      baseCircle: CircleNode;
      subCircle: RelativeCircleNode;
    },
    Array<LoopPoint>
  > {}

interface GetLoopNodeApi
  extends Pick<
    LoopNode,
    "nodeId" | "nodeName" | "nodeEncoding" | "nodeAttributes"
  > {}

function getLoopNode(api: GetLoopNodeApi): LoopNode {
  const { nodeId, nodeName, nodeEncoding, nodeAttributes } = api;
  return {
    nodeId,
    nodeName,
    nodeEncoding,
    nodeType: "loop",
    nodeAttributes: {
      ...getDefaultPathNodeAttributes(),
      ...nodeAttributes,
    },
    get nodeGeometry(): Array<LoopPoint> {
      const baseCircle = this.nodeEncoding.baseCircle.nodeGeometry;
      const subCircle = this.nodeEncoding.subCircle.nodeGeometry;
      const relativeSubCirclePhase =
        this.nodeEncoding.subCircle.nodeEncoding.relativePhase;
      const baseSubCenterDistance = getDistanceBetweenPoints({
        pointA: baseCircle.center,
        pointB: subCircle.center,
      });
      const {
        minIntersectionRadius,
        intersectionRadiusMinMaxDelta,
        maxIntersectionRadius,
      } = getIntersectionRadiusData({
        baseCircle,
        subCircle,
        relativeSubCirclePhase,
      });
      const intersectionCircleCount = 512;
      const loopPoints = new Array(intersectionCircleCount - 2)
        .fill(null)
        .reduce<Array<LoopPoint>>(
          (loopPointsResult, _, circleIndex) => {
            const intersectionCircle = getIntersectionCircle({
              minIntersectionRadius,
              intersectionRadiusMinMaxDelta,
              subCircleCenter: subCircle.center,
              relativeIntersectionRadius: Math.sin(
                (Math.PI / 2) * ((circleIndex + 1) / intersectionCircleCount)
              ),
            });
            const intersectionBaseAngle = getIntersectionBaseAngle({
              baseSubCenterDistance,
              baseCircleRadius: baseCircle.radius,
              intersectionCircleRadius: intersectionCircle.radius,
            });
            const loopPointA = getLoopPoint({
              subCircle,
              intersectionCircle,
              intersectionAngle:
                Math.PI + relativeSubCirclePhase - intersectionBaseAngle,
            });
            const loopPointB = getLoopPoint({
              subCircle,
              intersectionCircle,
              intersectionAngle:
                Math.PI + relativeSubCirclePhase + intersectionBaseAngle,
            });
            loopPointsResult.unshift(loopPointA);
            loopPointsResult.push(loopPointB);
            return loopPointsResult;
          },
          [
            getLoopPoint({
              subCircle,
              intersectionCircle: {
                radius: minIntersectionRadius,
                center: subCircle.center,
              },
              intersectionAngle: relativeSubCirclePhase,
            }),
          ]
        );
      loopPoints.push(
        getLoopPoint({
          subCircle,
          intersectionCircle: {
            radius: maxIntersectionRadius,
            center: subCircle.center,
          },
          intersectionAngle: relativeSubCirclePhase + Math.PI,
        })
      );
      loopPoints.sort((a, b) => a[2] - b[2]);
      return loopPoints;
    },
  };
}

interface GetLoopPointApi {
  subCircle: Circle;
  intersectionCircle: Circle;
  intersectionAngle: number;
}

function getLoopPoint(api: GetLoopPointApi): LoopPoint {
  const { intersectionCircle, intersectionAngle, subCircle } = api;
  const loopPointBase = {
    x:
      intersectionCircle.radius * Math.cos(intersectionAngle) +
      intersectionCircle.center[0],
    y: subCircle.radius * Math.sin(intersectionAngle) + subCircle.center[1],
  };
  return [
    intersectionCircle.radius * Math.cos(intersectionAngle) +
      intersectionCircle.center[0],
    subCircle.radius * Math.sin(intersectionAngle) + subCircle.center[1],
    getNormalizedAngle({
      someAngle: Math.atan2(
        loopPointBase.y - subCircle.center[1],
        loopPointBase.x - subCircle.center[0]
      ),
    }),
  ];
}

interface GetIntersectionBaseAngleApi {
  baseCircleRadius: number;
  baseSubCenterDistance: number;
  intersectionCircleRadius: number;
}

function getIntersectionBaseAngle(api: GetIntersectionBaseAngleApi): number {
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

interface GetLoopTracePointApi {
  baseCircle: Circle;
  subCircle: Circle;
  loopPoints: Array<LoopPoint>;
  traceAngle: number;
}

function getLoopTracePoint(api: GetLoopTracePointApi) {
  const { loopPoints, traceAngle, subCircle, baseCircle } = api;
  const loopPointIndexA = loopPoints.findIndex((_, loopPointIndex) => {
    if (loopPointIndex + 1 === loopPoints.length) return true;
    const loopPointA = loopPoints[loopPointIndex];
    const loopPointB = loopPoints[loopPointIndex + 1];
    return traceAngle >= loopPointA[2] && traceAngle <= loopPointB[2];
  });
  const loopPointA = loopPoints[loopPointIndexA];
  const loopPointB = loopPoints[(loopPointIndexA + 1) % loopPoints.length];
  return getIntersectionPoint({
    lineA: [
      [loopPointA[0], loopPointA[1]],
      [loopPointB[0], loopPointB[1]],
    ],
    lineB: [
      subCircle.center,
      [
        baseCircle.radius * Math.cos(traceAngle) + subCircle.center[0],
        baseCircle.radius * Math.sin(traceAngle) + subCircle.center[1],
      ],
    ],
  });
}

interface GeometryNode<NodeType extends string, NodeEncoding, NodeGeometry> {
  nodeType: NodeType;
  nodeId: number;
  nodeName: string;
  nodeEncoding: NodeEncoding;
  nodeGeometry: NodeGeometry;
  nodeAttributes: SVGAttributes<any>;
}

function getDefaultPathNodeAttributes(): GeometryNode<
  string,
  unknown,
  unknown
>["nodeAttributes"] {
  return {
    fillOpacity: 0,
    strokeWidth: 0.04,
  };
}

////
interface GetDistanceBetweenPointsApi {
  pointA: Point;
  pointB: Point;
}

function getDistanceBetweenPoints(api: GetDistanceBetweenPointsApi) {
  const { pointA, pointB } = api;
  const deltaX = pointB[0] - pointA[0];
  const deltaY = pointB[1] - pointA[1];
  return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

interface GetCirclePointApi {
  someCircle: Circle;
  pointAngle: number;
}

function getCirclePoint(api: GetCirclePointApi): Point {
  const { pointAngle, someCircle } = api;
  return [
    Math.cos(pointAngle) * someCircle.radius + someCircle.center[0],
    Math.sin(pointAngle) * someCircle.radius + someCircle.center[1],
  ];
}

interface GetNormalizedAngleApi {
  someAngle: number;
}

function getNormalizedAngle(api: GetNormalizedAngleApi) {
  const { someAngle } = api;
  return (someAngle + 2 * Math.PI) % (2 * Math.PI);
}

export interface GetIntersectionPointApi {
  lineA: [Point, Point];
  lineB: [Point, Point];
}

// adjusted & optimized implementation of http://paulbourke.net/geometry/pointlineplane/
export function getIntersectionPoint(api: GetIntersectionPointApi): Point {
  const { lineB, lineA } = api;
  const deltaYB = lineB[1][1] - lineB[0][1];
  const deltaXA = lineA[1][0] - lineA[0][0];
  const deltaXB = lineB[1][0] - lineB[0][0];
  const deltaYA = lineA[1][1] - lineA[0][1];
  const slopeA =
    (deltaXB * (lineA[0][1] - lineB[0][1]) -
      deltaYB * (lineA[0][0] - lineB[0][0])) /
    (deltaYB * deltaXA - deltaXB * deltaYA);
  return [lineA[0][0] + slopeA * deltaXA, lineA[0][1] + slopeA * deltaYA];
}

export interface GetNormalizedAngleBetweenPointsApi {
  basePoint: Point;
  targetPoint: Point;
}

export function getNormalizedAngleBetweenPoints(
  api: GetNormalizedAngleBetweenPointsApi
): number {
  const { targetPoint, basePoint } = api;
  return getNormalizedAngle({
    someAngle: Math.atan2(
      targetPoint[1] - basePoint[1],
      targetPoint[0] - basePoint[0]
    ),
  });
}