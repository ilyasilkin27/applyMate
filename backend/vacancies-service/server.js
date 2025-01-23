import app from "./app.js";

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Vacancies service is running on port ${PORT}`);
});
