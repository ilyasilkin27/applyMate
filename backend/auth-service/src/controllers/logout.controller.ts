export const logout = () => {
  try {
    return new Response(null, {
      status: 302,
      headers: {
        Location: 'https://apply-mate-ten.vercel.app',
        'Set-Cookie': 'access_token=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0, refresh_token=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0'
      }
    })
  } catch (error) {
    console.error('Failed to logout', error)
    return new Response(JSON.stringify({ error: 'Failed to logout' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
} 