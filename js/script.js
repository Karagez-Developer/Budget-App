// Берем все необходимые элементы 

const inpBudget = document.querySelector('#input-budget');
const budgetBtn = document.querySelector('.budget-calc');
const inpSpendTitle = document.querySelector('#input-expense-title');
const inpSpendAmount = document.querySelector('#input-expense-amount');
const spendBtn = document.querySelector('.add-expense');
const budgetMoney = document.querySelector('#budget-money')
const expensesMoney = document.querySelector('#expenses-money');
const balanceMoney = document.querySelector('#balance-money');

const expenseContainer = document.querySelector('.show-expense-content-main');

const emptyValue1 = document.querySelector('.empty-value-1');
const emptyValue2 = document.querySelector('.empty-value-2');

// Берем значения, которые мы будем изменять

let budgetNum = +(budgetMoney.textContent.slice(2));
let expensesNum = +(expensesMoney.textContent.slice(2));
let balanceNum = +(balanceMoney.textContent.slice(2));

// Индекс атрибута

let elIndex = 1;

// Нажатие на кнопку расчета бюджета

budgetBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (inpBudget.value.trim() == 0 || +(inpBudget.value) < 0 ) {
        emptyValue1.classList.add('active-empty-value');
        setTimeout( () => {
            emptyValue1.classList.remove('active-empty-value');
        }, 3000)
    }
    else {
        budgetNum = +(inpBudget.value);
        balanceNum = +(inpBudget.value);

        budgetMoney.textContent = `$ ${budgetNum}`; 
        balanceMoney.textContent = `$ ${balanceNum}`;

        if (balanceNum > 0) {
            balanceMoney.style.color = '#317b22';
        }
        else if (balanceNum < 0) {
            balanceMoney.style.color = '#b80c09';
        }
        else {
            balanceMoney.style.color = '#000';
        }

    }



    inpBudget.value = '';
});

let itemIndex = 0;


spendBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (inpSpendTitle.value.trim() == 0 || (+(inpSpendAmount.value) < 0) || inpSpendAmount.value.trim() == 0 ) {
        emptyValue2.classList.add('active-empty-value');
        setTimeout( () => {
            emptyValue2.classList.remove('active-empty-value');
        }, 3000)
    }
    else {
        expensesNum += +(inpSpendAmount.value);
        balanceNum -= expensesNum;
        expensesMoney.textContent = `$ ${expensesNum}`;
        balanceMoney.textContent = `$ ${balanceNum}`;
        if (balanceNum > 0) {
            balanceMoney.style.color = '#317b22';
        }
        else if (balanceNum < 0) {
            balanceMoney.style.color = '#b80c09';
        }
        else {
            balanceMoney.style.color = '#000';
        }

        expenseContainer.innerHTML += `
        <div class="show-item-general" data-index="${elIndex}">
            <div class="show-expense-content">
                <div class="show-expense-item title" data-index="${elIndex}">-${inpSpendTitle.value}</div>
            </div>
            <div class="show-expense-content">
                <div class="show-expense-item total" data-index="${elIndex}">-${inpSpendAmount.value}</div>
            </div>
            <div class="show-expense-content">
                <div class="show-expense-item">
                    <div class="icons-row">
                        <div class="trash-block" data-index="${elIndex}" onclick="trashFunc(${elIndex})"><i class="fa fa-trash fa-2" aria-hidden="true"></i></div>
                        <div class="edit-block" data-index="${elIndex}" onclick="editFunc(${elIndex})"><i class="fa fa-pencil-square-o fa-2" aria-hidden="true"></i></div>
                    </div>
                </div>
            </div>
        </div>
        `;

        const showItems = document.querySelectorAll('.show-expense-item');

        showItems.forEach( item => {
            item.style.color = '#b80c09';
        } )   
        
        
        inpSpendTitle.value = '';
        inpSpendAmount.value = '';

        elIndex++;
    }
})


//Функция удаления

function trashFunc(index) {

    balanceNum += expensesNum;
    balanceMoney.textContent = `$ ${balanceNum}`;
    
    let totals = document.querySelectorAll('.total');
    totals.forEach( (total) => {
        if (total.dataset.index === String(index)) {
            expensesNum -= +(total.textContent.slice(1));
            expensesMoney.textContent = `$ ${expensesNum}`;
            inpSpendAmount.value = total.textContent.slice(1);
        }
    })

    let titles = document.querySelectorAll('.title');
    titles.forEach( title => {
        if ( title.dataset.index === String(index) ) {
            inpSpendTitle.value = title.textContent.slice(1);
        }
    } )

    let showItems = document.querySelectorAll('.show-item-general');
    showItems.forEach( (show) => {
        if (show.dataset.index === String(index)) {
            show.remove();
        }
    } )
}

// Функция редактирования

function editFunc(index) {

    balanceNum += expensesNum;
    balanceMoney.textContent = `$ ${balanceNum}`;
    
    let totals = document.querySelectorAll('.total');
    totals.forEach( (total) => {
        if (total.dataset.index === String(index)) {
            expensesNum -= +(total.textContent.slice(1));
            expensesMoney.textContent = `$ ${expensesNum}`;
            inpSpendAmount.value = total.textContent.slice(1);
        }
    })

    let titles = document.querySelectorAll('.title');
    titles.forEach( title => {
        if ( title.dataset.index === String(index) ) {
            inpSpendTitle.value = title.textContent.slice(1);
        }
    } )

    let showItems = document.querySelectorAll('.show-item-general');
    showItems.forEach( (show) => {
        if (show.dataset.index === String(index)) {
            show.remove();
        }
    } )
}










































