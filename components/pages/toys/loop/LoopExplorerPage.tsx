import {
  getLoopCosine,
  getLoopPendulum,
  getLoopPoint,
  getLoopSine,
  LoopPoint,
  LoopStructure,
  Point2,
} from "clumsy-math";
import { PropsWithChildren, useState } from "react";

export function LoopExplorerPage() {
  const [loopLayers, setLoopLayers] = useState<Array<LoopLayer>>([]);
  const { currentLoopStructure } = getCurrentLoopStructure({
    loopLayers,
  });
  const { loopPointsData } = getLoopPointsData({
    currentLoopStructure,
  });
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ display: "flex", flexDirection: "row", overflow: "scroll" }}
      >
        <Graphic graphicLabel={"shape"}>
          <polygon
            points={loopPointsData
              .map(
                (someLoopPointData) =>
                  `${someLoopPointData[1][0][0] / someLoopPointData[1][1][0]},${
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
        </Graphic>
        <Graphic graphicLabel={"cosine"}>
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
        </Graphic>
        <Graphic graphicLabel={"sine"}>
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
        </Graphic>
        <Graphic graphicLabel={"pendulum"}>
          <polyline
            points={loopPointsData
              .map(
                (someLoopPointData, pointIndex) =>
                  `${(pointIndex / loopPointsData.length) * 2 - 1},${
                    someLoopPointData[4][0] / someLoopPointData[4][1][0]
                  }`
              )
              .join(" ")}
            stroke={"yellow"}
            strokeWidth={0.03}
            fillOpacity={0}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
          />
        </Graphic>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", padding: 8 }}>
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
  relativeLoopRotation: LoopStructure["loopRotation"];
}

interface GetCurrentLoopStructureApi {
  loopLayers: Array<LoopLayer>;
}

function getCurrentLoopStructure(api: GetCurrentLoopStructureApi) {
  const { loopLayers } = api;
  const [currentLayer, ...remainingLoopLayers] = loopLayers;
  const currentLoopStructure: LoopStructure = currentLayer
    ? _getCurrentLoopStructure({
        currentLayer,
        remainingLoopLayers,
      })
    : {
        structureType: "initial",
        loopBase: {
          radius: 1,
          center: [0, 0],
        },
        loopRotation: 0,
        subStructure: {
          structureType: "terminal",
          relativeSubRadius: 1,
          relativeSubDepth: 0,
          subPhase: 0,
          subOrientation: 0,
        },
      };
  return { currentLoopStructure };
}

interface _GetCurrentLoopStructureApi {
  currentLayer: LoopLayer;
  remainingLoopLayers: Array<LoopLayer>;
}

function _getCurrentLoopStructure(
  api: _GetCurrentLoopStructureApi
): LoopStructure {
  const { currentLayer, remainingLoopLayers } = api;
  if (remainingLoopLayers.length > 0) {
    const nextLoopStructure = _getCurrentLoopStructure({
      currentLayer: remainingLoopLayers[0],
      remainingLoopLayers: remainingLoopLayers.slice(1),
    });
    return {
      structureType: "initial",
      loopBase: {
        radius: 1,
        center: [0, 0],
      },
      loopRotation: 2 * Math.PI * currentLayer.relativeLoopRotation,
      subStructure: {
        structureType: "interposed",
        relativeSubRadius: currentLayer.relativeSubRadius,
        relativeSubDepth: currentLayer.relativeSubDepth,
        subPhase: 2 * Math.PI * currentLayer.relativeSubPhase,
        subOrientation: 2 * Math.PI * currentLayer.relativeSubOrientation,
        loopRotation: nextLoopStructure.loopRotation,
        subStructure: nextLoopStructure.subStructure,
      },
    };
  } else {
    return {
      structureType: "initial",
      loopBase: {
        radius: 1,
        center: [0, 0],
      },
      loopRotation: 2 * Math.PI * currentLayer.relativeLoopRotation,
      subStructure: {
        structureType: "terminal",
        relativeSubRadius: currentLayer.relativeSubRadius,
        relativeSubDepth: currentLayer.relativeSubDepth,
        subPhase: 2 * Math.PI * currentLayer.relativeSubPhase,
        subOrientation: 2 * Math.PI * currentLayer.relativeSubOrientation,
      },
    };
  }
}

interface GetLoopPointsDataApi
  extends Pick<
    ReturnType<typeof getCurrentLoopStructure>,
    "currentLoopStructure"
  > {}

function getLoopPointsData(api: GetLoopPointsDataApi) {
  const { currentLoopStructure } = api;
  const loopPointsData: Array<
    [
      originalLoopPoint: LoopPoint,
      pointData: [point: Point2, maxSizeRef: [number]],
      cosineData: [cosine: number, maxSizeRef: [number]],
      sineData: [sine: number, maxSizeRef: [number]],
      pendulumData: [pendulum: number, maxSizeRef: [number]]
    ]
  > = [];
  const maxPointRef: [number] = [0];
  const maxCosineRef: [number] = [0];
  const maxSineRef: [number] = [0];
  const maxPendulumRef: [number] = [0];
  const pointCount = 512;
  const inputAngleStep = (2 * Math.PI) / pointCount;
  for (let pointIndex = 0; pointIndex < pointCount; pointIndex++) {
    const loopPoint = getLoopPoint({
      someLoopStructure: currentLoopStructure,
      inputAngle: pointIndex * inputAngleStep,
    });
    const centeredLoopPoint: Point2 = [
      loopPoint[0] - loopPoint[2][0],
      loopPoint[1] - loopPoint[2][1],
    ];
    const loopPointSize = Math.sqrt(
      centeredLoopPoint[0] * centeredLoopPoint[0] +
        centeredLoopPoint[1] * centeredLoopPoint[1]
    );
    maxPointRef[0] = Math.max(loopPointSize, maxPointRef[0]);
    const pointCosine = getLoopCosine({
      someLoopPoint: loopPoint,
    });
    maxCosineRef[0] = Math.max(Math.abs(pointCosine), maxCosineRef[0]);
    const pointSine = getLoopSine({
      someLoopPoint: loopPoint,
    });
    maxSineRef[0] = Math.max(Math.abs(pointSine), maxSineRef[0]);
    const pointPendulum = getLoopPendulum({
      someLoopPoint: loopPoint,
    });
    maxPendulumRef[0] = Math.max(Math.abs(pointPendulum), maxPendulumRef[0]);
    loopPointsData.push([
      loopPoint,
      [centeredLoopPoint, maxPointRef],
      [pointCosine, maxCosineRef],
      [pointSine, maxSineRef],
      [pointPendulum, maxPendulumRef],
    ]);
  }
  return {
    loopPointsData,
  };
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
        width: 112,
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

interface GraphicProps extends Pick<Required<PropsWithChildren>, "children"> {
  graphicLabel: string;
}

function Graphic(props: GraphicProps) {
  const { graphicLabel, children } = props;
  const viewRectangle = {
    x: -1.25,
    y: -1.25,
    width: 2.5,
    height: 2.5,
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 8 }}>
      <div style={{ fontSize: 18, fontWeight: 600 }}>{graphicLabel}</div>
      <svg
        width={256}
        height={256}
        viewBox={`${viewRectangle.x} ${viewRectangle.y} ${viewRectangle.width} ${viewRectangle.height}`}
      >
        <g transform="scale(1,-1)">
          <rect
            x={viewRectangle.x}
            y={viewRectangle.y}
            width={viewRectangle.height}
            height={viewRectangle.height}
            fill={"gray"}
          />
          {children}
        </g>
      </svg>
    </div>
  );
}
