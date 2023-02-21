// function btnPlus(e) {
//   e.classList.toggle("change");
// }

// for (let i= 0; i <2; i++) {
  document.getElementsByClassName('set-darkmode')[0].addEventListener('click', function(e){
    const btn = e.currentTarget;
    if (btn.innerHTML == 'OFF') {
      btn.innerHTML = 'ON'
    } else {
      btn.innerHTML = 'OFF'
    }
    btn.classList.toggle('set-btn-active')
  })
// }

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

// 글자 크기 조절
function fontSize(){
  
}

function count(type) {
  const resultElement = document.getElementById('btnFontSize');
  let fontSize = resultElement.innerText;

  if (type === 'plus') { 
    fontSize = parseInt(fontSize) + 4;
  } else if (type === 'minus') {
    fontSize = parseInt(fontSize) - 4;
  }

  resultElement.innerText = fontSize;
}

// 카테고리 설정으로 이동
function goCategories(){
  location.href="setting_categories.html";
}