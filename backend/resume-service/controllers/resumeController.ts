import type { Context } from 'elysia'
import ky from 'ky'

const isAccessTokenValid = (token?: string): boolean => !!token

const buildHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'HH-User-Agent': 'ApplyMate/1.0 (ilyasilkin27@gmail.com)',
})

const fetchResumesFromAPI = async (token: string) => {
  const res = await ky.get('https://api.hh.ru/resumes/mine', {
    headers: buildHeaders(token),
    searchParams: { locale: 'RU', host: 'hh.ru' },
  })
  return await res.json()
}

export const getResumes = async (ctx: Context): Promise<Response | unknown> => {
  const auth = ctx.headers.authorization
  const token = auth?.split(' ')[1]

  if (!isAccessTokenValid(token)) {
    return new Response(JSON.stringify({ error: 'No access token provided' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    return await fetchResumesFromAPI(token!)
  } catch (error) {
    console.error('Failed to fetch resumes', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch resumes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
