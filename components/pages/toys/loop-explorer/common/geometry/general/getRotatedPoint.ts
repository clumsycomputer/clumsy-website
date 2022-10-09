import { Point2 } from "./encodings";

export interface GetRotatedPointApi
  extends Pick<GetUnitRotatedPointApi, "subjectPoint" | "rotationAngle"> {
  anchorPoint: Point2;
}

export function getRotatedPoint(api: GetRotatedPointApi): Point2 {
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

export interface GetUnitRotatedPointApi {
  subjectPoint: Point2;
  rotationAngle: number;
}

export function getUnitRotatedPoint(api: GetUnitRotatedPointApi): Point2 {
  const { subjectPoint, rotationAngle } = api;
  return [
    subjectPoint[0] * Math.cos(rotationAngle) -
      subjectPoint[1] * Math.sin(rotationAngle),
    subjectPoint[0] * Math.sin(rotationAngle) +
      subjectPoint[1] * Math.cos(rotationAngle),
  ];
}
