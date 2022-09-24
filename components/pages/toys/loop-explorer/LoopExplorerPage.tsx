import { Graphic } from "./common/components/Graphic";
import { Loop } from "./common/geometry/encodings";
import { getLoopGeometry, getSubCircleGeometry } from "./common/geometry/loop";

export interface LoopExplorerPageProps {}

export function LoopExplorerPage(props: LoopExplorerPageProps) {
  const {} = props;
  const activeLoop: Loop = {
    baseCircle: {
      radius: 1,
      center: [0, 0],
    },
    subCircle: {
      relativeRadius: 0.5,
      relativeDepth: 0.5,
      relativePhase: Math.PI / 4,
    },
  };
  const baseCircleGeometry = activeLoop.baseCircle;
  const subCircleGeometry = getSubCircleGeometry({
    someLoop: activeLoop,
  });
  const loopGeometry = getLoopGeometry({
    intersectionCircleCount: 256,
    someLoop: activeLoop,
    precomputedGeometry: {
      baseCircle: baseCircleGeometry,
      subCircle: subCircleGeometry,
    },
  });
  return (
    <div>
      <div style={{ width: 256, height: 256 }}>
        <Graphic
          viewAspectRatio={[1, 1]}
          clientSpace={[
            [-2, 2],
            [-2, 2],
          ]}
        >
          <rect fill={"lightgray"} x={-2} width={4} y={-2} height={4} />
          <circle
            stroke={"red"}
            strokeWidth={0.05}
            fillOpacity={0}
            r={baseCircleGeometry.radius}
            cx={baseCircleGeometry.center[0]}
            cy={baseCircleGeometry.center[1]}
          />
          <circle
            stroke={"blue"}
            strokeWidth={0.05}
            fillOpacity={0}
            r={subCircleGeometry.radius}
            cx={subCircleGeometry.center[0]}
            cy={subCircleGeometry.center[1]}
          />
          <polygon
            stroke={"gold"}
            strokeWidth={0.05}
            fillOpacity={0}
            points={loopGeometry
              .map((someLoopPoint) => `${someLoopPoint[0]},${someLoopPoint[1]}`)
              .join(" ")}
          />
        </Graphic>
      </div>
    </div>
  );
}
