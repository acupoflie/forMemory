
//TODO ARRAYS

//! filter method
const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter((word) => word.length > 6);
///////////////
function isBigEnough(value) {
    return value >= 10;
}
const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
///////////////
const fruits = ["apple", "banana", "grapes", "mango", "orange"];

function filterItems(arr, query) {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()))
}
///////////////
//blank
