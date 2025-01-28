export const loadFromLocalStorage = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const saveTokensToSessionStorage = (accessToken, refreshToken) => {
  sessionStorage.setItem("access_token", accessToken);
  sessionStorage.setItem("refresh_token", refreshToken);
};

export const clearSessionStorage = () => {
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
};
