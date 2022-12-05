/* 현재 날짜 */
function today(){
  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let date = year + '-' + month + '-' + day;
  
  document.getElementsByClassName('date')[0].innerHTML = date;
}
today();

/* 저장여부 */
document.getElementsByClassName('btn-create')[0].addEventListener('click', function(){
  let diaryCategory = document.getElementById('diaryCategory').value;
  let diaryTitle = document.getElementById('diaryTitle').value;
  let diaryPrice = document.getElementById('diaryPrice').value;
  let diaryContent = document.getElementById('diaryContent').value;
  
  // alert(diaryCategory + diaryTitle + diaryPrice + diaryContent);
  if (diaryTitle != "" && diaryPrice != "" && diaryContent != "") {
    diaryRegister();
    alert('저장했어요.');
    console.log('저장');
  } else {
    alert('빈칸을 채워주세요.');
  }
})

/* 새 일기 등록 */
function diaryRegister() {
  let diaryCategory = document.getElementById('diaryCategory').value;
  let diaryTitle = document.getElementById('diaryTitle').value;
  let diaryPrice = document.getElementById('diaryPrice').value;
  let diaryContent = document.getElementById('diaryContent').value;

  let formData = new FormData();
  let file = document.getElementById("file");

  formData.append("file", file.files[0]);
  formData.append("category_id", diaryCategory);
  formData.append("title", diaryTitle);
  formData.append("content", diaryContent);
  formData.append("price", diaryPrice);
  
  console.log('등록중!');
  let entries = formData.entries();
  for (const pair of entries) {
    console.log(pair[0] + ',' + pair[1]);
  }

  $.ajax({
    type: "POST",
    url: "http://15.165.102.73:8090/api/diaries/upload",
    // dataType: "HTML",
    // mimetype:"multipart/form-data",
    // contentType: "multipart/form-data;charset=UTF-8",
    contentType: false,
    processData: false,
    enctype: "multipart/form-data",
    data: formData,
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "api_key" : api_key
    },
    success: function(result) {
      if (result == -1) {
        alert('실패');
        return false;
      } else {
        alert('성공');
        console.log(result);
        location.href="main.html";

      }
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}

/* 업로드 파일 미리보기 */
const file = document.getElementById("file");
file.addEventListener('change', function(e){
  const targetFile = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(targetFile);

  reader.onload = function(){
    // const imgFrame = document.creatElement("div");
    const imgFrame = document.getElementById('imgFrame');
    imgFrame.style = `background : url(${reader.result}); backgroun-size : cover;`;
    imgFrame.className = 'imgFrame';
    document.getElementById('fileImg').appendChild(imgFrame);
    // e.target.value = "";

    imgFrame.addEventListener('click', function(){
      document.getElementById('fileImg').removeChild(imgFrame);
    })
  }
})