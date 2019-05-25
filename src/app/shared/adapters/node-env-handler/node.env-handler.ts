import { EnvHandler, EnvKey } from '../../domain/ports/EnvHandler'

export class NodeEnvHandler implements EnvHandler {

  get(key: EnvKey): string {
    switch (key) {
      case EnvKey.API_URL:
        return this.getOrElse(process.env.API_URL)
      default:
        return ''
    }
  }

  private getOrElse(envVar: string | undefined, defaultValue: string = ''): string {
    return envVar || defaultValue
  }
}
