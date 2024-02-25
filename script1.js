let countElement = 0;
var remaining = 0;
var dataBase=[];
document.querySelector('#submitbtn').addEventListener('click',function(e){
    e.preventDefault();
    var expense={};
    expense.category=document.querySelector('.dropdown').value;
    let category=expense.category;
    expense.name=document.querySelector('.name').value;
    let name =  expense.name;
    expense.expenseDate=new Date(document.querySelector('.expenseDate').value);
    let expenseDate = expense.expenseDate;
    expense.amount=document.querySelector('.amount').value;
    let amount =  expense.amount;
    dataBase.push(expense);
    dataBase = dataBase.sort((e1,e2) => (e1.expenseDate > e2.expenseDate) ? 1 : (e1.expenseDate < e2.expenseDate) ? -1 : 0);
    console.log(dataBase);
    let table = document.querySelector('.expense-data tbody');
    //let tabletr = table.getElementsByTagName('tr');
    let date = new Date(expenseDate);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let inputDate = String(date.getDate()).padStart(2,'0');
    let outputDate = inputDate+'-'+month+'-'+year;
    let MonthArray=['JAN','FEB','MAR','APR','MAY','JUNE','JULY','AUG','SEP','OCT','NOV','DEC']
    if(name == ""){
        alert('Enter Name');
        return false;
    }else if(expenseDate == ""){
        alert('Enter Date');
        return false;
    }else if(amount == ""){
        alert('Enter Amount');
        return false;
    }
    var salary = document.getElementById("Salary").value;
    var expense = document.getElementById("expense").value;
    if(name && date && amount){
        table.innerHTML += '<tr><td>'+MonthArray[month-1]+'</td><td>'+category+'</td><td>'+name+'</td><td>Rs'+amount+'</td><td>'+ outputDate+'</td><td><button class="remove" onclick="this.parentNode.parentNode.remove();">X</button></td></tr>';
        document.querySelector('.name').value = "";
        document.querySelector('.expenseDate').value = "";
        document.querySelector('.amount').value ="";
        countElement++;
    }
        remaining = parseInt(remaining) + parseInt(expense);
        var difference = salary-remaining;
        document.getElementById("balance").innerHTML = "Remaining amount  "+difference;
});
document.querySelector('.searchName').addEventListener('keyup',function(e){
    let filter = document.querySelector('.searchName').value.toUpperCase();
    let expTable = document.querySelector('.expense-data');
    let expTr = expTable.getElementsByTagName('tr');
    for(let i = 0; i < expTr.length; i++){
        let expName = expTr[i].getElementsByTagName('td')[1];
        if(expName){
            let txtVal = expName.textContent || expName.innerHTML;
            if(txtVal.toUpperCase().indexOf(filter) > -1){
                expTr[i].style.display = '';
            }else{
                expTr[i].style.display = 'none';
            }
        }
    }
});
function getJson()
{
    const jsonData= JSON.stringify(dataBase,null,2);
    const blob= new Blob([jsonData],{type:'application/json'});
    const url = URL.createObjectURL(blob);
    var a= document.createElement('a');
    a.href=url;
    a.download = 'expensesheet.json';
    a.click();
}