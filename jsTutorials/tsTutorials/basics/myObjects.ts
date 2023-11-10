


// const User = {
//     name: "sir",
//     email: "sir@gmail.com",
//     isActive: true
// }


// function createUser({name: string, isPaid: boolean}) {

// }

// let newUser = {name: "sir", isPaid: false, email: "sir@gmail.com"}

// createUser(newUser)

// //Returning object
// function createCourse():{name: string, price: number}{
//     return {name: "pc", price: 300}
// }


// type User = {
//     name: string;
//     email: string;
//     isActive: boolean;
// }

// function createUser(user: User): User{return user}

// createUser({name: "", email: "", isActive: false})



// //optional paramethers
type User = {
    readonly _id: string
    name : string
    email: string
    isActive: boolean
    credcardDetails?: number
}

let myUser: User = {
    _id: "123",
    name: "sir",
    email: "@gmial",
    isActive: false
}

type cardNumber = {
    cardnum: string
}

type cardDate = {
    carddat: string
}

// // combine values
type cardDetails = cardNumber & cardDate & {
    cvv : number
}

function dememe(val: cardDetails) {}
dememe({cardnum: "123", carddat: "123", cvv: 123})


export{}