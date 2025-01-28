import express from "express";
import routes from "./routes/routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "https://apply-mate-ten.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/vacancies", routes);

export default app;
