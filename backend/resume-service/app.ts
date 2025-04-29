import { Elysia } from 'elysia'
import cors from '@elysiajs/cors'
import { resumeRoutes } from './routes/routes'

const app = new Elysia().use(
  cors({
    origin: ['https://apply-mate-ten.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    exposeHeaders: ['Set-Cookie'],
  })
)

resumeRoutes(app)

export default app
