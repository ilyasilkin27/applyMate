import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json());



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
