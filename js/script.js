function btnPlus(e) {
  e.classList.toggle("change");
}

function openCategories(url){
  window.open(url,'','location=no, scrollbars=no, width = 500, height = 500');
}

function closeCategories(e) {
  let arr = new Array()
  arr = document.getElementsByTagName("button");
  let value;
  for (let i = 0; i < arr.length; i++){
    if (arr[i].click) {
      value = arr[i].value;
      break;
    }
  }
  window.close();
  window.opener.document.getElementById(e).value = value;
}

function count(type) {
  const resultElement = document.getElementById('btnFontSize');
  let fontSize = resultElement.innerText;

  if (type === 'plus') { 
    fontSize = parseInt(fontSize) + 1;
  } else if (type === 'minus') {
    fontSize = parseInt(fontSize) - 1;
  }

  resultElement.innerText = fontSize;
}

function fontStyle(type) {
  const resultElement = document.getElementById('btnFontChange');
  let fontStyle = resultElement.innerText;

    if (type === 'plus') { 
      fontStyle = "font2";
    } else if (type === 'minus') {
      fontStyle = "Gaegu";
    }
  
  resultElement.innerText = fontStyle;
}

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
    callbackUrl: "http://127.0.0.1:5500",
    loginButton: {color: "green", type: 3, height: 40}
  }
);
naverLogin.init();
console.log('a');

// get로그인
naverLogin.getLoginStatus(function (status) {
  console.log(JSON.stringify(status));
  if (status) {
    console.log('b');
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
  // console.log(JSON.stringify(data));
  // location.href = "main.html";
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

  $.ajax({
    type: "GET",
    url: "http://15.165.102.73:8090/api/auth/"+accessToken,
    secure: true,
    cors: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    success: function(result) {
      console.log(result);
      const api_key = result.response.apiToken;
      localStorage.setItem('api_key', api_key);
      location.href="main.html"
    },
    error: function(error){
      console.log(error);
    }
  })
}