export const buildHeaders = (accessToken?: string) => {
  const headers: Record<string, string> = {
    'User-Agent': 'ApplyMate/1.0',
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
};

export const buildQueryParams = (params: Record<string, any>): string => {
  const validParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`)
    .join('&');

  return validParams ? `?${validParams}` : '';
};

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new APIError(
      errorData?.error?.message || 'API request failed',
      response.status,
      errorData
    );
  }

  return response.json() as Promise<T>;
}; 