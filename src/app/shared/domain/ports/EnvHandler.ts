export enum EnvKey {
  API_URL = 'API_URL',
  VERSES_LIMIT = 'VERSES_LIMIT',
}

export interface EnvHandler {
  get(key: EnvKey): string
}
