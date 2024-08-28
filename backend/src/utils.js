import dotenv from "dotenv";

dotenv.config();

export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const USER_AGENT = "ApplyMate/1.0 (ilyasilkin27@gmail.com)";
