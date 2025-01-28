export default (req, res) => {
  try {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: 'production',
      sameSite: 'None',
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: 'production',
      sameSite: 'None',
    });

    res.redirect('https://apply-mate-ten.vercel.app');
  } catch (error) {
    console.error('Failed to logout', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
};
