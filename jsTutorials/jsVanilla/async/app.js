



function getName(callback) {
    setTimeout(() => {
        let name = "Enver";
        callback(name);
    }, 1000);
}

function getSurname(name, callback) {
    setTimeout(() => {
        let surname = "Isayev";
        callback(surname);
    }, 500);
}

function getAge(name, surname, callback) {
    setTimeout(() => {
        let age = 22;
        callback(age);
    }, 300);
}


getName((name) => {
    getSurname(name, (surname) => {
        getAge(name, surname, (age) => {
            console.log(name, surname, age);
        })
    });
});


// getName();
// getSurname();





