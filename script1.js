let countElement = 0;
let remaining = 0;
let dataBase = [];

// Load data from local storage if available
if (localStorage.getItem('dataBase')) {
    dataBase = JSON.parse(localStorage.getItem('dataBase'));
}

document.querySelector('#submitbtn').addEventListener('click', function (e) {
    e.preventDefault();
    let expense = {};
    expense.category = document.querySelector('.dropdown').value;
    let category = expense.category;
    expense.name = document.querySelector('.name').value;
    let name = expense.name;
    expense.expenseDate = new Date(document.querySelector('.expenseDate').value);
    let expenseDate = expense.expenseDate;
    expense.amount = document.querySelector('.amount').value;
    let amount = expense.amount;
    dataBase.push(expense);
    // Sort the dataBase array
    dataBase.sort((e1, e2) => e1.expenseDate - e2.expenseDate);
    // Save dataBase to local storage
    localStorage.setItem('dataBase', JSON.stringify(dataBase));
    updateTable();
});

function updateTable() {
    let table = document.querySelector('.expense-data tbody');
    table.innerHTML = '';
    dataBase.forEach((expense, index) => {
        let date = new Date(expense.expenseDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let inputDate = String(date.getDate()).padStart(2, '0');
        let outputDate = inputDate + '-' + month + '-' + year;
        let MonthArray = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        table.innerHTML += '<tr><td>' + MonthArray[month - 1] + '</td><td>' + expense.category + '</td><td>' + expense.name + '</td><td>Rs ' + expense.amount + '</td><td>' + outputDate + '</td><td><button class="remove" onclick="removeExpense(' + index + ');">X</button></td></tr>';
    });
}

// Function to remove expense
function removeExpense(index) {
    dataBase.splice(index, 1);
    localStorage.setItem('dataBase', JSON.stringify(dataBase));
    updateTable();
}

// Function to handle search functionality
document.querySelector('.searchName').addEventListener('keyup', function (e) {
    let filter = document.querySelector('.searchName').value.toUpperCase();
    let expTable = document.querySelector('.expense-data');
    let expTr = expTable.getElementsByTagName('tr');
    for (let i = 0; i < expTr.length; i++) {
        let expName = expTr[i].getElementsByTagName('td')[1];
        if (expName) {
            let txtVal = expName.textContent || expName.innerHTML;
            if (txtVal.toUpperCase().indexOf(filter) > -1) {
                expTr[i].style.display = '';
            } else {
                expTr[i].style.display = 'none';
            }
        }
    }
});

// Function to export JSON data
function getJson() {
    const jsonData = JSON.stringify(dataBase, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'expensesheet.json';
    a.click();
}

updateTable();
