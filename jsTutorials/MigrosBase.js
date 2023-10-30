


class MigrosBase {

    discount = 20;

    constructor(name, surname, isHasCard, products) {
        this.name = name;
        this.surname = surname;
        this.isHasCard = isHasCard;
        this.products = products;
    }

    hesapla() {
        let payAmount = 0;
        if (this.checkProducts(this.products)) {
            if (this.isHasCard) {
                this.products.forEach((product) => {
                    payAmount += product.cost * (100 - this.discount) / 100;
                });
            } else {
                this.products.forEach((product) => {
                    payAmount += product.cost;
                })
            }
        } else {
            alert("Add at least one products!");
        }

        return payAmount;
    }

    checkProducts(products) {
        if (products != null && products.length > 0) {
            return true;
        }
        return false;
    }

}

