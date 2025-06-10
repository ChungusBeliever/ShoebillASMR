const clickable = document.getElementById("main-clicker")
const display = document.getElementById("cash-display")
let cashPerClick = 1
let cash = 0

function increaseCash() {
    cash += cashPerClick;
    display.textContent = "shoe bills: " + cash
}

clickable.addEventListener("click", increaseCash)