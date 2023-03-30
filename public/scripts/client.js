/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = function(tweet) {
  const element = 
  `<article class="tweet">
    <header>
      <div class="author">
        <span class="name"><i class="fa-solid fa-cat"></i>
        ${tweet.user.name}</span>
        <span class="tag">${tweet.user.handle}</span>
      </div>
      <div class="text">${tweet.content.text}</div>
    </header>
    
    <footer>
      <div><strong>${tweet.created_at}</strong></div>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`
  
  return element;
}

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
$(() => {
  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  
    return $('#tweets-container');
  }
  
  console.log(renderTweets(data));
})

// Test / driver code (temporary)

