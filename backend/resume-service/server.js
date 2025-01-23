import app from "./app.js";

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Resume service is running on port ${PORT}`);
});
