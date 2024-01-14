const express = require("express");
const router = express.Router();
const TotalAccountsController = require("../controllers/totalAccounts");
const TotalTweetsController = require("../controllers/totalTweets");
const LastFiveAccountsController = require("../controllers/lastFiveAccounts");
const FirstFiveAccountsController = require("../controllers/firstFiveAccounts");
const LastFiveTweetsController = require("../controllers/lastFiveTweets");

router.get("/total-accounts", TotalAccountsController.getTotalAccounts);
router.get("/total-tweets", TotalTweetsController.getTotalTweets);
router.get("/total-likes", TotalTweetsController.getTotalLikes);
router.get(
  "/last-five-accounts",
  LastFiveAccountsController.getLastFiveAccounts
);
router.get(
  "/first-five-accounts",
  FirstFiveAccountsController.getFirstFiveAccounts
);
router.get("/last-five-tweets", LastFiveTweetsController.getLastFiveTweets);

module.exports = router;
