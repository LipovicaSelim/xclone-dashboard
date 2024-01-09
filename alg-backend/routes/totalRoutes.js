const express = require("express");
const router = express.Router();
const TotalAccountsController = require("../controllers/totalAccounts");
const TotalTweetsController = require("../controllers/totalTweets");
const LastFiveAccountsController = require("../controllers/lastFiveAccounts");

router.get("/total-accounts", TotalAccountsController.getTotalAccounts);
router.get("/total-tweets", TotalTweetsController.getTotalTweets);
router.get("/total-likes", TotalTweetsController.getTotalLikes);
router.get(
  "/last-five-accounts",
  LastFiveAccountsController.getLastFiveAccounts
);

module.exports = router;
