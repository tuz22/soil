/* 뒤로가기 및 저장여부 */
document.getElementsByClassName('write-history-back')[0].addEventListener('click', function(){
  let diaryCategory = document.getElementById('diaryCategory').value;
  let diaryTitle = document.getElementById('diaryTitle').value;
  let diaryPrice = document.getElementById('diaryPrice').value;
  let diaryContent = document.getElementById('diaryContent').value;
  
  // alert(diaryCategory + diaryTitle + diaryPrice + diaryContent);
  if (diaryTitle != "" && diaryPrice != "" && diaryContent != "") {
    alert('일기 저장할거임');
    diaryRegister();
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
      "X-Requested-With": "XMLHttpRequest"
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