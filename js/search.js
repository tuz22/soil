
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('change', function(){
  console.log('서치클릭!')
  console.log('키워드:'+searchInput.value);
})

/* 일기 검색 */
function searchDiary() {
  // 검색어
  const keyword = document.getElementById('searchInput').value;
  if (keyword !=='') {
    console.log(keyword)
    $.ajax({
      type: "GET",
      url: "http://15.165.102.73:8090/api/diaries/search?keyword="+ keyword,
      dataType: "json",
      contentType: "application/json",
      cors: true,
      secure: true,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "api_key" : api_key,
      },
      success: function(data) {
        console.log('성공');
        let str = "";
        // let searchCount = "검색결과 : <span id='searchCount'>" + data.response.count + "</span>건";
        // let searchCount = "검색결과 : " + data.response.count + "건"
        let searchCount = data.response.count
        $('#searchResult').empty();
        $('#searchCountBox').empty();
        
        console.log(JSON.stringify(data));
        if (searchCount !== 0){
          let diaryData = data.response.diaryList;
          console.log(diaryData)
          console.log('검색결과 : '+ data.response.count+'건')
          console.log('카테고리:'+diaryData[0].category.name)
          console.log('확인용:'+diaryData[0].title)
          $.each(diaryData, function(i){
            // str += "<table class='diary' onclick='location.href=`diary_read.html`'>"
            str += "<table class='diary' onclick='goSearchDiary()'>"
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
          $('#searchResult').append(str);
          $('#searchCountBox').append(searchCount);
        } else {
          $('#searchCountBox').append(searchCount);
        }
      },
      error: function(error) {
        console.log(error);
        alert('에러!');
      }
    })
  } 
}


/* 검색페이지 전환 */
function searchOn() {
  const diaryIndex = document.querySelector('.diary-index');
  const searchBtn = document.getElementById('searchBtn');
  const searchForm = document.querySelector('.search-form');
  const backBtn = document.querySelector('.search-back');
  const addBtn = document.querySelector('.add-btn-box');
  const writeBtn = document.querySelector('.btn-menu.write');

  searchBtn.addEventListener('click', function(){
    diaryIndex.classList.add('off');
    addBtn.classList.add('off');
    writeBtn.classList.add('off');
    searchForm.classList.remove('off');
  })
  
  backBtn.addEventListener('click', function(){
    diaryIndex.classList.remove('off');
    addBtn.classList.remove('off');
    searchForm.classList.add('off');
  })
}
searchOn()

/* 검색 결과 diary 조회 */
function goSearchDiary(){
  const diaryRead = document.querySelector('.diary-read')
  const searchForm = document.querySelector('.search-form')
  for (let i = 0; i < diaryTable.length; i++ ) {
    diaryTable[i].addEventListener('click', function(e){
      searchForm.classList.add('off');
      diaryRead.classList.remove('off');
      console.log(e.currentTarget)
      let diaryIdValue = diaryIds[i].value;
      console.log("id: "+diaryIdValue);
      readDiary(diaryIdValue);
    });
  }

}
