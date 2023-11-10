"use strict";
const score = [];
const names = [];
function identityOne(val) {
    return val;
}
function identityTwo(val) {
    return val;
}
function identityThree(val) {
    return val;
}
identityThree(3);
function identityFour(val) {
    return val;
}
// function identityFive<Bottle>() {}
function searchProducts(products) {
    const myIndex = 3;
    return products[myIndex];
}
const searchAnothera = (val) => {
    const myIndex = 3;
    return val[myIndex];
};
function anotherFunc(valOne, valTwo) {
    return {
        valOne,
        valTwo
    };
}
class Sellable {
    constructor() {
        this.card = [];
    }
    addToCart(products) {
        this.card.push(products);
    }
}
