import Tweet from "../models/tweet.js";
import mongoose from "mongoose";
import User from "../models/user.js";

export const addTweet = async (req, res) => {
  const { userId, text } = req.body;

  try {
    const user = User.findOne({ userId });
    if (!user) {
      res.status(401).json({ message: "user not found" });
    }
    const tweet = await Tweet.create({
      userId,
      text,
    });

    res.status(200).json({ tweet, message: "created successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//..../?userid=aklsdalskdna&pageNo=1
export const getTweets = async (req, res) => {
  const { userId, pageNo } = req.query;
  let _id = userId;
  //   console.log(mongoose.Types.ObjectId.isValid(user_id));
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById({ _id });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const limit = 10;
    const startIndex = (Number(pageNo) - 1) * limit;
    const total = await Tweet.countDocuments({ userId });
    // let userId = _id;
    const tweets = await Tweet.find({ userId })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({ tweets, total });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error });
  }
};
