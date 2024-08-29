import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const middleware = (app) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: "https://apply-mate-frontend.vercel.app",
      credentials: true,
    })
  );
};

export default middleware;
