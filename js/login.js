
// 로딩 애니메이션 적용
window.addEventListener('load', () => {
  document.body.removeChild(document.querySelector('.loading'));
});

// 로그인 체크
// function loginCheck(){
//   let userId = document.getElementById('userId').value;
//   let userPw = document.getElementById('userPw').value;

//   let loginData = {"loginId": userId, "password": userPw};

//   console.log(loginData);
//   $.ajax({
//     type: "POST",
//     url: "http://15.165.102.73:8090/login",
//     // url: "http://localhost:8080/main.html",
//     contentType: "application/json",
//     dataType: "json",
//     data: JSON.stringify(loginData),
//     success: function(result){
//       if (result == -1){
//         alert("아이디, 비번 재확인");
//         return false;
//       } else {
//         console.log("로그인 성공");
//         location.href = "main.html";
//       }
//     },
//     error: function(error){
//       console.log(error);
//     }
//   })
// }

// function inputValueChange(){
//   var userId = document.getElementById('userId').value;
//   console.log(userId);
// }

// 로그아웃
// function logoutCheck(){
//   $.ajax({
//     type: "POST",
//     url: "http://15.165.102.73:8090/logout",
//     contentType: "application/json",
//     dataType: "json",
//     success: function(result) {
//       if(result == 1) {
//         window.location.href = "index.html";
//       } else {
//         alert("회원없음");
//       }
//     },
//     error: function(error){
//       console.log(error);
//     }
//   })
// }

// 네이버 로그인 설정
const naverLogin = new naver.LoginWithNaverId(
  {
    clientId: "LlL6YMWLhYjoND1QFApp",
    callbackUrl: "https://tuz22.github.io/soil/",
    loginButton: {color: "green", type: 3, height: 40}
  }
);
naverLogin.init();

// get로그인
naverLogin.getLoginStatus(function (status) {
  console.log(JSON.stringify(status));
  if (status) {
    const name = naverLogin.user.getName();
    const email = naverLogin.user.getEmail();

    if(name === null||name === undefined ){
      alert("이름이 필요합니다. 정보제공을 동의해주세요.");
      naverLogin.reprompt();
      if(email === null||email === undefined ){
        alert("이메일이 필요합니다. 정보제공을 동의해주세요.");
        naverLogin.reprompt();
      }
      return;
    }else{
      setLoginStatus();
    }
  }
});
console.log(naverLogin);

// set로그인
function setLoginStatus(){
  const message = document.getElementById('message');
  message.innerHTML = `
  <h3> Login 성공 </h3>
  <div>user name : ${naverLogin.user.name}</div>
  <div>user email : ${naverLogin.user.email}</div>
  `;
  console.log(JSON.stringify(naverLogin));
}

// 로그인 버튼 유무
const accessToken = naverLogin.accessToken
if (accessToken) {
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('join-caption').innerHTML = '';
  userAuth()
  alert('로그인넘어감')
}


// 네이버 로그아웃
// const naverLogout = document.getElementById('naverLogout');

// naverLogout.addEventListener('click', function(){
//   naverLogin.logout();
//   location.replace("http://127.0.0.1:5500");
// });

// 사용자 인증 요청
function userAuth(){
  let accessToken = naverLogin.accessToken.accessToken;
  alert('토큰요청중');
  $.ajax({
    type: "GET",
    url: "https://www.soildiary.net/api/auth/"+accessToken,
    secure: true,
    cors: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    success: function(result) {
      console.log(result);
      alert(result)
      const api_key = result.response.apiToken;
      localStorage.setItem('api_key', api_key);
      location.href="main.html"
    },
    error: function(error){
      console.log(error);
    }
  })
}