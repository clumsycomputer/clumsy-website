import * as Nath from "mathjs";

export default () => {
  const absoluteBaseCircle = {
    radius: 1,
    center: {
      x: 0,
      y: 0,
    },
  };
  const relativeSubCircle = {
    radius: 0.35,
    phase: Nath.pi * (4 / 3),
    depth: 0.25,
  };
  const absoluteSubRadius =
    absoluteBaseCircle.radius * relativeSubCircle.radius;
  const absoluteSubMaxDepth = absoluteBaseCircle.radius - absoluteSubRadius;
  const absoluteSubDepth = relativeSubCircle.depth * absoluteSubMaxDepth;
  const absoluteSubCircle = {
    radius: absoluteSubRadius,
    center: {
      x:
        absoluteSubDepth * Nath.cos(relativeSubCircle.phase) +
        absoluteBaseCircle.center.x,
      y:
        absoluteSubDepth * Nath.sin(relativeSubCircle.phase) +
        absoluteBaseCircle.center.y,
    },
  };
  const closestPointOnBase = {
    x:
      (absoluteSubMaxDepth + absoluteSubRadius) *
        Nath.cos(relativeSubCircle.phase) +
      absoluteBaseCircle.center.x,
    y:
      (absoluteSubMaxDepth + absoluteSubRadius) *
        Nath.sin(relativeSubCircle.phase) +
      absoluteBaseCircle.center.y,
  };
  const closestPointOnSub = {
    x:
      absoluteSubCircle.radius * Nath.cos(relativeSubCircle.phase) +
      absoluteSubCircle.center.x,
    y:
      absoluteSubCircle.radius * Nath.sin(relativeSubCircle.phase) +
      absoluteSubCircle.center.y,
  };
  const farthesPointOnBase = {
    x:
      (absoluteSubMaxDepth + absoluteSubRadius) *
        Nath.cos(relativeSubCircle.phase + Nath.pi) +
      absoluteBaseCircle.center.x,
    y:
      (absoluteSubMaxDepth + absoluteSubRadius) *
        Nath.sin(relativeSubCircle.phase + Nath.pi) +
      absoluteBaseCircle.center.y,
  };
  const closestPointOnSubToFarthestPointOnBase = {
    x:
      absoluteSubCircle.radius * Nath.cos(relativeSubCircle.phase + Nath.pi) +
      absoluteSubCircle.center.x,
    y:
      absoluteSubCircle.radius * Nath.sin(relativeSubCircle.phase + Nath.pi) +
      absoluteSubCircle.center.y,
  };
  const closestDelta = Math.sqrt(
    Math.pow(closestPointOnBase.x - closestPointOnSub.x, 2) +
      Math.pow(closestPointOnBase.y - closestPointOnSub.y, 2)
  );
  const farthestDelta = Math.sqrt(
    Math.pow(
      farthesPointOnBase.x - closestPointOnSubToFarthestPointOnBase.x,
      2
    ) +
      Math.pow(
        farthesPointOnBase.y - closestPointOnSubToFarthestPointOnBase.y,
        2
      )
  );
  const deltaDelta = farthestDelta - closestDelta;
  const closestSubAngle = relativeSubCircle.phase;
  const farthestSubAngle = relativeSubCircle.phase + Nath.pi;
  const deltaDeltaSubZeroAnglePercentage =
    (2 * Nath.pi - closestSubAngle) / (farthestSubAngle - closestSubAngle);
  const targetAngle = Nath.pi / 2;
  const subZeroSubPoint = {
    x:
      absoluteSubCircle.radius * Nath.cos(targetAngle) +
      absoluteSubCircle.center.x,
    y:
      absoluteSubCircle.radius * Nath.sin(targetAngle) +
      absoluteSubCircle.center.y,
  };
  const subZeroClosestPoint = {
    x:
      (absoluteSubCircle.radius + closestDelta) * Nath.cos(targetAngle) +
      absoluteSubCircle.center.x,
    y:
      (absoluteSubCircle.radius + closestDelta) * Nath.sin(targetAngle) +
      absoluteSubCircle.center.y,
  };
  const subZeroFarthestPoint = {
    x:
      (absoluteSubCircle.radius + farthestDelta) * Nath.cos(targetAngle) +
      absoluteSubCircle.center.x,
    y:
      (absoluteSubCircle.radius + farthestDelta) * Nath.sin(targetAngle) +
      absoluteSubCircle.center.y,
  };
  const subZeroBasePoint = {
    x:
      (deltaDeltaSubZeroAnglePercentage * deltaDelta +
        closestDelta +
        absoluteSubCircle.radius) *
        Nath.cos(targetAngle) +
      absoluteSubCircle.center.x,
    y:
      (deltaDeltaSubZeroAnglePercentage * deltaDelta +
        closestDelta +
        absoluteSubCircle.radius) *
        Nath.sin(targetAngle) +
      absoluteSubCircle.center.y,
  };
  const sampleCount = 48;
  const sampleStep = (2 * Nath.pi) / sampleCount;
  return (
    <svg viewBox={"-2 -2 4 4"} width={250} height={250}>
      <rect x={-2} y={-2} width={4} height={4} fill={"lightgrey"} />
      <circle
        cx={absoluteBaseCircle.center.x}
        cy={absoluteBaseCircle.center.y}
        r={absoluteBaseCircle.radius}
        fill={"transparent"}
        stroke={"red"}
        strokeWidth={0.02}
      />
      <circle
        cx={absoluteSubCircle.center.x}
        cy={absoluteSubCircle.center.y}
        r={absoluteSubCircle.radius}
        fill={"transparent"}
        stroke={"green"}
        strokeWidth={0.02}
      />
      <circle
        cx={absoluteSubCircle.center.x}
        cy={absoluteSubCircle.center.y}
        r={absoluteSubCircle.radius + closestDelta}
        fill={"transparent"}
        stroke={"purple"}
        strokeWidth={0.02}
      />
      <circle
        cx={absoluteSubCircle.center.x}
        cy={absoluteSubCircle.center.y}
        r={absoluteSubCircle.radius + farthestDelta}
        fill={"transparent"}
        stroke={"blue"}
        strokeWidth={0.02}
      />
      <circle
        cx={absoluteSubCircle.center.x}
        cy={absoluteSubCircle.center.y}
        r={0.03}
        fill={"black"}
      />
      <circle
        cx={closestPointOnBase.x}
        cy={closestPointOnBase.y}
        r={0.03}
        fill={"black"}
      />
      <circle
        cx={closestPointOnSub.x}
        cy={closestPointOnSub.y}
        r={0.03}
        fill={"black"}
      />
      <circle
        cx={farthesPointOnBase.x}
        cy={farthesPointOnBase.y}
        r={0.03}
        fill={"black"}
      />
      <circle
        cx={closestPointOnSubToFarthestPointOnBase.x}
        cy={closestPointOnSubToFarthestPointOnBase.y}
        r={0.03}
        fill={"black"}
      />
      <circle
        cx={subZeroSubPoint.x}
        cy={subZeroSubPoint.y}
        r={0.03}
        fill={"black"}
      />
      <circle
        cx={subZeroClosestPoint.x}
        cy={subZeroClosestPoint.y}
        r={0.03}
        fill={"black"}
      />
      <circle
        cx={subZeroFarthestPoint.x}
        cy={subZeroFarthestPoint.y}
        r={0.03}
        fill={"black"}
      />
      <circle
        cx={subZeroBasePoint.x}
        cy={subZeroBasePoint.y}
        r={0.03}
        fill={"yellow"}
      />
      {/* <polygon
        points={new Array(sampleCount)
          .fill(null)
          .map((_, sampleIndex) => {
            const sampleAngle = sampleStep * sampleIndex;
            return `${Nath.cos(sampleAngle) + absoluteSubCircle.center.x},${
              Nath.sin(sampleAngle) + absoluteSubCircle.center.y
            }`;
          })
          .join(" ")}
        fill={"transparent"}
        stroke={"blue"}
        strokeWidth={0.02}
      /> */}
      {/* {new Array(sampleCount).fill(null).map((_, sampleIndex) => {
        // const samplePoint = Nath.pow(
        //   Nath.e,
        //   Nath.multiply(Nath.i, sampleStep * sampleIndex)
        // ).toVector();
        return (
          <circle
            key={`${sampleIndex}`}
            cx={
              absoluteSubCircle.radius * Math.cos(sampleStep * sampleIndex) +
              absoluteSubCircle.center.x
            }
            cy={
              absoluteSubCircle.radius * Math.sin(sampleStep * sampleIndex) +
              absoluteSubCircle.center.y
            }
            r={0.02}
            fill={"white"}
          />
        );
      })} */}
    </svg>
  );
};
