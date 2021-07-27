import React, { Fragment } from 'react'
import {
  Circle,
  getMirroredPoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import { getUpdatedData } from '../../../library/getUpdatedData'
import { reduceRhythmSequence } from '../../../library/helperStuff'
import { getNaturalCompositeRhythm } from '../../../library/rhythmStuff'
import {
  getLoopExpandingPattern,
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

function Waldo() {
  const rootCircle: Circle = {
    radius: 65,
    center: { x: 50, y: 50 },
  }
  const rootLoop: RotatedLoop = {
    baseCircle: rootCircle,
    childCircle: {
      relativeRadius: 11 / 12,
      relativeDepth: 1,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: 0,
  }
  const rhythmA = getNaturalCompositeRhythm({
    rhythmResolution: 23,
    rhythmParts: [{ rhythmDensity: 12, rhythmPhase: 0 }],
    rhythmPhase: 0,
  })
  const patternA = getLoopExpandingPattern({
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
          (somePatternCell.baseLoop.baseCircle.radius /
            somePatternCell.rhythmResolution) *
          2,
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
    const loopSampleCount = 256
    const cellOscillationRadius = 1 / 3
    const cellRootBase = cellOscillationRadius / 4
    return {
      ...someCellStuff,
      cellRootBase,
      cellRootOverlay: cellRootBase,
      cellPointsBase: getOscillatedLoopPoints({
        someRotatedLoop: someCellStuff.cellLoop,
        sampleCount: loopSampleCount,
        oscillationRadius: cellOscillationRadius,
        oscillationFrequency: getWaveFrequency({
          baseFrequency: 211,
          scaleResolution: someCellStuff.rhythmResolution,
          frequencyIndex: 0,
        }),
      }),
      cellPointsOverlay: getOscillatedLoopPoints({
        someRotatedLoop: someCellStuff.cellLoop,
        sampleCount: loopSampleCount,
        oscillationRadius: cellOscillationRadius,
        oscillationFrequency: getWaveFrequency({
          baseFrequency: 211,
          scaleResolution: someCellStuff.rhythmResolution,
          frequencyIndex: 1,
        }),
      }),
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

      <mask id={'foo'}>
        {patternPointsA.map((somePatternStuff) => (
          <MirroredPointSquares
            fillColor={'white'}
            mirrorAngle={Math.PI / 2}
            somePoints={somePatternStuff.cellPointsBase}
            mirrorOriginPoint={somePatternStuff.baseLoop.baseCircle.center}
            squareRootLength={somePatternStuff.cellRootBase}
          />
        ))}
        {patternPointsA.map((somePatternStuff) => (
          <MirroredPointSquares
            fillColor={'black'}
            mirrorAngle={Math.PI / 2}
            somePoints={somePatternStuff.cellPointsOverlay}
            mirrorOriginPoint={somePatternStuff.baseLoop.baseCircle.center}
            squareRootLength={somePatternStuff.cellRootOverlay}
          />
        ))}
      </mask>
      <g mask={`url(#foo)`}>
        {/* <rect x={0} y={0} width={100} height={100} fill={'orange'} /> */}
        <image
          x={0}
          y={0}
          width={100}
          height={100}
          href={
            'https://cdn.pixabay.com/photo/2021/06/29/06/14/water-drops-6373296__340.jpg'
          }
        />
      </g>
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
