"use strict";

// ACCOUNTS
const account1 = {
  owner: "Petros Chatzidavid",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2022-11-18T21:31:17.178Z",
    "2022-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2023-05-27T17:01:17.194Z",
    "2023-07-11T23:36:17.929Z",
    "2023-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Johan Walker",
  movements: [5000, 3400, -50, -790, -3210, -1200, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-04-30T09:48:16.867Z",
    "2022-04-25T06:04:23.907Z",
    "2022-04-09T14:18:46.235Z",
    "2023-04-15T16:33:06.386Z",
    "2023-04-14T14:43:26.374Z",
    "2023-04-14T18:49:59.371Z",
    "2023-04-21T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

const transfer = document.querySelector(".window-transfer");
const addMoney = document.querySelector(".window-add-money");
const addscroll = document.querySelector(".scroll-deposits");
const inputValueLogIn = document.querySelector(".log-in");
const inputValuePassword = document.querySelector(".password");
const welcome = document.querySelector(".welcome");
const mainBackgroundLogIn = document.querySelector("#main");
const removeInputsLogin = document.querySelector(".log-In");
const totalAmountList = document.querySelector(".total-amount");
const totalDeposit = document.querySelector(".total-deposit");
const totalWithdrawal = document.querySelector(".total-withdrawal");
const inputTransferTo = document.querySelector(".name-transfer");
const valueTransferMoney = document.querySelector(".value-tranfer-money");
const inputAddAmount = document.querySelector(".add-money");

const btnTransfer = document.querySelector(".btn-transfer");
const btnLoanMoney = document.querySelector(".btn-loan-money");
const btnTransferMoney = document.querySelector(".send-money");
const btnAddMoney = document.querySelector(".btn-add-money");
const btnCloseWindowsTransfer = document.querySelector(".icon-close-first");
const btnCloseWindowsAddMoney = document.querySelector(".icon-close-second");
const btnLogIn = document.querySelector(".btn-login");
const btnLogOut = document.querySelector(".btn-logout");

// BUTTONS STEP 1

const openWindpwTransfer = function () {
  transfer.classList.remove("hidden");
};
const openWindpwAddMoney = function () {
  addMoney.classList.remove("hidden");
};

const closeModalTransfer = function () {
  transfer.classList.add("hidden");
};

const closeModalAddMoney = function () {
  addMoney.classList.add("hidden");
};

btnCloseWindowsTransfer.addEventListener("click", closeModalTransfer);
btnCloseWindowsAddMoney.addEventListener("click", closeModalAddMoney);
btnAddMoney.addEventListener("click", openWindpwAddMoney);
btnTransfer.addEventListener("click", openWindpwTransfer);

// USERNAME STEP 2
const username = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
username(accounts);

// DEPOSIT / WITHDRAWAL STEP 3
const balance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);

  acc.minus = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  totalDeposit.textContent = formatCur(acc.balance, acc.locale, acc.currency);
  totalAmountList.textContent = formatCur(
    acc.balance,
    acc.locale,
    acc.currency
  );
  totalWithdrawal.textContent = formatCur(acc.minus, acc.locale, acc.currency);
};

// DATES STEP 8
const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth()}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// CURRENT LIST START STEP 4
const currentList = function (acc) {
  addscroll.innerHTML = "";

  acc.movements.forEach((mov, i) => {
    const type = mov > 0 ? "Deposit" : "Withdrawal";
    // Date
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);
    // Time
    const hour = `${date.getHours()}`.padStart(2, 0);
    const min = `${date.getMinutes()}`.padStart(2, 0);
    const displayTime = `${hour}:${min}`;

    const displayMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="deposit-scroll">
    <p class="d-main-list type-method movements__type--${type}">${type}</p>
    <p class="d-main-list">${displayMov}</p>
    <p class="d-main-list">${displayDate}</p>
    <p class="d-main-list">${displayTime}</p>
  </div>
    `;
    addscroll.insertAdjacentHTML("afterbegin", html);
  });
};

function updateUI() {
  currentList(currentAccount);

  balance(currentAccount);
}

// CONNECT USER WITH PASSWORD / LOGOUT STEP 5
let currentAccount;

// Login
btnLogIn.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputValueLogIn.value
  );

  if (currentAccount?.pin === Number(inputValuePassword.value)) {
    welcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]}`;

    mainBackgroundLogIn.style.opacity = 100;
    removeInputsLogin.classList.add("hidden");

    inputValueLogIn.value = inputValuePassword.value = "";

    inputValuePassword.blur();

    updateUI(currentAccount);
  }
});

// Logout
btnLogOut.addEventListener("click", function (e) {
  e.preventDefault();
  removeInputsLogin.classList.remove("hidden");
  mainBackgroundLogIn.style.opacity = 0;
});

// TRANSFER MONEY STEP 6

btnTransferMoney.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(valueTransferMoney.value);

  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  valueTransferMoney.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    transfer.classList.add("hidden");

    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);
  }
});

// ADD MONEY MY BANK STEP 7

btnLoanMoney.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputAddAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    addMoney.classList.add("hidden");

    currentAccount.movementsDates.push(new Date().toISOString());
  }
  updateUI(currentAccount);
  inputAddAmount.value = "";
});

// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
// ///////////////////////////////////////////
// --------------- FIRST CHART --------------
var options = {
  chart: {
    height: 280,
    type: "radialBar",
  },

  series: [73],
  colors: ["#0b6a78"],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "70%",
        background: "#0f0f11",
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15,
        },
      },
      dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "14px",
          fontWeight: "400",
        },
        value: {
          color: "#fff",
          fontSize: "30px",
          fontWeight: "bold",
          show: true,
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "vertical",
      gradientToColors: ["#780b45"],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: "round",
  },
  labels: ["Progress"],
};

const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// --------------- SECOND CHART --------------

var options = {
  series: [
    {
      name: "High - 2023",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "Low - 2023",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ],
  chart: {
    height: 350,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#fff",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["#780b45", "#0b6a78"],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "smooth",
  },
  title: {
    text: "",
    align: "left",
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#fff", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.2,
    },
  },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    title: {
      text: "",
      color: "#fff",
    },
  },
  yaxis: {
    title: {
      text: "",
    },
    min: 5,
    max: 40,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
};

var chartLine = new ApexCharts(document.querySelector("#line-chart"), options);
chartLine.render();
