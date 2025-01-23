import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/auth", routes);

export default app;
