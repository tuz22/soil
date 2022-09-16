// $("#login").click(function() {
//   setTimeout(() => {
//       diaryIndex();
//   }, 300);
// })

// 회원 일기 목록 조회  
  function diaryIndex() {
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

$(document).ready(function() {
  diaryIndex();
  // console.log(sessionStorage.getItem('loginMember'));
});

/* 현재 날짜 */
let today = new Date();

let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let date = year + '-' + month + '-' + day;

document.getElementsByClassName('date')[0].innerHTML = date;

/* 새 일기 등록 */
function diaryRegister() {
  let diaryCategory = document.getElementById('diaryCategory').value;
  let diaryTitle = document.getElementById('diaryTitle').value;
  let diaryPrice = document.getElementById('diaryPrice').value;
  let diaryContent = document.getElementById('diaryContent').value;
  
  let userId = 'memberA';
  
  let newDiary = {"member_id": userId, "category_id": diaryCategory, "title": diaryTitle, "content": diaryContent, "price": diaryPrice};

  $.ajax({
    type: "POST",
    url: "http://15.165.102.73:8090/diaries",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(newDiary),
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    success: function(result) {
      if (result == -1) {
        alert('실패');
        return false;
      } else {
        alert('성공');
        alert(msg);
      }
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}

document.getElementsByClassName('history-back')[0].addEventListener('click', function(){
  let diaryCategory = document.getElementById('diaryCategory').value;
  let diaryTitle = document.getElementById('diaryTitle').value;
  let diaryPrice = document.getElementById('diaryPrice').value;
  let diaryContent = document.getElementById('diaryContent').value;
  
  alert(diaryCategory + diaryTitle + diaryPrice + diaryContent);
  if (diaryTitle != "" && diaryPrice != "" && diaryContent != "") {
    alert('일기 저장할거임');
    diaryRegister();
  } else {
    alert('일기 저장안함');
  }
})