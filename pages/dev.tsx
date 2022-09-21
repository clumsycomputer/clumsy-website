import getColormap from "colormap";
import { number } from "mathjs";
import { SVGAttributes } from "react";
import Zod from "zod";

export default () => {
  const baseCircleNode = getCircleNode({
    nodeId: 0,
    nodeName: "base circle",
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
    nodeName: "sub circle",
    nodeEncoding: {
      baseCircleNode: baseCircleNode,
      relativeRadius: 0.675,
      relativeDepth: 0.5,
      relativePhase: Math.PI / 3,
    },
    nodeAttributes: {
      stroke: "deepPink",
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
  const basicLoopDiagram = [baseCircleNode, subCircleNode, loopNode];
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div></div>
      <svg viewBox={"-2 -2 4 4"} width={250} height={250}>
        <rect x={-2} y={-2} width={4} height={4} fill={"grey"} />
        {basicLoopDiagram.map((someGeometryNode) => {
          if (
            someGeometryNode.nodeType === "circle" ||
            someGeometryNode.nodeType === "relativeCircle"
          ) {
            return (
              <circle
                {...someGeometryNode.nodeAttributes}
                r={someGeometryNode.nodeGeometry.radius}
                cx={someGeometryNode.nodeGeometry.center[0]}
                cy={someGeometryNode.nodeGeometry.center[1]}
              />
            );
          } else if (someGeometryNode.nodeType === "loop") {
            return (
              <polygon
                {...someGeometryNode.nodeAttributes}
                points={someGeometryNode.nodeGeometry
                  .map(
                    (someLoopPoint) => `${someLoopPoint[0]},${someLoopPoint[1]}`
                  )
                  .join(" ")}
              />
            );
          }
        })}
      </svg>
    </div>
  );
};

type Point = [x: number, y: number];

type LoopPoint = [x: number, y: number, outputAngle: number];

interface Circle {
  radius: number;
  center: Point;
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
      const subCircleDepth = relativeDepth * maxSubCircleDepth;
      return {
        radius: relativeRadius * baseCircle.radius,
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
      const intersectionCircleCount = 256;
      const loopPoints = new Array(intersectionCircleCount - 2)
        .fill(null)
        .reduce<Array<any>>(
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
      loopPoints.sort((a, b) => a.outputAngle - b.outputAngle);
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
  return Math.acos(
    (Math.pow(baseCircleRadius, 2) -
      Math.pow(baseSubCenterDistance, 2) -
      Math.pow(intersectionCircleRadius, 2)) /
      (-2 * baseSubCenterDistance * intersectionCircleRadius)
  );
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
