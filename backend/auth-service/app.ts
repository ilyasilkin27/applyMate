import { Elysia } from 'elysia'
import cors from '@elysiajs/cors'
import cookie from '@elysiajs/cookie'
import dotenv from 'dotenv'
import { authRoutes } from './routes/routes.js'

dotenv.config()

const app = new Elysia()
  .use(
    cors({
      origin: ['https://apply-mate-ten.vercel.app'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
      exposeHeaders: ['Set-Cookie'],
    })
  )
  .use(cookie())

authRoutes(app)

export default app
