import { ExtractInterposedStructure } from "clumsy-math";
import { Circle, Point2 } from "../general/encodings";
import {
  getRotatedPoint,
  getUnitRotatedPoint,
} from "../general/getRotatedPoint";
import { LoopPoint, LoopStructure } from "./encodings";

export interface GetLoopPointApi {
  someLoopStructure: LoopStructure;
  inputAngle: number;
}

export function getLoopPoint(api: GetLoopPointApi): LoopPoint {
  const { inputAngle, someLoopStructure } = api;
  return _getLoopPoint({
    inputAngle,
    baseStructure: someLoopStructure,
    baseCircle: someLoopStructure.loopBase,
  });
}

interface _GetLoopPointApi extends Pick<GetLoopPointApi, "inputAngle"> {
  baseCircle: Circle;
  baseStructure:
    | GetLoopPointApi["someLoopStructure"]
    | ExtractInterposedStructure<GetLoopPointApi["someLoopStructure"]>;
}

function _getLoopPoint(api: _GetLoopPointApi): LoopPoint {
  const { baseStructure, inputAngle, baseCircle } = api;
  const { unitSubPoint } = getUnitSubPoint({
    baseStructure,
    inputAngle,
  });
  const { unitBasePointX } = getUnitBasePointX({
    unitSubPoint,
  });
  const unitLoopPoint: Point2 = [unitBasePointX, unitSubPoint[1]];
  const orientedUnitOrigin = getUnitRotatedPoint({
    rotationAngle: baseStructure.subStructure.subOrientation,
    subjectPoint: unitSubPoint[2],
  });
  const orientedUnitLoopPoint = getUnitRotatedPoint({
    rotationAngle: baseStructure.subStructure.subOrientation,
    subjectPoint: unitLoopPoint,
  });
  const rotatedUnitLoopPoint = getRotatedPoint({
    rotationAngle: baseStructure.subStructure.loopRotation,
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
    baseCircle.radius * unitSubPoint[3],
  ];
}

interface GetUnitSubPointApi
  extends Pick<_GetLoopPointApi, "inputAngle" | "baseStructure"> {}

function getUnitSubPoint(api: GetUnitSubPointApi): {
  unitSubPoint: LoopPoint;
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
            unitSubCircle.radius,
            // inputAngle,
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
  unitSubPoint: LoopPoint;
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
