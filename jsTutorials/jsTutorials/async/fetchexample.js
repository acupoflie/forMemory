





// function getStudents(url) {
//     fetch(url)
//     .then((response) => response.json())
//     .then((data) => 
// }


// getStudents("students.json")




function getUserAlbums(url) {
    fetch(url)
    .then((promise) => promise.json())
    .then((data) => console.log(data));
}


getUserAlbums("https://jsonplaceholder.typicode.com/albums?userId=3");




//!  Fetch POST Example

function saveStudents() {
    fetch("https://jsonplaceholder.typicode.com/albums",{
        method : "POST",
        headers : {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
}


