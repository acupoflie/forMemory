

interface User {
    readonly id: number
    email: string,
    userId: number
    googleId?: string
    // startTrail: () => string
    startTrail(): string
    getCoupon(cname: string, value: number) : number
}

interface User {
    githubToken: string
}

interface Admin extends User {
    role: "admin" | "ta" | "learner"
}

const sir: Admin = {id: 5, email: "abc", userId: 123,
role: "admin",
githubToken: "github",
startTrail: () => {
    return "string"
},
//we dont have to use same names as definition on function
getCoupon: (name: "sir10", off: 2) => {
    return 10
}
}












