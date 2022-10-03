import { useState } from "react";
import { Page } from "../../../common/Page/Page";
import { Graphic } from "./common/components/Graphic";
import { Loop } from "./common/geometry/encodings";
import { getLoopDiagramGeometry } from "./common/geometry/loop";
import styles from "./LoopExplorerPage.module.scss";

export interface LoopExplorerPageProps {}

export function LoopExplorerPage(props: LoopExplorerPageProps) {
  const [loopSubCircleState, setLoopSubCircleState] = useState<
    Pick<Loop["subCircle"], "relativeRadius" | "relativeDepth"> & {
      normalizedRelativePhase: number;
    }
  >({
    relativeRadius: 0.75,
    relativeDepth: 0.5,
    normalizedRelativePhase: 0,
  });
  const { baseCircleGeometry, subCircleGeometry, loopGeometry } =
    getLoopDiagramGeometry({
      intersectionCircleCount: 256,
      someLoop: {
        baseCircle: {
          radius: 1,
          center: [0, 0],
        },
        subCircle: {
          ...loopSubCircleState,
          relativePhase:
            2 * Math.PI * loopSubCircleState.normalizedRelativePhase,
        },
      },
    });
  return (
    <Page
      pageContentContainerClassname={styles.pageContentContainer}
      accessibilityLabel={"loop explorer"}
      pageTabTitle={"loop - clumsycomputer"}
      pageDescription={"a fun little toy for building intuition about circles"}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <NormalizedNumberField
          fieldLabel={"radius"}
          fieldValue={loopSubCircleState.relativeRadius}
          onValueChange={(nextRelativeRadius) => {
            setLoopSubCircleState((currentLoopSubCircleState) => ({
              ...currentLoopSubCircleState,
              relativeRadius: nextRelativeRadius,
            }));
          }}
        />
        <NormalizedNumberField
          fieldLabel={"depth"}
          fieldValue={loopSubCircleState.relativeDepth}
          onValueChange={(nextRelativeDepth) => {
            setLoopSubCircleState((currentLoopSubCircleState) => ({
              ...currentLoopSubCircleState,
              relativeDepth: nextRelativeDepth,
            }));
          }}
        />
        <NormalizedNumberField
          fieldLabel={"phase"}
          fieldValue={loopSubCircleState.normalizedRelativePhase}
          onValueChange={(nextNormalizedRelativePhase) => {
            setLoopSubCircleState((currentLoopSubCircleState) => ({
              ...currentLoopSubCircleState,
              normalizedRelativePhase: nextNormalizedRelativePhase,
            }));
          }}
        />
      </div>
      <div style={{ padding: 8 }}>
        <Graphic
          viewAspectRatio={[1, 1]}
          clientSpace={[
            [-2, 2],
            [-2, 2],
          ]}
        >
          <rect
            fill={"lightgray"}
            x={-2}
            width={4}
            y={-2}
            height={4}
            rx={0.1}
            ry={0.1}
          />
          <circle
            stroke={"red"}
            strokeWidth={0.075}
            fillOpacity={0}
            r={baseCircleGeometry.radius}
            cx={baseCircleGeometry.center[0]}
            cy={baseCircleGeometry.center[1]}
          />
          <circle
            stroke={"blue"}
            strokeWidth={0.075}
            fillOpacity={0}
            r={subCircleGeometry.radius}
            cx={subCircleGeometry.center[0]}
            cy={subCircleGeometry.center[1]}
          />
          <polygon
            stroke={"gold"}
            strokeWidth={0.075}
            fillOpacity={0}
            points={loopGeometry
              .map((someLoopPoint) => `${someLoopPoint[0]},${someLoopPoint[1]}`)
              .join(" ")}
          />
        </Graphic>
      </div>
    </Page>
  );
}

interface NormalizedNumberFieldProps {
  fieldLabel: string;
  fieldValue: number;
  onValueChange: (nextFieldValue: number) => void;
}

function NormalizedNumberField(props: NormalizedNumberFieldProps) {
  const { fieldLabel, fieldValue, onValueChange } = props;
  return (
    <div
      style={{
        flexGrow: 1,
        flexBasis: 64,
        display: "flex",
        flexDirection: "column",
        padding: 8,
      }}
    >
      <label style={{ fontWeight: "bold", fontSize: 20, color: "blue" }}>
        {fieldLabel}
      </label>
      <input
        style={{ height: 32, fontSize: 24 }}
        type={"number"}
        min={0}
        max={1}
        step={1 / 50}
        value={fieldValue}
        onChange={(someChangeEvent) => {
          const inputValue = someChangeEvent.target.value;
          const massagedInputValue = inputValue.startsWith("0.")
            ? inputValue
            : /^[0-9]+/.test(inputValue)
            ? `0.${Number(inputValue)}`
            : "0";
          onValueChange(Number(massagedInputValue));
        }}
      />
    </div>
  );
}
