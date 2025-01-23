import axios from 'axios';

const getAccessToken = (req) => req.cookies.access_token;
const isAccessTokenValid = (accessToken) => !!accessToken;

const buildHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  'HH-User-Agent': 'ApplyMate/1.0 (ilyasilkin27@gmail.com)',
});

const buildQueryParams = (req) => {
  const {
    per_page = 100,
    text,
    experience,
    employment,
    schedule,
    area,
    currency,
    salary,
  } = req.query;

  return {
    per_page,
    text,
    experience,
    employment,
    schedule,
    area,
    currency,
    salary,
  };
};

const fetchSimilarVacanciesPage = async (accessToken, resumeId, page, queryParams) => {
  const response = await axios.get(`https://api.hh.ru/resumes/${resumeId}/similar_vacancies`, {
    headers: buildHeaders(accessToken),
    params: { ...queryParams, page },
  });

  return response.data.items;
};

const fetchAllSimilarVacancies = async (accessToken, resumeId, queryParams) => {
  let allResults = [];
  for (let page = 0; page < 4; page++) {
    const vacancies = await fetchSimilarVacanciesPage(accessToken, resumeId, page, queryParams);
    allResults = allResults.concat(vacancies);

    if (vacancies.length < queryParams.per_page) {
      break;
    }
  }

  return allResults;
};

export default async (req, res) => {
  const { resumeId } = req.params;
  const accessToken = getAccessToken(req);

  if (!isAccessTokenValid(accessToken)) {
    return res.status(401).json({ message: 'Unauthorized. No access token found.' });
  }

  try {
    const queryParams = buildQueryParams(req);
    const allResults = await fetchAllSimilarVacancies(accessToken, resumeId, queryParams);
    res.json({ items: allResults });
  } catch (error) {
    console.error('Error fetching similar vacancies:', error);
    res.status(500).json({ message: 'Error fetching similar vacancies' });
  }
};
