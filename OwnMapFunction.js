
// map() - It creates a new array with the result of calling
// a provided function on every element in the calling array.


//own map function

//map takes an array and function as argument
function ownMap(array, mapFunction){
    //take an empty array
    const mapArray = [];

    //loop through array
    for(let i=0;i<array.length;i++)
    {
        const result = mapFunction(array[i], i, array);
        mapArray.push(result);
    }
    return mapArray;
}

let array = [2,4,8,5,3,9];
squareOfArray = ownMap(array, value => value**2);
console.log(squareOfArray);