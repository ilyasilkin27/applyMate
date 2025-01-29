import axios from "axios";
import { getAccessToken, isAccessTokenValid, buildHeaders } from "../utils/apiUtils.js";

const buildFormData = (resumeId, vacancyId, coverLetter) => {
  const formData = new URLSearchParams();
  formData.append("resume_id", resumeId);
  formData.append("vacancy_id", vacancyId);
  if (coverLetter) {
    formData.append("message", coverLetter);
  }
  return formData;
};

const applyToVacancy = async (accessToken, resumeId, vacancyId, coverLetter) => {
  const formData = buildFormData(resumeId, vacancyId, coverLetter);

  await axios.post("https://api.hh.ru/negotiations", formData, {
    headers: buildHeaders(accessToken),
  });
};

export const applyVacancy = async (req, res) => {
  const { resumeId } = req.params;
  const { vacancyId, coverLetter } = req.body;
  
  const accessToken = getAccessToken(req);

  if (!isAccessTokenValid(accessToken)) {
    return res.status(401).json({ message: "Unauthorized. No access token found." });
  }

  try {
    await applyToVacancy(accessToken, resumeId, vacancyId, coverLetter);
    res.json({ message: `Successfully applied to vacancy ${vacancyId}.` });
  } catch (error) {
    console.error(`Failed to apply to vacancy ${vacancyId}:`, error);
    res.status(500).json({ message: "Error applying to the vacancy" });
  }
};

export const applyAllVacancies = async (req, res) => {
  const { resumeId } = req.params;
  const { vacancies, coverLetter } = req.body;
  
  const accessToken = getAccessToken(req);

  if (!isAccessTokenValid(accessToken)) {
    return res.status(401).json({ message: "Unauthorized. No access token found." });
  }

  try {
    let successfulApplications = 0;
    let failedApplications = 0;

    for (const vacancy of vacancies) {
      try {
        await applyToVacancy(accessToken, resumeId, vacancy.id, coverLetter);
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
