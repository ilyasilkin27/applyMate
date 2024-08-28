import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const HH_API_BASE_URL = "https://api.hh.ru";
export const USER_AGENT = "ApplyMate/1.0 (ilyasilkin27@gmail.com)";
