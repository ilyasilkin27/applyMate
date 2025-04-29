import type { Elysia } from 'elysia'
import { getResumes } from '../controllers/resumeController'

export const resumeRoutes = (app: Elysia) => {
  app.get('/api/resumes/getResumes', getResumes)
}
