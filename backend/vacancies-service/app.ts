import { Elysia } from 'elysia'
import cors from '@elysiajs/cors'
import { vacancyRoutes } from './routes/routes'

const app = new Elysia().use(
  cors({
    origin: [
      'https://apply-mate-ten.vercel.app',
      'https://hh.ru',
      'https://api.hh.ru',
    ],
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

vacancyRoutes(app)

export default app
