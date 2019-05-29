import { EnvHandler, EnvKey } from '../../domain/ports/EnvHandler'

export class NodeEnvHandler implements EnvHandler {

  get(key: EnvKey): string {
    switch (key) {
      case EnvKey.API_URL:
        return this.getOrElse(process.env.API_URL)
      case EnvKey.VERSES_LIMIT:
        return this.getOrElse(process.env.VERSES_LIMIT)
      default:
        return ''
    }
  }

  private getOrElse(envVar: string | undefined, defaultValue: string = ''): string {
    return envVar || defaultValue
  }
}
