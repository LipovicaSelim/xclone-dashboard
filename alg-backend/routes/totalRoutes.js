const express = require("express");
const router = express.Router();
const TotalAccountsController = require("../controllers/totalAccounts");
const TotalTweetsController = require("../controllers/totalTweets");
const LastFiveAccountsController = require("../controllers/lastFiveAccounts");
const FirstFiveAccountsController = require("../controllers/firstFiveAccounts");
const LastFiveTweetsController = require("../controllers/lastFiveTweets");
const FirstFiveId = require("../controllers/fistFiveId");
const LastFiveId = require("../controllers/lastFiveId");
const AllAccounts = require("../controllers/showAllAccounts");
const AccountsByIdASC = require("../controllers/accountsByIdASC");
const AccountsByIdDSC = require("../controllers/accountsByIdDSC");
const AccountsByDateASC = require("../controllers/accountsByDateASC");
const AccountsByDateDSC = require("../controllers/accountsByDateDSC");
 
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
router.get("/first-five-ids", FirstFiveId.getLastFiveAccounts);
router.get("/last-five-ids", LastFiveId.getLastFiveAccounts);
router.get("/show-all-accounts", AllAccounts.showAllAccounts);
router.get("/accounts-id-asc", AccountsByIdASC.accountsByIdASC);
router.get("/accounts-id-dsc", AccountsByIdDSC.accountsByIdDSC);
router.get("/accounts-date-asc", AccountsByDateASC.accountsByDateASC);
router.get("/accounts-date-dsc", AccountsByDateDSC.accountsByDateDSC);

module.exports = router;
