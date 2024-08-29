import axios from "axios";
import querystring from "querystring";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../utils.js";

export const login = (req, res) => {
  const authorizationUrl = `https://hh.ru/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}`;
  res.redirect(authorizationUrl);
};

export const callback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "No authorization code provided" });
  }

  try {
    const response = await axios.post(
      "https://api.hh.ru/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    console.log("Setting access_token:", access_token);
    console.log("Setting refresh_token:", refresh_token);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    console.log("after setting cookies:", req.cookies);

    res.redirect("https://apply-mate-frontend.vercel.app/home");
  } catch (error) {
    console.error("Failed to exchange authorization code", error);
    res.status(500).json({ error: "Failed to exchange authorization code" });
  }
};
