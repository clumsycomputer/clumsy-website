import { SVGAttributes, useEffect, useMemo, useRef, useState } from "react";

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
  const [relativeSubCircleState, setRelativeSubCircleState] = useState({
    radius: 1,
    depth: 0,
    phase: 0,
  });
  const subCircleNode = getRelativeCircleNode({
    nodeId: 1,
    nodeName: "subCircle",
    nodeEncoding: {
      baseCircleNode: baseCircleNode,
      relativeRadius: relativeSubCircleState.radius,
      relativeDepth: relativeSubCircleState.depth,
      relativePhase: relativeSubCircleState.phase,
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
  const loopPoints = loopNode.nodeGeometry;
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
      // relativeIntersectionRadius: Math.abs(((2 * traceStamp + 1) % 2) - 1),
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
      loopPoints: loopPoints,
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
  const maxPendulum = loopPoints.reduce((maxResult, someLoopPoint) => {
    const somePendulum = Math.abs(someLoopPoint[4]);
    return somePendulum > maxResult ? somePendulum : maxResult;
  }, 0);
  // console.log(
  //   loopPoints.map((somePoint) => {
  //     return somePoint[4] / maxPendulum / somePoint[3];
  //   })
  // );
  // console.log(
  //   loopPoints.map((somePoint) => {
  //     return Math.sqrt(
  //       Math.pow(somePoint[3], 2) + Math.pow(somePoint[4] / maxPendulum, 2)
  //     );
  //   })
  // );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingInline: 8,
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <HorizontalSliderInput
            inputSize={40}
            minValue={0}
            maxValue={1}
            value={relativeSubCircleState.radius}
            onChange={(nextRelativeSubCircleRadius) => {
              setRelativeSubCircleState((currentState) => {
                return {
                  ...currentState,
                  radius: nextRelativeSubCircleRadius,
                };
              });
            }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <HorizontalSliderInput
            inputSize={40}
            minValue={0}
            maxValue={1}
            value={relativeSubCircleState.depth}
            onChange={(nextRelativeSubCircleDepth) => {
              setRelativeSubCircleState((currentState) => {
                return {
                  ...currentState,
                  depth: nextRelativeSubCircleDepth,
                };
              });
            }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <KnobInput
            inputSize={40}
            knobAngleOffset={0}
            minValue={0}
            maxValue={2 * Math.PI}
            value={relativeSubCircleState.phase}
            onChange={(nextRelativeSubCirclePhase) => {
              setRelativeSubCircleState((currentState) => {
                return {
                  ...currentState,
                  phase: nextRelativeSubCirclePhase,
                };
              });
            }}
          />
        </div>
        <div
          style={{ height: 2, backgroundColor: "lightgray", marginBottom: 12 }}
        />
        <div>
          <KnobInput
            inputSize={40}
            knobAngleOffset={0}
            minValue={0}
            maxValue={1}
            value={traceStamp}
            onChange={(nextValue) => {
              setTraceStamp(nextValue);
            }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", padding: 8 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <svg
            viewBox={"-2 -2 4 4"}
            width={256}
            height={256}
            style={{ marginBottom: 8, borderRadius: 4 }}
          >
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
                        (someLoopPoint) =>
                          `${someLoopPoint[0]},${someLoopPoint[1]}`
                      )
                      .join(" ")}
                  />
                );
              } else {
                throw new Error("invalid path reached: geometry node render");
              }
            })}
          </svg>
          <svg
            width={256}
            height={256}
            viewBox={`${-0.25} ${-0.25} ${1.5} ${1.5}`}
            style={{ borderRadius: 4 }}
          >
            <rect x={-0.25} y={-0.25} width={1.5} height={1.5} fill={"grey"} />
            <g transform="translate(0,1)">
              <g transform="scale(1,-1)">
                <line
                  x1={0}
                  y1={1}
                  x2={1}
                  y2={1}
                  stroke={"lime"}
                  strokeWidth={0.02}
                  strokeLinecap={"round"}
                />
                <line
                  x1={0}
                  y1={0}
                  x2={1}
                  y2={0}
                  stroke={"lime"}
                  strokeWidth={0.02}
                  strokeLinecap={"round"}
                />
                <polyline
                  points={loopPoints
                    .map(
                      (someLoopPoint, pointIndex) =>
                        `${pointIndex / loopPoints.length},${someLoopPoint[3]}`
                    )
                    .join(" ")}
                  stroke={"white"}
                  strokeWidth={0.02}
                  fillOpacity={0}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                />
              </g>
            </g>
          </svg>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", marginLeft: 8 }}
        >
          <svg
            width={256}
            height={256}
            viewBox={`${-0.75} ${-0.75} ${1.5} ${1.5}`}
            style={{ borderRadius: 4, marginBottom: 8 }}
          >
            <rect
              x={-0.75}
              y={-0.75}
              width={1.5}
              height={1.5}
              fill={"grey"}
              rx={0.02}
              ry={0.02}
            />
            <g transform="scale(1,-1)">
              <line
                x1={-0.5}
                y1={0}
                x2={0.5}
                y2={0}
                stroke={"lime"}
                strokeWidth={0.02}
                strokeLinecap={"round"}
              />
              <polyline
                points={`-0.5,0 ${loopPoints
                  .map(
                    (someLoopPoint, pointIndex) =>
                      `${pointIndex / loopPoints.length - 0.5},${
                        someLoopPoint[4] / (2 * maxPendulum)
                      }`
                  )
                  .join(" ")} 0.5,0`}
                stroke={"black"}
                strokeWidth={0.02}
                fillOpacity={0}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              />
            </g>
          </svg>
          <svg
            width={256}
            height={256}
            viewBox={`${-0.25} ${-0.25} ${1.5} ${1.5}`}
            style={{ borderRadius: 4 }}
          >
            <rect x={-0.25} y={-0.25} width={1.5} height={1.5} fill={"grey"} />
            <g transform="translate(0,1)">
              <g transform="scale(1,-1)">
                <polyline
                  points={loopPoints
                    .map(
                      (someLoopPoint, pointIndex) =>
                        `${pointIndex / loopPoints.length},${
                          someLoopPoint[5] /
                          getIntersectionRadiusData({
                            baseCircle: baseCircleNode.nodeGeometry,
                            subCircle: subCircleNode.nodeGeometry,
                            relativeSubCirclePhase:
                              subCircleNode.nodeEncoding.relativePhase,
                          }).maxIntersectionRadius
                        }`
                    )
                    .join(" ")}
                  stroke={"lime"}
                  strokeWidth={0.02}
                  fillOpacity={0}
                  strokeLinecap={"round"}
                  strokeLinejoin={"round"}
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
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
          maxValue,
          minValue,
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
          maxValue,
          minValue,
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
  extends Pick<
    KnobInputProps,
    "onChange" | "knobAngleOffset" | "minValue" | "maxValue"
  > {
  somePointerEvent: PointerEvent;
  knobClientRect: DOMRect;
}
function changeKnobValue(api: ChangeKnobValueApi) {
  const {
    somePointerEvent,
    knobClientRect,
    onChange,
    knobAngleOffset,
    minValue,
    maxValue,
  } = api;
  const targetPoint = [somePointerEvent.clientX, somePointerEvent.clientY];
  const centerPoint = [
    (knobClientRect.left + knobClientRect.right) / 2,
    (knobClientRect.top + knobClientRect.bottom) / 2,
  ];
  const knobAngle =
    getNormalizedAngle({
      someAngle:
        Math.atan2(
          targetPoint[1] - centerPoint[1],
          targetPoint[0] - centerPoint[0]
        ) - knobAngleOffset,
    }) /
    (2 * Math.PI);
  onChange(knobAngle * (maxValue - minValue) + minValue);
}

