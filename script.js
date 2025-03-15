const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Display existing expenses on load
window.onload = function () {
    displayExpenses();
};

// Add expense
function addExpense() {
    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value);
    const category = expenseCategory.value;

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    const expense = { id: Date.now(), name, amount, category };
    expenses.push(expense);
    saveExpenses();
    displayExpenses();

    // Clear input fields
    expenseName.value = "";
    expenseAmount.value = "";
}

// Display expenses
function displayExpenses() {
    expenseList.innerHTML = "";
    let total = 0;

    expenses.forEach(expense => {
        total += expense.amount;

        const li = document.createElement('li');
        li.className = 'expense-item';

        li.innerHTML = `
            ${expense.name} - ₹${expense.amount} <span>(${expense.category})</span>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
        `;

        expenseList.appendChild(li);
    });

    totalAmount.textContent = total;
}

// Delete expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    displayExpenses();
}

// Save expenses to LocalStorage
function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
