

let score: number | string = 33 

type User = {
    name: string;
    id: number
}

type Admin = {
    username: string;
    id: number
}


let sir: User | Admin = {name: "sir", id: 123}
sir = {username: "sir", id : 345}


// function getId(id: number | string) {
//     console.log(`Db id is : ${id}`)
// }

getId(3)
getId("3")

function getId(id: number | string) {
    if (typeof id === "string") {
        id.toLowerCase()
    }
}

// // array
const data: (number | string)[] = [1,2,3,"4"]

let seat: "aisle" | "middle" | "window"