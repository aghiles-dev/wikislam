export interface CacheHandler {
  get<T>(key: string): T | undefined

  set<T>(key: string, content: T): void
}