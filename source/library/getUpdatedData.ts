export interface GetUpdatedDataApi<SomeData extends object> {
  baseData: SomeData
  dataUpdates: Partial<ComputableUpdates<KeyPathDataMap<SomeData>, SomeData>>
}

type ComputableUpdates<SomeData extends object, RootData> = {
  [Key in keyof SomeData]:
    | SomeData[Key]
    | ((propertyData: SomeData[Key], rootData: RootData) => SomeData[Key])
}

type KeyPathDataMap<
  SomeData extends any,
  KeyPathBase extends string = '',
  Result extends object = {}
> = {
  [SomeKey in keyof SomeData]: SomeKey extends string
    ? SomeData[SomeKey] extends object
      ? KeyPathDataMap<
          SomeData[SomeKey],
          `${KeyPathBase}${SomeKey}.`,
          Result & { [T in `${KeyPathBase}${SomeKey}`]: SomeData[SomeKey] }
        >
      : Result & { [T in `${KeyPathBase}${SomeKey}`]: SomeData[SomeKey] }
    : never
}[keyof SomeData]

export function getUpdatedData<SomeData extends object>(
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
        rootData: baseData,
      })
    },
    baseData
  )
}

interface UpdateDataApi {
  pathTokens: string[]
  currentData: any
  newData: any
  rootData: any
}

function updateData(api: UpdateDataApi): any {
  const { pathTokens, currentData, newData, rootData } = api
  const pathKey = pathTokens.shift()!
  if (pathTokens.length === 0) {
    return {
      ...currentData,
      [pathKey]:
        typeof newData === 'function'
          ? newData(currentData[pathKey], rootData)
          : newData,
    }
  } else {
    return {
      ...currentData,
      [pathKey]: updateData({
        pathTokens,
        newData,
        rootData,
        currentData: currentData[pathKey]!,
      }),
    }
  }
}
