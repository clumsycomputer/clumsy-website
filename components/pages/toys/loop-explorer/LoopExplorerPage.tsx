import {
  ExtractInterposedStructure,
  RecursiveSpatialStructure,
} from "clumsy-math";
import { useState } from "react";
import { Circle, Point } from "./common/geometry/encodings";
import {
  getCirclePoint,
  getDistanceBetweenPoints,
  getNormalizedAngle,
  getNormalizedAngleBetweenPoints,
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
        | "subRotation"
      >
    >
  >([
    {
      relativeSubRadius: 1,
      relativeSubDepth: 0,
      subPhase: 0,
      subOrientation: 0,
      subRotation: 0,
    },
  ]);
  const sampleCount = 1024;
  return (
    <div>
      <svg viewBox={`-1.25 -1.25 2.5 2.5`} width={256} height={256}>
        <polygon
          points={new Array(sampleCount - 2)
            .fill(undefined)
            .map((_, sampleIndex) => {
              return getLoopPoint({
                inputAngle: ((2 * Math.PI) / sampleCount) * sampleIndex + 1,
                someLoopStructure: {
                  structureType: "initial",
                  loopBase: {
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
                              relativeSubRadius:
                                someLoopLayer.relativeSubRadius,
                              relativeSubDepth: someLoopLayer.relativeSubDepth,
                              subPhase: someLoopLayer.subPhase * 2 * Math.PI,
                              subOrientation:
                                someLoopLayer.subOrientation * 2 * Math.PI,
                              subRotation:
                                someLoopLayer.subRotation * 2 * Math.PI,
                            }
                          : {
                              structureType: "interposed",
                              subStructure: result,
                              relativeSubRadius:
                                someLoopLayer.relativeSubRadius,
                              relativeSubDepth: someLoopLayer.relativeSubDepth,
                              subPhase: someLoopLayer.subPhase * 2 * Math.PI,
                              subOrientation:
                                someLoopLayer.subOrientation * 2 * Math.PI,
                              subRotation:
                                someLoopLayer.subRotation * 2 * Math.PI,
                            },
                      null
                    ) || {
                    structureType: "terminal",
                    relativeSubRadius: 1,
                    relativeSubDepth: 0,
                    subPhase: 0,
                    subOrientation: 0,
                    subRotation: 0,
                  },
                },
              });
            })
            .map((someLoopPoint) => `${someLoopPoint[0]},${someLoopPoint[1]}`)
            .join(" ")}
          fillOpacity={0}
          stroke={"red"}
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
                  subRotation: 0,
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
                    value={someLoopStructureLayer.subRotation}
                    onChange={(someChangeEvent) => {
                      setLoopStructureState((currentState) => {
                        const nextState = [...currentState];
                        nextState.splice(layerIndex, 1, {
                          ...currentState[layerIndex],
                          subRotation:
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
  { loopBase: Circle },
  {},
  {
    relativeSubRadius: number;
    relativeSubDepth: number;
    subPhase: number;
    subOrientation: number;
    subRotation: number;
  }
>;

interface GetLoopPointApi {
  someLoopStructure: LoopStructure;
  inputAngle: number;
  inputAngleRetryDelta?: number;
}

function getLoopPoint(api: GetLoopPointApi): Point {
  const { inputAngle, someLoopStructure } = api;
  return _getLoopPoint({
    inputAngle,
    baseCircle: someLoopStructure.loopBase,
    baseStructure: someLoopStructure,
  });
}

interface _GetLoopPointApi {
  inputAngle: number;
  baseCircle: Circle;
  baseStructure: LoopStructure | ExtractInterposedStructure<LoopStructure>;
}

function _getLoopPoint(api: _GetLoopPointApi): Point {
  const { baseCircle, baseStructure, inputAngle } = api;
  const { unorientedSubCircle } = getUnorientedSubCircle({
    baseCircle,
    relativeSubRadius: baseStructure.subStructure.relativeSubRadius,
    relativeSubDepth: baseStructure.subStructure.relativeSubDepth,
    subPhase: baseStructure.subStructure.subPhase,
  });
  const unorientedSubLoopPoint =
    baseStructure.subStructure.structureType === "interposed"
      ? _getLoopPoint({
          inputAngle,
          baseCircle: unorientedSubCircle,
          baseStructure: baseStructure.subStructure,
        })
      : getCirclePoint({
          pointAngle: inputAngle,
          someCircle: unorientedSubCircle,
        });
  const baseCirclePoint = getBasePoint({
    baseCircle,
    subCircle: unorientedSubCircle,
    subPoint: unorientedSubLoopPoint,
  });
  const unorientedLoopPoint: Point = [
    baseCirclePoint[0],
    unorientedSubLoopPoint[1],
  ];
  return getRotatedPoint({
    rotationAngle: baseStructure.subStructure.subRotation,
    anchorPoint: getRotatedPoint({
      anchorPoint: baseCircle.center,
      subjectPoint: unorientedSubCircle.center,
      rotationAngle: baseStructure.subStructure.subOrientation,
    }),
    subjectPoint: getRotatedPoint({
      anchorPoint: baseCircle.center,
      subjectPoint: unorientedLoopPoint,
      rotationAngle: baseStructure.subStructure.subOrientation,
    }),
  });
}

interface GetUnorientedSubCircleApi
  extends Pick<_GetLoopPointApi, "baseCircle">,
    Pick<
      _GetLoopPointApi["baseStructure"]["subStructure"],
      "relativeSubRadius" | "relativeSubDepth" | "subPhase"
    > {}

function getUnorientedSubCircle(api: GetUnorientedSubCircleApi): {
  unorientedSubCircle: Circle;
} {
  const { relativeSubRadius, relativeSubDepth, baseCircle, subPhase } = api;
  const adjustedRelativeSubRadius =
    relativeSubRadius === 0
      ? 0.0000001
      : relativeSubRadius === 1
      ? 0.9999999
      : relativeSubRadius;
  const adjustedRelativeSubDepth =
    relativeSubDepth === 0
      ? 0.0000001
      : relativeSubDepth === 1
      ? 0.9999999
      : relativeSubDepth;
  const subCircleRadius = adjustedRelativeSubRadius * baseCircle.radius;
  const maxSubCircleDepth = baseCircle.radius - subCircleRadius;
  const subCircleDepth = adjustedRelativeSubDepth * maxSubCircleDepth;
  const subCircleCenter: Point = [
    subCircleDepth * Math.cos(subPhase) + baseCircle.center[0],
    subCircleDepth * Math.sin(subPhase) + baseCircle.center[1],
  ];
  return {
    unorientedSubCircle: {
      radius: subCircleRadius,
      center: subCircleCenter,
    },
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
  subCircle: Circle;
  subPoint: Point;
}

function getBasePoint(api: GetBasePointApi) {
  const { subCircle, baseCircle, subPoint } = api;
  const unitBasePoint = getUnitBasePoint({
    subCenterX:
      (subCircle.center[0] - baseCircle.center[0]) / baseCircle.radius,
    subCenterY:
      (subCircle.center[1] - baseCircle.center[1]) / baseCircle.radius,
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
