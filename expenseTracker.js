let transactions = JSON.parse(localStorage.getItem("users")) || [];
let editId = null;

// DOM Elements
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("TransactionType");
const actionBtn = document.getElementById("btnn");
const listContainer = document.getElementById("transactionList");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const themeBtn = document.getElementById("themeToggle");

// Light and Dark Mode toggle logic
themeBtn.addEventListener("click", function () {
    let theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    updateThemeUI(theme);
});

function updateThemeUI(theme) {
    if (theme === "dark") {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>';
    }
}