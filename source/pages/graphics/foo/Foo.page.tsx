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
          rhythmPhase: 0,
        }),
        getNaturalRhythm({
          rhythmResolution: 7,
          rhythmDensity: 5,
          rhythmPhase: 0,
        }),
      ],
    }),
  })
  const baseCircleA: Circle = {
    radius: 45,
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
      {waveA.map((cellValue, cellIndex) => {
        const cellAngle =
          ((2 * Math.PI) / waveA.length) * cellIndex + Math.PI / 2
        const polyBaseCenter = {
          x:
            (baseCircleA.radius / cellValue) * Math.cos(cellAngle) +
            baseCircleA.center.x,
          y:
            (baseCircleA.radius / cellValue) * Math.sin(cellAngle) +
            baseCircleA.center.y,
        }
        const relativeAngleFromCenter =
          Math.atan2(
            polyBaseCenter.y - baseCircleA.center.y,
            polyBaseCenter.x - baseCircleA.center.x
          ) -
          Math.PI / 2
        const phaseAdjuster =
          polyBaseCenter.y < 50 ? Math.PI : Math.PI * (cellIndex % 2)
        return (
          <Fragment>
            {getElementIndices({
              someSpace: getNaturalRhythm({
                rhythmResolution: 2 * cellValue,
                rhythmDensity: cellValue + 1,
                rhythmPhase: 0,
              }),
              targetValue: true,
            }).map((nestIndex, indexIndex) => (
              <polygon
                points={getRotatedLoopPoints({
                  sampleCount: 256,
                  someRotatedLoop: {
                    baseLoop: {
                      baseCircle: {
                        center: polyBaseCenter,
                        radius:
                          indexIndex !== 4
                            ? 2 * cellValue - nestIndex / 1.125 - cellValue / 3
                            : 0,
                      },
                      childCircle: {
                        relativeRadius: 0.9 / ((nestIndex + 1) / 2),
                        relativeDepth: 0.5 / ((nestIndex + 1) / 2),
                        phaseAngle: relativeAngleFromCenter - phaseAdjuster,
                      },
                    },
                    rotationAnchor: 'base',
                    rotationAngle:
                      Math.PI / 2 -
                      relativeAngleFromCenter -
                      (polyBaseCenter.y < 35 ? Math.PI : 0),
                  },
                })
                  .map((somePoint) => `${somePoint.x},${somePoint.y}`)
                  .join(' ')}
                stroke={'black'}
                strokeWidth={0.25}
                fill={'none'}
              />
            ))}
          </Fragment>
        )
      })}
    </svg>
  )
}
