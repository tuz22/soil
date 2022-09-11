// $("#login").click(function() {
//   setTimeout(() => {
//       diaryIndex();
//   }, 300);
// })

// 회원 일기 목록 조회
$(document).ready(function() {
  // diaryIndex();
  console.log(sessionStorage.getItem('loginMember'));
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

      // let arr = data.diaryList;
      // let txt = "";

      // alert(arr.length);

      // for(i = 0; i < arr.length; i++){
      //   for(key in arr[i]){
      //     txt += key + ":" + arr[i][key] + " ";
      //   }
      // }

      let content = document.getElementById('diaryContent');
      let tableDiary = document.getElementById('tableDiary');

      let diaryData = data.diaryList;
      let str = "";
      $.each(diaryData, function(i){
        str += "<table>"
        str += "<thead><tr>"
        str += "<td>" + diaryData[i].content + "</td><td>|</td>"
        str += "</tr></thead>"
        str += "</table>"
      });
      console.log("출력: "+data.diaryList[0].content);
      $('#tableDiary').append(str);
    },
    error: function(error){
      console.log(error);
    }
  });
};