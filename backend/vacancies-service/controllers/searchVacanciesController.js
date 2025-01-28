import axios from "axios";

const isAccessTokenValid = (accessToken) => !!accessToken;

const buildHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  'HH-User-Agent': 'ApplyMate/1.0 (ilyasilkin27@gmail.com)',
});

const buildQueryParams = (req) => {
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
  } = req.query;

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
  };
};

const fetchVacanciesPage = async (accessToken, page, queryParams) => {
  const response = await axios.get('https://api.hh.ru/vacancies', {
    headers: buildHeaders(accessToken),
    params: { ...queryParams, page },
  });

  return response.data.items;
};

const fetchAllVacancies = async (accessToken, initialPage, queryParams) => {
  let allResults = [];
  for (let currentPage = initialPage; currentPage < initialPage + 2; currentPage++) {
    const vacancies = await fetchVacanciesPage(accessToken, currentPage, queryParams);
    allResults = allResults.concat(vacancies);

    if (vacancies.length < queryParams.per_page) {
      break;
    }
  }

  return allResults;
};

export default async (req, res) => {
  // Получаем токен из sessionStorage
  const accessToken = req.session?.access_token;

  if (!isAccessTokenValid(accessToken)) {
    return res.status(401).json({ message: 'Unauthorized. No access token found.' });
  }

  try {
    const queryParams = buildQueryParams(req);
    const allResults = await fetchAllVacancies(accessToken, queryParams.page, queryParams);
    res.json({ items: allResults });
  } catch (error) {
    console.error('Error fetching vacancies:', error.response?.data || error);
    res.status(500).json({ message: 'Error fetching vacancies' });
  }
};
