export enum EnvKey {
  API_URL = 'API_URL',
}

export interface EnvHandler {
  get(key: EnvKey): string
}
