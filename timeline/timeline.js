$(document).ready(function() {

         $(".TA").click(function() {
             $("#Empolyment .details").html("Teaching");
         });

         $(".mdg").click(function() {
             $("#Empolyment .details").html("Mountain Data group");
         });

         $(".TP").click(function() {
             $("#Empolyment .details").html("Travelport");
         });



// #Education
         $(".csu").click(function() {
             $("#Education .details").html("School at CSU");
         });
         $(".UCT").click(function() {
             $("#Education .details").html("Semester abaord at UCT");
         });

       var n=80;
       var m=60;
       $("#Education .content").each(function(){

          if (m>70){
              n=70;
              $(this).css('width', m+'%');
              m=m-10;
            }
          else {
            if(n>99){
              m=90;
            }
              $(this).css('width', n+'%');
              n=n+10;
          }

       });

       $("#Empolyment .content").each(function(){
          if (m>70){
              n=70;
              $(this).css('width', m+'%');
              m=m-10;
            }
          else {
            if(n>99){
              m=90;
            }
              $(this).css('width', n+'%');
              n=n+10;
          }

       });

       $("#Empolyment .null").css('width', '50%');

});
