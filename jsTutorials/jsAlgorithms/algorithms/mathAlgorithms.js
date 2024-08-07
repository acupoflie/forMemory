
/*
    function fibonacci(n) {
        const fib = [0,1];
        for(let i = 2; i < n; i++) {
            fib[i] = fib[i-1] + fib[i-2];
        }
        return fib;
    }

    Big O = O(n)

--------------------------------------------------------

    function factorial(n) {
        let result = 1;
        for(let i = 2; i <= n; i++) {
            result = result * i
        }
        return result
    }

    Big O = O(n)

--------------------------------------------------------

    function isPrime(n) {
        if(n < 2) {
            return false
        }
        for(let i = 2; i <= Math.sqrt(n); i++){
            if(n%i === 0) {
                return false
            }
        }
        return true
    }

    Big O = O(sqrt(n))  log n

    Note: Integers larger than the square root don't need to be checked
    Ex: n=24, a=4, b=6 - square of 24 is 4.89, and a is less than 4.89, so n is not prime

--------------------------------------------------------

function isPowerOfTwo(n) {
    if(n < 1) {
        return false
    }
    while(n > 1) {
        if(n%2 !== 0) {
            return false
        }
        n = n/2
    }
    return true
}
Big O = O(log n)

function isPowerOfTwoBitwise(n) {
    if(n < 1) {
        return false
    }
        !important
    return (n & (n-1)) === 0
}
    Note:
        1 -> 1
        2 -> 10
        4 -> 100
        8 -> 1000
Big O = O(1)

--------------------------------------------------------

function recursiveFibonacci(n) {
    if(n < 2) {
        return n
    }
    return recursiveFibonacci(n-1) + recursiveFibonacci(n-2)
}

console.log(recursiveFibonacci(0))
console.log(recursiveFibonacci(1))
console.log(recursiveFibonacci(6))

 Big O = O(2^n) - Recursive  -  Terrible solution

 --------------------------------------------------------


function factorial(n) {
    if (n < 3) {
        return n
    }
    return n * factorial(n-1);
}

function recursiveFactorial(n){
    if(n === 0) {
        return 1
    }
    return n * recursiveFactorial(n-1);
}

Big O = O(n)

*/