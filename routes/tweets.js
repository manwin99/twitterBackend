import express from "express";
import { addTweet } from "../controllers/tweets.js";

const router = express.Router();

router.post("/addTweet", addTweet);

export default router;
