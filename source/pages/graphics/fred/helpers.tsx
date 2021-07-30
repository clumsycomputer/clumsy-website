import React, { Fragment, ReactNode, SVGAttributes } from 'react'
import {
  getMirroredPoint,
  GetMirroredPointApi,
  getTracePoint,
  Point,
} from '../../../library/circleStuff'

export type GraphicRectangle = Pick<
  SVGAttributes<SVGRectElement>,
  'x' | 'y' | 'width' | 'height'
>

export interface GraphicProps
  extends Pick<SVGAttributes<SVGSVGElement>, 'style'> {
  canvasRectangle: GraphicRectangle
  children: ReactNode
}

export function Graphic(props: GraphicProps) {
  const { style, canvasRectangle, children } = props
  return (
    <svg
      imageRendering={'optimizeQuality'}
      style={style}
      viewBox={`${canvasRectangle.x} ${canvasRectangle.y} ${canvasRectangle.width} ${canvasRectangle.height}`}
    >
      {children}
    </svg>
  )
}

export interface MirroredFreakPolygonsProps
  extends Pick<FreakPolygonProps, 'fillColor' | 'targetRectangle'>,
    Pick<MirroredWaveSquaresProps, 'mirrorOrigin' | 'mirrorAngle'> {
  polygonLayers: Array<
    Pick<
      FreakPolygonProps,
      'baseSquares' | 'overlaySquares' | 'polygonOrigin' | 'polygonPoints'
    >
  >
}

export function MirroredFreakPolygons(props: MirroredFreakPolygonsProps) {
  const {
    mirrorOrigin,
    mirrorAngle,
    polygonLayers,
    targetRectangle,
    fillColor,
  } = props
  const maskId = `${Math.random()}`
  return (
    <Fragment>
      <mask id={maskId}>
        {polygonLayers.map((someFreakPolygon) => (
          <MirroredWaveSquares
            key={Math.random()}
            fillColor={'white'}
            mirrorOrigin={mirrorOrigin}
            mirrorAngle={mirrorAngle}
            polygonPoints={someFreakPolygon.polygonPoints}
            polygonOrigin={someFreakPolygon.polygonOrigin}
            {...someFreakPolygon.baseSquares}
          />
        ))}
        {polygonLayers.map((someFreakPolygon) => (
          <MirroredWaveSquares
            key={Math.random()}
            fillColor={'black'}
            mirrorOrigin={mirrorOrigin}
            mirrorAngle={mirrorAngle}
            polygonPoints={someFreakPolygon.polygonPoints}
            polygonOrigin={someFreakPolygon.polygonOrigin}
            {...someFreakPolygon.overlaySquares}
          />
        ))}
      </mask>
      <rect {...targetRectangle} fill={fillColor} mask={`url(#${maskId})`} />
    </Fragment>
  )
}

export interface FreakPolygonsProps
  extends Pick<FreakPolygonProps, 'fillColor' | 'targetRectangle'> {
  polygonLayers: Array<
    Pick<
      FreakPolygonProps,
      'baseSquares' | 'overlaySquares' | 'polygonOrigin' | 'polygonPoints'
    >
  >
}

export function FreakPolygons(props: FreakPolygonsProps) {
  const { polygonLayers, targetRectangle, fillColor } = props
  const maskId = `${Math.random()}`
  return (
    <Fragment>
      <mask id={maskId}>
        {polygonLayers.map((someFreakPolygon) => (
          <WaveSquares
            fillColor={'white'}
            polygonPoints={someFreakPolygon.polygonPoints}
            polygonOrigin={someFreakPolygon.polygonOrigin}
            {...someFreakPolygon.baseSquares}
          />
        ))}
        {polygonLayers.map((someFreakPolygon) => (
          <WaveSquares
            fillColor={'black'}
            polygonPoints={someFreakPolygon.polygonPoints}
            polygonOrigin={someFreakPolygon.polygonOrigin}
            {...someFreakPolygon.overlaySquares}
          />
        ))}
      </mask>
      <rect {...targetRectangle} fill={fillColor} mask={`url(#${maskId})`} />
    </Fragment>
  )
}

export interface FreakPolygonProps<
  SquaresLayer = Pick<
    WaveSquaresProps,
    | 'oscillationSampleCount'
    | 'oscillationFrequency'
    | 'oscillationAmplitude'
    | 'oscillationPhase'
    | 'squareBaseLength'
  >
> extends Pick<
    WaveSquaresProps,
    'polygonOrigin' | 'polygonPoints' | 'fillColor'
  > {
  baseSquares: SquaresLayer
  overlaySquares: SquaresLayer
  targetRectangle: GraphicRectangle
}

