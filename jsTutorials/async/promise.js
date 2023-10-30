




// const promise1 = new Promise((resolve, reject) => {
//     if(check) {
//         resolve("Promise resolved...")
//     } else {
//         reject("Promise rejected")
//     }
// });

// console.log(promise1)


// let check = true;

// function createPromise() {
//     return new Promise((resolve, reject) => {
//         if(check) {
//             resolve("Promsie resolved");
//         } else {
//             reject("Promise rejected");
//         }
//     })
// }

// createPromise()
// .then((response) => {
//     console.log(response);
// })
// .catch((error) => {
//     console.log(error);
// })
// .finally(() => console.log("Always works"))



function readStudents(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        try {
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            }
        } catch (error) {
            reject(error);
        }

        xhr.open("GET", url);
        xhr.send();
    })
}

// readStudents("students.json")
//     .then((response) => {
//         for (const data of response) {
//             console.log(data.name)
//         }
//     })
//     .catch((err) => console.log(err));

//!    Promise chain

function getUsers(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        try {
            xhr.onreadystatechange = () =>{
                if(xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            }
        } catch (error) {
            reject(error);
        }

        xhr.open("GET", url);
        xhr.send();
    })
}

function getCommentsById(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        try {
            xhr.onreadystatechange = () =>{
                if(xhr.readyState == 4 && xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            }
        } catch (error) {
            reject(error);
        }

        xhr.open("GET", url);
        xhr.send();
    })
}

// getUsers("https://jsonplaceholder.typicode.com/users/1")
// .then((response) => {
//     return getCommentsById(`https://jsonplaceholder.typicode.com/comments/${response.id}`);
// })
// .then((data) => console.log(data))
// .catch((err) => console.log(err))
// .finally(() => console.log("Merhaba lan yaprak"));

//!   Promise ALL

const p1 = Promise.resolve("First promise resolved")
const p2 = Promise.resolve("Second promise resolved")
const p3 = new Promise((resolve, reject) => {
    resolve("Third promise resolved");
})

Promise.all([p1,p2,p3])
.then((res) => {
    for(let value of res) {
        console.log(value)
    }
})
.catch()
