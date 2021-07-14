export interface GetFilteredRhythmApi {
  rhythmSequence: DiscreteRhythm[]
}

export function getFilteredRhythm(api: GetFilteredRhythmApi): DiscreteRhythm {
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
    return baseRhythmAnchors.reduce<DiscreteRhythm>(
      (result, someRhythmAnchor) => {
        result[someRhythmAnchor] = true
        return result
      },
      new Array(baseRhythmLength).fill(false)
    )
  } else {
    throw new Error('wtf? getFilteredRhythm')
  }
}

export interface GetElementIndicesApi<Element extends any> {
  someSpace: Element[]
  targetValue: Element
}

export function getElementIndices<Element extends any>(
  api: GetElementIndicesApi<Element>
): number[] {
  const { someSpace, targetValue } = api
  return someSpace.reduce<number[]>((result, someCellValue, cellIndex) => {
    if (someCellValue === targetValue) {
      result.push(cellIndex)
    }
    return result
  }, [])
}

export interface GetCommonalityWaveApi {
  baseRhythm: DiscreteRhythm
}

export function getCommonalityWave(api: GetCommonalityWaveApi): DiscreteWave {
  const { baseRhythm } = api
  const rhythmAnchors = getElementIndices({
    someSpace: baseRhythm,
    targetValue: true,
  })
  return getAccumulatedWave({
    rhythmParts: rhythmAnchors.map((someRhythmAnchor) =>
      getPhasedSpace({
        baseSpace: baseRhythm,
        spacePhase: someRhythmAnchor,
      })
    ),
  })
}

export interface GetNaturalRhythmApi {
  rhythmResolution: number
  rhythmDensity: number
  rhythmPhase: number
}

export function getNaturalRhythm(api: GetNaturalRhythmApi): DiscreteRhythm {
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

type DiscreteWave = number[]

type DiscreteRhythm = boolean[]

export interface GetPhasedSpaceApi<Element extends any> {
  baseSpace: Element[]
  spacePhase: number
}

export function getPhasedSpace<Element extends any>(
  api: GetPhasedSpaceApi<Element>
): Element[] {
  const { baseSpace, spacePhase } = api
  const spaceLength = baseSpace.length
  return baseSpace.map(
    (someCell, cellIndex) =>
      baseSpace[(cellIndex + spacePhase + spaceLength) % spaceLength]!
  )
}

export interface GetAccumulatedWaveApi {
  rhythmParts: DiscreteRhythm[]
}

export function getAccumulatedWave(api: GetAccumulatedWaveApi): DiscreteWave {
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
    throw new Error('wtf? getAccumulatedWave')
  }
}

export interface GetEuclideanRhythmApi extends GetEuclideanRhythmBaseApi {}

export function getEuclideanRhythm(api: GetEuclideanRhythmApi): DiscreteRhythm {
  const { lhsCount, rhsCount } = api
  const baseEuclideanRhythm = getEuclideanRhythmBase(api)
  const targetSize = lhsCount + rhsCount
  const rhythmFrequency = targetSize / baseEuclideanRhythm.length
  return new Array(rhythmFrequency).fill(baseEuclideanRhythm).flat()
}

export interface GetEuclideanRhythmBaseApi {
  lhsCount: number
  lhsRhythm: DiscreteRhythm
  rhsCount: number
  rhsRhythm: DiscreteRhythm
}

export function getEuclideanRhythmBase(
  api: GetEuclideanRhythmBaseApi
): DiscreteRhythm {
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
