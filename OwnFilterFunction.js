
//filter()- This method creates a new array with all elements that
// pass the test implemented by the provided function.


//Own filter method

//filter takes an array and function as argument
function ownFilter(array, filterFunction) {       
    //take empty array
    const filterArray = [];                    
    for(let i=0;i<array.length;i++)  //loop through array
    {
        const result = filterFunction(array[i], i, array); 
       
        if(result)
        filterArray.push(array[i]);    //push the current element if result is true
    }
    return filterArray;
}

let array = [8,5,12,23,77,30];
oddValue = ownFilter(array, value=>value % 2 !== 0);
console.log(oddValue);