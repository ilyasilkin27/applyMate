import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export const login = (req, res) => {
  const authorizationUrl = `https://hh.ru/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(
    'https://applymate-auth-service.onrender.com/auth/finalizeLogin'
  )}`;
  res.redirect(authorizationUrl);
};

const validateAuthorizationCode = (code) => {
  if (!code) throw new Error('No authorization code provided');
};

const fetchTokens = async (code) => {
  const response = await axios.post(
    'https://api.hh.ru/token',
    querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://applymate-auth-service.onrender.com/auth/finalizeLogin',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return response.data;
};

const setAuthTokens = (res, access_token, refresh_token) => {
  res.json({
    access_token,
    refresh_token
  });
};

export const finalizeLogin = async (req, res) => {
  try {
    const { code } = req.query;

    validateAuthorizationCode(code);

    const { access_token, refresh_token } = await fetchTokens(code);

    res.redirect(`https://apply-mate-ten.vercel.app/home?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    console.error('Failed to handle callback', error.message || error);
    res
      .status(error.message === 'No authorization code provided' ? 400 : 500)
      .json({
        error: error.message || 'Failed to exchange authorization code',
      });
  }
};
