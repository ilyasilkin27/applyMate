import axios from "axios";

export const applyAllVacancies = async (req, res) => {
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

        await axios.post(`https://api.hh.ru/negotiations`, formData, {
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
};

export const applyVacancy = async (req, res) => {
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

    await axios.post(`https://api.hh.ru/negotiations`, formData, {
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
};
