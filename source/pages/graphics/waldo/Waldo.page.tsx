import React, { Fragment } from 'react'
import {
  Circle,
  getMirroredPoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { getNaturalCompositeRhythm } from '../../../library/rhythmStuff'
import {
  getOscillatedLoopPoints,
  getStupidPattern,
  getWaveFrequency,
} from './helpers'

export default {
  pageRoute: '/graphics/waldo',
  PageContent: Waldo,
  htmlTitle: 'waldo - jmath',
  htmlDescription: 'a waldo graphic',
  generatePdf: false,
  pdfFileName: 'waldo',
}

const Palette = {
  primary: {
    main: '#ff2e00',
  },
  complementary: {
    main: '#00d0ff',
  },
  analogousA: {
    main: '#ff0051',
  },
  analogousB: {
    main: '#ffae00',
  },
  triadicA: {
    main: '#d0ff00',
  },
  triadicB: {
    main: '#00ff2f',
  },
}

const colorsB = [
  Palette.primary.main,
  Palette.analogousA.main,
  Palette.analogousB.main,
  Palette.primary.main,
  Palette.triadicA.main,
  Palette.triadicB.main,
  Palette.complementary.main,
]

function Waldo() {
  const rootCircle: Circle = {
    radius: 50,
    center: { x: 50, y: 50 },
  }
  const rootLoop: RotatedLoop = {
    baseCircle: rootCircle,
    childCircle: {
      relativeRadius: 1,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: 0,
  }
  const rhythmA = getNaturalCompositeRhythm({
    rhythmResolution: 18,
    rhythmParts: [{ rhythmDensity: 13, rhythmPhase: 0 }],
    rhythmPhase: 1,
  })
  const patternA = getStupidPattern({
    patternId: 'A',
    baseLoop: rootLoop,
    spacerRhythm: rhythmA,
    waveRhythm: rhythmA,
  })
  const patternLoopsA = patternA.map((somePatternCell) => ({
    ...somePatternCell,
    cellLoop: {
      baseCircle: {
        center: somePatternCell.cellPoint,
        radius:
          somePatternCell.baseLoop.baseCircle.radius /
          somePatternCell.rhythmResolution,
      },
      childCircle: {
        relativeRadius: 3 / 4,
        relativeDepth:
          somePatternCell.cellWeight / somePatternCell.rhythmDensity,
        phaseAngle: somePatternCell.cellAngle,
      },
      rotationAnchor: 'base',
      rotationAngle: somePatternCell.cellAngle,
    } as RotatedLoop,
  }))
  const patternPointsA = patternLoopsA.map((someCellStuff) => {
    const cellOscillationRadius = someCellStuff.cellLoop.baseCircle.radius / 4
    return {
      ...someCellStuff,
      cellPointsBase: getOscillatedLoopPoints({
        someRotatedLoop: someCellStuff.cellLoop,
        sampleCount: 256,
        oscillationRadius: cellOscillationRadius,
        oscillationFrequency: getWaveFrequency({
          baseFrequency: 211,
          scaleResolution: someCellStuff.rhythmResolution,
          frequencyIndex: someCellStuff.rhythmIndex,
        }),
      }),
      cellRootBase: cellOscillationRadius / 3,
      cellPointsOverlay: getOscillatedLoopPoints({
        someRotatedLoop: someCellStuff.cellLoop,
        sampleCount: 256,
        oscillationRadius: cellOscillationRadius,
        oscillationFrequency: getWaveFrequency({
          baseFrequency: 211.075,
          scaleResolution: someCellStuff.rhythmResolution,
          frequencyIndex: someCellStuff.rhythmIndex,
        }),
      }),
      cellRootOverlay: cellOscillationRadius / 4,
    }
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
      imageRendering={'optimizeQuality'}
    >
      <rect x={-10} y={-10} width={120} height={120} fill={'black'} />
      {patternPointsA.map((someStuff) => (
        <MirroredPointSquares
          fillColor={colorsB[0]!}
          mirrorAngle={Math.PI / 2}
          somePoints={someStuff.cellPointsBase}
          mirrorOriginPoint={someStuff.baseLoop.baseCircle.center}
          squareRootLength={someStuff.cellRootBase}
        />
      ))}
      {patternPointsA.map((someStuff) => (
        <MirroredPointSquares
          fillColor={'black'}
          mirrorAngle={Math.PI / 2}
          somePoints={someStuff.cellPointsOverlay}
          mirrorOriginPoint={someStuff.baseLoop.baseCircle.center}
          squareRootLength={someStuff.cellRootOverlay}
        />
      ))}
    </svg>
  )
}

interface MirroredPointSquaresProps {
  somePoints: Array<Point>
  mirrorOriginPoint: Point
  mirrorAngle: number
  squareRootLength: number
  fillColor: string
}

function MirroredPointSquares(props: MirroredPointSquaresProps) {
  const {
    somePoints,
    mirrorOriginPoint,
    mirrorAngle,
    squareRootLength,
    fillColor,
  } = props
  return (
    <Fragment>
      {somePoints.map((somePoint) => {
        const mirroredPoint = getMirroredPoint({
          originPoint: mirrorOriginPoint,
          mirrorAngle: mirrorAngle,
          basePoint: somePoint,
        })
        return (
          <Fragment>
            <rect
              fill={fillColor}
              x={somePoint.x - squareRootLength}
              y={somePoint.y - squareRootLength}
              width={2 * squareRootLength}
              height={2 * squareRootLength}
            />
            <rect
              fill={fillColor}
              x={mirroredPoint.x - squareRootLength}
              y={mirroredPoint.y - squareRootLength}
              width={2 * squareRootLength}
              height={2 * squareRootLength}
            />
          </Fragment>
        )
      })}
    </Fragment>
  )
}
