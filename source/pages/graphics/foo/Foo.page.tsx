import { SvgAttributes } from 'csstype'
import React, { Fragment } from 'react'
import {
  Circle,
  getRotatedLoopPoint,
  getRotatedLoopPoints,
  RotatedLoop,
} from './circleStuff'
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

type ElementGraphNode = GroupGraphNode | RotatedLoopGraphNode

interface GroupGraphNode
  extends ElementGraphNodeBase<
    'group',
    { [nodeKey: string]: ElementGraphNode }
  > {}

interface RotatedLoopGraphNode
  extends ElementGraphNodeBase<'rotatedLoop', RotatedLoop> {}

interface ElementGraphNodeBase<
  NodeType extends string,
  GeometryType extends object
> {
  type: NodeType
  geometry: GeometryType
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
          rhythmResolution: 24,
          rhythmDensity: 23,
          rhythmPhase: 0,
        }),
        getNaturalRhythm({
          rhythmResolution: 23,
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
  const baseCircleA: Circle = {
    radius: 50,
    center: {
      x: 50,
      y: 50,
    },
  }
  const corePattern = waveA.map<RotatedLoop>((cellA, indexA) => {
    const angleA = ((2 * Math.PI) / waveA.length) * indexA + Math.PI / 2
    const perimeterPoint = {
      x: baseCircleA.radius * Math.cos(angleA) + baseCircleA.center.x,
      y: baseCircleA.radius * Math.sin(angleA) + baseCircleA.center.y,
    }
    const polyCenterPoint = {
      x:
        -cellA * (baseCircleA.radius / waveA.length) * Math.cos(angleA) +
        perimeterPoint.x,
      y:
        -cellA * (baseCircleA.radius / waveA.length) * Math.sin(angleA) +
        perimeterPoint.y,
    }
    const polyBaseRelativeAngle = Math.atan2(
      polyCenterPoint.x - baseCircleA.center.x,
      polyCenterPoint.y - baseCircleA.center.y
    )
    const polyRotationAngle = polyBaseRelativeAngle + Math.PI / 2
    return {
      baseCircle: {
        radius: (baseCircleA.radius / waveA.length / 3) * cellA,
        center: polyCenterPoint,
      },
      childCircle: {
        relativeRadius: 0.675,
        relativeDepth: 0.375,
        phaseAngle: polyBaseRelativeAngle,
      },
      rotationAnchor: 'base',
      rotationAngle: polyRotationAngle,
    }
  })
  const rimPattern = waveB.map<RotatedLoop>((cellA, indexA) => {
    const angleA = ((2 * Math.PI) / waveB.length) * indexA + Math.PI / 2
    const perimeterPoint = {
      x: baseCircleA.radius * Math.cos(angleA) + baseCircleA.center.x,
      y: baseCircleA.radius * Math.sin(angleA) + baseCircleA.center.y,
    }
    const polyCenterPoint = {
      x:
        (-cellA * (baseCircleA.radius / waveB.length) + cellA) *
          Math.cos(angleA) +
        perimeterPoint.x,
      y:
        (-cellA * (baseCircleA.radius / waveB.length) + cellA) *
          Math.sin(angleA) +
        perimeterPoint.y,
    }
    const polyBaseRelativeAngle = Math.atan2(
      polyCenterPoint.x - baseCircleA.center.x,
      polyCenterPoint.y - baseCircleA.center.y
    )
    const polyRotationAngle = polyBaseRelativeAngle + Math.PI / 2 + Math.PI
    return {
      baseCircle: {
        radius: (baseCircleA.radius / waveB.length / 3) * cellA,
        center: polyCenterPoint,
      },
      childCircle: {
        relativeRadius: 7 / 8,
        relativeDepth: 3 / 8,
        phaseAngle: polyBaseRelativeAngle,
      },
      rotationAnchor: 'base',
      rotationAngle: polyRotationAngle,
    }
  })
  const centerBaseLoop: RotatedLoop = {
    baseCircle: {
      radius: 7,
      center: baseCircleA.center,
    },
    childCircle: {
      relativeRadius: 5 / 8 + 0.05,
      relativeDepth: 5 / 8 + 0.05,
      phaseAngle: Math.PI / 2,
    },
    rotationAnchor: 'base',
    rotationAngle: 0,
  }
  const centerTopLoop: RotatedLoop = {
    baseCircle: {
      radius: 4,
      center: getRotatedLoopPoint({
        someRotatedLoop: {
          ...centerBaseLoop,
          baseCircle: {
            ...centerBaseLoop.baseCircle,
            radius: centerBaseLoop.baseCircle.radius + 20,
          },
        },
        sampleAngle: Math.PI + Math.PI / 2,
      }),
    },
    childCircle: {
      relativeRadius: 3 / 4,
      relativeDepth: 7 / 8,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: -Math.PI / 2,
  }
  const centerTopBaseLoop = getUpdatedData({
    baseData: centerBaseLoop,
    dataUpdates: {
      'baseCircle.radius': centerBaseLoop.baseCircle.radius + 2,
    },
  })
  const centerRightTopLoop: RotatedLoop = {
    baseCircle: {
      radius: 4,
      center: getRotatedLoopPoint({
        someRotatedLoop: centerTopBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 + Math.PI / 6,
      }),
    },
    childCircle: {
      relativeRadius: 1 / 2,
      relativeDepth: 7 / 8,
      phaseAngle: -Math.PI / 4,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2 + Math.PI / 6,
  }
  const centerLeftTopLoop = getUpdatedData({
    baseData: centerRightTopLoop,
    dataUpdates: {
      'baseCircle.center': getRotatedLoopPoint({
        someRotatedLoop: centerTopBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 - Math.PI / 6,
      }),
      'childCircle.phaseAngle': Math.PI / 4,
      rotationAngle: Math.PI / 2 - Math.PI / 6,
    },
  })
  const centerBottomBaseLoop = getUpdatedData({
    baseData: centerBaseLoop,
    dataUpdates: {
      'baseCircle.radius': centerBaseLoop.baseCircle.radius + 5,
    },
  })
  const centerRightBottomLoop: RotatedLoop = {
    baseCircle: {
      radius: 4,
      center: getRotatedLoopPoint({
        someRotatedLoop: centerBottomBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 + Math.PI / 1.5,
      }),
    },
    childCircle: {
      relativeRadius: 1 / 2,
      relativeDepth: 7 / 8,
      phaseAngle: Math.PI / 3,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2 + Math.PI / 1.5,
  }
  const centerLeftBottomLoop = getUpdatedData({
    baseData: centerRightTopLoop,
    dataUpdates: {
      'baseCircle.center': getRotatedLoopPoint({
        someRotatedLoop: centerBottomBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 - Math.PI / 1.5,
      }),
      'childCircle.phaseAngle': -Math.PI / 3,
      rotationAngle: Math.PI / 2 - Math.PI / 1.5,
    },
  })
  const centerMidBaseLoop = getUpdatedData({
    baseData: centerBaseLoop,
    dataUpdates: {
      'baseCircle.radius': centerBaseLoop.baseCircle.radius + 10,
    },
  })
  const centerRightMidLoop: RotatedLoop = {
    baseCircle: {
      radius: 4,
      center: getRotatedLoopPoint({
        someRotatedLoop: centerMidBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 + Math.PI / 3.5,
      }),
    },
    childCircle: {
      relativeRadius: 3 / 8,
      relativeDepth: 3 / 8,
      phaseAngle: Math.PI / 2,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2 - Math.PI / 1.5,
  }
  const centerLeftMidLoop = getUpdatedData({
    baseData: centerRightMidLoop,
    dataUpdates: {
      'baseCircle.center': getRotatedLoopPoint({
        someRotatedLoop: centerMidBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 - Math.PI / 3.5,
      }),
      'childCircle.phaseAngle': -Math.PI / 2,
      rotationAngle: Math.PI / 2 + Math.PI / 1.5,
    },
  })
  const centerPattern = [
    centerTopLoop,
    centerRightTopLoop,
    centerLeftTopLoop,
    centerRightBottomLoop,
    centerLeftBottomLoop,
    centerRightMidLoop,
    centerLeftMidLoop,
  ]
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
      <rect x={-10} y={-10} width={120} height={120} fill={'lightgrey'} />
      <g>
        {corePattern.map((rotatedLoop) => (
          <RotatedLoopPolygon rotatedLoop={rotatedLoop} />
        ))}
      </g>
      <g>
        {rimPattern.map((rotatedLoop) => (
          <RotatedLoopPolygon rotatedLoop={rotatedLoop} />
        ))}
      </g>
      <g>
        {centerPattern.map((rotatedLoop) => (
          <RotatedLoopPolygon rotatedLoop={rotatedLoop} />
        ))}
      </g>
    </svg>
  )
}

interface GetUpdatedDataApi<SomeData extends object> {
  baseData: SomeData
  dataUpdates: {
    [dataPath: string]: any
  }
}

function getUpdatedData<SomeData extends object>(
  api: GetUpdatedDataApi<SomeData>
) {
  const { baseData, dataUpdates } = api
  return Object.entries(dataUpdates).reduce<SomeData>(
    (currentData, [targetDataPath, newData]) => {
      const pathTokens = targetDataPath.split('.')
      return updateData({
        currentData,
        newData,
        pathTokens,
      })
    },
    baseData
  )
}

interface UpdateDataApi {
  pathTokens: string[]
  currentData: any
  newData: any
}

function updateData(api: UpdateDataApi): any {
  const { pathTokens, currentData, newData } = api
  const pathKey = pathTokens.shift()!
  if (pathTokens.length === 0) {
    return {
      ...currentData,
      [pathKey]: newData,
    }
  } else {
    return {
      ...currentData,
      [pathKey]: updateData({
        pathTokens,
        newData,
        currentData: currentData[pathKey]!,
      }),
    }
  }
}

interface RotatedLoopPolygonProps {
  rotatedLoop: RotatedLoop
}

function RotatedLoopPolygon(props: RotatedLoopPolygonProps) {
  const { rotatedLoop } = props
  return (
    <polygon
      points={getRotatedLoopPoints({
        someRotatedLoop: rotatedLoop,
        sampleCount: 256,
      })
        .map((loopPoint) => `${loopPoint.x},${loopPoint.y}`)
        .join(' ')}
      fill={'none'}
      stroke={'black'}
      strokeWidth={0.25}
    />
  )
}
