import { Elysia } from 'elysia'
import { getResumes } from '../controllers/resume.controller'

export const resumeRoutes = new Elysia({ prefix: '/api/resumes' })
  .get('/getResumes', getResumes) 