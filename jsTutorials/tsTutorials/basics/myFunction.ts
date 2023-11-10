

function addTwo(num: number): number {
    return num + 2;
    // return "hello"
}

function getUpper(val: string) {
    return val.toUpperCase();
}

function signUpUser(name: string, email: string, isPaid: boolean) {}

// Custom type
let loginUser = (name:string, email: string, isPaid: boolean = false) => {}

loginUser("sir", "daupa")

addTwo(5);

//Return

function getValue(myVal:number) : boolean | string{
    if(myVal > 5) {
        return true
    }
    return "200 OK"
}


// arrow func
const getHello = (s:string): string => {return ""}


const heros = ["spiderman", "thor", "batman"]

heros.map((hero): string => {
    return `hero is ${hero}`
})


// return never
function consoleError(err: string): void {
    console.log(err)
}

function handleError(err: string): never {
    throw new Error(err);
}

export {}