




const score: Array<number> = []
const names: Array<string> = []


function identityOne(val: boolean | number): boolean | number {
    return val
}

function identityTwo(val: any): any {
    return val
}

function identityThree<Type>(val: Type): Type {
    return val
}

identityThree(3)

function identityFour<T>(val: T): T {
    return val
}


interface Bottle{
    brand: string,
    type: number
}

// function identityFive<Bottle>() {}

function searchProducts<T>(products: T[]): T {
    const myIndex = 3
    return products[myIndex]
}


const searchAnothera = <T,>(val: T[]): T => {
    const myIndex = 3
    return val[myIndex]
}

interface Database {
    connection: string,
    username: string,
    password: string
}

function anotherFunc<T, U extends Database>(valOne: T, valTwo: U): object {
    return {
        valOne,
        valTwo
    }
}

// anotherFunc(3, {})


interface Quiz {
    name: string,
    type: string
}

interface Course {
    name: string,
    author: string,
    subject: string
}

class Sellable<T> {
    public card: T[] = []

    addToCart(products: T) {
        this.card.push(products)
    }
}