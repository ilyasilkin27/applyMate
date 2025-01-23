import express from "express";
import getResumes from "../controllers/resumeController.js";

const router = express.Router();

router.get("/getResumes", getResumes);

export default router;
