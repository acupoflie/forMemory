"use strict";
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
    constructor(email, name) {
        this.email = email;
        this.name = name;
        this._courseCount = 1;
        this.city = "New York";
    }
    deleteToken() {
        console.log("Token deleted");
    }
    get getEmail() {
        return `apple ${this.email}`;
    }
    get getCourseCount() {
        return this._courseCount;
    }
    set setCourseCount(course) {
        if (course <= 1) {
            throw new Error("Course count should be more than 1");
        }
        this._courseCount = course;
    }
}
class SubUser extends User {
    constructor() {
        super(...arguments);
        this.isFamily = true;
    }
    changeCourseCount() {
        this._courseCount;
    }
}
const sir = new User("sir@gmail.com", "sir");
