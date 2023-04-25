const api_key = localStorage.getItem('api_key');
const categoryTable = document.getElementById('settingCategory');


document.onload = categoryList();

/* 전체 카테고리 조회  */
function categoryList() {
  $.ajax({
    type: "GET",
    url: "https://13.209.129.215.nip.io/api/category/categoryList",
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
        str += `    <div class='name'>`
        str += `      <input id='categoryName_${i}' class='category-input' type='text' value=${categoryData[i].name} readonly>`
        str += `      <input id='categoryNewName_${i}' class='category-input' type='text' placeholder='-> 변경할 카테고리명을 입력하세요.'>`
        str += "    </div>"
        str += "    <div class='btn-set'>"
        // str += `      <button id=${categoryData[i].name} class='btn-update' onClick='updateCategory()'></button>`
        str += `      <button id='btnUpdate_${i}' class='btn-update' onClick='updateCategory()'></button>`
        str += `      <button id='btnUpdate_${i}' class='btn-delete' onClick='deleteCategory()'></button>`
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
    url: "https://13.209.129.215.nip.io/api/category/add",
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
      alert('카테고리 등록 성공')
      categoryInput.value=null
    },
    error: function(error) {
      console.log(error);
    }
  });
}

/* 카테고리 수정 */

function updateCategory() {
  // const updateInput = document.querySelectorAll('.off')
  const index = this.id.split('_')[1];
  const categoryName = document.getElementById(`categoryName_${index}`).value;
  const categoryNewName = document.getElementById(`categoryNewName_${index}`).value;
  const categoryData = {"newName": categoryNewName,"originName": categoryName};
  console.log(categoryData)
  $.ajax({
    type: "PATCH",
    url: "https://13.209.129.215.nip.io/api/category/update",
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
  const index = this.id.split('_')[1];
  const categoryName = document.getElementById(`categoryName_${index}`).value;
  // const categoryDelName = document.getElementById('categoryDelName').value
  const categoryData = {"name": categoryName};
  console.log(categoryData)
  $.ajax({
    type: "DELETE",
    url: "https://13.209.129.215.nip.io/api/category/remove",
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