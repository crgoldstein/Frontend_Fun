
function AddLine(words){
  var arr= words.split(' ');

  var string="<br/> <div class='content-line'><div class='content-word color-primary'><span>&nbsp</span>";

  var colorCount =1;
  for(var i=0; i<arr.length; i++){
    for(var let=0; let<arr[i].length; let++){
        if(colorCount>5){
          colorCount=1;
        }
        var ex="<span class='color color-"+colorCount+"'>"+arr[i][let]+"</span>";

        string+=ex;
        colorCount=colorCount+1;
    }
    string+="<span>&nbsp</span></div>";
    if(i !== arr.length -1){
      string+="<div class='content-word color-primary'><span>&nbsp</span>";
    }
    else{
      string+="</div>";
    }

  }

  return string;
}


$(document).ready(function(){
  var words ="I use cookies";

  $("#section1 .sectionContent").append(AddLine(words));
  $("#section1 .sectionContent").append(AddLine("and eat cookies"));
  $("#section1 .sectionContent").append(AddLine("(and sell drugs)"));
  $("#section1 .sectionContent").append(AddLine("CLICK BELOW!!"));

  typeWriter();




  $('.smooth-menu a').bind("click", function(event) {
      event.preventDefault();
      var anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top - 0
      }, 1200);
  });

});



var i = 0;
function typeWriter() {
  var speed = 200;
  var txt ='Lorem ipsum dummy text blabla.';
  if (i < txt.length) {
    document.getElementById("typeWritter").innerHTML += txt.charAt(i);
    i= i+1
    setTimeout(typeWriter, speed);
  }
}
