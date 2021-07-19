import React, { SVGProps } from 'react'
import {
  Circle,
  getOscillatedRotatedLoopPoints,
  getRotatedLoopPoints,
  Loop,
  OscillatedRotatedLoop,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { getUpdatedData } from '../../../library/getUpdatedData'
import {
  DiscreteRhythm,
  getElementIndices,
  getFilteredRhythm,
  getNaturalRhythm,
  GetNaturalRhythmApi,
  getPhasedSpace,
} from '../../../library/rhythmStuff'

export default {
  pageRoute: '/graphics/baz',
  PageContent: Baz,
  htmlTitle: 'baz - jmath',
  htmlDescription: 'a baz graphic',
  generatePdf: false,
  pdfFileName: 'baz',
}

// const PaletteB = {
//   primary: {
//     main: '#f7752f',
//   },
//   complementary: {
//     main: '#2fb1f7',
//   },
//   analogousA: {
//     main: '#f72f4d',
//   },
//   analogousB: {
//     main: '#f7d92f',
//   },
//   triadicA: {
//     main: '#b1f72f',
//   },
//   triadicB: {
//     main: '#2ff775',
//   },
// }

// const colorsA = [
//   PaletteB.primary.main,
//   PaletteB.analogousB.main,
//   PaletteB.analogousA.main,
//   PaletteB.complementary.main,
//   PaletteB.analogousB.main,
//   PaletteB.analogousA.main,
//   PaletteB.complementary.main,
// ]

function Baz() {
  const rootCircle: Circle = {
    radius: 50,
    center: {
      x: 50,
      y: 50,
    },
  }
  const originPointA = rootCircle.center
  const mirrorAngleA = Math.PI / 2
  const loopA: RotatedLoop = {
    baseCircle: {
      center: {
        x: 33,
        y: 33,
      },
      radius: 10,
    },
    childCircle: {
      relativeRadius: 7 / 12,
      relativeDepth: 1,
      phaseAngle: Math.PI / 2 / 3,
    },
    rotationAnchor: 'base',
    rotationAngle: -Math.PI / 5,
  }
  const loopB = getMirroredRotatedLoop({
    baseLoop: loopA,
    originPoint: originPointA,
    mirrorAngle: mirrorAngleA,
  })
  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
      }}
      viewBox={'-10 -10 120 120'}
    >
      <rect x={-10} y={-10} width={120} height={120} fill={'lightgrey'} />
      <Polygon
        strokeColor={'black'}
        strokeWidth={0.4}
        polygonPoints={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: loopA,
        })}
      />
      <Polygon
        strokeColor={'black'}
        strokeWidth={0.4}
        polygonPoints={getRotatedLoopPoints({
          sampleCount: 256,
          someRotatedLoop: loopB,
        })}
      />
    </svg>
  )
}

interface GetLoopNestApi<RhythmLoop extends Loop> {
  nestRhythm: DiscreteRhythm
  getRhythmLoop: (
    api: GetNestLoopApi
  ) => NestLoopPolygonProps<RhythmLoop>['nestLoop']
  getStrokeColor: (
    api: GetNestStrokeColorApi
  ) => NestLoopPolygonProps<RhythmLoop>['strokeColor']
  getStrokeWidth: (
    api: GetNestStrokeWidthApi
  ) => NestLoopPolygonProps<RhythmLoop>['strokeWidth']
}

interface GetNestLoopApi extends PropertyGetterBaseApi {}

interface GetNestStrokeColorApi extends PropertyGetterBaseApi {}

interface GetNestStrokeWidthApi extends PropertyGetterBaseApi {}

interface PropertyGetterBaseApi {
  rhythmResolution: number
  rhythmDensity: number
  rhythmIndex: number
  nestIndex: number
}

interface NestLoopPolygonProps<RhythmLoop extends Loop>
  extends Pick<NonNullable<PolygonProps>, 'strokeColor' | 'strokeWidth'> {
  nestLoop: RhythmLoop
}

