const mortgageForm = document.getElementById("mortgage-form");
const homePrice = document.getElementById("home-price");
const downPayment = document.getElementById("down-payment");
const loanTerm = document.getElementById("loan-term");
const interestRate = document.getElementById("interest-rate");
const propertyTax = document.getElementById("property-tax");
const homeInsurance = document.getElementById("home-insurance");

const mortgagePaymentResult = document.querySelector(".mortgage-payment");
const mortgagePrincipalResult = document.querySelector(
  ".mortgage-principal-result"
);
const mortgageTaxResult = document.querySelector(".mortgage-tax-result");
const mortgageInsuranceResult = document.querySelector(
  ".mortgage-insurance-result"
);
const mortgageLoanResult = document.querySelector(".mortgage-loan-result");

const clearValue = function () {
  homePrice.value = "";
  downPayment.value = "";
  loanTerm.value = "";
  interestRate.value = "";
  propertyTax.value = "";
  homeInsurance.value = "";
};

const mortgageFunction = function () {
  const loanAmount = homePrice.value - downPayment.value;
  const monthlyInterest = interestRate.value / 100 / 12;
  const loanTermMonths = loanTerm.value;
  const homeInsuranceMon = homeInsurance.value / 12;
  const propertyTaxMon = propertyTax.value / 12;
  const numerator =
    loanAmount *
    monthlyInterest *
    Math.pow(1 + monthlyInterest, loanTermMonths);
  const denominator = Math.pow(1 + monthlyInterest, loanTermMonths) - 1;
  const monthlyPayment = (numerator / denominator).toFixed(2);
  const monthlyPaymentDisplay =
    +monthlyPayment + homeInsuranceMon + propertyTaxMon;

  mortgagePaymentResult.textContent = "$" + monthlyPaymentDisplay.toFixed(2);
  mortgagePrincipalResult.textContent = "$" + monthlyPayment;
  mortgageInsuranceResult.textContent = "$" + homeInsuranceMon.toFixed(2);
  mortgageTaxResult.textContent = "$" + propertyTaxMon.toFixed(2);
  mortgageLoanResult.textContent =
    loanAmount > 0 ? "$" + loanAmount.toFixed(2) : "Invaild Input";
  clearValue();
};

mortgageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  mortgageFunction();
});
