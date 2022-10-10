import { useRef, useState } from "react";
import { Page } from "../../../common/Page/Page";
import { LoopStructure } from "./common/geometry/loop/encodings";
import styles from "./LoopToyPage.module.scss";

export function LoopToyPage() {
  const focusedInputRef = useRef<HTMLInputElement>(null);
  const [activeCellState, setActiveCellState] = useState<ActiveCellState>({
    stateType: "noActiveCell",
  });
  const [layersState, setLayersState] = useState<Array<LoopLayer>>([
    getNewLoopLayer({
      loopLayerId: generateLoopLayerId(),
    }),
  ]);
  return (
    <Page
      pageContentContainerClassname={styles.pageContentContainer}
      accessibilityLabel={"loop toy"}
      pageTabTitle={"loop toy - clumsycomputer"}
      pageDescription={"a fun little toy for exploring loops"}
    >
      <div style={{ display: "flex", flexDirection: "column", padding: 8 }}>
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
          <div style={{ display: "flex", flexDirection: "column", padding: 8 }}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>
              {activeCellState.layerIndex}: {activeCellState.fieldLabel}
            </div>
            <div style={{ display: "flex" }}>
              <input
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
                onBlur={() => {
                  setLayersState((currentLayersState) => {
                    const nextLayersState = [...currentLayersState];
                    nextLayersState.splice(activeCellState.layerIndex, 1, {
                      ...nextLayersState[activeCellState.layerIndex],
                      [activeCellState.fieldKey]:
                        (activeCellState.fieldValue + 1) % 1,
                    });
                    return nextLayersState;
                  });
                }}
              />
            </div>
          </div>
        )}
        <div
          style={{ height: 1, backgroundColor: "lightgrey", marginTop: 12 }}
        />
      </div>
      <div
        style={{
          flexShrink: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
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
          minWidth: 64,
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
        {cellValue.toFixed(4)}
      </button>
    </div>
  );
}
