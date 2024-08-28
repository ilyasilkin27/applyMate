import express from "express";
import dotenv from "dotenv";
import { login, callback } from "./src/controllers/authController.js";
import {
  getResumes,
  getSimilarVacancies,
} from "./src/controllers/resumeController.js";
import {
  applyAllVacancies,
  applyVacancy,
} from "./src/controllers/vacancyController.js";
import middleware from "./src/middleware.js";

dotenv.config();

const app = express();
const PORT = 3001;

middleware(app);

app.get("/login", login);
app.get("/callback", callback);
app.get("/resumes", getResumes);
app.get("/resumes/:resumeId/similar_vacancies", getSimilarVacancies);
app.post("/resumes/:resumeId/apply_all_vacancies", applyAllVacancies);
app.post("/resumes/:resumeId/apply_vacancy", applyVacancy);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
