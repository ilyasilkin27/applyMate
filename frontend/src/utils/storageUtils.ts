export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  const value = localStorage.getItem(key)
  return value ? (JSON.parse(value) as T) : defaultValue
}

export const saveToLocalStorage = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const saveTokensToSessionStorage = (
  accessToken: string,
  refreshToken: string
): void => {
  sessionStorage.setItem('access_token', accessToken)
  sessionStorage.setItem('refresh_token', refreshToken)
}

export const clearSessionStorage = (): void => {
  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('refresh_token')
}
