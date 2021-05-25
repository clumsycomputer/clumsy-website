export interface SiteConfig {
  baseUrl: string
  resumePdfUrl: string
}

export const siteConfig: SiteConfig = {
  baseUrl: tryEnviromentVariable({
    variableName: 'BASE_URL',
  }),
  get resumePdfUrl() {
    return `${siteConfig.baseUrl}/resume.pdf`
  },
}

interface TryEnvironmentVariableApi {
  variableName: string
}

function tryEnviromentVariable(api: TryEnvironmentVariableApi) {
  const { variableName } = api
  const environmentVariable = process.env[variableName]
  if (environmentVariable === undefined) {
    throw new Error(`environment variable "${variableName}" is undefined`)
  }
  return environmentVariable
}
