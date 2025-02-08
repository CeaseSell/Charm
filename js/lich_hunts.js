document.addEventListener("DOMContentLoaded", function () {
    const lichDiv = document.getElementById("lich");

    lichDiv.innerHTML = `
        <h2 class="lich-title">Brothers</h2>
        <button class="lich-button" onclick="switchLich()">Switch to Sisters</button>
        <div id="lich-grid" class="mod-grid"></div>
    `;

    renderLichGrid();
});

function switchLich() {
    const title = document.querySelector(".lich-title");
    const grid = document.getElementById("lich-grid");

    if (title.textContent === "Brothers") {
        title.textContent = "Sisters";
        title.classList.remove("lich-title");
        title.classList.add("sister-title");
        grid.classList.remove("mod-grid");
        grid.classList.add("sister-grid");
        renderSisterGrid();
    } else {
        title.textContent = "Brothers";
        title.classList.remove("sister-title");
        title.classList.add("lich-title");
        grid.classList.remove("sister-grid");
        grid.classList.add("mod-grid");
        renderLichGrid();
    }
}

function renderLichGrid() {
    const grid = document.getElementById("lich-grid");
    grid.innerHTML = `
        <div class="mod-box"><img src="images/mod1.png"></div>
        <div class="mod-box"><img src="images/mod2.png"></div>
        <div class="mod-box"><img src="images/mod3.png"></div>
    `;
}

function renderSisterGrid() {
    const grid = document.getElementById("lich-grid");
    grid.innerHTML = `
        <select class="sister-row">
            <option>Select Mod</option>
            <option>Jahu</option>
            <option>Lohk</option>
            <option>Netra</option>
        </select>
        <select class="sister-row">
            <option>Select Mod</option>
            <option>Ris</option>
            <option>Vome</option>
            <option>Xata</option>
        </select>
        <select class="sister-row">
            <option>Select Mod</option>
            <option>Oull</option>
        </select>
    `;
}
