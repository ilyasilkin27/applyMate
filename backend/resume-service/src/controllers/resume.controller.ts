import ky from 'ky'
import { Context } from 'elysia'

type Resume = {
  id: string
  title: string
}

const isAccessTokenValid = (accessToken: string | null): accessToken is string => !!accessToken

const buildHeaders = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
  'HH-User-Agent': 'ApplyMate/1.0 (ilyasilkin27@gmail.com)',
})

const fetchResumesFromAPI = async (accessToken: string): Promise<Resume[]> => {
  const response = await ky.get('https://api.hh.ru/resumes/mine', {
    headers: buildHeaders(accessToken),
    searchParams: {
      locale: 'RU',
      host: 'hh.ru',
    },
  }).json<Resume[]>()

  return response
}

export const getResumes = async (context: Context) => {
  const authHeader = context.headers['authorization']
  const accessToken = authHeader?.split(' ')[1] || null

  if (!isAccessTokenValid(accessToken)) {
    return new Response(JSON.stringify({ error: 'No access token provided' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  try {
    const resumes = await fetchResumesFromAPI(accessToken)
    return new Response(JSON.stringify(resumes), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Failed to fetch resumes', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch resumes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
} 