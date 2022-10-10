import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Page } from "../../../common/Page/Page";
import { Point2 } from "./common/geometry/general/encodings";
import { LoopPoint, LoopStructure } from "./common/geometry/loop/encodings";
import { getLoopPoint } from "./common/geometry/loop/getLoopPoint";
import styles from "./LoopToyPage.module.scss";

export function LoopToyPage() {
  const [viewportHeight, setViewportHeight] = useState(0);
  useEffect(() => {
    if (window?.visualViewport) {
      window.visualViewport!.addEventListener("resize", () => {
        setViewportHeight(window.visualViewport!.height);
      });
      setViewportHeight(window.visualViewport!.height);
    }
  }, []);
  const activeCellInputRef = useRef<HTMLInputElement>(null);
  const [activeCellState, setActiveCellState] = useState<ActiveCellState>({
    stateType: "noActiveCell",
  });
  useLayoutEffect(() => {
    activeCellInputRef.current?.focus();
  }, [activeCellState]);
  const [layersState, setLayersState] = useState<Array<LoopLayer>>([
    getNewLoopLayer({
      loopLayerId: generateLoopLayerId(),
    }),
  ]);
  const loopPointsData = useMemo(() => {
    const loopStructure = getLoopStructure({
      someLoopLayers: layersState,
    });
    const pointCount = 1024;
    const maxPointMagnitudeRef: [number] = [0];
    const maxCosineMagnitudeRef: [number] = [0];
    const maxSineMagnitudeRef: [number] = [0];
    const loopPointsData: Array<
      [LoopPoint, [Point2, [number]], [number, [number]], [number, [number]]]
    > = [];
    for (let pointIndex = 0; pointIndex < pointCount; pointIndex++) {
      const loopPoint = getLoopPoint({
        someLoopStructure: loopStructure,
        inputAngle: ((2 * Math.PI) / pointCount) * pointIndex,
      });
      const deltaLoopPointX = loopPoint[0] - loopPoint[2][0];
      const deltaLoopPointY = loopPoint[1] - loopPoint[2][1];
      const loopPointMagnitude = Math.sqrt(
        deltaLoopPointX * deltaLoopPointX + deltaLoopPointY * deltaLoopPointY
      );
      maxPointMagnitudeRef[0] =
        loopPointMagnitude > maxPointMagnitudeRef[0]
          ? loopPointMagnitude
          : maxPointMagnitudeRef[0];
      const zeroOriginLoopPoint: Point2 = [
        loopPoint[0] - loopPoint[2][0],
        loopPoint[1] - loopPoint[2][1],
      ];
      const pointCosine = loopPoint[0] - loopPoint[2][0];
      const pointCosineMagnitude = Math.abs(pointCosine);
      maxCosineMagnitudeRef[0] =
        pointCosineMagnitude > maxCosineMagnitudeRef[0]
          ? pointCosineMagnitude
          : maxCosineMagnitudeRef[0];
      const pointSine = loopPoint[1] - loopPoint[2][1];
      const pointSineMagnitude = Math.abs(pointSine);
      maxSineMagnitudeRef[0] =
        pointSineMagnitude > maxSineMagnitudeRef[0]
          ? pointSineMagnitude
          : maxSineMagnitudeRef[0];
      loopPointsData.push([
        loopPoint,
        [zeroOriginLoopPoint, maxPointMagnitudeRef],
        [pointCosine, maxCosineMagnitudeRef],
        [pointSine, maxSineMagnitudeRef],
      ]);
    }
    return loopPointsData;
  }, [layersState]);
  return (
    <Page
      pageContentContainerClassname={styles.pageContentContainer}
      accessibilityLabel={"loop toy"}
      pageTabTitle={"loop toy - clumsycomputer"}
      pageDescription={"a fun little toy for exploring loops"}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: viewportHeight,
          overflow: "scroll",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 8,
            paddingBottom: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                flexGrow: 1,
                maxWidth: 256 + 128,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <svg
                style={{ flexGrow: 1 }}
                viewBox={`${-1.25} ${-1.25} ${2.5} ${2.5}`}
                // width={256}
                // height={256}
              >
                <rect
                  x={-1.25}
                  y={-1.25}
                  width={2.5}
                  height={2.5}
                  fill={"gray"}
                />
                <g transform="scale(1,-1)">
                  <polygon
                    points={loopPointsData
                      .map(
                        (someLoopPointData) =>
                          `${
                            someLoopPointData[1][0][0] /
                            someLoopPointData[1][1][0]
                          },${
                            someLoopPointData[1][0][1] /
                            someLoopPointData[1][1][0]
                          }`
                      )
                      .join(" ")}
                    fillOpacity={0}
                    strokeWidth={0.03}
                    stroke={"yellow"}
                    strokeLinejoin={"round"}
                    strokeLinecap={"round"}
                  />
                </g>
              </svg>
            </div>
          </div>
          <div
            style={{
              marginTop: 8,
              // borderTopStyle: "solid",
              // borderTopColor: "lightgrey",
              // borderTopWidth: 1,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 8,
            paddingBottom: 0,
          }}
        >
          {activeCellState.stateType === "noActiveCell" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 600,
                fontStyle: "italic",
                padding: 8,
              }}
            >
              no cell selected
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", padding: 8 }}
            >
              <div style={{ fontWeight: 600, fontSize: 18 }}>
                {activeCellState.layerIndex}: {activeCellState.fieldLabel}
              </div>
              <div style={{ display: "flex" }}>
                <input
                  ref={activeCellInputRef}
                  style={{ fontSize: 18, fontWeight: 600, fontStyle: "italic" }}
                  type={"number"}
                  step={0.04}
                  value={parseFloat(activeCellState.fieldValue.toFixed(4))}
                  onChange={(someChangeEvent) => {
                    setActiveCellState((currentActiveCellState) => {
                      return {
                        ...currentActiveCellState,
                        fieldValue: Number(someChangeEvent.target.value),
                      };
                    });
                  }}
                  onKeyDown={(someKeyDownEvent) => {
                    if (someKeyDownEvent.key === "Enter") {
                      setLayersState((currentLayersState) => {
                        const nextLayersState = [...currentLayersState];
                        nextLayersState.splice(activeCellState.layerIndex, 1, {
                          ...nextLayersState[activeCellState.layerIndex],
                          [activeCellState.fieldKey]:
                            activeCellState.fieldValue === 1
                              ? 1
                              : activeCellState.fieldValue < 0
                              ? ((activeCellState.fieldValue % 1) + 1) % 1
                              : activeCellState.fieldValue > 1
                              ? activeCellState.fieldValue % 1
                              : activeCellState.fieldValue,
                        });
                        return nextLayersState;
                      });
                    }
                  }}
                  onBlur={() => {
                    setLayersState((currentLayersState) => {
                      const nextLayersState = [...currentLayersState];
                      nextLayersState.splice(activeCellState.layerIndex, 1, {
                        ...nextLayersState[activeCellState.layerIndex],
                        [activeCellState.fieldKey]:
                          activeCellState.fieldValue === 1
                            ? 1
                            : activeCellState.fieldValue < 0
                            ? ((activeCellState.fieldValue % 1) + 1) % 1
                            : activeCellState.fieldValue > 1
                            ? activeCellState.fieldValue % 1
                            : activeCellState.fieldValue,
                      });
                      return nextLayersState;
                    });
                  }}
                />
              </div>
            </div>
          )}
          <div
            style={{
              marginTop: 8,
              borderTopStyle: "solid",
              borderTopColor: "lightgrey",
              borderTopWidth: 1,
            }}
          />
        </div>
        <div
          style={{
            flexShrink: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          {layersState.map((someLayerState, layerIndex) => {
            return (
              <div
                key={someLayerState.loopLayerId}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 8,
                }}
              >
                <div
                  style={{
                    flexShrink: 1,
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <LoopLayerCell
                    cellValue={someLayerState.relativeSubRadius}
                    onClick={() => {
                      setActiveCellState({
                        stateType: "activeCellSelected",
                        fieldKey: "relativeSubRadius",
                        fieldLabel: "radius",
                        layerIndex,
                        fieldValue: someLayerState.relativeSubRadius,
                      });
                    }}
                  />
                  <LoopLayerCell
                    cellValue={someLayerState.relativeSubDepth}
                    onClick={() => {
                      setActiveCellState({
                        stateType: "activeCellSelected",
                        fieldKey: "relativeSubDepth",
                        fieldLabel: "depth",
                        layerIndex,
                        fieldValue: someLayerState.relativeSubDepth,
                      });
                    }}
                  />
                  <LoopLayerCell
                    cellValue={someLayerState.relativeSubPhase}
                    onClick={() => {
                      setActiveCellState({
                        stateType: "activeCellSelected",
                        fieldKey: "relativeSubPhase",
                        fieldLabel: "phase",
                        layerIndex,
                        fieldValue: someLayerState.relativeSubPhase,
                      });
                    }}
                  />
                  <LoopLayerCell
                    cellValue={someLayerState.relativeSubOrientation}
                    onClick={() => {
                      setActiveCellState({
                        stateType: "activeCellSelected",
                        fieldKey: "relativeSubOrientation",
                        fieldLabel: "orientation",
                        layerIndex,
                        fieldValue: someLayerState.relativeSubOrientation,
                      });
                    }}
                  />
                  <LoopLayerCell
                    cellValue={someLayerState.relativeLoopRotation}
                    onClick={() => {
                      setActiveCellState({
                        stateType: "activeCellSelected",
                        fieldKey: "relativeLoopRotation",
                        fieldLabel: "rotation",
                        layerIndex,
                        fieldValue: someLayerState.relativeLoopRotation,
                      });
                    }}
                  />
                </div>
                <div
                  style={{
                    flexGrow: 1,
                    flexShrink: 0,
                    padding: 8,
                    paddingLeft: 16,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "flex-start",
                  }}
                >
                  <button style={{ fontWeight: 600, fontSize: 18 }}>⋮</button>
                </div>
              </div>
            );
          })}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 16,
            }}
          >
            <button
              style={{
                flexGrow: 1,
                fontWeight: 600,
                fontSize: 18,
              }}
              onClick={() => {
                setLayersState((currentLayersState) => [
                  ...currentLayersState,
                  getNewLoopLayer({
                    loopLayerId: generateLoopLayerId(),
                  }),
                ]);
              }}
            >
              add layer
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}

