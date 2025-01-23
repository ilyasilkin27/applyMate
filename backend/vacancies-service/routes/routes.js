import express from 'express';
import getSimilarVacancies from '../controllers/similarVacanciesController.js';
import {
  applyAllVacancies,
  applyVacancy,
} from '../controllers/applyVacanciesController.js';
import searchVacancies from '../controllers/searchVacanciesController.js';

const router = express.Router();

router.get('/:resumeId/similar_vacancies', getSimilarVacancies);
router.post('/:resumeId/apply_all_vacancies', applyAllVacancies);
router.post('/:resumeId/apply_vacancy', applyVacancy);
router.get('/search', searchVacancies);

export default router;
