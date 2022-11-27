const api_key = localStorage.getItem('api_key');
const diaryTable = document.getElementsByClassName('diary');
const diaryIds = document.getElementsByClassName('diary-id');
const addBtn = document.querySelector('.add-btn');
const numb = 0;

// 회원 일기 목록 조회  
function diaryIndex() {
console.log('목록조회!')
    console.log('numb = '+ numb)
  $.ajax({
    type: "GET",
    url: "http://15.165.102.73:8090/api/diaries/list?limit=3&offset="+ numb,
    dataType: "json",
    cors: true,
    contentType: "application/json",
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "api_key" : api_key,
    },
    success: function(data) {
      console.log(JSON.stringify(data));

      let diaryData = data.response.diaryList;
      console.log(diaryData)
      // console.log(diaryData[1].id)
      let str = "";
      $.each(diaryData, function(i){
        // str += "<table class='diary' onclick='location.href=`diary_read.html`'>"
        str += "<table class='diary'>"
        str += "  <thead>"
        str += "    <tr>"
        str += "      <td id='diaryNumb'>" + diaryData[i].category.name
        str += "        <input class='diary-id' value='" + diaryData[i].id + "'>"+ "</td><td>|</td>"
        str += "    </tr>"
        str += "  </thead>"
        str += "  <tbody>"
        str += "    <tr><td>" + diaryData[i].title + "</td></tr>"
        str += "    <tr><td>" + diaryData[i].content + "</td></tr>"
        str += "  </tbody>"
        str += "  <tfoot>"
        str += "    <tr><td>" + diaryData[i].createAt.substr(0,10) + "</td></tr>"
        str += "  </tfoot>"
        str += "</a>"
      });
      $('#tableDiary').append(str);
      numb = numb + 3;
    },
    error: function(error){
      console.log(error);
    }
  });
};

/* 회원 일기 개별 조회 */
function readDiary(diaryId) {
  $.ajax({
    type: "GET",
    url: "http://15.165.102.73:8090/api/diaries/"+ diaryId,
    dataType: "json",
    contentType: "application/json",
    cors: true,
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "api_key" : api_key
    },
    success: function(data) {
      console.log('성공');
      console.log(JSON.stringify(data));
      
      let dData = data.response;

      document.querySelector('#diaryId').value = dData.id;
      document.querySelector('#diaryCategory').innerHTML = dData.category.name;
      document.querySelector('#diaryTitle').value = dData.title;
      document.querySelector('#diaryPrice').value = dData.price;
      document.querySelector('#date').innerHTML = dData.createAt.substr(0,10);
      document.querySelector('#diaryContent').innerHTML = dData.content;
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}

setTimeout(() => {
  
  goReadDiary();
  console.log('처음에만 되나?')
  console.log(diaryTable.length);
}, 100);

function goReadDiary(){
  console.log(diaryTable.length);
  
  setTimeout(() => {
    console.log('setTimeout!')
    for (let i = 0; i < diaryTable.length; i++ ) {
    
      diaryTable[i].addEventListener('click', function(e){
        document.querySelector('.diary-index').classList.add('off');
        document.querySelector('.diary-read').classList.remove('off');
        document.querySelector('footer').style.display = 'none'
        console.log(e.currentTarget)
        let diaryIdValue = diaryIds[i].value;
        console.log("id: "+diaryIdValue);
        readDiary(diaryIdValue);
      });
    }
    console.log('반복문 다 돌았음!')

  }, 100);
}

/* 회원 일기 추가 조회 : add 버튼 */

async function clickAddBtn(){
  const addBtnPromise = new Promise(function(success){
    
    addBtn.addEventListener('click', function(){
      success(goReadDiary());
      console.log(diaryTable.length);
      console.log('됏다!');
    })
  
  });
  await addBtnPromise;
  console.log(diaryTable.length);
}
clickAddBtn();
