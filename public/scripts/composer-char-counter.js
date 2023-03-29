$(document).ready(function() {
  $("textarea").on('input', function() {
    let parent = ($(this).parent());
    let input = ($('#tweet-text').val());
    
    if (input.length > 140) {
      $(parent).find("output").css({"color": "red"});
    } else {
      $(parent).find("output").css({"color": ""});
    }
    
    $(parent).find("output").html(140 - input.length);


  })
});