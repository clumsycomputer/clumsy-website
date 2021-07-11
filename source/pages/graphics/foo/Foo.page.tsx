import React from 'react'

export default {
  pageRoute: '/graphics/foo',
  PageContent: Foo,
  htmlTitle: 'foo - jmath',
  htmlDescription: 'a foo graphic',
  generatePdf: false,
  pdfFileName: 'foo',
}

function Foo() {
  const baseWave = getCommonalityWave({
    baseRhythm: getFilteredRhythm({
      rhythmSequence: [
        getNaturalRhythm({
          rhythmResolution: 12,
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
  return (
    <svg
      style={{ position: 'absolute', left: 0, top: 0 }}
      viewBox={'0 0 100 100'}
    >
      {baseWave.map((cellValue, cellIndex) => {
        const circleAngle = ((2 * Math.PI) / baseWave.length) * cellIndex
        return (
          <circle
            cx={
              50 *
                (cellValue / baseWave.length) *
                Math.cos(circleAngle - Math.PI / 2) +
              50
            }
            cy={
              25 *
                (cellValue / baseWave.length) *
                Math.sin(circleAngle - Math.PI / 2) +
              50
            }
            r={0.5}
            stroke={'black'}
            strokeWidth={0.25}
            fill={'none'}
          />
        )
      })}
    </svg>
  )
}

interface GetFilteredRhythmApi {
  rhythmSequence: Rhythm[]
}

function getFilteredRhythm(api: GetFilteredRhythmApi): Rhythm {
  const { rhythmSequence } = api
  const baseRhythmLength = rhythmSequence[0]?.length
  if (baseRhythmLength) {
    const baseRhythmAnchors = rhythmSequence.reduce(
      (remainingRhythmsAnchors, currentRhythm) => {
        const currentRhythmAnchors = getElementIndices({
          someSpace: currentRhythm,
          targetValue: true,
        })
        return currentRhythmAnchors.map(
          (someRhythmAnchor) => remainingRhythmsAnchors[someRhythmAnchor]!
        )
      },
      new Array(baseRhythmLength)
        .fill(undefined)
        .map((_, cellIndex) => cellIndex)
    )
    return baseRhythmAnchors.reduce<Rhythm>((result, someRhythmAnchor) => {
      result[someRhythmAnchor] = true
      return result
    }, new Array(baseRhythmLength).fill(false))
  } else {
    throw new Error('wtf? getFilteredRhythm')
  }
}

interface GetElementIndicesApi<Element extends any> {
  someSpace: Element[]
  targetValue: Element
}

function getElementIndices<Element extends any>(
  api: GetElementIndicesApi<Element>
) {
  const { someSpace, targetValue } = api
  return someSpace.reduce<number[]>((result, someCellValue, cellIndex) => {
    if (someCellValue === targetValue) {
      result.push(cellIndex)
    }
    return result
  }, [])
}

interface GetCommonalityWaveApi {
  baseRhythm: Rhythm
}

function getCommonalityWave(api: GetCommonalityWaveApi) {
  const { baseRhythm } = api
  const rhythmAnchors = getElementIndices({
    someSpace: baseRhythm,
    targetValue: true,
  })
  return getDiscreteWave({
    rhythmParts: rhythmAnchors.map((someRhythmAnchor) =>
      getPhasedSpace({
        baseSpace: baseRhythm,
        spacePhase: someRhythmAnchor,
      })
    ),
  })
}

interface GetNaturalRhythmApi {
  rhythmResolution: number
  rhythmDensity: number
  rhythmPhase: number
}

function getNaturalRhythm(api: GetNaturalRhythmApi): Rhythm {
  const { rhythmDensity, rhythmResolution, rhythmPhase } = api
  return getPhasedSpace({
    baseSpace: getEuclideanRhythm({
      lhsCount: rhythmDensity,
      rhsCount: rhythmResolution - rhythmDensity,
      lhsRhythm: [true],
      rhsRhythm: [false],
    }),
    spacePhase: rhythmPhase,
  })
}

type Space = Wave | Rhythm

type Wave = number[]

type Rhythm = boolean[]

interface GetPhasedSpaceApi<Element extends any> {
  baseSpace: Element[]
  spacePhase: number
}

function getPhasedSpace<Element extends any>(
  api: GetPhasedSpaceApi<Element>
): Element[] {
  const { baseSpace, spacePhase } = api
  const spaceLength = baseSpace.length
  return baseSpace.map(
    (someCell, cellIndex) =>
      baseSpace[(cellIndex + spacePhase + spaceLength) % spaceLength]!
  )
}

interface GetDiscreteWaveApi {
  rhythmParts: Rhythm[]
}

function getDiscreteWave(api: GetDiscreteWaveApi) {
  const { rhythmParts } = api
  const waveLength = rhythmParts[0]?.length
  if (waveLength) {
    return rhythmParts.reduce((result, someRhythm) => {
      someRhythm.forEach((someCellValue, cellIndex) => {
        if (someCellValue) {
          result[cellIndex] += 1
        }
      })
      return result
    }, new Array(waveLength).fill(0))
  } else {
    throw new Error('wtf? getDiscreteWave')
  }
}

interface GetEuclideanRhythmApi extends GetEuclideanRhythmBaseApi {}

function getEuclideanRhythm(api: GetEuclideanRhythmApi): Rhythm {
  const { lhsCount, rhsCount } = api
  const baseEuclideanRhythm = getEuclideanRhythmBase(api)
  const targetSize = lhsCount + rhsCount
  const rhythmFrequency = targetSize / baseEuclideanRhythm.length
  return new Array(rhythmFrequency).fill(baseEuclideanRhythm).flat()
}

interface GetEuclideanRhythmBaseApi {
  lhsCount: number
  lhsRhythm: Rhythm
  rhsCount: number
  rhsRhythm: Rhythm
}

function getEuclideanRhythmBase(api: GetEuclideanRhythmBaseApi): Rhythm {
  const { rhsCount, lhsRhythm, lhsCount, rhsRhythm } = api
  if (rhsCount === 0) {
    return lhsRhythm
  }
  return lhsCount > rhsCount
    ? getEuclideanRhythmBase({
        lhsRhythm,
        rhsCount,
        lhsCount: lhsCount - rhsCount,
        rhsRhythm: [...lhsRhythm, ...rhsRhythm],
      })
    : getEuclideanRhythmBase({
        lhsCount,
        rhsRhythm,
        rhsCount: rhsCount - lhsCount,
        lhsRhythm: [...lhsRhythm, ...rhsRhythm],
      })
}
