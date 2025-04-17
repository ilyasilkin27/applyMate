export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

export const saveToLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const saveTokensToSessionStorage = (accessToken: string, refreshToken: string): void => {
  sessionStorage.setItem('access_token', accessToken);
  sessionStorage.setItem('refresh_token', refreshToken);
};

export const clearSessionStorage = (): void => {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
}; 