import type { Context } from 'elysia'

export const getAccessToken = (ctx: Context): string | undefined => {
  const auth = ctx.headers.authorization
  return auth?.startsWith('Bearer ') ? auth.split(' ')[1] : undefined
}

export const isAccessTokenValid = (token?: string) => !!token

export const buildHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'HH-User-Agent': 'ApplyMate/1.0 (ilyasilkin27@gmail.com)',
})

export const buildQueryParams = (ctx: Context) => {
  const {
    per_page = 100,
    page = 0,
    text,
    experience,
    employment,
    schedule,
    area,
    currency,
    salary,
    only_with_salary = false,
    order_by,
  } = ctx.query as Record<string, unknown>

  return {
    per_page,
    page,
    text,
    experience,
    employment,
    schedule,
    area,
    currency,
    salary,
    only_with_salary,
    order_by,
  }
}
