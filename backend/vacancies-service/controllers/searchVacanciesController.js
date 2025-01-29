import axios from "axios";
import { getAccessToken, isAccessTokenValid, buildHeaders, buildQueryParams } from "../utils/apiUtils";

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
  const accessToken = getAccessToken(req);

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
