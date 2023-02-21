const api_key = localStorage.getItem('api_key');

/* 전체 카테고리 조회  */
function categoryList() {

  $.ajax({
    type: "GET",
    url: "https://www.soildiary.net/api/category/categoryList",
    dataType: "json",
    cors: true,
    contentType: "application/json",
    secure: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "api_key" : api_key,
    },
    success: function(data) {
      console.log(data)
      console.log(JSON.stringify(data))
    },
    error: function(error) {
      console.log(error);
    }
  });
}