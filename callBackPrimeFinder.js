
//Function to check prime or not
const isPrimeSync = function(number){
    if(number < 2)
        return false;
    if(number == 2)
        return true;
   for(let i = 2; i < number ; i++)
    if(number % i === 0)
        return false;

    return true;
}


const findPrimes= (min, max, callback ) => {

    let primes = []; //to hold all the prime values
    let low = min;
    //In one batch I will do 1000 or upto max, whichever is less
    let high = Math.min( low + 1000, max); 

    let interval1 = setInterval( ()=>{

        for(let i = low ; i < high ; i++)
            if(isPrimeSync(i))
                primes.push(i);
    
        low = high;
        high = Math.min(low + 100, max);
        if(low >= max){
            //time to finish
            clearInterval(interval1);
            //now I must return the result
            callback(primes); //call the callback 
        }

    },1); 
}


function testFindPrimes(min, max){
    findPrimes(min, max, primes => console.log(`${min}-${max} --> ${primes.length}`));
    console.log(`finding primes between ${min}-${max}`);
}

testFindPrimes(2, 10000); //should finish second
testFindPrimes(2, 100000); //should finish last
testFindPrimes(2, 100); //should finish firs
