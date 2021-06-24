import Path from 'path'
import { decodeData, DecodeDataApi } from './decodeData'
import { LocalModule } from './LocalModule'
import { LocalScript } from './LocalScript'

export interface ImportLocalModuleApi<SomeLocalModule extends LocalModule>
  extends Pick<LocalScript, 'absolutePathCurrentWorkingDirectory'>,
    Pick<DecodeDataApi<SomeLocalModule>, 'targetCodec'> {
  localModulePath: string
}

export async function importLocalModule<SomeLocalModule extends LocalModule>(
  api: ImportLocalModuleApi<SomeLocalModule>
) {
  const { absolutePathCurrentWorkingDirectory, localModulePath, targetCodec } =
    api
  const absolutePathLocalModule = Path.resolve(
    absolutePathCurrentWorkingDirectory,
    localModulePath
  )
  const localModuleImport: unknown = await import(absolutePathLocalModule)
  const localModule = await decodeData<SomeLocalModule>({
    targetCodec,
    inputData: localModuleImport,
  })
  return localModule
}
