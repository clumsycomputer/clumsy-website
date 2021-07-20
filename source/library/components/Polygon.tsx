import React, { SVGProps } from 'react'
import { Point } from '../circleStuff'

export interface PolygonProps {
  strokeColor: NonNullable<SVGProps<SVGPolygonElement>['stroke']>
  strokeWidth: NonNullable<SVGProps<SVGPolygonElement>['strokeWidth']>
  somePoints: Point[]
}

export function Polygon(props: PolygonProps) {
  const { strokeColor, strokeWidth, somePoints } = props
  return (
    <polygon
      fill={'none'}
      strokeLinejoin={'round'}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      points={somePoints
        .map((somePoint) => `${somePoint.x},${somePoint.y}`)
        .join(' ')}
    />
  )
}
