
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
const arrayLike = {
    length: 2,
    0: "a",
    1: "b",
    2: "c",
    3: "a", // ignored by filter() since length is 3
}
// console.log(Array.prototype.filter.call(arrayLike, (x) => x <= 'b'))

///////////////

//! reduce method
const people = [
    { name: 'Kyle', age: 26 },
    { name: 'John', age: 31 },
    { name: 'Sally', age: 42 },
    { name: 'Oreo', age: 42 }
]

const reult = people.reduce((groupedPeople, person) => {
    const age = person.age;
    if(groupedPeople[age] == null) groupedPeople[age] = [];
    groupedPeople[age].push(person)
    return groupedPeople;
}, {})

console.log(reult)
///////////////