// 로그아웃
function logout(){
  console.log('클릭')
  localStorage.removeItem('api_key');
  if(localStorage.getItem('api_key') == null) {
    location.href="index.html"
  }
}