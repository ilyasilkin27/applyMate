import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { vacanciesRoutes } from './routes/vacancies.routes';

const app = new Elysia()
  .use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }))
  .use(vacanciesRoutes)
  .listen(3002);

console.log(`Vacancies service is running at ${app.server?.hostname}:${app.server?.port}`); 