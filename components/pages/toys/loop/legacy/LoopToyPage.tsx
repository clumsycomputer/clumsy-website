import { RecursiveSpatialStructure } from "clumsy-math";
import { useMemo } from "react";
import pageStyles from "./LoopToyPage.module.scss";

export function LoopToyPage() {
  const topLevelNodes = useMemo<Array<ComputationNode>>(
    () => [getLoopObjectNode()],
    []
  );
  // const cell
  return (
    <div className={pageStyles.pageContainer}>
      <div className={pageStyles.graphicsContainer}></div>
      <div className={pageStyles.cellListContainer}></div>
    </div>
  );
}

function getLoopObjectNode(): LoopObjectNode {
  return {
    nodeType: "object",
    objectType: "loop",
    objectApi: [
      {
        apiLabel: "push layer",
        apiFunction: pushLoopLayer,
      },arn
      {
        apiLabel: "remove layer",
        apiFunction: removeLoopLayer,
      },
    ],
    nodeId: generateNodeId(),
    objectData: [],
  };
}

interface PushLoopLayerApi {
  currentObjectData: LoopObjectNode["objectData"];
}

function pushLoopLayer(api: PushLoopLayerApi): LoopObjectNode["objectData"] {
  return [];
}

interface RemoveLoopLayerApi {
  currentObjectData: LoopObjectNode["objectData"];
}

function removeLoopLayer(
  api: RemoveLoopLayerApi
): LoopObjectNode["objectData"] {
  return [];
}

function generateNodeId(): NodeBase<string>["nodeId"] {
  return `${Math.random()}`;
}

type ComputationNode = CellNode | RecordNode | ObjectNode;

type ObjectNode = LoopObjectNode;

interface LoopObjectNode extends ObjectNodeBase<"loop", LoopObjectData> {}

type LoopObjectData = Array<LoopLayerRecordNode>;

interface ObjectNodeBase<
  ObjectType extends string,
  ObjectData extends Array<ComputationNode>
> extends NodeBase<"object"> {
  objectType: ObjectType;
  objectData: ObjectData;
  objectApi: Array<{
    apiLabel: string;
    apiFunction: (...args: Array<any>) => ObjectData;
  }>;
}

type RecordNode = LoopLayerRecordNode;

interface LoopLayerRecordNode
  extends RecordNodeBase<
    "loopLayer",
    {
      relativeSubRadius: CellNode;
      relativeSubDepth: CellNode;
      relativeSubPhase: CellNode;
      relativeSubOrientation: CellNode;
      relativeLoopRotation: CellNode;
    }
  > {}

interface RecordNodeBase<
  RecordType extends string,
  RecordFields extends Record<string, ComputationNode>
> extends NodeBase<"record"> {
  recordType: RecordType;
  recordFields: RecordFields;
}

interface CellNode extends NodeBase<"cell"> {
  cellValue: number;
}

interface NodeBase<NodeType> {
  nodeType: NodeType;
  nodeId: `${number}`;
}

type LoopStructure = RecursiveSpatialStructure<
  { loopBase: Circle },
  {},
  {
    relativeSubRadius: number;
    relativeSubDepth: number;
    subPhase: number;
    subOrientation: number;
    loopRotation: number;
  }
>;

interface Circle {
  radius: number;
  center: Vector2;
}

type Vector2 = [x: number, y: number];

interface LoopLayer
  extends Pick<
    LoopStructure["subStructure"],
    "relativeSubRadius" | "relativeSubDepth"
  > {
  // loopLayerId: string;
  relativeSubPhase: LoopStructure["subStructure"]["subPhase"];
  relativeSubOrientation: LoopStructure["subStructure"]["subOrientation"];
  relativeLoopRotation: LoopStructure["subStructure"]["loopRotation"];
}
