import axios from 'axios';

const getAccessToken = (req) => req.cookies.access_token;
const isAccessTokenValid = (accessToken) => !!accessToken;

const buildHeaders = (accessToken) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    'HH-User-Agent': 'ApplyMate/1.0 (ilyasilkin27@gmail.com)',
  };
};

const fetchResumesFromAPI = async (accessToken) => {
  const response = await axios.get('https://api.hh.ru/resumes/mine', {
    headers: buildHeaders(accessToken),
    params: {
      locale: 'RU',
      host: 'hh.ru',
    },
  });
  return response.data;
};

export default async (req, res) => {
  const accessToken = getAccessToken(req);

  if (!isAccessTokenValid(accessToken)) {
    return res.status(401).json({ error: 'No access token provided' });
  }

  try {
    const resumes = await fetchResumesFromAPI(accessToken);
    res.json(resumes);
  } catch (error) {
    console.error('Failed to fetch resumes', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};
