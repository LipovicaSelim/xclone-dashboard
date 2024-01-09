const tweetData = require("../models/tweets.json");

const TotalTweetsController = {
  getTotalTweets: (req, res, next) => {
    const totalTweets = tweetData.length;
    res.json({ totalTweets });
  },

  getTotalLikes: (req, res, next) => {
    const totalLikes = tweetData.reduce(
      (acc, tweet) => acc + tweet.like_count,
      0
    );
    res.json({ totalLikes });
  },
};

module.exports = TotalTweetsController;
