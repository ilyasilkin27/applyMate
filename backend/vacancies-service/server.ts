import app from './app'

app.listen({ port: 5002 }, ({ port }) => {
  console.log(`Vacancies service running on port ${port}`)
})
