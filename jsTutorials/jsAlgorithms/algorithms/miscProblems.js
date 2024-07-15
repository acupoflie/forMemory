/*

function cartesianProduct(arr1, arr2) {
    const result = [];

    for(let i = 0; i < arr1.length; i++) {
        for(let j = 0; j < arr2.length; j++) {
            result.push([arr1[i], arr2[j]]);
        }
    }

    return result;
}

? m and n is th arrays
? Big O = O(mn)

const arr1 = [1, 2];
const arr2 = [3, 4, 5];
console.log(cartesianProduct(arr1, arr2));

--------------------------------------------------------

function climbingStaircase(n) {
    let noOfWays = [1, 2];
    for(let i = 2; i <= n; i++) {
        noOfWays[i] = noOfWays[i - 1] + noOfWays[i - 2]
    }

    return noOfWays[n - 1]
}

Big O = O(n)

*/
