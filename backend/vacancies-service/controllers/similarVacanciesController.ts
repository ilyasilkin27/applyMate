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

const fetchSimilarPage = async (
  token: string,
  resumeId: string,
  page: number,
  params: Record<string, unknown>
): Promise<Vacancy[]> => {
  const res = await ky.get(
    `https://api.hh.ru/resumes/${resumeId}/similar_vacancies`,
    {
      headers: buildHeaders(token),
      searchParams: { ...params, page },
    }
  )
  const json = await res.json() as VacanciesResponse
  return json.items
}

const fetchAllSimilar = async (
  token: string,
  resumeId: string,
  params: Record<string, unknown>
): Promise<Vacancy[]> => {
  let all: Vacancy[] = []
  for (let p = 0; p < 4; p++) {
    const items = await fetchSimilarPage(token, resumeId, p, params)
    all = all.concat(items)
    if (items.length < (params.per_page as number || 100)) break
  }
  return all
}

export default async (ctx: Context) => {
  const { resumeId } = ctx.params as { resumeId: string }
  const token = getAccessToken(ctx)

  if (!isAccessTokenValid(token)) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. No access token found.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const params = buildQueryParams(ctx)
    const items = await fetchAllSimilar(token!, resumeId, params)
    return { items }
  } catch (e: unknown) {
    const err = e as Error
    console.error('Error fetching similar vacancies:', err)
    return new Response(
      JSON.stringify({ message: 'Error fetching similar vacancies' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}