interface HorizontalSliderInputProps {
  minValue: number;
  maxValue: number;
  value: number;
  onChange: (nextValue: number) => void;
  inputSize: number;
}

function HorizontalSliderInput(props: HorizontalSliderInputProps) {
  const { inputSize, value, maxValue, minValue, onChange } = props;
  const sliderLineRef = useRef<SVGLineElement>(null);
  const trackingPointerRef = useRef(false);
  useEffect(() => {
    const pointerMoveHandler = (somePointerEvent: PointerEvent) => {
      if (sliderLineRef.current && trackingPointerRef.current === true) {
        changeSliderValue({
          maxValue,
          minValue,
          onChange,
          somePointerEvent,
          sliderLineClientRect: sliderLineRef.current.getBoundingClientRect(),
        });
      }
    };
    const pointerUpHandler = (somePointerEvent: PointerEvent) => {
      if (sliderLineRef.current && trackingPointerRef.current === true) {
        trackingPointerRef.current = false;
        changeSliderValue({
          maxValue,
          minValue,
          onChange,
          somePointerEvent,
          sliderLineClientRect: sliderLineRef.current.getBoundingClientRect(),
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
  const sliderPoint = useMemo(() => {
    return [2 * value * (maxValue - minValue) + minValue, 0];
  }, [value, maxValue, minValue]);
  return (
    <svg
      viewBox={"-0.5 -0.75 3 1.5"}
      width={inputSize}
      height={inputSize}
      style={{
        cursor: "pointer",
      }}
      onPointerDown={() => {
        trackingPointerRef.current = true;
      }}
    >
      <line
        ref={sliderLineRef}
        x1={0}
        y1={0}
        x2={2}
        y2={0}
        strokeWidth={0.15}
        stroke={"black"}
        strokeLinecap={"round"}
      />
      <g>
        <circle
          r={0.3}
          cx={sliderPoint[0]}
          cy={sliderPoint[1]}
          fill={"black"}
        />
        <circle
          r={0.2}
          cx={sliderPoint[0]}
          cy={sliderPoint[1]}
          fill={"white"}
        />
        <circle
          r={0.125}
          cx={sliderPoint[0]}
          cy={sliderPoint[1]}
          fill={"black"}
        />
      </g>
    </svg>
  );
}

interface ChangeSliderValueApi
  extends Pick<KnobInputProps, "onChange" | "minValue" | "maxValue"> {
  somePointerEvent: PointerEvent;
  sliderLineClientRect: DOMRect;
}
function changeSliderValue(api: ChangeSliderValueApi) {
  const {
    somePointerEvent,
    sliderLineClientRect,
    onChange,
    minValue,
    maxValue,
  } = api;
  const pointerX = somePointerEvent.clientX;
  const minSliderX = sliderLineClientRect.left;
  const maxSliderX = sliderLineClientRect.right;
  const relativeSliderValue =
    pointerX >= maxSliderX
      ? 1
      : pointerX <= minSliderX
      ? 0
      : (somePointerEvent.clientX - minSliderX) / (maxSliderX - minSliderX);
  onChange(relativeSliderValue * (maxValue - minValue) + minValue);
}

type Point = [x: number, y: number];

type LoopPoint = [
  x: number,
  y: number,
  outputAngle: number,
  sandwich: number,
  pendulum: number,
  sandwichSize: number
];

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
      const subCircleRadius = (relativeRadius || 0.0000001) * baseCircle.radius;
      const maxSubCircleDepth = baseCircle.radius - subCircleRadius;
      const subCircleDepth =
        relativeDepth === 0 || maxSubCircleDepth === 0
          ? 0.0000001 // (a): (a) needs to be closer to zero than (b)
          : relativeDepth === 1
          ? (relativeDepth - 0.0000001) * maxSubCircleDepth
          : relativeDepth * maxSubCircleDepth;
      return {
        radius:
          subCircleRadius === baseCircle.radius
            ? subCircleRadius - 0.000001 // (b)
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
              intersectionAngle: getNormalizedAngle({
                someAngle:
                  Math.PI + relativeSubCirclePhase - intersectionBaseAngle,
              }),
            });
            const loopPointB = getLoopPoint({
              subCircle,
              intersectionCircle,
              intersectionAngle: getNormalizedAngle({
                someAngle:
                  Math.PI + relativeSubCirclePhase + intersectionBaseAngle,
              }),
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
  const xComponent =
    intersectionCircle.radius * Math.cos(intersectionAngle) +
    intersectionCircle.center[0];
  const yComponent =
    subCircle.radius * Math.sin(intersectionAngle) + subCircle.center[1];
  const outputAngle = getNormalizedAngle({
    someAngle: Math.atan2(
      loopPointBase.y - subCircle.center[1],
      loopPointBase.x - subCircle.center[0]
    ),
  });
  const loopRadius = getDistanceBetweenPoints({
    pointA: subCircle.center,
    pointB: [xComponent, yComponent],
  });
  const sandwichSize = intersectionCircle.radius - subCircle.radius;
  const sandwichComponent = (loopRadius - subCircle.radius) / sandwichSize;
  const pendulumComponent = getDifferenceOfNormalizedAngles({
    normalizedAngleA: intersectionAngle,
    normalizedAngleB: outputAngle,
  });
  return [
    xComponent,
    yComponent,
    outputAngle,
    sandwichComponent,
    pendulumComponent,
    sandwichSize,
  ];
}

interface GetDifferenceOfNormalizedAnglesApi {
  normalizedAngleA: number;
  normalizedAngleB: number;
}

function getDifferenceOfNormalizedAngles(
  api: GetDifferenceOfNormalizedAnglesApi
) {
  const { normalizedAngleB, normalizedAngleA } = api;
  return normalizedAngleB < Math.PI && normalizedAngleA > Math.PI
    ? 2 * Math.PI + normalizedAngleB - normalizedAngleA
    : normalizedAngleB - normalizedAngleA;
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
