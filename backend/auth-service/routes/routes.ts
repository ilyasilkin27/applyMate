import appInstance from '../app'
import { login, finalizeLogin } from '../controllers/loginController.js'
import { logout } from '../controllers/logoutController.js'

type AppType = typeof appInstance

export const authRoutes = (app: AppType) => {
  app.get('/auth/login', login)
  app.get('/auth/finalizeLogin', finalizeLogin)
  app.get('/auth/logout', logout)
}
