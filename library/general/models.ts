export interface RecursiveSpatialStructure<
  InterposedSpatialStructure extends InterposedSpatialStructureBase<SubSpatialStructure> = InterposedSpatialStructureBase<any>,
  TerminalSpatialStructure extends TerminalSpatialStructureBase = TerminalSpatialStructureBase,
  SubSpatialStructure extends
    | InterposedSpatialStructure
    | TerminalSpatialStructure =
    | InterposedSpatialStructure
    | TerminalSpatialStructure
> extends InitialSpatialStructureBase<SubSpatialStructure> {}

export interface InitialSpatialStructureBase<
  SubStructure extends
    | InterposedSpatialStructureBase<SubStructure>
    | TerminalSpatialStructureBase
> extends RecursiveSpatialStructureBase<'initialStructure'>,
    BaseSpatialStructureBase<SubStructure> {}

export interface InterposedSpatialStructureBase<
  SubStructure extends
    | InterposedSpatialStructureBase<SubStructure>
    | TerminalSpatialStructureBase
> extends RecursiveSpatialStructureBase<'interposedStructure'>,
    BaseSpatialStructureBase<SubStructure>,
    SubSpatialStructureBase {}

export interface TerminalSpatialStructureBase
  extends RecursiveSpatialStructureBase<'terminalStructure'>,
    SubSpatialStructureBase {}

interface BaseSpatialStructureBase<
  SubStructure extends
    | InterposedSpatialStructureBase<SubStructure>
    | TerminalSpatialStructureBase
> {
  subStructure: SubStructure
}

interface SubSpatialStructureBase {}

interface RecursiveSpatialStructureBase<StructureType extends string> {
  structureType: StructureType
}
