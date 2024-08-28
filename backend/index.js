import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import querystring from "querystring";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/login", (req, res) => {
  const { REDIRECT_URI, CLIENT_ID } = process.env;
  const authorizationUrl = `https://hh.ru/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}`;
  res.redirect(authorizationUrl);
});

app.get("/callback", async (req, res) => {
  const { code } = req.query;
  const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

  if (!code) {
    return res.status(400).json({ error: "No authorization code provided" });
  }

  try {
    const response = await axios.post(
      "https://api.hh.ru/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: "production",
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: "production",
    });

    res.redirect("http://localhost:3000/home");
  } catch (error) {
    console.error("Failed to exchange authorization code", error);
    res.status(500).json({ error: "Failed to exchange authorization code" });
  }
});

app.get("/resumes", async (req, res) => {
  const accessToken = req.cookies.access_token;
  const HOST = "hh.ru";
  const USER_AGENT = "ApplyMate/1.0 (ilyasilkin27@gmail.com)";

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
        host: HOST,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Failed to fetch resumes", error);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

app.get("/resumes/:resumeId/similar_vacancies", async (req, res) => {
  const HH_API_BASE_URL = "https://api.hh.ru";
  const { resumeId } = req.params;
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No access token found." });
  }

  try {
    const response = await axios.get(
      `${HH_API_BASE_URL}/resumes/${resumeId}/similar_vacancies`,
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
});

app.post("/resumes/:resumeId/apply_all_vacancies", async (req, res) => {
  const HH_API_BASE_URL = "https://api.hh.ru";
  const { resumeId } = req.params;
  const { vacancies, coverLetter } = req.body;
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No access token found." });
  }

  try {
    let successfulApplications = 0;
    let failedApplications = 0;

    for (const vacancy of vacancies) {
      try {
        const formData = new URLSearchParams();
        formData.append("resume_id", resumeId);
        formData.append("vacancy_id", vacancy.id);
        if (coverLetter) {
          formData.append("message", coverLetter);
        }

        await axios.post(`${HH_API_BASE_URL}/negotiations`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "HH-User-Agent": "ApplyMate/1.0 (ilyasilkin27@gmail.com)",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        successfulApplications++;
      } catch (error) {
        console.error(`Failed to apply to vacancy ${vacancy.id}:`, error);
        failedApplications++;
      }
    }

    res.json({
      message: `Applied to ${successfulApplications} vacancies successfully. ${failedApplications} applications failed.`,
    });
  } catch (error) {
    console.error("Error applying to vacancies:", error);
    res.status(500).json({ message: "Error applying to vacancies" });
  }
});

app.post("/resumes/:resumeId/apply_vacancy", async (req, res) => {
  const HH_API_BASE_URL = "https://api.hh.ru";
  const { resumeId } = req.params;
  const { vacancyId, coverLetter } = req.body;
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized. No access token found." });
  }

  try {
    const formData = new URLSearchParams();
    formData.append("resume_id", resumeId);
    formData.append("vacancy_id", vacancyId);
    if (coverLetter) {
      formData.append("message", coverLetter);
    }

    await axios.post(`${HH_API_BASE_URL}/negotiations`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "HH-User-Agent": "ApplyMate/1.0 (ilyasilkin27@gmail.com)",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json({
      message: `Successfully applied to vacancy ${vacancyId}.`,
    });
  } catch (error) {
    console.error(`Failed to apply to vacancy ${vacancyId}:`, error);
    res.status(500).json({ message: "Error applying to the vacancy" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
