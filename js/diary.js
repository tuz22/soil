const api_key = localStorage.getItem('api_key');
const diaryTable = document.getElementsByClassName('diary');
const diaryIds = document.getElementsByClassName('diary-id');
const addBtn = document.querySelector('.add-btn');
let numb = 0;
let limit = 10;

// 회원 일기 목록 조회  
function diaryIndex() {
console.log('목록조회!')
    console.log('numb = '+ numb)
  $.ajax({
    type: "GET",
    url: "http://15.165.102.73:8090/api/diaries/list?limit="+limit+"&offset="+ numb,
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
      numb = numb + limit;
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
        document.querySelector('custom-footer').style.display = 'none'
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

/* 스크롤시 add 버튼 on */
function onAddBtn(){
  const addBtn = document.querySelector('.add-btn');
  let acc = 0.1;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  window.addEventListener('scroll', function(){
    // console.log('scroll.....')

    delayedYOffset = delayedYOffset + (pageYOffset - delayedYOffset) * acc;
    console.log('delayedYOffset'+delayedYOffset)
    console.log('pageYOffset'+pageYOffset)

    if (!rafState) {
      rafId = requestAnimationFrame(onAdd);
      // addBtn.classList.remove('off');
      rafState = true;
    }
  });

  function onAdd(){
    delayedYOffset = delayedYOffset + (pageYOffset - delayedYOffset) * acc;
    addBtn.style.height = `${delayedYOffset}px`;

    rafId = requestAnimationFrame(onAdd);

    // ofAdd
    if (Math.abs(pageYOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      // addBtn.classList.add('off');
      rafState = false;
    }

    if ((pageYOffset - delayedYOffset) < 0) {
      addBtn.classList.add('off');
    } else {
      addBtn.classList.remove('off');
    }
  }
}
onAddBtn();
