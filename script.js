'use strict';

// BANK APP

// Data
const account1 = {
  owner: 'John Smith',
  movements: [1500, 1450, -400, 60, 3000, -1650, -130, -70, 500, 1300, 50],
  interestRate: 1.5, // %
  pin: 1111,
};

const account2 = {
  owner: 'Gemma Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven  Williams',
  movements: [200, -200, 340, -300, -20, 50, 1400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [1200, -500, 3340, -500, -220, -50, 1400, -360],
  interestRate: 1.3,
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

//
const displayMovements = movements => {
  containerMovements.innerHTML = '';

  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = ` 
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = accounts => {
  accounts.forEach(
    account =>
      (account.username = account.owner
        .toLowerCase()
        .split(' ')
        .map(word => word[0])
        .join(''))
  );
};

createUsernames(accounts);

// event handler
// ss 4444 //  sw 3333 // gd 2222 // js 1111
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // show UI and welcome message

    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // show movements
    displayMovements(currentAccount.movements);
    // show balance
    calcDisplayBalance(currentAccount.movements);
    // show summary
    calcDisplaySummary(currentAccount);

    // clear Login and pin input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
  }
});

const calcDisplayBalance = movements => {
  const balance = movements.reduce((acc, cur) => {
    return (acc += cur);
  }, 0);
  labelBalance.textContent = `${balance} €`;
};

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes} €`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  // interest counted from the deposit * this account InterestRate, paid only if the interest is above 1EUR from this deposit
  const interest =
    (acc.movements
      .filter(mov => mov > 0)
      .filter(mov => (mov / 100) * acc.interestRate >= 1)
      .reduce((acc, cur) => acc + cur, 0) *
      acc.interestRate) /
    100;

  labelSumInterest.textContent = `${interest} €`;
};
