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
    alert('빈칸을 채워주세요.');
  }
})

/* 새 일기 등록 */
function diaryRegister() {
  let diaryCategory = document.getElementById('diaryCategory').value;
  let diaryTitle = document.getElementById('diaryTitle').value;
  let diaryPrice = document.getElementById('diaryPrice').value;
  let diaryContent = document.getElementById('diaryContent').value;

  let newDiary = {"category_id": diaryCategory, "title": diaryTitle, "content": diaryContent, "price": diaryPrice};
  console.log('등록중!');
  $.ajax({
    type: "POST",
    url: "http://15.165.102.73:8090/api/diaries/upload",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(newDiary),
    secure: true,
    headers: {
      // "X-Requested-With": "XMLHttpRequest",
      "api_key" : api_key
    },
    success: function(result) {
      if (result == -1) {
        alert('실패');
        return false;
      } else {
        alert('성공');
        console.log(result);

      }
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}