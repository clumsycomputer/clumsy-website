import { getNormalizedAngleBetweenPoints } from './general'
import { GetLoopPointApi } from './getLoopPoint'
import { getNearestLoopPoint } from './getNearestLoopPoint'
import { LoopPoint, Point } from './models'

export interface GetLoopPointsApi
  extends Pick<GetLoopPointApi, 'someLoopStructure'> {
  sampleCount: number
}

export function getLoopPointsData(api: GetLoopPointsApi): {
  loopCenter: Point
  loopPoints: Array<LoopPoint>
} {
  const { sampleCount, someLoopStructure } = api
  const loopPoints: Array<Pick<LoopPoint, 'x' | 'y' | 'inputAngle'>> = []
  const loopCenter: Point = { x: 0, y: 0 }
  for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex++) {
    const inputAngle = (sampleIndex / sampleCount) * 2 * Math.PI
    const samplePoint = getNearestLoopPoint({
      someLoopStructure,
      pointAngle: inputAngle,
    })
    loopCenter.x = loopCenter.x + samplePoint.x
    loopCenter.y = loopCenter.y + samplePoint.y
    loopPoints.push({
      ...samplePoint,
      inputAngle,
    })
  }
  loopCenter.x = loopCenter.x / loopPoints.length
  loopCenter.y = loopCenter.y / loopPoints.length
  return {
    loopCenter,
    loopPoints: (loopPoints as Array<LoopPoint>).sort((pointA, pointB) => {
      if (!pointA.outputAngle) {
        pointA.outputAngle = getNormalizedAngleBetweenPoints({
          basePoint: loopCenter,
          targetPoint: pointA,
        })
      }
      if (!pointB.outputAngle) {
        pointB.outputAngle = getNormalizedAngleBetweenPoints({
          basePoint: loopCenter,
          targetPoint: pointB,
        })
      }
      return pointA.outputAngle - pointB.outputAngle
    }),
  }
}
