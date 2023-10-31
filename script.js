"use strict";

// Data
const account1 = {
  owner: "Sweta Prajapati",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
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
  locale: 'pt-PT',
};

const account2 = {
  owner: "Sneha S Prajapati",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
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

const account3 = {
  owner: "Shashi kant Prajapati",
  movements: [200, -200, 340, 2000, 3000, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
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
  locale: 'pt-PT',
};

const account4 = {
  owner: "Sakshi Chauriwar",
  movements: [430, 1000, -700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
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

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}₹</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}₹`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  // total income calculation
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}₹`;

  // total withdrawl calculation
  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}₹`;

  // total interest calculation
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    // this filter method is for calculating interest only above 1 rupee
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}₹`;
};
// calcDisplaySummary(account1.movements);

// creating username using the initials of words in name
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);
// console.log(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// event handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // prevent form from submitting
  e.preventDefault();
  console.log("Login");

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log("loggedin");
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  // checking user, proper amount and then transfering
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // console.log("Valid transfer");
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    //Update Ui
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // hide Ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// PRACTICE USING ARRAY METHODS

const movements = [100, 200, -150, 500, -200, 1000, 5000];
const positives = movements.filter((item) => item > 0);
console.log(positives);
const negatives = movements.filter((item) => item < 0);
console.log(negatives);

const globalBalance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Balance ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(globalBalance);

// calculating maximum value using reduce
const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
console.log(max);

// using reduce to count
const numberOfDeposits = movements
  .flatMap((acc) => acc)
  .reduce((count, cur) => (cur >= 1500 ? count + 1 : count), 0);
console.log(numberOfDeposits);

// calculating deposit and withdraw using reduce
const sums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (acc, cur) => {
      // cur > 0 ? (acc.deposit += cur) : (acc.withdrawl += cur);
      acc[cur > 0 ? "deposit" : "withdrawl"] += cur;
      return acc;
    },
    { deposit: 0, withdrawl: 0 }
  );

console.log(sums);

// any string to title case
const convertTitleCase = function (title) {
  const exceptions = ["a", "an", "the", "but", "or", "are"];

  const capitalize = function (str) {
    return str[0].toUpperCase() + str.slice(1);
  };

  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");
  return capitalize(titleCase);
};
console.log(convertTitleCase("Heyyyy where are you?"));

// challenge
const dogs = [
  {
    weight: 22,
    curFood: 250,
    owners: ["alice", "bob"],
  },
  {
    weight: 21,
    curFood: 300,
    owners: ["ana", "jhon"],
  },
  {
    weight: 33,
    curFood: 450,
    owners: ["max"],
  },
];
// 1
dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2
const dogAna = dogs.find((dog) => dog.owners.includes("ana"));
console.log(dogAna);
console.log(
  `ana's dog is eating too ${
    dogAna.curFood > dogAna.recFood ? "much" : "little"
  }`
);

// 3
const ownersTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap((dog) => dog.owners);
console.log(ownersTooMuch);

const ownersTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners);
console.log(ownersTooLittle);

// 4
const capitalize = function (str) {
  return str[0].toUpperCase() + str.slice(1);
};
console.log(capitalize(`${ownersTooMuch.join(" and ")}'s dogs eat too much`));
console.log(
  capitalize(`${ownersTooLittle.join(" and ")}'s dogs eat too little`)
);

// 5
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// 6
const chechEat = (dog) =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood > dog.recFood * 0.1;

console.log(dogs.some(chechEat));

// 7
console.log(dogs.filter(chechEat));

// 8
// sort by recommended food portion
const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsCopy);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////PRACTICE FOR NUMBERS AND DATES AND BIGINTS

console.log(23 === 23.0);
