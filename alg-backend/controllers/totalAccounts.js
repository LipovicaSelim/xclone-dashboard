const userData = require("../models/users.json");

const TotalAccountsController = {
  getTotalAccounts: (req, res, next) => {
    const totalAccounts = userData.length;
    res.json({ totalAccounts });
  },
};

module.exports = TotalAccountsController;