export function FreakPolygon(props: FreakPolygonProps) {
  const {
    polygonPoints,
    polygonOrigin,
    baseSquares,
    overlaySquares,
    targetRectangle,
    fillColor,
  } = props
  const maskId = `${Math.random()}`
  return (
    <Fragment>
      <mask id={maskId}>
        <WaveSquares
          fillColor={'white'}
          polygonPoints={polygonPoints}
          polygonOrigin={polygonOrigin}
          {...baseSquares}
        />
        <WaveSquares
          fillColor={'black'}
          polygonPoints={polygonPoints}
          polygonOrigin={polygonOrigin}
          {...overlaySquares}
        />
      </mask>
      <rect {...targetRectangle} fill={fillColor} mask={`url(#${maskId})`} />
    </Fragment>
  )
}

export interface MirroredWaveSquaresProps
  extends GetOscillatedPolygonPointsApi {
  squareBaseLength: number
  fillColor: string
  mirrorOrigin: Point
  mirrorAngle: number
}

export function MirroredWaveSquares(props: MirroredWaveSquaresProps) {
  const {
    polygonPoints,
    polygonOrigin,
    oscillationSampleCount,
    oscillationFrequency,
    oscillationAmplitude,
    oscillationPhase,
    squareBaseLength,
    mirrorAngle,
    mirrorOrigin,
    fillColor,
  } = props
  const squarePoints = getOscillatedPolygonPoints({
    polygonPoints,
    polygonOrigin,
    oscillationSampleCount,
    oscillationFrequency,
    oscillationAmplitude,
    oscillationPhase,
  })
  const squareLength = 2 * squareBaseLength
  return (
    <Fragment>
      {squarePoints.map((somePoint) => {
        const mirroredPoint = getMirroredPoint({
          mirrorAngle: mirrorAngle,
          originPoint: mirrorOrigin,
          basePoint: somePoint,
        })
        return (
          <Fragment key={Math.random()}>
            <rect
              fill={fillColor}
              x={somePoint.x - squareBaseLength}
              y={somePoint.y - squareBaseLength}
              width={squareLength}
              height={squareLength}
            />
            <rect
              fill={fillColor}
              x={mirroredPoint.x - squareBaseLength}
              y={mirroredPoint.y - squareBaseLength}
              width={squareLength}
              height={squareLength}
            />
          </Fragment>
        )
      })}
    </Fragment>
  )
}

export interface WaveSquaresProps extends GetOscillatedPolygonPointsApi {
  squareBaseLength: number
  fillColor: string
}

export function WaveSquares(props: WaveSquaresProps) {
  const {
    polygonPoints,
    polygonOrigin,
    oscillationSampleCount,
    oscillationFrequency,
    oscillationAmplitude,
    oscillationPhase,
    squareBaseLength,
    fillColor,
  } = props
  const squarePoints = getOscillatedPolygonPoints({
    polygonPoints,
    polygonOrigin,
    oscillationSampleCount,
    oscillationFrequency,
    oscillationAmplitude,
    oscillationPhase,
  })
  const squareLength = 2 * squareBaseLength
  return (
    <Fragment>
      {squarePoints.map((somePoint) => (
        <rect
          fill={fillColor}
          x={somePoint.x - squareBaseLength}
          y={somePoint.y - squareBaseLength}
          width={squareLength}
          height={squareLength}
        />
      ))}
    </Fragment>
  )
}

export interface GetOscillatedPolygonPointsApi {
  polygonOrigin: Point
  polygonPoints: Array<Point>
  oscillationSampleCount: number
  oscillationFrequency: number
  oscillationAmplitude: number
  oscillationPhase: number
}

export function getOscillatedPolygonPoints(api: GetOscillatedPolygonPointsApi) {
  const {
    oscillationSampleCount,
    polygonPoints,
    polygonOrigin,
    oscillationAmplitude,
    oscillationFrequency,
    oscillationPhase,
  } = api
  return new Array(oscillationSampleCount)
    .fill(undefined)
    .map<Point>((_, sampleIndex) => {
      const currentSampleAngle =
        ((2 * Math.PI) / oscillationSampleCount) * sampleIndex
      const basePoint = getTracePoint({
        somePoints: polygonPoints,
        originPoint: polygonOrigin,
        traceAngle: currentSampleAngle,
      })
      return {
        x:
          oscillationAmplitude *
            Math.cos(
              oscillationFrequency * currentSampleAngle + oscillationPhase
            ) +
          basePoint.x,
        y:
          oscillationAmplitude *
            Math.sin(
              oscillationFrequency * currentSampleAngle + oscillationPhase
            ) +
          basePoint.y,
      }
    })
}
