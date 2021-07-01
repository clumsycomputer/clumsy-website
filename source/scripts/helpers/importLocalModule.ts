import Path from 'path'
import { decodeData, DecodeDataApi } from './decodeData'
import { LocalModule } from './LocalModule'
import { LocalScript } from './LocalScript'

export interface ImportLocalModuleApi<SomeLocalModule extends LocalModule>
  extends Pick<LocalScript, 'currentWorkingDirectoryAbsolutePath'>,
    Pick<DecodeDataApi<SomeLocalModule>, 'targetCodec'> {
  localModulePath: string
}

export async function importLocalModule<SomeLocalModule extends LocalModule>(
  api: ImportLocalModuleApi<SomeLocalModule>
) {
  const { currentWorkingDirectoryAbsolutePath, localModulePath, targetCodec } =
    api
  const absolutePathLocalModule = Path.resolve(
    currentWorkingDirectoryAbsolutePath,
    localModulePath
  )
  const localModuleImport: unknown = await import(absolutePathLocalModule)
  const localModule = await decodeData<SomeLocalModule>({
    targetCodec,
    inputData: localModuleImport,
  })
  return localModule
}
