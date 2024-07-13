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

*/