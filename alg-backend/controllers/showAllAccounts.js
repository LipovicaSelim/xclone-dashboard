const userData = require("../models/users.json");
const tweetData = require("../models/tweets.json");
const moment = require("moment");

const showAllAccounts = {
  showAllAccounts: (req, res, next) => {
    const sortedUsers = userData.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    const allAccounts = sortedUsers.map((user) => {
      const userTweets = tweetData.filter((tweet) => tweet.user_id === user.id);
      const numberOfTweets = userTweets.length;

      const formattedDate = moment(user.created_at).format("D MMMM YYYY");

      const fullName = `${user.first_name} ${user.last_name}`;

      return {
        date: formattedDate,
        name: fullName,
        id: user.id,
        tweets: numberOfTweets,
        status: user.isPremium ? "Premium" : "Normal",
      };
    });
    res.json({ allAccounts });
  },
};

module.exports = showAllAccounts;