function getRhythmLoopSequence<RhythmLoop extends Loop = Loop>(
  api: GetLoopNestApi<RhythmLoop>
): Array<NestLoopPolygonProps<RhythmLoop>> {
  const { nestRhythm, getRhythmLoop, getStrokeColor, getStrokeWidth } = api
  const rhythmIndices = getElementIndices({
    targetValue: true,
    someSpace: nestRhythm,
  })
  const rhythmResolution = nestRhythm.length
  const rhythmDensity = rhythmIndices.length
  return rhythmIndices.map((rhythmIndex, nestIndex) => {
    return {
      nestLoop: getRhythmLoop({
        rhythmResolution,
        rhythmDensity,
        rhythmIndex,
        nestIndex,
      }),
      strokeColor: getStrokeColor({
        rhythmResolution,
        rhythmDensity,
        rhythmIndex,
        nestIndex,
      }),
      strokeWidth: getStrokeWidth({
        rhythmResolution,
        rhythmDensity,
        rhythmIndex,
        nestIndex,
      }),
    }
  })
}

interface GetNaturalCompositeRhythmApi
  extends Pick<GetNaturalRhythmApi, 'rhythmResolution' | 'rhythmPhase'> {
  rhythmParts: Array<Pick<GetNaturalRhythmApi, 'rhythmDensity' | 'rhythmPhase'>>
}

function getNaturalCompositeRhythm(api: GetNaturalCompositeRhythmApi) {
  const { rhythmResolution, rhythmParts, rhythmPhase } = api
  return getPhasedSpace({
    baseSpace: getFilteredRhythm({
      rhythmSequence: rhythmParts.map((someRhythmPart, rhythmIndex) =>
        getNaturalRhythm({
          ...someRhythmPart,
          rhythmResolution:
            rhythmIndex === 0
              ? rhythmResolution
              : rhythmParts[rhythmIndex - 1]!.rhythmDensity,
        })
      ),
    }),
    spacePhase: rhythmPhase,
  })
}

interface PolygonProps {
  strokeColor: NonNullable<SVGProps<SVGPolygonElement>['stroke']>
  strokeWidth: NonNullable<SVGProps<SVGPolygonElement>['strokeWidth']>
  polygonPoints: Point[]
}

function Polygon(props: PolygonProps) {
  const { strokeColor, strokeWidth, polygonPoints } = props
  return (
    <polygon
      fill={'none'}
      strokeLinejoin={'round'}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      points={polygonPoints
        .map(
          (somePolygonPoint) => `${somePolygonPoint.x},${somePolygonPoint.y}`
        )
        .join(' ')}
    />
  )
}

interface GetMirroredRotatedLoopApi {
  baseLoop: RotatedLoop
  originPoint: Point
  mirrorAngle: number
}

function getMirroredRotatedLoop(api: GetMirroredRotatedLoopApi) {
  const { baseLoop, originPoint, mirrorAngle } = api
  return getUpdatedData({
    baseData: baseLoop,
    dataUpdates: {
      'baseCircle.center': (currentCenter: Point) =>
        getMirroredPoint({
          originPoint,
          mirrorAngle,
          basePoint: currentCenter,
        }),
      'childCircle.phaseAngle': (currentAngle: number) => -currentAngle,
      rotationAngle: (currentAngle: number) =>
        mirrorAngle - (currentAngle - mirrorAngle),
    },
  })
}

interface GetMirroredPointApi {
  basePoint: Point
  originPoint: Point
  mirrorAngle: number
}

function getMirroredPoint(api: GetMirroredPointApi): Point {
  const { basePoint, originPoint, mirrorAngle } = api
  const baseAngle = Math.atan2(
    basePoint.x - originPoint.x,
    basePoint.y - originPoint.y
  )
  const deltaAngle = baseAngle - mirrorAngle
  const deltaRadius = Math.sqrt(
    Math.pow(basePoint.x - originPoint.x, 2) +
      Math.pow(basePoint.y - originPoint.y, 2)
  )
  return {
    x: deltaRadius * Math.cos(mirrorAngle - deltaAngle) + originPoint.x,
    y: deltaRadius * Math.sin(mirrorAngle - deltaAngle) + originPoint.y,
  }
}
