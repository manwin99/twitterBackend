import express from "express";
import { getTweets } from "../controllers/tweets.js";

const router = express.Router();

router.get("/tweets", getTweets);

export default router;
