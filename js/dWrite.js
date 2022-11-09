/* 현재 날짜 */
function today(){
  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let date = year + '-' + month + '-' + day;
  
  document.getElementsByClassName('date')[0].innerHTML = date;
}
today();

/* 저장여부 */
document.getElementsByClassName('btn-create')[0].addEventListener('click', function(){
  let diaryCategory = document.getElementById('diaryCategory').value;
  let diaryTitle = document.getElementById('diaryTitle').value;
  let diaryPrice = document.getElementById('diaryPrice').value;
  let diaryContent = document.getElementById('diaryContent').value;
  
  // alert(diaryCategory + diaryTitle + diaryPrice + diaryContent);
  if (diaryTitle != "" && diaryPrice != "" && diaryContent != "") {
    alert('저장했어요.');
    diaryRegister();
    location.href = "main.html";
  } else {
    alert('일기 저장안함');
  }
})

/* 새 일기 등록 */
function diaryRegister() {
  let diaryCategory = document.getElementById('diaryCategory').value;
  let diaryTitle = document.getElementById('diaryTitle').value;
  let diaryPrice = document.getElementById('diaryPrice').value;
  let diaryContent = document.getElementById('diaryContent').value;
  
  let userId = 5;
  
  let newDiary = {"member_id": userId, "category_id": diaryCategory, "title": diaryTitle, "content": diaryContent, "price": diaryPrice};

  $.ajax({
    type: "POST",
    url: "http://15.165.102.73:8090/diaries",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(newDiary),
    secure: true,
    headers: {
      // "X-Requested-With": "XMLHttpRequest",
      "api_key" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoic29pbF9zZXJ2ZXIiLCJuYW1lIjoi67CV7Iq57KeAIiwiaWF0IjoxNjY3OTY5NTc1LCJ1c2VyS2V5IjoyLCJlbWFpbCI6InA0MTdzakBuYXZlci5jb20ifQ.QiB5fx4P2fjtkZrGWf1NXAbiW1lknUr63DzZZo_j8SYSM3Df7KhmMTWGJ-MOXZExdnx78UQQAgRm3KATx-WbRw"
    },
    success: function(result) {
      if (result == -1) {
        alert('실패');
        return false;
      } else {
        alert('성공');

      }
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}