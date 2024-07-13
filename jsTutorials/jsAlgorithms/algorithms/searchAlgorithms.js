
/*
function linearSearch(arr, target) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === target) {
            return i
        }
    }
    return -1
}

Big O = O(n)

--------------------------------------------------------


*/

const arr = [-5, 2, 4, 6, 10];

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length -1;

    while(left <= right) {
        let middle = Math.floor((left + right) / 2);
        if(target === arr[middle]) {
            return middle
        }
        if(target < arr[middle]) {
            right = middle - 1
        } else {
            left = middle + 1
        }
    }
    return -1
}

console.log(binarySearch(arr, 10))
console.log(binarySearch(arr, 6))
console.log(binarySearch(arr, 20))