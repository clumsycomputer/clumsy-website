import { getLoopPointsData, LoopStructure } from '@library/geometry'
import { NextPage } from 'next'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'

// "one who pretends inherits" - phil
const LoopCalculatorPage: NextPage = () => {
  const [loopStructureState, setLoopStructureState] = useState<LoopStructure>({
    structureType: 'initialStructure',
    loopBase: {
      center: { x: 0, y: 0 },
      radius: 1,
    },
    subStructure: {
      structureType: 'terminalStructure',
      baseOrientationAngle: 0,
      relativeSubRadius: 1,
      relativeSubDepth: 0,
      subPhaseAngle: 0,
    },
    subLoopRotationAngle: 0,
  })
  const styles = useStyles()
  return (
    <div className={styles.pageContainer}>
      <div className={styles.graphicContainer}>
        <svg className={styles.loopGraphic} viewBox={getLoopGraphicViewbox()}>
          <polygon
            strokeWidth={0.02}
            stroke={'black'}
            fill="transparent"
            points={getLoopPointsData({
              someLoopStructure: loopStructureState,
              sampleCount: 1024,
            })
              .loopPoints.map(
                (someLoopPoint) => `${someLoopPoint.x},${someLoopPoint.y}`
              )
              .join(' ')}
          />
        </svg>
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  pageContainer: {},
  graphicContainer: {},
  loopGraphic: {},
})

function getLoopGraphicViewbox() {
  const rootLength = 1
  const relativePaddingScalar = 1 / 8
  const adjustedRootLength = relativePaddingScalar * rootLength + rootLength
  const axisLength = 2 * adjustedRootLength
  return `${-adjustedRootLength} ${-adjustedRootLength} ${axisLength} ${axisLength}`
}

export default LoopCalculatorPage
