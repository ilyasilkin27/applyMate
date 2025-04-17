import { buildHeaders, handleResponse } from '../utils/apiUtils';
import type { ApplyParams } from '../types/api';

const BASE_URL = 'https://api.hh.ru/negotiations';

export const applyToVacancy = async (
  accessToken: string,
  params: ApplyParams
): Promise<{ negotiationId: string }> => {
  const { resumeId, vacancyId, message } = params;
  const url = `${BASE_URL}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(accessToken),
    body: JSON.stringify({
      resume_id: resumeId,
      vacancy_id: vacancyId,
      message: message || '',
    }),
  });

  const data = await handleResponse<{ id: string }>(response);
  return { negotiationId: data.id };
}; 