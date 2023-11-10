
// class User {
//     email: string
//     private name: string
//     readonly city: string = ""
//     constructor(email: string, name: string) {
//         this.email = email;
//         this.name = name;
//     }
// }

class User {

    protected _courseCount = 1

    readonly city: string = "New York"
    constructor(
        public email: string, 
        public name: string,
        // private userId: string
        ) {
    }

    private deleteToken() {
        console.log("Token deleted")
    }

    get getEmail(): string {
        return `apple ${this.email}`
    }

    get getCourseCount(): number {
        return this._courseCount
    }

    set setCourseCount(course: number) {
        if (course <= 1) {
            throw new Error("Course count should be more than 1")
        }
        this._courseCount = course
    }
}

class SubUser extends User {
    isFamily: boolean = true
    changeCourseCount() {
        this._courseCount
    }
}



const sir = new User("sir@gmail.com", "sir")
