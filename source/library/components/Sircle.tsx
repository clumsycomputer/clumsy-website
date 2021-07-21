import React, { SVGProps } from 'react'
import { Circle } from '../circleStuff'

export interface SircleProps {
  strokeColor: NonNullable<SVGProps<SVGCircleElement>['stroke']>
  strokeWidth: NonNullable<SVGProps<SVGCircleElement>['strokeWidth']>
  someCircle: Circle
}

export function Sircle(props: SircleProps) {
  const { strokeColor, strokeWidth, someCircle } = props
  return (
    <circle
      fill={'none'}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      cx={someCircle.center.x}
      cy={someCircle.center.y}
      r={someCircle.radius}
    />
  )
}
