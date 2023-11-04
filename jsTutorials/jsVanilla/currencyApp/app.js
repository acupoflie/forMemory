


const amountInput = document.querySelector("#amount");
const firstCurrencyOption = document.querySelector("#firstCurrencyOption")
const secondCurrencyOption = document.querySelector("#secondCurrencyOption")
const result = document.querySelector("#result")

const currency = new Currency();

runEventListener();

function runEventListener() {
    amount.addEventListener("input", exchange);
}

function exchange() {
    const amount = Number(amountInput.value.trim());
    const firstOption = firstCurrencyOption.options[firstCurrencyOption.selectedIndex].textContent;
    const secondOption = secondCurrencyOption.options[secondCurrencyOption.selectedIndex].textContent;

    currency.exchange(amount, firstOption, secondOption)
    .then((res) => {
        result.value = res.toFixed(3);
    })
}




