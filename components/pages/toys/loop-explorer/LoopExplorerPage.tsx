import { useState } from "react";
import { Point2 } from "./common/geometry/general/encodings";
import { LoopPoint, LoopStructure } from "./common/geometry/loop/encodings";
import { getLoopPoint } from "./common/geometry/loop/getLoopPoint";

export function LoopExplorerPage() {
  const [loopLayers, setLoopLayers] = useState<Array<LoopLayer>>([]);
  const loopStructure = getLoopStructure({
    someLoopLayers: loopLayers,
  });
  const pointCount = 1024;
  const maxPointMagnitudeRef: [number] = [0];
  const maxCosineMagnitudeRef: [number] = [0];
  const maxSineMagnitudeRef: [number] = [0];
  const loopPointsData = new Array(pointCount)
    .fill(undefined)
    .map<
      [LoopPoint, [Point2, [number]], [number, [number]], [number, [number]]]
    >((_, pointIndex) => {
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
      return [
        loopPoint,
        [zeroOriginLoopPoint, maxPointMagnitudeRef],
        [pointCosine, maxCosineMagnitudeRef],
        [pointSine, maxSineMagnitudeRef],
      ];
    });
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ padding: 8 }}>
          <svg
            viewBox={`${-1.25} ${-1.25} ${2.5} ${2.5}`}
            width={256}
            height={256}
          >
            <rect x={-1.25} y={-1.25} width={2.5} height={2.5} fill={"gray"} />
            <g transform="scale(1,-1)">
              <polygon
                points={loopPointsData
                  .map(
                    (someLoopPointData) =>
                      `${
                        someLoopPointData[1][0][0] / someLoopPointData[1][1][0]
                      },${
                        someLoopPointData[1][0][1] / someLoopPointData[1][1][0]
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
        <div style={{ padding: 8 }}>
          <svg
            viewBox={`${-1.25} ${-1.25} ${2.5} ${2.5}`}
            width={256}
            height={256}
          >
            <rect x={-1.25} y={-1.25} width={2.5} height={2.5} fill={"gray"} />
            <g transform="scale(1,-1)">
              <polyline
                points={loopPointsData
                  .map(
                    (someLoopPointData, pointIndex) =>
                      `${(pointIndex / loopPointsData.length) * 2 - 1},${
                        someLoopPointData[2][0] / someLoopPointData[2][1][0]
                      }`
                  )
                  .join(" ")}
                stroke={"yellow"}
                strokeWidth={0.03}
                fillOpacity={0}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              />
            </g>
          </svg>
        </div>
        <div style={{ padding: 8 }}>
          <svg
            viewBox={`${-1.25} ${-1.25} ${2.5} ${2.5}`}
            width={256}
            height={256}
          >
            <rect x={-1.25} y={-1.25} width={2.5} height={2.5} fill={"gray"} />
            <g transform="scale(1,-1)">
              <polyline
                points={loopPointsData
                  .map(
                    (someLoopPointData, pointIndex) =>
                      `${(pointIndex / loopPointsData.length) * 2 - 1},${
                        someLoopPointData[3][0] / someLoopPointData[3][1][0]
                      }`
                  )
                  .join(" ")}
                stroke={"yellow"}
                strokeWidth={0.03}
                fillOpacity={0}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
              />
            </g>
          </svg>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ padding: 8 }}>
            <button
              onClick={() => {
                setLoopLayers((currentLoopLayers) => [
                  ...currentLoopLayers,
                  {
                    relativeSubRadius: 1,
                    relativeSubDepth: 0,
                    relativeSubPhase: 0,
                    relativeSubOrientation: 0,
                    relativeLoopRotation: 0,
                  },
                ]);
              }}
            >
              add layer
            </button>
          </div>
        </div>
        {loopLayers.map((someLoopLayer, layerIndex) => {
          return (
            <div
              key={`${layerIndex}`}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <RelativeNumberField
                label={"radius"}
                value={someLoopLayer.relativeSubRadius}
                valueStep={1 / 50}
                onValueChange={(nextRelativeSubRadius) => {
                  setLoopLayers((currentLoopLayers) => {
                    const nextLoopLayers = [...currentLoopLayers];
                    nextLoopLayers.splice(layerIndex, 1, {
                      ...currentLoopLayers[layerIndex],
                      relativeSubRadius: nextRelativeSubRadius,
                    });
                    return nextLoopLayers;
                  });
                }}
              />
              <RelativeNumberField
                label={"depth"}
                value={someLoopLayer.relativeSubDepth}
                valueStep={1 / 50}
                onValueChange={(nextRelativeSubDepth) => {
                  setLoopLayers((currentLoopLayers) => {
                    const nextLoopLayers = [...currentLoopLayers];
                    nextLoopLayers.splice(layerIndex, 1, {
                      ...currentLoopLayers[layerIndex],
                      relativeSubDepth: nextRelativeSubDepth,
                    });
                    return nextLoopLayers;
                  });
                }}
              />
              <RelativeNumberField
                label={"phase"}
                value={someLoopLayer.relativeSubPhase}
                valueStep={1 / 50}
                onValueChange={(nextRelativeSubPhase) => {
                  setLoopLayers((currentLoopLayers) => {
                    const nextLoopLayers = [...currentLoopLayers];
                    nextLoopLayers.splice(layerIndex, 1, {
                      ...currentLoopLayers[layerIndex],
                      relativeSubPhase: nextRelativeSubPhase,
                    });
                    return nextLoopLayers;
                  });
                }}
              />
              <RelativeNumberField
                label={"orientation"}
                value={someLoopLayer.relativeSubOrientation}
                valueStep={1 / 50}
                onValueChange={(nextRelativeSubOrientation) => {
                  setLoopLayers((currentLoopLayers) => {
                    const nextLoopLayers = [...currentLoopLayers];
                    nextLoopLayers.splice(layerIndex, 1, {
                      ...currentLoopLayers[layerIndex],
                      relativeSubOrientation: nextRelativeSubOrientation,
                    });
                    return nextLoopLayers;
                  });
                }}
              />
              <RelativeNumberField
                label={"rotation"}
                value={someLoopLayer.relativeLoopRotation}
                valueStep={1 / 50}
                onValueChange={(nextRelativeLoopRotation) => {
                  setLoopLayers((currentLoopLayers) => {
                    const nextLoopLayers = [...currentLoopLayers];
                    nextLoopLayers.splice(layerIndex, 1, {
                      ...currentLoopLayers[layerIndex],
                      relativeLoopRotation: nextRelativeLoopRotation,
                    });
                    return nextLoopLayers;
                  });
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface RelativeNumberFieldProps {
  label: string;
  value: number;
  valueStep: number;
  onValueChange: (nextValue: number) => void;
}

function RelativeNumberField(props: RelativeNumberFieldProps) {
  const { label, value, valueStep, onValueChange } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 64,
        padding: 8,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      <div>
        <input
          style={{
            fontSize: 18,
            fontWeight: 600,
            fontStyle: "italic",
            width: "100%",
          }}
          type={"number"}
          step={valueStep}
          value={value}
          onChange={(someChangeEvent) => {
            const inputValue = Number(someChangeEvent.target.value);
            const nextValue = inputValue === 1 ? 1 : (inputValue + 1) % 1;
            onValueChange(nextValue);
          }}
        />
      </div>
    </div>
  );
}

interface LoopLayer
  extends Pick<
    LoopStructure["subStructure"],
    "relativeSubRadius" | "relativeSubDepth"
  > {
  relativeSubPhase: LoopStructure["subStructure"]["subPhase"];
  relativeSubOrientation: LoopStructure["subStructure"]["subOrientation"];
  relativeLoopRotation: LoopStructure["subStructure"]["loopRotation"];
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