type ActiveCellState = NoActiveCellState | ActiveCellSelectedState;

interface NoActiveCellState extends ActiveCellStateBase<"noActiveCell"> {}

interface ActiveCellSelectedState
  extends ActiveCellStateBase<"activeCellSelected"> {
  layerIndex: number;
  fieldKey: keyof Omit<LoopLayer, "loopLayerId">;
  fieldLabel: string;
  fieldValue: number;
}

interface ActiveCellStateBase<StateType extends string> {
  stateType: StateType;
}

interface LoopLayer
  extends Pick<
    LoopStructure["subStructure"],
    "relativeSubRadius" | "relativeSubDepth"
  > {
  loopLayerId: string;
  relativeSubPhase: LoopStructure["subStructure"]["subPhase"];
  relativeSubOrientation: LoopStructure["subStructure"]["subOrientation"];
  relativeLoopRotation: LoopStructure["subStructure"]["loopRotation"];
}

interface GetNewLoopLayerApi {
  loopLayerId: ReturnType<typeof generateLoopLayerId>;
}

function getNewLoopLayer(api: GetNewLoopLayerApi): LoopLayer {
  const { loopLayerId } = api;
  return {
    loopLayerId,
    relativeSubRadius: 1,
    relativeSubDepth: 0,
    relativeSubPhase: 0,
    relativeSubOrientation: 0,
    relativeLoopRotation: 0,
  };
}

