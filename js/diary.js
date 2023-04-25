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
    url: "https://13.209.129.215.nip.io/api/diaries/list?limit="+limit+"&offset="+ numb,
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
      console.log(diaryData[0])
      let str = "";
      $.each(diaryData, function(i){
        str += "<table class='diary' onclick='goReadDiary()'>"
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
      clickAddBtn();
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
    url: "https://13.209.129.215.nip.io/api/diaries/"+ diaryId,
    dataType: "json",
    contentType: "application/json",
    cors: true,
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "api_key" : api_key
    },
    success: function(data) {
      // console.log(JSON.stringify(data));
      
      let dData = data.response;

      document.querySelector('#diaryId').value = dData.id;
      document.querySelectorAll('.list')[0].value = dData.category.id;
      document.querySelector('#diaryCategory').innerHTML = dData.category.name;
      document.querySelector('#diaryTitle').value = dData.title;
      document.querySelector('#diaryPrice').value = dData.price;
      document.querySelector('#date').innerHTML = dData.createAt.substr(0,10);
      document.querySelector('#diaryContent').innerHTML = dData.content;
      document.querySelector('#getImg').src = dData.photoUrl;
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}

// setTimeout(() => {
//   goReadDiary();
// }, 100);

function goReadDiary(){
  
  setTimeout(() => {
    // console.log('setTimeout!')
    for (let i = 0; i < diaryTable.length; i++ ) {
    
      diaryTable[i].addEventListener('click', function(e){
        document.querySelector('.diary-index').classList.add('off');
        document.querySelector('.diary-read').classList.remove('off');
        document.querySelector('custom-footer').style.display = 'none'
        let diaryIdValue = diaryIds[i].value;
        readDiary(diaryIdValue);
      });
    }

  }, 100);
}

/* 뒤로가기 화살표 */
// const back = document.querySelector('.read-history-back');
// back.addEventListener('click', function(){
//   const searchForm = document.querySelector('.search-form');
//   const diaryRead = document.querySelector('.diary-read');
//   const diaryIndex = document.querySelector('.diary-index');
//   const writeBtn = document.querySelector('.btn-menu.write');
//   const footer = document.querySelector('custom-footer');

//   if (searchCountBox.innerHTML !== ''){
//     diaryRead.classList.add('off');
//     searchForm.classList.remove('off');
//   } else {
//     diaryRead.classList.add('off');
//     diaryIndex.classList.remove('off');
//     writeBtn.classList.remove('off');
//     footer.style.display = 'flex'
//   }
// })

/* 회원 일기 추가 조회 : add 버튼 */

async function clickAddBtn(){
  const addBtnPromise = new Promise(function(success){
    
    addBtn.addEventListener('click', function(){
      success(goReadDiary());
    })
  
  });
  await addBtnPromise;
}

/* 스크롤시 add 버튼 on */
function onAddBtn(){
  const addBtn = document.querySelector('.add-btn');
  let acc = 0.1;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  window.addEventListener('scroll', function(){

    delayedYOffset = delayedYOffset + (pageYOffset - delayedYOffset) * acc;

    if (!rafState) {
      rafId = requestAnimationFrame(onAdd);
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
