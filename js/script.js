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

// 쿠키를 설정 또는 수정
// function set_cookie(cookie_info) {
//   if (chk_cookie_max_size_over(cookie_info)) {
//       cookie_info['key1'] = [];
//       cookie_info['key2'] = [];
//   }

//   var now_hostname = window.location.hostname;

//   if (cookie_info['key1'].length) {
//       document.cookie = "key1=" + encodeURI(JSON.stringify(cookie_info['key1'])) + "; path=/; domain=" + now_hostname;
//       document.cookie = "key2=" + encodeURI(JSON.stringify(cookie_info['key2'])) + "; path=/; domain=" + now_hostname;
//   } else {
//       document.cookie = "key1=" + encodeURI(JSON.stringify(cookie_info['key1'])) + "; path=/; domain=" + now_hostname + "; max-age=0";
//       document.cookie = "key2=" + encodeURI(JSON.stringify(cookie_info['key2'])) + "; path=/; domain=" + now_hostname + "; max-age=0";
//   }
// }

// 로그인 체크
function loginCheck(){
  let userId = document.getElementById('userId').value;
  let userPw = document.getElementById('userPw').value;

  let loginData = {"userId": userId, "userPw": userPw};
  console.log(loginData);
  $.ajax({
    type: "POST",
    url: "http://15.165.102.73:8090/login",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(loginData),
    success: function(result){
      if (result == -1){
        alert("아이디, 비번 재확인");
        return false;
      } else {
        window.location.href = "main.html";
      }
    },
    error: function(error){
      console.log(error);
    }
  })
}

function inputValueChange(){
  var userId = document.getElementById('userId').value;
  console.log(userId);
}