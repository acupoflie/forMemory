

class Currency {
    constructor() {
        this.url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_8e0MdomJc4tw0Zj3Wa8PAywvmp4OvcJggZf1586u&base_currency="
    }

    async exchange(amount, firstCurrency, secondCurrency) {
        const res = await fetch(`${this.url}${firstCurrency}`);
        const result = await res.json();
        const exchangedResult = amount * result.data[secondCurrency];
        console.log(result)
        return exchangedResult
    }
}




