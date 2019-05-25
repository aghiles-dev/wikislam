export interface TokenStorage {
  storeAccessToken(accessToken: string): void
  getAccessToken(): string
}
