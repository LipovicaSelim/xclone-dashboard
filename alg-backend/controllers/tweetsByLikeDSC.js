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
      if (left[0].like_count >= right[0].like_count) {
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

const TweetsByLikeAsc = {
  getTweetsByLikeDsc: (req, res, next) => {
    const sortedTweets = mergeSort([...tweetData]);
    const lastFiveTweets = sortedTweets.map((tweet) => {
      console.log(tweet);
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

module.exports = TweetsByLikeAsc;
