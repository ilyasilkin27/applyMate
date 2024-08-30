import axios from "axios";
import { USER_AGENT } from "../utils.js";

export const getResumes = async (req, res) => {
  const accessToken = req.cookies.access_token;
  
  if (!accessToken) {
    return res.status(401).json({ error: "No access token provided" });
  }

  try {
    const response = await axios.get(`https://api.hh.ru/resumes/mine`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "HH-User-Agent": USER_AGENT,
      },
      params: {
        locale: "RU",
        host: "hh.ru",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Failed to fetch resumes", error);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
};

export const getSimilarVacancies = async (req, res) => {
  const { resumeId } = req.params;
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No access token found." });
  }

  try {
    const perPage = 100;
    const totalVacs = 200;
    const pages = Math.ceil(totalVacs / perPage);

    let allVacancies = [];

    for (let page = 0; page < pages; page++) {
      const response = await axios.get(
        `https://api.hh.ru/resumes/${resumeId}/similar_vacancies`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "HH-User-Agent": "ApplyMate/1.0 (ilyasilkin27@gmail.com)",
          },
          params: {
            per_page: perPage,
            page: page,
          },
        }
      );

      allVacancies = allVacancies.concat(response.data.items);

      if (allVacancies.length >= totalVacs) break;
    }

    res.json(allVacancies.slice(0, totalVacs));
  } catch (error) {
    console.error("Error fetching similar vacancies:", error);
    res.status(500).json({ message: "Error fetching similar vacancies" });
  }
};
