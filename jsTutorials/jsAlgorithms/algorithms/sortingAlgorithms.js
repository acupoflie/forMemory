/*

let arr = [8, 20, -2, 4, -6];

function bubbleSort(arr) {
    let swapped;
    do {
        swapped = false;
        for(let i = 0; i < arr.length - 1; i++) {
            if(arr[i] > arr[i+1]) {
                // [arr[i], arr[i+2]] = [arr[i+2], arr[i]];  not working?
                let temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                swapped = true;
            }
        }
    } while(swapped)
}

Big O = O(n^2)

--------------------------------------------------------

let arr = [8, 20, -2, 4, -6];

function insertionSort(arr) {
    for(let i = 1; i < arr.length; i++) {

        let nti = arr[i];
        let se = i - 1;

        while(se >= 0 && arr[se] > nti) {
            arr[se+1] = arr[se]
            se = se - 1;
        }

        arr[se+1] = nti;
    }
}

Big O = O(n^2)

--------------------------------------------------------

let arr = [8, 20, -2, 4, -6];

function quickSort(arr) {
    if(arr.length < 2) return arr

    let pivot = arr[arr.length - 1];
    let left = []
    let right = []

    for(let i = 0; i < arr.length - 1; i++) {
        if(arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)]
}

Big O = O(n logn)

*/