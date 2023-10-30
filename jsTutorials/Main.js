

let message = 
`
Welcome to Migros
Do you have money card?
1- Yes
2- No
`;

const products = [
    {
        proName : "Milk",
        cost : 35
    },
    {
        proName : "Bread",
        cost : 15
    },
    {
        proName : "Nappies",
        cost : 50
    }
];


let result = confirm(message);
let payAmount;

if(result) {
    
    let name = prompt("Enter name");
    let surname = prompt("Enter surname");
    const custom = new Customer(name, surname, result, products);
    payAmount = custom.hesapla();

    alert(
        `
        Customer Infos : ${custom.name} ${custom.surname}
        Pay Amount : ${payAmount}
        `
    );

} else {

    const custom = new Customer(null, null, result, products);
    payAmount = custom.hesapla();
    alert(
        `
        Pay Amount : ${payAmount}
        `
    );

}
