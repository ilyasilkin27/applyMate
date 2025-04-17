import { Elysia, t } from 'elysia';
import { getSimilarVacancies } from '../controllers/similar.controller';
import { searchVacancies } from '../controllers/search.controller';
import { applyToVacancy } from '../controllers/apply.controller';
import type { ApplyParams, SearchParams, SimilarParams } from '../types/api';

export const vacanciesRoutes = (app: Elysia) =>
  app.group('/api/vacancies', (app) =>
    app
      .get('/similar', ({ query: { resumeId, page, per_page }, headers: { authorization } }) => 
        getSimilarVacancies(
          authorization?.replace('Bearer ', '') || '',
          { resumeId, page: Number(page), per_page: Number(per_page) }
        ), {
        query: t.Object({
          resumeId: t.String(),
          page: t.Optional(t.String()),
          per_page: t.Optional(t.String())
        })
      })
      
      .get('/search', ({ query, headers: { authorization } }) => 
        searchVacancies(
          authorization?.replace('Bearer ', '') || '',
          query as SearchParams
        ), {
        query: t.Object({
          text: t.Optional(t.String()),
          area: t.Optional(t.String()),
          experience: t.Optional(t.String()),
          employment: t.Optional(t.String()),
          schedule: t.Optional(t.String()),
          period: t.Optional(t.String()),
          page: t.Optional(t.String()),
          per_page: t.Optional(t.String())
        })
      })
      
      .post('/apply', ({ body, headers: { authorization } }) => 
        applyToVacancy(
          authorization?.replace('Bearer ', '') || '',
          body as ApplyParams
        ), {
        body: t.Object({
          resumeId: t.String(),
          vacancyId: t.String(),
          message: t.Optional(t.String())
        })
      })
  ); 