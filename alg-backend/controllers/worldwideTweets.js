// controllers/statsController.js
const tweetsData = require("../models/tweets.json");

// Define years
const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023];

function calculateStatsByYear(req, res) {
  const statsByYear = {};
  const labels = [];
  const likesData = [];
  const retweetsData = [];
  for (const year of years) {
    labels.push(year.toString());
    let likeCount = 0;
    let retweetCount = 0;
    for (const tweet of tweetsData) {
      const tweetYear = new Date(tweet.created_at).getFullYear();
      if (tweetYear === year) {
        likeCount += tweet.like_count;
        retweetCount += tweet.retweet_count;
      }
    }
    likesData.push(likeCount);
    retweetsData.push(retweetCount);
  }
  res.json({ labels, likesData, retweetsData });
}

module.exports = {
  calculateStatsByYear,
};
