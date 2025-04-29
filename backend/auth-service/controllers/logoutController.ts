export const logout = (): Response => {
  const expired = (name: string) =>
    `${name}=; Path=/; HttpOnly${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }; SameSite=None; Max-Age=0`

  return new Response(null, {
    status: 302,
    headers: [
      ['Location', 'https://apply-mate-ten.vercel.app'],
      ['Set-Cookie', expired('access_token')],
      ['Set-Cookie', expired('refresh_token')],
    ],
  })
}
