//Function to check prime or not
const isPrime = function(number){
    if(number < 2)
        return false;
    if(number == 2)
        return true;
   for(let i = 2; i < number ; i++)
    if(number % i === 0)
        return false;

    return true;
}

function* getPrimes(num){
    for(let i=2;i<num;i++)
    {
        if(isPrime(i))
        yield i;
    }
}

console.log([...getPrimes(1000)]);
console.log([...getPrimes(100)]);
console.log([...getPrimes(10000)]);
