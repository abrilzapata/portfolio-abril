/* =========================================================
   CONVERSOR DE DIVISAS
   Pegar este bloque al final de script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const amountInput = document.getElementById("amount");
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const convertBtn = document.getElementById("convertBtn");
  const swapBtn = document.getElementById("swapCurrencies");
  const resultBox = document.getElementById("conversionResult");

  // Si no estamos en currency-converter.html, no ejecuta nada.
  if (!amountInput || !fromCurrency || !toCurrency || !convertBtn || !swapBtn || !resultBox) {
    return;
  }

  /*
    Tasas demostrativas tomando USD como moneda base.
    No representan cotizaciones reales ni valores financieros en tiempo real.
  */
  const ratesToUSD = {
    ARS: 1 / 900,
    USD: 1,
    EUR: 1.08,
    BRL: 0.20,
    CLP: 1 / 930,
    UYU: 1 / 39
  };

  const currencySymbols = {
    ARS: "$",
    USD: "US$",
    EUR: "€",
    BRL: "R$",
    CLP: "CLP$",
    UYU: "$U"
  };

  function formatMoney(value, currency) {
    return new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value) + " " + currency;
  }

  function showMessage(message, isError = false) {
    resultBox.textContent = message;
    resultBox.classList.toggle("error", isError);
  }

  function convertCurrency() {
    const amount = Number(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amountInput.value || amount <= 0) {
      showMessage("Ingresá un importe mayor a cero para realizar la conversión.", true);
      return;
    }

    const amountInUSD = amount * ratesToUSD[from];
    const convertedAmount = amountInUSD / ratesToUSD[to];

    const fromText = `${currencySymbols[from]} ${formatMoney(amount, from)}`;
    const toText = `${currencySymbols[to]} ${formatMoney(convertedAmount, to)}`;

    showMessage(`${fromText} equivalen aproximadamente a ${toText}.`);
  }

  function swapCurrencies() {
    const currentFrom = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = currentFrom;

    if (amountInput.value) {
      convertCurrency();
    }
  }

  convertBtn.addEventListener("click", convertCurrency);
  swapBtn.addEventListener("click", swapCurrencies);

  amountInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      convertCurrency();
    }
  });
});