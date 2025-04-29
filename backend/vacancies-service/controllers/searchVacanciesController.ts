import type { Context } from 'elysia'
import ky from 'ky'
import {
  getAccessToken,
  isAccessTokenValid,
  buildHeaders,
  buildQueryParams,
} from '../utils/apiUtils'

interface Vacancy {
  id: string
  name: string
}

interface VacanciesResponse {
  items: Vacancy[]
}

const fetchVacanciesPage = async (
  token: string,
  page: number,
  params: Record<string, unknown>
): Promise<Vacancy[]> => {
  const res = await ky.get('https://api.hh.ru/vacancies', {
    headers: buildHeaders(token),
    searchParams: { ...params, page },
  })
  const json = (await res.json()) as VacanciesResponse
  return json.items
}

const fetchAllVacancies = async (
  token: string,
  startPage: number,
  params: Record<string, unknown>
): Promise<Vacancy[]> => {
  let all: Vacancy[] = []
  for (let p = startPage; p < startPage + 2; p++) {
    const items = await fetchVacanciesPage(token, p, params)
    all = all.concat(items)
    if (items.length < ((params.per_page as number) || 100)) break
  }
  return all
}

export default async (ctx: Context) => {
  const token = getAccessToken(ctx)
  if (!isAccessTokenValid(token)) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. No access token found.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const params = buildQueryParams(ctx)
    const items = await fetchAllVacancies(token!, params.page as number, params)
    return { items }
  } catch (e: unknown) {
    const err = e as Error
    console.error('Error fetching vacancies:', err)
    return new Response(
      JSON.stringify({ message: 'Error fetching vacancies' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
