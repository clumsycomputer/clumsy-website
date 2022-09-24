export type Vector2 = [x: number, y: number];

export type Point = Vector2;

export type LoopPoint = [
  x: Point[0],
  y: Point[1],
  cosine: number,
  sine: number,
  baseIntersectionAngle: number,
  loopSubAngle: number,
  loopRadius: number,
  subIntersectionRadiusDelta: number,
  sandwichComponent: number,
  pendulumComponent: number
];

export type Space2 = [x: Vector2, y: Vector2];

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Circle {
  radius: number;
  center: Point;
}

export interface Loop {
  baseCircle: Circle;
  subCircle: {
    relativeRadius: number;
    relativeDepth: number;
    relativePhase: number;
  };
}
