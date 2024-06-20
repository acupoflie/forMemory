
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
        if(n%1 !== 0) {
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
    return (n & (n-1)) === 0
}
Big O = O(1)

*/