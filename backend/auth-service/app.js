import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/routes.js";

export const app = express();

app.use(
  cors({
    origin: [
      "https://apply-mate-ten.vercel.app",
      "https://hh.ru", 
      "https://api.hh.ru"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Set-Cookie']
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/auth", routes);

export default app;
