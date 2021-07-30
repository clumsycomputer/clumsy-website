import { Point } from './circleStuff'

interface PolarChainFunction {
  functionChain: Array<TangentialPolarFunction | OrthogonalPolarFunction>
}
interface GetTangentialFunctionPointsApi {
  sampleCount: number
  someTangentialFunction: TangentialPolarFunction
}

function getTangentialFunctionPoints(
  api: GetTangentialFunctionPointsApi
): Array<Point> {
  const { sampleCount, someTangentialFunction } = api
  const { originPoint, getPointRadius, angleRange } = someTangentialFunction
  const angleRangeDelta = angleRange[1] - angleRange[0]
  return new Array(sampleCount).fill(undefined).map((_, sampleIndex) =>
    getTangentialPoint({
      originPoint,
      getPointRadius,
      pointAngle: (angleRangeDelta / sampleCount) * sampleIndex + angleRange[0],
    })
  )
}

interface GetTangentialPointApi
  extends Pick<TangentialPolarFunction, 'originPoint' | 'getPointRadius'> {
  pointAngle: Parameters<TangentialPolarFunction['getPointRadius']>[0]
}

function getTangentialPoint(api: GetTangentialPointApi): Point {
  const { getPointRadius, originPoint, pointAngle } = api
  const pointRadius = getPointRadius(pointAngle)
  return {
    x: pointRadius * Math.cos(pointAngle) + originPoint.x,
    y: pointRadius * Math.sin(pointAngle) + originPoint.y,
  }
}

interface TangentialPolarFunction {
  angleRange: [number, number]
  getPointRadius: (pointAngle: number) => number
  originPoint: Point
}

interface GetOrthogonalFunctionPointsApi {
  sampleCount: number
  someOrthogonalFunction: OrthogonalPolarFunction
}

function getOrthogonalFunctionPoints(
  api: GetOrthogonalFunctionPointsApi
): Array<Point> {
  const { sampleCount, someOrthogonalFunction } = api
  const { originPoint, getPointAngle, radiusRange } = someOrthogonalFunction
  const radiusRangeDelta = radiusRange[1] - radiusRange[0]
  return new Array(sampleCount).fill(undefined).map((_, sampleIndex) =>
    getOrthogonalPoint({
      originPoint,
      getPointAngle,
      pointRadius:
        (radiusRangeDelta / sampleCount) * sampleIndex + radiusRange[0],
    })
  )
}

interface GetOrthogonalPointApi
  extends Pick<OrthogonalPolarFunction, 'originPoint' | 'getPointAngle'> {
  pointRadius: Parameters<OrthogonalPolarFunction['getPointAngle']>[0]
}

function getOrthogonalPoint(api: GetOrthogonalPointApi): Point {
  const { getPointAngle, pointRadius, originPoint } = api
  const pointAngle = getPointAngle(pointRadius)
  return {
    x: pointRadius * Math.cos(pointAngle) + originPoint.x,
    y: pointRadius * Math.sin(pointAngle) + originPoint.y,
  }
}

interface OrthogonalPolarFunction {
  radiusRange: [number, number]
  getPointAngle: (pointRadius: number) => number
  originPoint: Point
}