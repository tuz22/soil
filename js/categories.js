const api_key = localStorage.getItem('api_key');

/* 전체 카테고리 조회  */
function categoryList() {

  $.ajax({
    type: "GET",
    url: "https://www.soildiary.net/api/category/categoryList",
    dataType: "json",
    contentType: "application/json",
    cors: true,
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


/* 카테고리 등록 */
function createCategory() {
  const categoryInput = document.getElementById('categoryInput').value
  console.log(categoryInput)
  const categoryName = {"categoryName" : categoryInput};

  $.ajax({
    type: "POST",
    url: "https://www.soildiary.net/api/category/add",
    dataType: "json",
    contentType: "application/json",
    data: categoryName,
    cors: true,
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
