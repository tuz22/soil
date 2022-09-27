Kakao.init('f5d2c043a7d9eb0f04eece4804a9d471');
console.log(Kakao.isInitialized());

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
function loginCheck(){
  let userId = document.getElementById('userId').value;
  let userPw = document.getElementById('userPw').value;

  let loginData = {"loginId": userId, "password": userPw};

  console.log(loginData);
  $.ajax({
    type: "POST",
    url: "http://15.165.102.73:8090/login",
    // url: "http://localhost:8080/main.html",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(loginData),
    success: function(result){
      if (result == -1){
        alert("아이디, 비번 재확인");
        return false;
      } else {
        console.log("로그인 성공");
        window.location.href = "main.html";
      }
    },
    error: function(error){
      console.log(error);
    }
  })
//   Kakao.Auth.authorize({
//     redirectUri: 'http://localhost:5500/oauth/kakao',
// });
}

function inputValueChange(){
  var userId = document.getElementById('userId').value;
  console.log(userId);
}

// 로그아웃
function logoutCheck(){
  $.ajax({
    type: "POST",
    url: "http://15.165.102.73:8090/logout",
    contentType: "application/json",
    dataType: "json",
    success: function(result) {
      if(result == 1) {
        window.location.href = "index.html";
      } else {
        alert("회원없음");
      }
    },
    error: function(error){
      console.log(error);
    }
  })
}
