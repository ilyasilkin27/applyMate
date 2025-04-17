import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { resumeRoutes } from './routes/resume.routes'

const app = new Elysia()
  .use(cors({
    origin: [
      "https://apply-mate-ten.vercel.app",
      "https://hh.ru", 
      "https://api.hh.ru"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Set-Cookie']
  }))
  .use(resumeRoutes)
  .listen(5001)

console.log(`Resume service is running at ${app.server?.hostname}:${app.server?.port}`) 