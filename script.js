const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    theNumberlaon: 1,
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    theNumberlaon: 1,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    theNumberlaon: 1,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    theNumberlaon: 1,
    pin: 4444,
};

const account5 = {
    owner: 'Nour Thrwat',
    movements: [830, 5000, 760, 150, 920],
    interestRate: 1,
    theNumberlaon: 1,
    pin: 5555,
};

const accounts = [account1, account2, account3, account4,account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const wrongpasswordbox = document.querySelector('.wrongpasswordbox')

const displayMovements = function(movements, sort=false) {
    containerMovements.innerHTML = '';
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
    movs.forEach((mov, i)=>{
        const type = mov > 0 ? "deposit" : "withdrawal"
        const html = `
        <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                <div class="movements__value">${mov} €</div>
            </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin',html)
    })
}


const clacDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) =>
    acc + mov,0)
    labelBalance.textContent = `${acc.balance} €`
}


const clacDisplaysummmary= function(acc){
    const incoms = acc.movements.filter(mov=> mov > 0).reduce((curr, mov)=>curr+mov,0)
    labelSumIn.textContent = `${incoms} €`

    const out = acc.movements.filter(mov=> mov < 0).reduce((curr, mov)=>curr+mov,0)
    labelSumOut.textContent = `${Math.abs(out)} €`

    const interest = acc.movements.filter(mov=> mov > 0).map(deposite=>(deposite*acc.interestRate)/100).reduce((curr, int)=> curr+int)
    labelSumInterest.textContent = `${interest} €`
}


//***************************** */ login************************************************

// UpdateUI
const updateUI = function(acc) {
    //Display Movements
    displayMovements(acc.movements)
    //Clac DisplayBalance
    clacDisplayBalance(acc)
    //ClacDisplay Summmary
    clacDisplaysummmary(acc)
}
// function removeWrongbox() {
//     wrongpasswordbox.style.opacity=0
// }

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );
    
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${
        currentAccount.owner.split(' ')[0]
        }`;
        containerApp.style.opacity = 100;
        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = ''
        inputLoginPin.blur();

        // UpdateUI
        updateUI(currentAccount)
    } else {
        wrongpasswordbox.style.opacity=100
        setTimeout(() => {
            wrongpasswordbox.style.opacity=0
        }, 3000)
        inputLoginUsername.value = inputLoginPin.value = ''
    }
});

btnTransfer.addEventListener('click',(e)=>{
    e.preventDefault()
    const amount = Number(inputTransferAmount.value)
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
    inputTransferAmount.value = inputTransferTo.value = ''
    
    if(amount>0 && receiverAcc && currentAccount.balance>=amount && receiverAcc?.username !== currentAccount.username){
        currentAccount.movements.push(-amount)
        receiverAcc.movements.push(amount)
        // UpdateUI
        updateUI(currentAccount)
    } else {
        window.alert('Not Valid')
    }
})


btnLoan.addEventListener('click',(e)=>{
    e.preventDefault()
    const amount = Number(inputLoanAmount.value)

    if(amount >= 0 && currentAccount.theNumberlaon <= 1 && currentAccount.movements.some(mev=>mev >= amount*0.1)){
        currentAccount.movements.push(amount)
        currentAccount.theNumberlaon++
        updateUI(currentAccount)
    }
    inputLoanAmount.value = ''
})

btnClose.addEventListener('click',(e)=>{
    e.preventDefault()
    if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
        const index = accounts.findIndex(acc=>acc.username === currentAccount.username)
        //Delete Account
        accounts.splice(index, 1)
        window.alert("the Account will be deleted")
    }
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = ''
})

let sorted = false
btnSort.addEventListener('click',(e)=>{
    e.preventDefault()
    displayMovements(currentAccount.movements, !sorted)
    sorted = !sorted
})

// Create Usernames
const createUsernames = function (accs) {
    accs.forEach(acc=>{
        acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
    })
}
createUsernames(accounts)




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const data1 = [5,2,4,1,15,8,3]
const data2 = [16,6,10,5,6,1,4]

const humanAge = data1.map((x)=>{
    if(x<=2){
        return 2 * x
    } else if(x>2) {
        return 16+x*4
    }
})
const under18 = humanAge.filter((x)=>{
    return x > 18
})
let sum
const average = under18.forEach((x)=>{
    sum += x
})
const av = sum / under18.length
console.log(av)

// 'use strict';

///////////////////////////////////////
// Modal window

// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const btnCloseModal = document.querySelector('.btn--close-modal');
// const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// const openModal = function () {
// modal.classList.remove('hidden');
// overlay.classList.remove('hidden');
// };

// const closeModal = function () {
// modal.classList.add('hidden');
// overlay.classList.add('hidden');
// };

// for (let i = 0; i < btnsOpenModal.length; i++)
// btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
// if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
// }
// });