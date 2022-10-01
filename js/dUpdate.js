/* 회원 일기 수정 */
function updateDiary(diaryId) {
  const diaryCategory = 1;
  let diaryTitle = document.querySelector('#diaryTitle').value;
  let diaryPrice = document.querySelector('#diaryPrice').value;
  let diaryContent = document.querySelector('#diaryContent').value;
  let diaryData = {"category_id":diaryCategory, "title": diaryTitle , "price": diaryPrice, "content": diaryContent};

  console.log(diaryData);

  $.ajax({
    type: "PATCH",
    url: "http://15.165.102.73:8090/diaries/"+ diaryId,
    dataType: "json",
    data: JSON.stringify(diaryData),
    contentType: "application/json",
    cors: true,
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    success: function(data) {
      console.log('수정 성공');
      console.log(JSON.stringify(data));
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
    location.href = "main.html";
  } else {
    alert('수정이 취소됐어요.');
  }
})

/* 회원 일기 삭제 */
function deleteDiary(diaryId) {
  $.ajax({
    type: "DELETE",
    url: "http://15.165.102.73:8090/diaries/"+ diaryId,
    dataType: "json",
    contentType: "application/json",
    cors: true,
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    success: function() {
      console.log('삭제 성공');
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}

document.getElementsByClassName('btn-delete')[0].addEventListener('click', function(){
  let diaryId = document.getElementById('diaryId').value;
  console.log("아이디"+diaryId);
  const deleteMsg = confirm('해당 글을 삭제하겠습니까?');

  if(deleteMsg == true){
    alert('삭제');
    deleteDiary(diaryId);
    location.href = "main.html";
  } else {
    alert('삭제 취소');
  }
});