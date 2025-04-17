import { buildHeaders, buildQueryParams, handleResponse } from '../utils/apiUtils';
import type { HHResponse, HHVacancy, SimilarParams } from '../types/api';

const BASE_URL = 'https://api.hh.ru/resumes';

const fetchSimilarVacanciesPage = async (
  accessToken: string,
  resumeId: string,
  page: number,
  queryParams: Partial<SimilarParams>
): Promise<HHResponse> => {
  const url = `${BASE_URL}/${resumeId}/similar_vacancies${buildQueryParams({ ...queryParams, page })}`;
  const response = await fetch(url, {
    headers: buildHeaders(accessToken),
  });

  return handleResponse<HHResponse>(response);
};

const fetchAllSimilarVacancies = async (
  accessToken: string,
  params: SimilarParams
): Promise<HHVacancy[]> => {
  const { resumeId, per_page = 20 } = params;
  const firstPage = await fetchSimilarVacanciesPage(accessToken, resumeId, 0, params);
  const totalPages = Math.min(4, firstPage.pages);
  const results = [...firstPage.items];

  if (totalPages > 1) {
    const pagePromises = Array.from({ length: totalPages - 1 }, (_, i) =>
      fetchSimilarVacanciesPage(accessToken, resumeId, i + 1, params)
    );

    const pages = await Promise.all(pagePromises);
    pages.forEach(page => results.push(...page.items));
  }

  return results;
};

export const getSimilarVacancies = async (
  accessToken: string,
  params: SimilarParams
): Promise<{ vacancies: HHVacancy[] }> => {
  const vacancies = await fetchAllSimilarVacancies(accessToken, params);
  return { vacancies };
}; 