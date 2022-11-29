/* 일기 검색 */
function searchDiary() {
  $.ajax({
    type: "GET",
    url: "http://15.165.102.73:8090/api/diaries/search?keyword="+ keyword,
    dataType: "json",
    contentType: "application/json",
    cors: true,
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    success: function(data) {
      console.log('성공');
      console.log(JSON.stringify(data));
    },
    error: function(error) {
      console.log(error);
      alert('에러!');
    }
  })
}

function searchOn() {
  const diaryIndex = document.querySelector('.diary-index');
  const searchBtn = document.getElementById('searchBtn');
  const searchForm = document.querySelector('.search-form');
  const backBtn = document.querySelector('.search-back');

  searchBtn.addEventListener('click', function(){
    diaryIndex.classList.add('off');
    searchForm.classList.remove('off');
  })

  backBtn.addEventListener('click', function(){
    diaryIndex.classList.remove('off');
    searchForm.classList.add('off');
  })
}

searchOn()
