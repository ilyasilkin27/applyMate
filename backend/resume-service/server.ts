import app from './app'

app.listen({ port: 5001 }, ({ port }) => {
  console.log(`Resume service running on port ${port}`)
})
