import { Elysia } from 'elysia'
import { cookie } from '@elysiajs/cookie'
import { cors } from '@elysiajs/cors'
import { authRoutes } from './routes/auth.routes'

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
  .use(cookie())
  .use(authRoutes)
  .listen(5000)

console.log(`Auth service is running at ${app.server?.hostname}:${app.server?.port}`) 