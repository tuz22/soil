// 회원 일기 목록 조회  
  function diaryIndex() {
  $.ajax({
    type: "GET",
    url: "http://15.165.102.73:8090/diaries/5",
    dataType: "json",
    cors: true,
    contentType: "application/json",
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    success: function(data) {
      console.log(JSON.stringify(data));

      let diaryData = data.diaryList;
      let str = "";
      $.each(diaryData, function(i){
        // str += "<table class='diary' onclick='location.href=`diary_read.html`'>"
        str += "<table class='diary'>"
        str += "  <thead>"
        str += "    <tr>"
        str += "      <td id='diaryNumb'>" + i
        str += "        <input class='diary-id' value='" + diaryData[i].diary_id + "'>"+ "</td><td>|</td>"
        str += "    </tr>"
        str += "  </thead>"
        str += "  <tbody>"
        str += "    <tr><td>" + diaryData[i].title + "</td></tr>"
        str += "    <tr><td>" + diaryData[i].content + "</td></tr>"
        str += "  </tbody>"
        str += "  <tfoot>"
        str += "    <tr><td>" + diaryData[i].date.substr(0,10) + "</td></tr>"
        str += "  </tfoot>"
        str += "</a>"
      });
      $('#tableDiary').append(str);
    },
    error: function(error){
      console.log(error);
    }
  });
};

/* 회원 일기 개별 조회 */
function readDiary(diaryId) {
  const userId = 5;
  $.ajax({
    type: "GET",
    url: "http://15.165.102.73:8090/diaries/"+ userId + "/" + diaryId,
    dataType: "json",
    contentType: "application/json",
    cors: true,
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    success: function(data) {
      console.log('성공');
      console.log(JSON.stringify(data));
      
      document.querySelector('#diaryId').value = data.diary_id;
      document.querySelector('#diaryCategory').innerHTML = data.category;
      document.querySelector('#diaryTitle').value = data.title;
      document.querySelector('#diaryPrice').value = data.price;
      document.querySelector('#date').innerHTML = data.date.substr(0,10);
      document.querySelector('#diaryContent').innerHTML = data.content;
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}

setTimeout(() => {
  let diaryTable = document.getElementsByClassName('diary');
  let diaryIds = document.getElementsByClassName('diary-id');
  
  for (let i = 0; i < diaryTable.length; i++ ) {
    
    diaryTable[i].addEventListener('click', function(){
      document.querySelector('.diary-index').classList.add('off');
      document.querySelector('.diary-read').classList.remove('off');
      let diaryIdValue = diaryIds[i].value;
      console.log("id: "+diaryIdValue);
      readDiary(diaryIdValue);
    });
    }
}, 1000);

// function kko() {
//   console.log('kko 호출');
//   Kakao.API.request({
//     url: '/v2/user/me',
//   })
//     .then(function(res) {
//       alert(JSON.stringify(res));
//     })
//     .catch(function(err) {
//       alert(
//         'failed to request user information: ' + JSON.stringify(err)
//       );
//     });
// }
