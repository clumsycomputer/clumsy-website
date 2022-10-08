import {
  ExtractInterposedStructure,
  RecursiveSpatialStructure,
} from "clumsy-math";
import { Circle, Point } from "./common/geometry/encodings";

export function LoopExplorerPage() {
  const loopStructure: LoopStructure = {
    structureType: "initial",
    loopBase: {
      radius: 1,
      center: [0, 0],
    },
    loopRotation: 0,
    subStructure: {
      structureType: "interposed",
      relativeSubRadius: 0.5,
      relativeSubDepth: 0.5,
      subPhase: 2 * Math.PI * 0.25,
      subOrientation: 2 * Math.PI * 0.25,
      loopRotation: 0,
      subStructure: {
        structureType: "interposed",
        relativeSubRadius: 0.5,
        relativeSubDepth: 0.5,
        subPhase: 2 * Math.PI * 0.25,
        subOrientation: 2 * Math.PI * 0.25,
        loopRotation: 2 * Math.PI * 0.25,
        subStructure: {
          structureType: "terminal",
          relativeSubRadius: 0.5,
          relativeSubDepth: 0.5,
          subPhase: 2 * Math.PI * 0.25,
          subOrientation: 2 * Math.PI * 0.25,
        },
      },
    },
  };
  const pointCount = 512;
  const loopPoints = new Array(pointCount)
    .fill(undefined)
    .map((_, pointIndex) =>
      getLoopPoint({
        someLoopStructure: loopStructure,
        inputAngle: ((2 * Math.PI) / pointCount) * pointIndex,
      })
    );
  return (
    <div>
      <svg viewBox={`${-1.25} ${-1.25} ${2.5} ${2.5}`} width={256} height={256}>
        <polygon
          points={loopPoints
            .map((someLoopPoint) => `${someLoopPoint[0]},${someLoopPoint[1]}`)
            .join(" ")}
          fillOpacity={0}
          stroke={"purple"}
          strokeWidth={0.03}
          strokeLinejoin={"round"}
          strokeLinecap={"round"}
        />
      </svg>
    </div>
  );
}

type LoopStructure = RecursiveSpatialStructure<
  { loopBase: Circle },
  {
    loopRotation: number;
  },
  {
    relativeSubRadius: number;
    relativeSubDepth: number;
    subPhase: number;
    subOrientation: number;
  }
>;

type LoopPoint = [x: number, y: number];

type _LoopPoint = [x: number, y: number, origin: Point];

interface GetLoopPointApi {
  someLoopStructure: LoopStructure;
  inputAngle: number;
}

function getLoopPoint(api: GetLoopPointApi): LoopPoint {
  const { inputAngle, someLoopStructure } = api;
  const _loopPoint = _getLoopPoint({
    inputAngle,
    baseStructure: someLoopStructure,
    baseCircle: someLoopStructure.loopBase,
  });
  return [_loopPoint[0], _loopPoint[1]];
}

interface _GetLoopPointApi extends Pick<GetLoopPointApi, "inputAngle"> {
  baseCircle: Circle;
  baseStructure:
    | GetLoopPointApi["someLoopStructure"]
    | ExtractInterposedStructure<GetLoopPointApi["someLoopStructure"]>;
}

function _getLoopPoint(api: _GetLoopPointApi): _LoopPoint {
  const { baseStructure, inputAngle, baseCircle } = api;
  const { unitSubPoint } = getUnitSubPoint({
    baseStructure,
    inputAngle,
  });
  const { unitBasePointX } = getUnitBasePointX({
    unitSubPoint,
  });
  const unitLoopPoint: Point = [unitBasePointX, unitSubPoint[1]];
  const orientedUnitOrigin = getUnitRotatedPoint({
    rotationAngle: baseStructure.subStructure.subOrientation,
    subjectPoint: unitSubPoint[2],
  });
  const orientedUnitLoopPoint = getUnitRotatedPoint({
    rotationAngle: baseStructure.subStructure.subOrientation,
    subjectPoint: unitLoopPoint,
  });
  const rotatedUnitLoopPoint = getRotatedPoint({
    rotationAngle: baseStructure.loopRotation,
    anchorPoint: orientedUnitOrigin,
    subjectPoint: orientedUnitLoopPoint,
  });
  return [
    baseCircle.radius * rotatedUnitLoopPoint[0] + baseCircle.center[0],
    baseCircle.radius * rotatedUnitLoopPoint[1] + baseCircle.center[1],
    [
      baseCircle.radius * orientedUnitOrigin[0] + baseCircle.center[0],
      baseCircle.radius * orientedUnitOrigin[1] + baseCircle.center[1],
    ],
  ];
}

