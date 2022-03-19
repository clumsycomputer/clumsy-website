import {
  InterposedSpatialStructureBase,
  RecursiveSpatialStructure,
  TerminalSpatialStructureBase,
} from '@library/general'

export interface Circle {
  center: Point
  radius: number
}

export interface Point {
  x: number
  y: number
}

export interface LoopPoint extends Point {
  inputAngle: number
  outputAngle: number
}

export interface LoopStructure
  extends RecursiveSpatialStructure<
      InterposedLoopStructure,
      TerminalLoopStructure
    >,
    BaseLoopStructureBase {
  loopBase: Circle
}

export interface InterposedLoopStructure
  extends InterposedSpatialStructureBase<
      InterposedLoopStructure | TerminalLoopStructure
    >,
    BaseLoopStructureBase,
    SubLoopStructureBase {}

export interface TerminalLoopStructure
  extends TerminalSpatialStructureBase,
    SubLoopStructureBase {}

interface BaseLoopStructureBase {
  subLoopRotationAngle: number
}

interface SubLoopStructureBase {
  relativeSubDepth: number
  relativeSubRadius: number
  subPhaseAngle: number
  baseOrientationAngle: number
}
