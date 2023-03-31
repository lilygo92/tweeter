$(() => {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Dynamically upload tweets into #tweet-container section of index.html
  const createTweetElement = function(tweet) {
    const $element =
    $(`<article class="tweet">
      <header>
        <div class="author">
          <span class="name"><img src=${tweet.user.avatars}></img>
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

  // Run createTweetElement on every object in an array of objects
  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  
    return $('#tweets-container');
  };
  
  // Use ajax to render tweets automatically on the page
  // Empty container between rendering to avoid duplicating posts
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

  // Serialize user input in new tweet form
  // Check that input has characters and is within the character limit
  // If form submission fails, display error message, if submission succeeds hide error message
  // Use ajax to automatically render tweets using fetchTweets, and reset the form and character count
  $("form").submit(function(event) {
    let input = ($(this).find('#tweet-text').serialize());
    let inputCheck = ($(this).find('#tweet-text').val());

    if (inputCheck.length <= 5) {
      event.preventDefault();
      let error = $(this).parent().find("#error");
      $(error).css({"display": "flex"});
      $(error).find(".error-text").html("You cannot submit an empty tweet!");
      return;
    }

    if (inputCheck.length > 145) {
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
      .then(() => {
        this.reset();
        $(this).find("output").html(140);
        fetchTweets();
      });

    event.preventDefault();
  });
});


