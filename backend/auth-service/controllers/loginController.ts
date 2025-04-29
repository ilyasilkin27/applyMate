import type { Context } from 'elysia'
import ky from 'ky'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

export const login = (): Response => {
  const authorizationUrl = `https://hh.ru/oauth/authorize?response_type=code&client_id=${
    process.env.CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    'https://applymate-auth-service.onrender.com/auth/finalizeLogin'
  )}`
  return Response.redirect(authorizationUrl)
}

const validateAuthorizationCode: (code?: string) => asserts code is string = (
  code
) => {
  if (!code) throw new Error('No authorization code provided')
}

const fetchTokens = async (
  code: string
): Promise<{ access_token: string; refresh_token: string }> => {
  const response = await ky.post('https://api.hh.ru/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri:
        'https://applymate-auth-service.onrender.com/auth/finalizeLogin',
      client_id: process.env.CLIENT_ID!,
      client_secret: process.env.CLIENT_SECRET!,
    }),
  })
  return await response.json()
}

export const finalizeLogin = async (
  ctx: Context<{ query: Record<string, string> }>
): Promise<Response> => {
  try {
    const code: string | undefined = ctx.query.code

    validateAuthorizationCode(code)

    const { access_token, refresh_token } = await fetchTokens(code)

    return Response.redirect(
      `https://apply-mate-ten.vercel.app/home?access_token=${access_token}&refresh_token=${refresh_token}`
    )
  } catch (error: any) {
    console.error('Failed to handle callback', error.message || error)
    const status =
      error.message === 'No authorization code provided' ? 400 : 500
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to exchange authorization code',
      }),
      { status, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
