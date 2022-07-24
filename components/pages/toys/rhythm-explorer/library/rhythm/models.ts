import {
  InterposedSpatialStructureBase,
  RecursiveSpatialStructure,
  TerminalSpatialStructureBase,
} from "../general/models";

export type Rhythm = Array<boolean>;

export type RhythmPoints = Array<number>;

export type RhythmSlotWeights = Array<number>;

export type RhythmIntervals = Array<number>;

export interface RhythmMap extends Pick<RhythmStructure, "rhythmResolution"> {
  rhythmPoints: RhythmPoints;
}

export interface RhythmComponent {
  isolatedStructure: BasicRhythmStructure;
  isolatedMap: RhythmMap;
  structuredMap: RhythmMap;
}

export interface RhythmStructure
  extends RecursiveSpatialStructure<
      InterposedRhythmStructure,
      TerminalRhythmStructure
    >,
    BaseRhythmStructureBase {
  rhythmResolution: number;
}

export interface InterposedRhythmStructure
  extends InterposedSpatialStructureBase<
      InterposedRhythmStructure | TerminalRhythmStructure
    >,
    BaseRhythmStructureBase,
    SubRhythmStructureBase {}

export interface TerminalRhythmStructure
  extends TerminalSpatialStructureBase,
    SubRhythmStructureBase {}

interface BaseRhythmStructureBase {
  rhythmPhase: number;
}

interface SubRhythmStructureBase {
  rhythmDensity: number;
  rhythmOrientation: number;
}

export interface BasicRhythmStructure
  extends Pick<RhythmStructure, "rhythmResolution">,
    Pick<BaseRhythmStructureBase, "rhythmPhase">,
    SubRhythmStructureBase {}

export interface RhythmGroupStructure {
  baseStructure: RhythmGroupBaseStructure;
  memberStructure: RhythmGroupMemberStructure;
}

export type RhythmGroupBaseStructure = Omit<
  RhythmStructure,
  "subStructure" | "rhythmPhase"
> & {
  subStructure?: RhythmGroupBaseInterposedStructure;
};

export type RhythmGroupBaseInterposedStructure = Omit<
  InterposedRhythmStructure,
  "subStructure" | "rhythmPhase"
> & {
  subStructure?: RhythmGroupBaseInterposedStructure;
};

export type RhythmGroupMemberStructure =
  | RhythmGroupMemberInterposedStructure
  | RhythmGroupMemberTerminalStructure;

export type RhythmGroupMemberInterposedStructure = Omit<
  InterposedRhythmStructure,
  "subStructure" | "rhythmOrientation" | "rhythmPhase"
> & {
  subStructure:
    | RhythmGroupMemberInterposedStructure
    | RhythmGroupMemberTerminalStructure;
};

export type RhythmGroupMemberTerminalStructure = Omit<
  TerminalRhythmStructure,
  "rhythmOrientation"
>;
