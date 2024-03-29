const userData = require("../models/users.json");
const tweetData = require("../models/tweets.json");
const moment = require("moment");

function mergeSort(arr) {
  // if the array is length one or zero, return the array
  if (arr.length < 2) {
    return arr;
  }
  // figure out the middle point
  var middle = Math.floor(arr.length / 2);

  // create an array of the left half
  var left = arr.slice(0, middle);

  // create an array of right half
  var right = arr.slice(middle, arr.length);

  // call merge on a recursively called left half and right half
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var result = [];

  // while both arrays have elements in them, zip them together
  while (left.length && right.length) {
    // if the left array first element is less than the right array first element, push to result
    if (left[0].id >= right[0].id) {
      result.push(left.shift());
      // else push the right array first element to result
    } else {
      result.push(right.shift());
    }
  }

  // if left is the only array with elements, push them all in
  while (left.length) {
    result.push(left.shift());
    // if right is the only array with elements, push them all in
  }
  while (right.length) {
    result.push(right.shift());
  }
  // return final result
  return result;
}

const AccountsByIdDSC = {
    accountsByIdDSC: (req, res, next) => {
    const sortedUsers = mergeSort([...userData]);
    const lastFiveAccounts = sortedUsers.map((user) => {
      const userTweets = tweetData.filter((tweet) => tweet.user_id === user.id);
      const numberOfTweets = userTweets.length;

      const formattedDate = moment(user.created_at).format("D MMMM YYYY");

      const fullName = `${user.first_name} ${user.last_name}`;

      return {
        date: formattedDate,
        name: fullName,
        id: user.id,
        tweets: numberOfTweets,
      };
    });

    res.json({ lastFiveAccounts });
  },
};

module.exports = AccountsByIdDSC;
