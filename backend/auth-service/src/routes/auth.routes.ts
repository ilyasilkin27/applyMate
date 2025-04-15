import { Elysia } from 'elysia'
import { login, finalizeLogin } from '../controllers/login.controller'
import { logout } from '../controllers/logout.controller'

export const authRoutes = new Elysia({ prefix: '/auth' })
  .get('/login', login)
  .get('/finalizeLogin', finalizeLogin)
  .get('/logout', logout) 