let add = function(x,y){
    return x + y;
}

console.log(add(5,6));

let add2 = (x, y) => {return x + y};    // curly braces we must return
add2 = (x, y) => x + y;

console.log(add2(5,6));

// let isEven = (x) => x%2 == 0 
// green if even and red if false
let isEven = (x) => x%2 == 0 ? 'green' : 'red'     // boolean expression ? true : false
console.log(isEven(7))
console.log(isEven(8))

const arr = [1,2,3,4,5,6,7,8,9];

let sqrArr = (arr) => {
    let tempArr = [];
    for (const v of arr) {
        tempArr.push(v*v);
    }

    return tempArr;
}

console.log(sqrArr(arr));

let printLine = ()=>{console.log("------------------------")};

printLine();