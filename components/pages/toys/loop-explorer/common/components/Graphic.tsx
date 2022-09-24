import { PropsWithChildren } from "react";
import { Rectangle, Space2, Vector2 } from "../geometry/encodings";

export interface GraphicProps
  extends Pick<Required<PropsWithChildren>, "children"> {
  viewAspectRatio: Vector2;
  clientSpace: Space2;
}

export function Graphic(props: GraphicProps) {
  const { children, viewAspectRatio, clientSpace } = props;
  const viewBoxRectangle = {
    x: 0,
    y: 0,
    width: viewAspectRatio[0],
    height: viewAspectRatio[1],
  };
  const clientRectangle = getSpaceRectangle({
    someSpace: clientSpace,
  });
  return (
    <svg
      viewBox={getViewBox({
        someRectangle: viewBoxRectangle,
      })}
    >
      <g
        transform={`scale(${viewBoxRectangle.width / clientRectangle.width},${
          viewBoxRectangle.height / clientRectangle.height
        }) translate(${viewBoxRectangle.x - clientRectangle.x}, ${
          viewBoxRectangle.y - clientRectangle.y
        }) scale(1,-1)`}
      >
        {children}
      </g>
    </svg>
  );
}

interface GetViewBoxApi {
  someRectangle: Rectangle;
}

function getViewBox(
  api: GetViewBoxApi
): `${number} ${number} ${number} ${number}` {
  const { someRectangle } = api;
  return `${someRectangle.x} ${someRectangle.y} ${someRectangle.width} ${someRectangle.height}`;
}

interface GetSpaceRectangelApi {
  someSpace: Space2;
}

function getSpaceRectangle(api: GetSpaceRectangelApi): Rectangle {
  const { someSpace } = api;
  return {
    x: someSpace[0][0],
    y: someSpace[1][0],
    width: someSpace[0][1] - someSpace[0][0],
    height: someSpace[1][1] - someSpace[1][0],
  };
}
