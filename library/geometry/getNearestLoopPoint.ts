import { getNormalizedAngle } from './general'
import { getLoopPoint, GetLoopPointApi } from './getLoopPoint'
import { Point } from './models'

export interface GetNearestLoopPointApi extends GetLoopPointApi {}

export function getNearestLoopPoint(api: GetNearestLoopPointApi): Point {
  const { someLoopStructure, pointAngle } = api
  const someLoopPoint = getLoopPoint({ someLoopStructure, pointAngle })
  if (someLoopPoint.x && someLoopPoint.y) {
    return someLoopPoint
  } else {
    return getNearestLoopPoint({
      someLoopStructure,
      pointAngle: getNormalizedAngle({
        someAngle: pointAngle + 0.0000001,
      }),
    })
  }
}
