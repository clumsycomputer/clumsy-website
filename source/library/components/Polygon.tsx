import React, { SVGProps } from 'react'
import { Point } from '../circleStuff'

export interface PolygonProps {
  fillColor?: NonNullable<SVGProps<SVGPolygonElement>['fill']>
  strokeColor: NonNullable<SVGProps<SVGPolygonElement>['stroke']>
  strokeWidth: NonNullable<SVGProps<SVGPolygonElement>['strokeWidth']>
  somePoints: Point[]
}

export function Polygon(props: PolygonProps) {
  const { fillColor, strokeColor, strokeWidth, somePoints } = props
  return (
    <polygon
      fill={fillColor || 'none'}
      strokeLinejoin={'round'}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      points={somePoints
        .map((somePoint) => `${somePoint.x},${somePoint.y}`)
        .join(' ')}
    />
  )
}
