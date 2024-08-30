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
    const response = await axios.get(
      `https://api.hh.ru/resumes/${resumeId}/similar_vacancies`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "HH-User-Agent": "ApplyMate/1.0 (ilyasilkin27@gmail.com)",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching similar vacancies:", error);
    res.status(500).json({ message: "Error fetching similar vacancies" });
  }
};