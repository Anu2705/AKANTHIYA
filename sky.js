// Get DOM elements
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const totalIncomeElem = document.getElementById('total-income');
const totalExpenseElem = document.getElementById('total-expense');
const balanceElem = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');

// Initialize variables
let transactions = [];
let totalIncome = 0;
let totalExpense = 0;
let balance = 0;

// Event listener for form submission
transactionForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from reloading the page

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if (description && !isNaN(amount) && amount !== 0) {
    // Create new transaction object
    const transaction = {
      description,
      amount,
      type,
      date: new Date().toLocaleDateString(),
    };

    // Add transaction to array
    transactions.push(transaction);

    // Update totals and balance
    updateTotals(transaction);

    // Clear input fields
    descriptionInput.value = '';
    amountInput.value = '';

    // Update the transaction list
    updateTransactionList();
  } else {
    alert('Please enter a valid description and amount.');
  }
});

// Function to update the totals
function updateTotals(transaction) {
  if (transaction.type === 'income') {
    totalIncome += transaction.amount;
  } else {
    totalExpense += transaction.amount;
  }

  balance = totalIncome - totalExpense;

  totalIncomeElem.textContent = `$${totalIncome.toFixed(2)}`;
  totalExpenseElem.textContent = `$${totalExpense.toFixed(2)}`;
  balanceElem.textContent = `$${balance.toFixed(2)}`;
}

// Function to update the transaction list
function updateTransactionList() {
  // Clear existing list
  transactionList.innerHTML = '';

  // Loop through transactions and display them
  transactions.forEach((transaction) => {
    const li = document.createElement('li');
    li.classList.add(transaction.type); // Add 'income' or 'expense' class for styling

    const spanDescription = document.createElement('span');
    spanDescription.textContent = `${transaction.description} (${transaction.date})`;

    const spanAmount = document.createElement('span');
    spanAmount.textContent = `$${transaction.amount.toFixed(2)}`;

    // Append the elements to the list item
    li.appendChild(spanDescription);
    li.appendChild(spanAmount);

    // Append the list item to the transaction list
    transactionList.appendChild(li);
  });
}
