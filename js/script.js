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