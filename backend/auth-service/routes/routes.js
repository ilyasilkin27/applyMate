import express from "express";
import { login, finalizeLogin } from "../controllers/loginController.js";
import logout from "../controllers/logoutController.js";

const router = express.Router();

router.get("/login", login);
router.get("/finalizeLogin", finalizeLogin);
router.get("/logout", logout);

export default router;
