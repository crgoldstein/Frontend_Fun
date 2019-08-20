$(document).ready(function(){

  $('.smooth-menu a').bind("click", function(event) {
      event.preventDefault();
      var anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top - 0
      }, 1200);
  });



});
