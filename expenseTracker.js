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

// Render list and update metrics
function render() {
    listContainer.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    if (transactions.length === 0) {
        listContainer.innerHTML = '<div class="text-center text-muted py-4">No transactions found.</div>';
    }

    for (let i = 0; i < transactions.length; i++) {
        const tx = transactions[i];

        if (tx.Type === "Expense") {
            totalExpense += Number(tx.Amount);
        } else {
            totalIncome += Number(tx.Amount);
        }

        const isExpense = tx.Type === "Expense";
        const icon = isExpense ? "fa-arrow-up" : "fa-arrow-down";
        const iconClass = isExpense ? "expense-icon" : "income-icon";
        const amountSign = isExpense ? "-" : "+";
        const textClass = isExpense ? "text-danger" : "text-success";

        const item = document.createElement("div");
        item.className = "transaction-item";
        item.innerHTML = `
            <div class="transaction-left">
                <div class="transaction-icon ${iconClass}">
                    <i class="fa-solid ${icon}"></i>
                </div>
                <div class="transaction-details">
                    <h6>${tx.Description}</h6>
                    <p>${tx.Type}</p>
                </div>
            </div>
            <div class="transaction-right">
                <div class="transaction-amount ${textClass}">
                    ${amountSign} ₹${tx.Amount}
                </div>
                <div>
                    <button class="btn-action edit" onclick="updateUser(${tx.userId})" title="Edit">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-action delete" onclick="deleteUser(${tx.userId})" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        listContainer.appendChild(item);
    }

    const balance = totalIncome - totalExpense;
    incomeEl.textContent = "₹" + totalIncome;
    expenseEl.textContent = "₹" + totalExpense;

    if (balance < 0) {
        balanceEl.className = "text-danger fw-bold";
    } else {
        balanceEl.className = "text-primary fw-bold";
    }
    balanceEl.textContent = "₹" + balance;
}

function clearForm() {
    descriptionInput.value = "";
    amountInput.value = "";
    typeInput.selectedIndex = 0;
}