class footer extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
    <footer>
      <nav class="nav-categories">
        <a href="main.html" class="nav-item"><img class="menu-icon" src="img/money-box-64.png" alt="diary"></a>
        <a href="board.html" class="nav-item"><img class="menu-icon" src="img/search-60.png" alt="board"></a>
        <a href="setting.html" class="nav-item"><img class="menu-icon" src="img/settings-64.png" alt="setting"></a>
      </nav>
      <button class="btn-menu write" onclick="location.href='diary_write.html';"><img class="write-icon" src="img/edit-52.png" alt="write"></button>
    </footer>
    `
  }
}

customElements.define('custom-footer', footer);