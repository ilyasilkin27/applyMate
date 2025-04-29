import type { Elysia } from 'elysia'
import getSimilar from '../controllers/similarVacanciesController'
import {
  applyVacancy,
  applyAllVacancies,
} from '../controllers/applyVacanciesController'
import search from '../controllers/searchVacanciesController'

export const vacancyRoutes = (app: Elysia) => {
  app.get('/api/vacancies/:resumeId/similar_vacancies', getSimilar)
  app.post('/api/vacancies/:resumeId/apply_all_vacancies', applyAllVacancies)
  app.post('/api/vacancies/:resumeId/apply_vacancy', applyVacancy)
  app.get('/api/vacancies/search', search)
}
