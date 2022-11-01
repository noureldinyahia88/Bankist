const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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


const displayMovements = function(movements) {
    containerMovements.innerHTML = '';
    movements.forEach((mov, i)=>{
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


const clacDisplayBalance = function (movements) {
    const balance = movements.reduce((acc, mov) => acc + mov,0)
    labelBalance.textContent = `${balance} €`
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

        //Display Movements
        displayMovements(currentAccount.movements)
        //Clac DisplayBalance
        clacDisplayBalance(currentAccount.movements)
        //ClacDisplay Summmary
        clacDisplaysummmary(currentAccount)
    }
});

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