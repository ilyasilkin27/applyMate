import { buildHeaders, buildQueryParams, handleResponse } from '../utils/apiUtils';
import type { HHResponse, SearchParams } from '../types/api';

const BASE_URL = 'https://api.hh.ru/vacancies';

export const searchVacancies = async (
  accessToken: string,
  params: SearchParams
): Promise<HHResponse> => {
  const url = `${BASE_URL}${buildQueryParams(params)}`;
  const response = await fetch(url, {
    headers: buildHeaders(accessToken),
  });

  return handleResponse<HHResponse>(response);
}; 