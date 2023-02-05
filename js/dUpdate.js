/* 회원 일기 수정 */
function updateDiary(diaryId) {
  const diaryCategory = 1;
  let diaryTitle = document.querySelector('#diaryTitle').value;
  let diaryPrice = document.querySelector('#diaryPrice').value;
  let diaryContent = document.querySelector('#diaryContent').value;
  let diaryData = {"categoryId":diaryCategory, "title": diaryTitle , "price": diaryPrice, "content": diaryContent};

  $.ajax({
    type: "PATCH",
    url: "https://www.soildiary.net/api/diaries/"+ diaryId,
    dataType: "json",
    data: JSON.stringify(diaryData),
    contentType: "application/json",
    cors: true,
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      // "api_key" : api_key
    },
    success: function(data) {
      location.href="main.html";
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}

/* 수정여부 */
document.getElementsByClassName('btn-update')[0].addEventListener('click', function(){
  const diaryId = document.getElementById('diaryId').value;
  let diaryTitle = document.getElementById('diaryTitle').value;
  let diaryPrice = document.getElementById('diaryPrice').value;
  let diaryContent = document.getElementById('diaryContent').value;
  console.log("아이디"+diaryId);
  if (diaryTitle != "" && diaryPrice != "" && diaryContent != "") {
    alert('수정이 완료됐어요.');
    updateDiary(diaryId);
  } else {
    alert('수정이 취소됐어요.');
  }
})