const api_key = localStorage.getItem('api_key');
const categoryTable = document.getElementById('settingCategory');


document.onload = categoryList();

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
      const categoryData = data.response.categoryList
      let str = "";
      $.each(categoryData, function(i) {
        str += "<tr>"
        str += "  <td class='category-box'>"
        str += `    <div class='name'>${categoryData[i].name}</div>`
        str += "    <div class='btn-set'>"
        str += `      <button id=${categoryData[i].name} class='btn-update'></button>`
        str += `      <button id=${categoryData[i].name} class='btn-delete'></button>`
        str += "    </div>"
        str += "  </td>"
        str += "</tr>"
      });
      $('#settingCategory').append(str)
    },
    error: function(error) {
      console.log(error);
    }
  });
}


/* 카테고리 등록 */
function createCategory() {
  const categoryInput = document.getElementById('categoryInput').value
  const categoryName = {"name" : categoryInput};
  console.log(categoryInput)
  console.log(categoryName)

  $.ajax({
    type: "POST",
    url: "https://www.soildiary.net/api/category/add",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(categoryName),
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

/* 카테고리 수정 */
function updateCategory() {
  const categoryName = document.getElementById('categoryName').value
  const categoryNewName = document.getElementById('categoryNewName').value
  const categoryData = {"newName": categoryNewName,"originName": categoryName};

  $.ajax({
    type: "PATCH",
    url: "https://www.soildiary.net/api/category/update",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(categoryData),
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

/* 카테고리 삭제 */
function deleteCategory() {
  const categoryDelete = document.getElementById('categoryDelete').value
  const categoryData = {"name": categoryDelete};

  $.ajax({
    type: "DELETE",
    url: "https://www.soildiary.net/api/category/remove",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(categoryData),
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
