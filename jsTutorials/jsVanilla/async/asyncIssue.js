

const users = [
    {
        userId : 1,
        name : "Enver"
    },
    {
        userId : 2,
        name : "Busra"
    },
    {
        userId : 3,
        name : "Mehmet"
    },
    {
        userId : 4,
        name : "Mochi"
    },
    {
        userId : 5,
        name : "Luna"
    },
]


function getUserId(callback) {
    setTimeout(() => {
        let userId = 3;
        callback(userId);
    }, 1000);
}


function getInfoById(userId) {

    setTimeout(() => {
        users.forEach((user) => {
            if(user.userId == userId) {
                console.log(user.name);
            }
        })
    }, 500);
}

getUserId(getInfoById);


// let userId = getUserId();
// getInfoById(userId);