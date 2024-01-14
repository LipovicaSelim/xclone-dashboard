const userData = require("../models/users.json");
const tweetData = require("../models/tweets.json");
const moment = require("moment");

const FirstFiveTweetsController = {
  getFirstFiveTweets: (req, res, next) => {
    const sortedTweets = tweetData.sort(
      (a, b) =>  new Date(b.created_at) - new Date(a.created_at)
    );
    const lastFiveTweets = sortedTweets.slice(0, 5).map((tweet) => {
      const user_id = tweet.user_id;
      const likes_count = tweet.like_count;
      const comments_count = tweet.comment_count;
      const retweets_count = tweet.retweet_count;

      const formattedDate = moment(tweet.created_at).format("D MMMM YYYY");

      return {
        date: formattedDate,
        id: user_id,
        likes_count,
        comments_count,
        retweets_count,
      };
    });

    res.json({ lastFiveTweets });
  },
};

module.exports = FirstFiveTweetsController;
