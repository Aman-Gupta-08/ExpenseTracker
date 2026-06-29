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
// Initialize theme on load
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);
updateThemeUI(currentTheme);

// Handle form submission
actionBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const desc = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (!desc || !amount) {
        alert("Please enter both description and amount");
        return;
    }

    if (editId !== null) {
        // Edit mode: find and update transaction
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].userId === editId) {
                transactions[i].Description = desc;
                transactions[i].Amount = amount;
                transactions[i].Type = type;
            }
        }
        editId = null;
        actionBtn.textContent = "Add Transaction";
    } else {
        // Add mode: calculate next ID and append
        let newId = 1;
        if (transactions.length > 0) {
            let maxId = 0;
            for (let i = 0; i < transactions.length; i++) {
                if (transactions[i].userId > maxId) {
                    maxId = transactions[i].userId;
                }
            }
            newId = maxId + 1;
        }

        const newTx = {
            userId: newId,
            Description: desc,
            Amount: amount,
            Type: type
        };
        transactions.push(newTx);
    }

    localStorage.setItem("users", JSON.stringify(transactions));
    clearForm();
    render();
});