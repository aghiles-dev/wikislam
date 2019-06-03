import { CacheHandler } from '../../domain/ports/CacheHandler'

export class InMemoryCacheHandler implements CacheHandler {
  private cache: object = {}

  get<T> (key: string): T | undefined {
    return this.cache[key]
  }

  set<T> (key: string, content: T): void {
    this.cache[key] = content
  }

}
