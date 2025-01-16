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
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No access token found." });
  }

  try {
    let allResults = [];
    for (let page = 0; page < 2; page++) {
      const response = await axios.get(
        `https://api.hh.ru/resumes/${resumeId}/similar_vacancies`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "HH-User-Agent": "ApplyMate/1.0 (ilyasilkin27@gmail.com)",
          },
          params: {
            page,
            per_page,
            text,
            experience,
            employment,
            schedule,
            area,
            currency,
            salary,
          },
        }
      );

      allResults = allResults.concat(response.data.items);

      if (response.data.items.length < per_page) {
        break;
      }
    }

    res.json({ items: allResults });
  } catch (error) {
    console.error("Error fetching similar vacancies:", error);
    res.status(500).json({ message: "Error fetching similar vacancies" });
  }
};

export const searchVacancies = async (req, res) => {
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

  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No access token found." });
  }

  try {
    let allResults = [];
    for (let currentPage = page; currentPage < page + 2; currentPage++) {
      const response = await axios.get("https://api.hh.ru/vacancies", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "HH-User-Agent": "ApplyMate/1.0 (ilyasilkin27@gmail.com)",
        },
        params: {
          page: currentPage,
          per_page,
          text,
          experience,
          employment,
          schedule,
          area,
          currency,
          salary,
          only_with_salary,
          order_by,
        },
      });

      allResults = allResults.concat(response.data.items);

      if (response.data.items.length < per_page) {
        break;
      }
    }

    res.json({ items: allResults });
  } catch (error) {
    console.error("Error fetching vacancies:", error.response?.data || error);
    res.status(500).json({ message: "Error fetching vacancies" });
  }
};

