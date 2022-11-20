function btnPlus(e) {
  e.classList.toggle("change");
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

// 글자 크기 조절
function fontSize(){
  
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