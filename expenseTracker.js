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