function generateLoopLayerId(): `${number}` {
  return `${Math.random()}`;
}

interface LoopLayerCellProps
  extends Required<Pick<JSX.IntrinsicElements["button"], "onClick">> {
  cellValue: number;
}

function LoopLayerCell(props: LoopLayerCellProps) {
  const { cellValue, onClick } = props;
  return (
    <div
      style={{
        flexShrink: 1,
        display: "flex",
        padding: 8,
      }}
    >
      <button
        style={{
          width: 82,
          flexShrink: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: 18,
          fontWeight: 600,
          fontStyle: "italic",
        }}
        onClick={onClick}
      >
        {parseFloat(cellValue.toFixed(4))}
      </button>
    </div>
  );
}

interface GetLoopStructureApi {
  someLoopLayers: Array<LoopLayer>;
}

function getLoopStructure(api: GetLoopStructureApi): LoopStructure {
  const { someLoopLayers } = api;
  const [currentLayer, ...remainingLoopLayers] = someLoopLayers;
  return currentLayer
    ? _getLoopStructure({
        currentLayer,
        remainingLoopLayers,
      })
    : {
        structureType: "initial",
        loopBase: {
          radius: 1,
          center: [0, 0],
        },
        subStructure: {
          structureType: "terminal",
          relativeSubRadius: 1,
          relativeSubDepth: 0,
          subPhase: 0,
          subOrientation: 0,
          loopRotation: 0,
        },
      };
}

interface _GetLoopStructureApi {
  currentLayer: LoopLayer;
  remainingLoopLayers: Array<LoopLayer>;
}

function _getLoopStructure(api: _GetLoopStructureApi): LoopStructure {
  const { currentLayer, remainingLoopLayers } = api;
  return remainingLoopLayers.length > 0
    ? {
        structureType: "initial",
        loopBase: {
          radius: 1,
          center: [0, 0],
        },
        subStructure: {
          structureType: "interposed",
          relativeSubRadius: currentLayer.relativeSubRadius,
          relativeSubDepth: currentLayer.relativeSubDepth,
          subPhase: 2 * Math.PI * currentLayer.relativeSubPhase,
          subOrientation: 2 * Math.PI * currentLayer.relativeSubOrientation,
          loopRotation: 2 * Math.PI * currentLayer.relativeLoopRotation,
          subStructure: _getLoopStructure({
            currentLayer: remainingLoopLayers[0],
            remainingLoopLayers: remainingLoopLayers.slice(1),
          }).subStructure,
        },
      }
    : {
        structureType: "initial",
        loopBase: {
          radius: 1,
          center: [0, 0],
        },
        subStructure: {
          structureType: "terminal",
          relativeSubRadius: currentLayer.relativeSubRadius,
          relativeSubDepth: currentLayer.relativeSubDepth,
          subPhase: 2 * Math.PI * currentLayer.relativeSubPhase,
          subOrientation: 2 * Math.PI * currentLayer.relativeSubOrientation,
          loopRotation: 2 * Math.PI * currentLayer.relativeLoopRotation,
        },
      };
}