interface GetUnitSubPointApi
  extends Pick<_GetLoopPointApi, "inputAngle" | "baseStructure"> {}

function getUnitSubPoint(api: GetUnitSubPointApi): {
  unitSubPoint: _LoopPoint;
} {
  const { baseStructure, inputAngle } = api;
  const { unitSubCircle } = getUnitSubCircle({
    relativeSubRadius: baseStructure.subStructure.relativeSubRadius,
    relativeSubDepth: baseStructure.subStructure.relativeSubDepth,
    subPhase: baseStructure.subStructure.subPhase,
  });
  return {
    unitSubPoint:
      baseStructure.subStructure.structureType === "interposed"
        ? _getLoopPoint({
            inputAngle,
            baseCircle: unitSubCircle,
            baseStructure: baseStructure.subStructure,
          })
        : [
            unitSubCircle.radius * Math.cos(inputAngle) +
              unitSubCircle.center[0],
            unitSubCircle.radius * Math.sin(inputAngle) +
              unitSubCircle.center[1],
            unitSubCircle.center,
          ],
  };
}

interface GetUnitSubCircleApi
  extends Pick<
    _GetLoopPointApi["baseStructure"]["subStructure"],
    "relativeSubRadius" | "relativeSubDepth" | "subPhase"
  > {}

function getUnitSubCircle(api: GetUnitSubCircleApi): {
  unitSubCircle: Circle;
} {
  const { relativeSubRadius, relativeSubDepth, subPhase } = api;
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
  const subCircleRadius = adjustedRelativeSubRadius;
  const maxSubCircleDepth = 1 - subCircleRadius;
  const subCircleDepth = adjustedRelativeSubDepth * maxSubCircleDepth;
  return {
    unitSubCircle: {
      radius: subCircleRadius,
      center: [
        subCircleDepth * Math.cos(subPhase),
        subCircleDepth * Math.sin(subPhase),
      ],
    },
  };
}

interface GetUnitBasePointXApi {
  unitSubPoint: _LoopPoint;
}

function getUnitBasePointX(api: GetUnitBasePointXApi): {
  unitBasePointX: number;
} {
  const { unitSubPoint } = api;
  const deltaX = unitSubPoint[2][0] - unitSubPoint[0];
  const otherDeltaX = unitSubPoint[0] - unitSubPoint[2][0];
  const deltaY = unitSubPoint[2][1] - unitSubPoint[1];
  const squaredDeltaX = deltaX * deltaX;
  const squaredDeltaY = deltaY * deltaY;
  const squaredDeltaAdded = squaredDeltaX + squaredDeltaY;
  const exprA =
    (unitSubPoint[2][0] * unitSubPoint[2][0] -
      unitSubPoint[2][0] * unitSubPoint[0] +
      unitSubPoint[2][1] * deltaY) /
    squaredDeltaAdded;
  const exprB =
    unitSubPoint[2][1] * unitSubPoint[0] - unitSubPoint[2][0] * unitSubPoint[1];
  const exprC =
    Math.sqrt(1 - (exprB * exprB) / squaredDeltaAdded) /
    Math.sqrt(squaredDeltaAdded);
  return {
    unitBasePointX: unitSubPoint[2][0] - deltaX * exprA + otherDeltaX * exprC,
  };
}

interface GetRotatedPointApi
  extends Pick<GetUnitRotatedPointApi, "subjectPoint" | "rotationAngle"> {
  anchorPoint: Point;
}

function getRotatedPoint(api: GetRotatedPointApi): Point {
  const { subjectPoint, anchorPoint, rotationAngle } = api;
  const unitRotatedPoint = getUnitRotatedPoint({
    rotationAngle,
    subjectPoint: [
      subjectPoint[0] - anchorPoint[0],
      subjectPoint[1] - anchorPoint[1],
    ],
  });
  return [
    unitRotatedPoint[0] + anchorPoint[0],
    unitRotatedPoint[1] + anchorPoint[1],
  ];
}

interface GetUnitRotatedPointApi {
  subjectPoint: Point;
  rotationAngle: number;
}

function getUnitRotatedPoint(api: GetUnitRotatedPointApi): Point {
  const { subjectPoint, rotationAngle } = api;
  return [
    subjectPoint[0] * Math.cos(rotationAngle) -
      subjectPoint[1] * Math.sin(rotationAngle),
    subjectPoint[0] * Math.sin(rotationAngle) +
      subjectPoint[1] * Math.cos(rotationAngle),
  ];
}
