import {
  ExtractInterposedStructure,
  RecursiveSpatialStructure,
} from "clumsy-math";
import { useState } from "react";
import { Circle, Point } from "./common/geometry/encodings";
import {
  getCirclePoint,
  getDistanceBetweenPoints,
} from "./common/geometry/general";

export function LoopExplorerPage() {
  const [loopStructureState, setLoopStructureState] = useState<
    Array<
      Pick<
        LoopStructure["subStructure"],
        | "relativeSubRadius"
        | "relativeSubDepth"
        | "subPhase"
        | "subOrientation"
        | "baseRotation"
      >
    >
  >([
    {
      relativeSubRadius: 1,
      relativeSubDepth: 0,
      subPhase: 0,
      subOrientation: 0,
      baseRotation: 0,
    },
  ]);
  const sampleCount = 512;
  const loopGeometry = getLoopGeometry({
    someLoopStructure: {
      structureType: "initial",
      loopRoot: {
        radius: 1,
        center: [0, 0],
      },
      subStructure: [...loopStructureState]
        .reverse()
        .reduce<LoopStructure["subStructure"] | null>(
          (result, someLoopLayer) =>
            result === null
              ? {
                  structureType: "terminal",
                  relativeSubRadius: someLoopLayer.relativeSubRadius,
                  relativeSubDepth: someLoopLayer.relativeSubDepth,
                  subPhase: someLoopLayer.subPhase * 2 * Math.PI,
                  subOrientation: someLoopLayer.subOrientation * 2 * Math.PI,
                  baseRotation: someLoopLayer.baseRotation * 2 * Math.PI,
                }
              : {
                  structureType: "interposed",
                  subStructure: result,
                  relativeSubRadius: someLoopLayer.relativeSubRadius,
                  relativeSubDepth: someLoopLayer.relativeSubDepth,
                  subPhase: someLoopLayer.subPhase * 2 * Math.PI,
                  subOrientation: someLoopLayer.subOrientation * 2 * Math.PI,
                  baseRotation: someLoopLayer.baseRotation * 2 * Math.PI,
                },
          null
        ) || {
        structureType: "terminal",
        relativeSubRadius: 1,
        relativeSubDepth: 0,
        subPhase: 0,
        subOrientation: 0,
        baseRotation: 0,
      },
    },
  });
  const loopPoints = loopGeometry.layers[0].loopPoints;
  const bottomSubCircle =
    loopGeometry.layers[loopGeometry.layers.length - 1].subCircle;
  // const loopPoints = new Array(sampleCount)
  //   .fill(undefined)
  //   .map((_, sampleIndex) => {
  //     return getLoopPoint({
  //       inputAngle: ((2 * Math.PI) / sampleCount) * sampleIndex,
  //       someLoopStructure: {
  //         structureType: "initial",
  //         loopRoot: {
  //           radius: 1,
  //           center: [0, 0],
  //         },
  //         subStructure: [...loopStructureState]
  //           .reverse()
  //           .reduce<LoopStructure["subStructure"] | null>(
  //             (result, someLoopLayer) =>
  //               result === null
  //                 ? {
  //                     structureType: "terminal",
  //                     relativeSubRadius: someLoopLayer.relativeSubRadius,
  //                     relativeSubDepth: someLoopLayer.relativeSubDepth,
  //                     subPhase: someLoopLayer.subPhase * 2 * Math.PI,
  //                     subOrientation:
  //                       someLoopLayer.subOrientation * 2 * Math.PI,
  //                     baseRotation: someLoopLayer.baseRotation * 2 * Math.PI,
  //                   }
  //                 : {
  //                     structureType: "interposed",
  //                     subStructure: result,
  //                     relativeSubRadius: someLoopLayer.relativeSubRadius,
  //                     relativeSubDepth: someLoopLayer.relativeSubDepth,
  //                     subPhase: someLoopLayer.subPhase * 2 * Math.PI,
  //                     subOrientation:
  //                       someLoopLayer.subOrientation * 2 * Math.PI,
  //                     baseRotation: someLoopLayer.baseRotation * 2 * Math.PI,
  //                   },
  //             null
  //           ) || {
  //           structureType: "terminal",
  //           relativeSubRadius: 1,
  //           relativeSubDepth: 0,
  //           subPhase: 0,
  //           subOrientation: 0,
  //           baseRotation: 0,
  //         },
  //       },
  //     });
  //   });
  // const loopCenter = loopPoints.reduce(
  //   (result, someLoopPoint) => {
  //     result[0] += someLoopPoint[0];
  //     result[1] += someLoopPoint[1];
  //     return result;
  //   },
  //   [0, 0]
  // );
  // loopCenter[0] = loopCenter[0] / loopPoints.length;
  // loopCenter[1] = loopCenter[1] / loopPoints.length;
  return (
    <div>
      <svg viewBox={`-1.25 -1.25 2.5 2.5`} width={256} height={256}>
        {/* <circle cx={loopCenter[0]} cy={loopCenter[1]} r={0.03} fill={"black"} /> */}
        <circle
          cx={loopPoints[0][2][0]}
          cy={loopPoints[0][2][1]}
          r={0.02}
          fill={"blue"}
        />
        <circle
          r={bottomSubCircle.radius}
          // cx={bottomSubCircle.center[0]}
          // cy={bottomSubCircle.center[1]}
          cx={loopPoints[0][2][0]}
          cy={loopPoints[0][2][1]}
          fillOpacity={0}
          stroke={"blue"}
          strokeWidth={0.03}
        />
        <circle
          r={1}
          cx={0}
          cy={0}
          fillOpacity={0}
          stroke={"green"}
          strokeWidth={0.03}
        />
        <polygon
          points={loopPoints
            .map((someLoopPoint) => `${someLoopPoint[0]},${someLoopPoint[1]}`)
            .join(" ")}
          fillOpacity={0}
          stroke={"red"}
          strokeWidth={0.03}
          strokeLinejoin={"round"}
          strokeLinecap={"round"}
        />
        <polygon
          points={loopPoints
            .map<Point>((someLoopPoint) => {
              const radius = getDistanceBetweenPoints({
                pointA: [someLoopPoint[0], someLoopPoint[1]],
                pointB: someLoopPoint[2],
              });
              return [
                radius * Math.cos(someLoopPoint[3]) + someLoopPoint[2][0],
                radius * Math.sin(someLoopPoint[3]) + someLoopPoint[2][1],
              ];
            })
            .map((someLoopPoint) => `${someLoopPoint[0]},${someLoopPoint[1]}`)
            .join(" ")}
          fillOpacity={0}
          stroke={"purple"}
          strokeWidth={0.03}
          strokeLinejoin={"round"}
          strokeLinecap={"round"}
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row", padding: 8 }}>
          <button
            onClick={() => {
              setLoopStructureState((currentState) => [
                ...currentState,
                {
                  relativeSubRadius: 1,
                  relativeSubDepth: 0,
                  subPhase: 0,
                  subOrientation: 0,
                  baseRotation: 0,
                },
              ]);
            }}
          >
            add layer
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {loopStructureState.map((someLoopStructureLayer, layerIndex) => {
            return (
              <div
                key={`${layerIndex}`}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                  }}
                >
                  <label style={{ fontWeight: 600, fontSize: 18 }}>
                    radius
                  </label>
                  <input
                    style={{
                      margin: 0,
                      padding: 0,
                      width: 96,
                      height: 32,
                      fontWeight: 600,
                      fontSize: 20,
                      fontStyle: "italic",
                    }}
                    type={"number"}
                    step={1 / 25}
                    value={someLoopStructureLayer.relativeSubRadius}
                    onChange={(someChangeEvent) => {
                      setLoopStructureState((currentState) => {
                        const nextState = [...currentState];
                        nextState.splice(layerIndex, 1, {
                          ...currentState[layerIndex],
                          relativeSubRadius:
                            (Number(someChangeEvent.target.value) + 1) % 1,
                        });
                        return nextState;
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                  }}
                >
                  <label style={{ fontWeight: 600, fontSize: 18 }}>depth</label>
                  <input
                    style={{
                      margin: 0,
                      padding: 0,
                      width: 96,
                      height: 32,
                      fontWeight: 600,
                      fontSize: 20,
                      fontStyle: "italic",
                    }}
                    type={"number"}
                    step={1 / 25}
                    value={someLoopStructureLayer.relativeSubDepth}
                    onChange={(someChangeEvent) => {
                      setLoopStructureState((currentState) => {
                        const nextState = [...currentState];
                        nextState.splice(layerIndex, 1, {
                          ...currentState[layerIndex],
                          relativeSubDepth:
                            (Number(someChangeEvent.target.value) + 1) % 1,
                        });
                        return nextState;
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                  }}
                >
                  <label style={{ fontWeight: 600, fontSize: 18 }}>phase</label>
                  <input
                    style={{
                      margin: 0,
                      padding: 0,
                      width: 96,
                      height: 32,
                      fontWeight: 600,
                      fontSize: 20,
                      fontStyle: "italic",
                    }}
                    type={"number"}
                    step={1 / 25}
                    value={someLoopStructureLayer.subPhase}
                    onChange={(someChangeEvent) => {
                      setLoopStructureState((currentState) => {
                        const nextState = [...currentState];
                        nextState.splice(layerIndex, 1, {
                          ...currentState[layerIndex],
                          subPhase:
                            (Number(someChangeEvent.target.value) + 1) % 1,
                        });
                        return nextState;
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                  }}
                >
                  <label style={{ fontWeight: 600, fontSize: 18 }}>
                    orientation
                  </label>
                  <input
                    style={{
                      margin: 0,
                      padding: 0,
                      width: 96,
                      height: 32,
                      fontWeight: 600,
                      fontSize: 20,
                      fontStyle: "italic",
                    }}
                    type={"number"}
                    step={1 / 25}
                    value={someLoopStructureLayer.subOrientation}
                    onChange={(someChangeEvent) => {
                      setLoopStructureState((currentState) => {
                        const nextState = [...currentState];
                        nextState.splice(layerIndex, 1, {
                          ...currentState[layerIndex],
                          subOrientation:
                            (Number(someChangeEvent.target.value) + 1) % 1,
                        });
                        return nextState;
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                  }}
                >
                  <label style={{ fontWeight: 600, fontSize: 18 }}>
                    rotation
                  </label>
                  <input
                    style={{
                      margin: 0,
                      padding: 0,
                      width: 96,
                      height: 32,
                      fontWeight: 600,
                      fontSize: 20,
                      fontStyle: "italic",
                    }}
                    type={"number"}
                    step={1 / 25}
                    value={someLoopStructureLayer.baseRotation}
                    onChange={(someChangeEvent) => {
                      setLoopStructureState((currentState) => {
                        const nextState = [...currentState];
                        nextState.splice(layerIndex, 1, {
                          ...currentState[layerIndex],
                          baseRotation:
                            (Number(someChangeEvent.target.value) + 1) % 1,
                        });
                        return nextState;
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={() => {
                      setLoopStructureState((currentState) => {
                        const nextState = [...currentState];
                        nextState.splice(layerIndex, 1);
                        return nextState;
                      });
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type LoopStructure = RecursiveSpatialStructure<
  { loopRoot: Circle },
  {
    // baseRotation: number;
  },
  {
    relativeSubRadius: number;
    relativeSubDepth: number;
    subPhase: number;
    subOrientation: number;
    baseRotation: number;
  }
>;

type LoopPoint = [x: number, y: number, center: Point, inputAngle: number];

interface GetLoopPointApi {
  someLoopStructure: LoopStructure;
  inputAngle: number;
}

function getLoopPoint(api: GetLoopPointApi): LoopPoint {
  const { inputAngle, someLoopStructure } = api;
  return _getLoopPoint({
    inputAngle,
    baseCircle: someLoopStructure.loopRoot,
    baseStructure: someLoopStructure,
  });
}

interface _GetLoopPointApi {
  inputAngle: number;
  baseCircle: Circle;
  baseStructure: LoopStructure | ExtractInterposedStructure<LoopStructure>;
}

function _getLoopPoint(api: _GetLoopPointApi): LoopPoint {
  const { baseCircle, baseStructure, inputAngle } = api;
  const unorientedSubCircle = getUnorientedSubCircle({
    baseCircle,
    relativeSubRadius: baseStructure.subStructure.relativeSubRadius,
    relativeSubDepth: baseStructure.subStructure.relativeSubDepth,
    subPhase: baseStructure.subStructure.subPhase,
  });
  const unorientedSubPoint: LoopPoint =
    baseStructure.subStructure.structureType === "interposed"
      ? _getLoopPoint({
          inputAngle,
          baseCircle: unorientedSubCircle,
          baseStructure: baseStructure.subStructure,
        })
      : [
          unorientedSubCircle.radius * Math.cos(inputAngle) +
            unorientedSubCircle.center[0],
          unorientedSubCircle.radius * Math.sin(inputAngle) +
            unorientedSubCircle.center[1],
          unorientedSubCircle.center,
          inputAngle,
        ];
  const subCenter = unorientedSubPoint[2];
  const basePoint = getBasePoint({
    baseCircle,
    subCenter: subCenter,
    subPoint: unorientedSubPoint,
  });
  const unorientedLoopPoint: Point = [basePoint[0], unorientedSubPoint[1]];
  const orientedSubCenter = getRotatedPoint({
    anchorPoint: baseCircle.center,
    subjectPoint: subCenter,
    rotationAngle: baseStructure.subStructure.subOrientation,
  });
  const orientedRotatedLoopPoint = getRotatedPoint({
    rotationAngle: baseStructure.subStructure.baseRotation,
    anchorPoint: orientedSubCenter,
    subjectPoint: getRotatedPoint({
      anchorPoint: baseCircle.center,
      subjectPoint: unorientedLoopPoint,
      rotationAngle: baseStructure.subStructure.subOrientation,
    }),
  });
  return [
    orientedRotatedLoopPoint[0],
    orientedRotatedLoopPoint[1],
    orientedSubCenter,
    inputAngle,
  ];
}

interface GetUnorientedSubCircleApi
  extends Pick<_GetLoopPointApi, "baseCircle">,
    Pick<
      _GetLoopPointApi["baseStructure"]["subStructure"],
      "relativeSubRadius" | "relativeSubDepth" | "subPhase"
    > {}

function getUnorientedSubCircle(api: GetUnorientedSubCircleApi): Circle {
  const { relativeSubRadius, relativeSubDepth, baseCircle, subPhase } = api;
  const adjustedRelativeSubRadius =
    relativeSubRadius === 0
      ? 0.000000000001
      : relativeSubRadius === 1
      ? 0.999999999999
      : relativeSubRadius;
  const adjustedRelativeSubDepth =
    relativeSubDepth === 0
      ? 0.000000000001
      : relativeSubDepth === 1
      ? 0.999999999999
      : relativeSubDepth;
  const subCircleRadius = adjustedRelativeSubRadius * baseCircle.radius;
  const maxSubCircleDepth = baseCircle.radius - subCircleRadius;
  const subCircleDepth = adjustedRelativeSubDepth * maxSubCircleDepth;
  const subCircleCenter: Point = [
    subCircleDepth * Math.cos(subPhase) + baseCircle.center[0],
    subCircleDepth * Math.sin(subPhase) + baseCircle.center[1],
  ];
  return {
    radius: subCircleRadius,
    center: subCircleCenter,
  };
}

interface GetRotatedPointApi {
  rotationAngle: number;
  anchorPoint: Point;
  subjectPoint: Point;
}

function getRotatedPoint(api: GetRotatedPointApi): Point {
  const { subjectPoint, anchorPoint, rotationAngle } = api;
  const originCenteredPoint = [
    subjectPoint[0] - anchorPoint[0],
    subjectPoint[1] - anchorPoint[1],
  ];
  return [
    originCenteredPoint[0] * Math.cos(rotationAngle) -
      originCenteredPoint[1] * Math.sin(rotationAngle) +
      anchorPoint[0],
    originCenteredPoint[0] * Math.sin(rotationAngle) +
      originCenteredPoint[1] * Math.cos(rotationAngle) +
      anchorPoint[1],
  ];
}

interface GetBasePointApi {
  baseCircle: Circle;
  subCenter: Point;
  subPoint: LoopPoint;
}

function getBasePoint(api: GetBasePointApi) {
  const { subCenter, baseCircle, subPoint } = api;
  const unitBasePoint = getUnitBasePoint({
    subCenterX: (subCenter[0] - baseCircle.center[0]) / baseCircle.radius,
    subCenterY: (subCenter[1] - baseCircle.center[1]) / baseCircle.radius,
    subPointX: (subPoint[0] - baseCircle.center[0]) / baseCircle.radius,
    subPointY: (subPoint[1] - baseCircle.center[1]) / baseCircle.radius,
  });
  return [
    baseCircle.radius * unitBasePoint[0] + baseCircle.center[0],
    baseCircle.radius * unitBasePoint[1] + baseCircle.center[1],
  ];
}

interface GetUnitBasePointApi {
  subCenterX: number;
  subCenterY: number;
  subPointX: number;
  subPointY: number;
}

function getUnitBasePoint(api: GetUnitBasePointApi) {
  const { subCenterX, subPointX, subCenterY, subPointY } = api;
  const deltaX = subCenterX - subPointX;
  const otherDeltaX = subPointX - subCenterX;
  const deltaY = subCenterY - subPointY;
  const otherDeltaY = subPointY - subCenterY;
  const squaredDeltaX = deltaX * deltaX;
  const squaredDeltaY = deltaY * deltaY;
  const squaredDeltaAdded = squaredDeltaX + squaredDeltaY;
  const exprA =
    (subCenterX * subCenterX - subCenterX * subPointX + subCenterY * deltaY) /
    squaredDeltaAdded;
  const exprB =
    Math.sqrt(
      1 -
        Math.pow(subCenterY * subPointX - subCenterX * subPointY, 2) /
          squaredDeltaAdded
    ) / Math.sqrt(squaredDeltaAdded);
  return [
    subCenterX - deltaX * exprA + otherDeltaX * exprB,
    subCenterY + otherDeltaY * exprA + otherDeltaY * exprB,
  ];
}

interface GetLoopGeometryApi {
  someLoopStructure: LoopStructure;
}

function getLoopGeometry(api: GetLoopGeometryApi): {
  baseCircle: Circle;
  layers: Array<{ loopPoints: Array<LoopPoint>; subCircle: Circle }>;
} {
  const { someLoopStructure } = api;
  return {
    baseCircle: someLoopStructure.loopRoot,
    layers: _getLoopGeometry({
      someLoopStructure: someLoopStructure,
    }),
  };
}

interface _GetLoopGeometryApi {
  someLoopStructure: LoopStructure;
}

function _getLoopGeometry(
  api: _GetLoopGeometryApi
): ReturnType<typeof getLoopGeometry>["layers"] {
  const { someLoopStructure } = api;
  const sampleCount = 512;
  const nextLoopPoints = new Array(sampleCount)
    .fill(undefined)
    .map((_, sampleIndex) =>
      getLoopPoint({
        someLoopStructure,
        inputAngle: ((2 * Math.PI) / sampleCount) * sampleIndex,
      })
    );
  const unorientedSubCircle = getUnorientedSubCircle({
    baseCircle: someLoopStructure.loopRoot,
    relativeSubRadius: someLoopStructure.subStructure.relativeSubRadius,
    relativeSubDepth: someLoopStructure.subStructure.relativeSubDepth,
    subPhase: someLoopStructure.subStructure.subPhase,
  });
  const nextSubCircle: Circle = {
    ...unorientedSubCircle,
    center: getRotatedPoint({
      anchorPoint: someLoopStructure.loopRoot.center,
      subjectPoint: unorientedSubCircle.center,
      rotationAngle: someLoopStructure.subStructure.subOrientation,
    }),
  };
  return [
    { loopPoints: nextLoopPoints, subCircle: nextSubCircle },
    ...(someLoopStructure.subStructure.structureType === "interposed"
      ? _getLoopGeometry({
          someLoopStructure: {
            structureType: "initial",
            loopRoot: nextSubCircle,
            subStructure: someLoopStructure.subStructure.subStructure,
          },
        })
      : []),
  ];
}
