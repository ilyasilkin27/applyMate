import appInstance from '../app'
import { login, finalizeLogin } from '../controllers/loginController'
import { logout } from '../controllers/logoutController'

type AppType = typeof appInstance

export const authRoutes = (app: AppType) => {
  app.get('/auth/login', login)
  app.get('/auth/finalizeLogin', finalizeLogin)
  app.get('/auth/logout', logout)
}
