/* 회원탈퇴 */
function removeUser() {
  const api_key = localStorage.getItem('api_key')
  $.ajax({
    type: "DELETE",
    url: "https://www.soildiary.net/api/users/remove",
    dataType: "json",
    contentType: "application/json",
    cors: true,
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "api_key" : api_key
    },
    success: function() {
      console.log('회원 탈퇴 성공');
      location.href = "index.html";
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}

document.getElementById('removeUser').addEventListener('click', function(){
  console.log('클릭되나')
  const deleteMsg = confirm('해당 앱을 탈퇴하시겠습니까?');

  if(deleteMsg == true){
    removeUser();
  } else {
    alert('탈퇴 취소');
  }
});