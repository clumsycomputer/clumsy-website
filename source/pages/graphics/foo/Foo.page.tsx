import React, { Fragment } from 'react'
import { Circle, getRotatedLoopPoints, RotatedLoop } from './circleStuff'
import {
  getCommonalityWave,
  getElementIndices,
  getFilteredRhythm,
  getNaturalRhythm,
} from './rhythmStuff'

export default {
  pageRoute: '/graphics/foo',
  PageContent: Foo,
  htmlTitle: 'foo - jmath',
  htmlDescription: 'a foo graphic',
  generatePdf: false,
  pdfFileName: 'foo',
}

function Foo() {
  const waveA = getCommonalityWave({
    baseRhythm: getFilteredRhythm({
      rhythmSequence: [
        getNaturalRhythm({
          rhythmResolution: 12,
          rhythmDensity: 11,
          rhythmPhase: 0,
        }),
        getNaturalRhythm({
          rhythmResolution: 11,
          rhythmDensity: 7,
          rhythmPhase: 4,
        }),
      ],
    }),
  })
  const waveB = getCommonalityWave({
    baseRhythm: getFilteredRhythm({
      rhythmSequence: [
        getNaturalRhythm({
          rhythmResolution: 12,
          rhythmDensity: 11,
          rhythmPhase: 0,
        }),
        getNaturalRhythm({
          rhythmResolution: 11,
          rhythmDensity: 5,
          rhythmPhase: 2,
        }),
      ],
    }),
  })
  const baseCircleA: Circle = {
    radius: 66,
    center: {
      x: 50,
      y: 50,
    },
  }
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
      <rect
        x={-10}
        y={-10}
        width={120}
        height={120}
        fill={'rgb(238,238,255)'}
      />
      {waveA.map((cellValue, cellIndex) => {
        const cellAngle =
          ((2 * Math.PI) / waveA.length) * cellIndex + Math.PI / 2
        const polyBaseCenter = {
          x:
            (baseCircleA.radius / 12) * cellValue * Math.cos(cellAngle) +
            baseCircleA.center.x,
          y:
            (baseCircleA.radius / 12) * cellValue * Math.sin(cellAngle) +
            baseCircleA.center.y,
        }
        const relativeAngleFromCenter =
          Math.atan2(
            polyBaseCenter.y - baseCircleA.center.y,
            polyBaseCenter.x - baseCircleA.center.x
          ) -
          Math.PI / 2
        return (
          <Fragment>
            {waveB.map((cellBValue, indexB) => {
              const polyAngleB =
                ((2 * Math.PI) / waveB.length) * indexB + Math.PI / 2
              const polyBaseCenterB = {
                x:
                  (cellValue / cellBValue) * Math.cos(polyAngleB) +
                  polyBaseCenter.x,
                y:
                  (cellValue / cellBValue) * Math.sin(polyAngleB) +
                  polyBaseCenter.y,
              }
              const relativeAngleFromCenterB =
                Math.atan2(
                  polyBaseCenterB.y - polyBaseCenter.y,
                  polyBaseCenterB.x - polyBaseCenter.x
                ) -
                Math.PI / 2
              const relativeAngleFromCenterC =
                Math.atan2(
                  polyBaseCenterB.y - baseCircleA.center.y,
                  polyBaseCenterB.x - baseCircleA.center.x
                ) +
                Math.PI / 2
              return (
                <polygon
                  points={getRotatedLoopPoints({
                    sampleCount: 256,
                    someRotatedLoop: {
                      baseLoop: {
                        baseCircle: {
                          center: polyBaseCenterB,
                          radius: cellValue,
                        },
                        childCircle: {
                          relativeRadius:
                            (5 / (cellValue + 1) + 5 / (cellBValue + 1)) / 2,
                          relativeDepth: 1,
                          phaseAngle: relativeAngleFromCenterB,
                        },
                      },
                      rotationAnchor: 'base',
                      rotationAngle: Math.PI / 2 - relativeAngleFromCenterC,
                    },
                  })
                    .map((somePoint) => `${somePoint.x},${somePoint.y}`)
                    .join(' ')}
                  stroke={`rgb(${(255 / waveA.length) * cellValue},${
                    (128 / waveB.length) * cellBValue
                  },${(211 / waveB.length) * cellBValue})`}
                  strokeWidth={0.15}
                  fill={'none'}
                />
              )
            })}
          </Fragment>
        )
      })}
    </svg>
  )
}
