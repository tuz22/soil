/* 회원 일기 개별 삭제 */
function deleteDiary(diaryId) {
  $.ajax({
    type: "DELETE",
    url: "https://www.soildiary.net/api/diaries/"+ diaryId,
    dataType: "json",
    contentType: "application/json",
    cors: true,
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "api_key" : api_key
    },
    success: function() {
      console.log('삭제 성공');
      location.href = "main.html";
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}

document.getElementsByClassName('btn-delete')[0].addEventListener('click', function(){
  let diaryId = document.getElementById('diaryId').value;
  const deleteMsg = confirm('해당 글을 삭제하겠습니까?');

  if(deleteMsg == true){
    deleteDiary(diaryId);
  } else {
    alert('삭제 취소');
  }
});