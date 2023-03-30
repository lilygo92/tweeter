/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const $element =
    $(`<article class="tweet">
      <header>
        <div class="author">
          <span class="name"><i class="fa-solid fa-cat"></i>
          ${tweet.user.name}</span>
          <span class="tag">${tweet.user.handle}</span>
        </div>
        <div class="text">${escape(tweet.content.text)}</div>
      </header>
      
      <footer>
        <div><strong>${timeago.format(tweet.created_at)}</strong></div>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);
    
    return $element;
  };

  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  
    return $('#tweets-container');
  };
  
  const fetchTweets = () => {
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then((tweets) => {
      $("#tweets-container").empty();
      renderTweets(tweets);
    });
  };


  fetchTweets();

  $("form").submit(function(event) {
    console.log("Handler for .submit() called.");
    let input = ($(this).find('#tweet-text').serialize());

    console.log(input.length);

    if (input.length <= 5) {
      event.preventDefault();
      let error = $(this).parent().find("#error");
      $(error).css({"display": "flex"});
      $(error).find(".error-text").html("You cannot submit an empty tweet!");
      return;
    }

    if (input.length > 145) {
      event.preventDefault();
      let error = $(this).parent().find("#error");
      $(error).css({"display": "flex"});
      $(error).find(".error-text").html("You are over the text limit of 140 characters!");
      return;
    }

    $(error).css({"display": "none"});

    $.ajax({
      method: 'POST',
      url: 'tweets',
      data: input
    })
      .then((newTweet) => {
        console.log(newTweet);
        fetchTweets();
      });

    event.preventDefault();
  });

});

// Test / driver code (temporary)

