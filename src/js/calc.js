import { EXCHANGE_API } from "../../lo.js";

const currency1El = document.getElementById("currency1");
const currency2El = document.getElementById("currency2");
const swap = document.querySelector(".swap-button");
const amount = document.getElementById("amount");
const resultAmount = document.querySelector(".result-amount");
const resultTime = document.querySelector(".result-time");
const currentRate = document.querySelector(".current-rate");
const amountControl = document.querySelector(".amount-controls");
const resultContainer = document.querySelector(".result-container");

const calculator = async function () {
  try {
    resultContainer.classList.add("result-success");
    resultContainer.classList.remove("result-failed");
    const currency_one = currency1El.value;
    const currency_two = currency2El.value;
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${EXCHANGE_API}/latest/${currency_one}`
    );
    const data = await res.json();
    const currency2Value = data.conversion_rates[currency_two];
    const result = (+amount.value * currency2Value).toFixed(2);
    resultAmount.textContent =
      +amount.value < 1 ? " " : `${currency_two} ${result}`;
    resultTime.textContent =
      "Last Updated " + data.time_last_update_utc.replace("+0000", " ");
    currentRate.textContent = `1 ${currency_one} = ${currency2Value.toFixed(
      2
    )} ${currency_two}`;
  } catch (err) {
    console.error(err);
    currentRate.textContent =
      "Error!! Can't connect to the Server, Try again later.";
    resultContainer.classList.add("result-failed");
    resultAmount.textContent = "";
    resultTime.textContent = "";
  }
};

calculator();

amount.addEventListener("input", (e) => {
  e.preventDefault();
  calculator();
});
currency1El.addEventListener("change", calculator);
currency2El.addEventListener("change", calculator);

swap.addEventListener("click", () => {
  const temp = currency1El.value;
  currency1El.value = currency2El.value;
  currency2El.value = temp;
  calculator();
});

amountControl.addEventListener("click", (e) => {
  const clicked = e.target;
  if (clicked.classList.contains("decrease-amount")) {
    amount.value--;
  } else {
    amount.value++;
  }
  calculator();
});
