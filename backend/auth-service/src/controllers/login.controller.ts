import ky from 'ky'
import querystring from 'querystring'
import dotenv from 'dotenv'
import { Context } from 'elysia'

dotenv.config({ path: '../.env' })

type TokenResponse = {
  access_token: string
  refresh_token: string
}

export const login = () => {
  const authorizationUrl = `https://hh.ru/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(
    'https://applymate-auth-service.onrender.com/auth/finalizeLogin'
  )}`
  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizationUrl
    }
  })
}

const validateAuthorizationCode = (code: string) => {
  if (!code) throw new Error('No authorization code provided')
}

const fetchTokens = async (code: string): Promise<TokenResponse> => {
  const response = await ky.post('https://api.hh.ru/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://applymate-auth-service.onrender.com/auth/finalizeLogin',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    })
  }).json()

  return response as TokenResponse
}

export const finalizeLogin = async (context: Context) => {
  try {
    const code = context.query.code
    if (!code) throw new Error('No authorization code provided')
    validateAuthorizationCode(code)
    const { access_token, refresh_token } = await fetchTokens(code)
    
    return new Response(null, {
      status: 302,
      headers: {
        Location: `https://apply-mate-ten.vercel.app/home?access_token=${access_token}&refresh_token=${refresh_token}`
      }
    })
  } catch (error) {
    console.error('Failed to handle callback', error instanceof Error ? error.message : error)
    return new Response(JSON.stringify({
      error: 'Failed to handle callback',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: error instanceof Error && error.message === 'No authorization code provided' ? 400 : 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
} 