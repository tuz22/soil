// $("#login").click(function() {
//   setTimeout(() => {
//       diaryIndex();
//   }, 300);
// })

// 회원 일기 목록 조회
$(document).ready(function() {
  diaryIndex();
  // console.log(sessionStorage.getItem('loginMember'));
});
  
  function diaryIndex(){
  $.ajax({
    type: "GET",
    url: "http://15.165.102.73:8090/diaries/5",
    dataType: "json",
    cors: true,
    contentType: "application/json",
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    success: function(data) {
      console.log(JSON.stringify(data));

      let diaryData = data.diaryList;
      let str = "";

      $.each(diaryData, function(i){
        str += "<table class='diary'>"
        str += "  <thead>"
        str += "    <tr><td>" + i + "</td><td>|</td></tr>"
        str += "  </thead>"
        str += "  <tbody>"
        str += "    <tr><td>" + diaryData[i].title + "</td></tr>"
        str += "    <tr><td>" + diaryData[i].content + "</td></tr>"
        str += "  </tbody>"
        str += "  <tfoot>"
        str += "    <tr><td>" + diaryData[i].date.substr(0,10) + "</td></tr>"
        str += "  </tfoot>"
        str += "</table>"
      });
      $('#tableDiary').append(str);
    },
    error: function(error){
      console.log(error);
    }
  });
};