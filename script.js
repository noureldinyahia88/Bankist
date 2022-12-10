const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-27T17:01:17.194Z',
        '2020-07-11T23:36:17.929Z',
        '2020-07-12T10:51:36.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        '2022-12-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
};

const accounts = [account1, account2];

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

let currentAccount , timer;

const formatMovementDate = function(date, locale) {
        
        const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
        const dayspassed = calcDaysPassed(new Date(), date)

        if(dayspassed === 0) return 'Today';
        if(dayspassed === 1) return 'Yesterday';
        if(dayspassed <= 7) return `${dayspassed} days ago`;

        return new Intl.DateTimeFormat(locale).format(date);
}
const formatcur = function(value, locale, currency) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
}

const displayMovements = function(acc, sort=false) {
    containerMovements.innerHTML = '';
    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    movs.forEach((mov, i)=>{
        const type = mov > 0 ? "deposit" : "withdrawal"

        const date = new Date(acc.movementsDates[i])
        const displayDate = formatMovementDate(date, acc.locale)

        const formattedMov = formatcur(mov, acc.locale, acc.currency);

        const html = `
        <div class="movements__row">
                <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
                <div class="movements__date">${displayDate}</div>
                <div class="movements__value">${mov.toFixed(2)} €</div>
            </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin',html)
    })
}
// **********************startLogOutTimer**************************
const startLogOutTimer = function(){
    const tick = function(){
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        labelTimer.textContent = `${min}:${sec}`;
        
        if(time === 0) {
            clearInterval(timer)
            labelWelcome.textContent = "Log in to get started";
            containerApp.style.opacity = 0;
        }
        time--;
    };
    let time = 120;
    tick()
    const timer = setInterval(tick,1000)

    return timer;
};

const clacDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) =>
    acc + mov,0)

    labelBalance.textContent = formatcur(acc.balance, acc.locale, acc.currency);
}


const clacDisplaysummmary= function(acc){
    const incoms = acc.movements.filter(mov=> mov > 0).reduce((curr, mov)=>curr+mov,0)
    labelSumIn.textContent = formatcur(incoms, acc.locale, acc.currency);

    const out = acc.movements.filter(mov=> mov < 0).reduce((curr, mov)=>curr+mov,0)
    labelSumOut.textContent = formatcur(Math.abs(out), acc.locale, acc.currency);

    const interest = acc.movements.filter(mov=> mov > 0).map(deposite=>(deposite*acc.interestRate)/100).reduce((curr, int)=> curr+int)
    labelSumInterest.textContent = formatcur(interest, acc.locale, acc.currency);
}


//***************************** */ login************************************************

// UpdateUI
const updateUI = function(acc) {
    //Display Movements
    displayMovements(acc)
    //Clac DisplayBalance
    clacDisplayBalance(acc)
    //ClacDisplay Summmary
    clacDisplaysummmary(acc)
}


// fake login
// currentAccount = account1;
// updateUI(currentAccount)
// containerApp.style.opacity = 100;


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
        // Experimenting API
        const now = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }
        const locale = navigator.language
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now)

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = ''
        inputLoginPin.blur();

        if (timer) clearInterval(timer);
        timer = startLogOutTimer();

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

        // Add transfer date 
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());
        // UpdateUI
        updateUI(currentAccount)

        //Reset timer
        clearInterval(timer);
        timer = startLogOutTimer();
    } else {
        window.alert('Not Valid')
    }
})


btnLoan.addEventListener('click',(e)=>{
    e.preventDefault()
    const amount = Math.floor(inputLoanAmount.value)

    if(amount >= 0 && currentAccount.movements.some(mev=>mev >= amount*0.1)){
        setTimeout(function() {
            currentAccount.movements.push(amount)
            currentAccount.theNumberlaon++
            // Add loan date
            currentAccount.movementsDates.push(new Date().toISOString());
            // UpdateUI
            updateUI(currentAccount)
            clearInterval(timer);
        timer = startLogOutTimer();
        }, 3000)
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

const calcDaysPassed = (date1, date2) => Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed()