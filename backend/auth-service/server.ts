import dotenv from 'dotenv'
import app from './app'

dotenv.config()

app.listen({ port: 5000 }, ({ port }) => {
  console.log(`Auth service running on port ${port}`)
})