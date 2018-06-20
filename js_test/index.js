'use strict';

/**
 * 1) reverse function
 * @param arr
 */
function changeElement(arr){
    if(!Array.isArray(arr)) throw new Error('Аргумет - не массив');

    arr.splice(0, 2, arr[1], arr[0]);
}

/**
 * 2) sorting asc with builts-in method
 * @param arr
 */
function mySort(arr){
    if(!Array.isArray(arr)) throw new Error('Аргумент - не массив');

    arr.sort((previousElement, nextElement) => previousElement - nextElement);
}

/**
 * 2) a - sorting asc with bubble sorting
 * @param arr
 */
function mySortBubble(arr){
    if(!Array.isArray(arr)) throw new Error('Аргумент - не массив');

    let change = false;
    function swapElements(nestyArr, firstIndex, secondIndex){
        let firstItem = nestyArr[firstIndex];
        nestyArr[firstIndex] = nestyArr[secondIndex];
        nestyArr[secondIndex] = firstItem;
    }
    do{
        change = false;
        for(let i = 1; i < arr.length; i++){
            if(arr[i - 1] < arr[i]){
                swapElements(arr, i - 1, i);
                change = true;
            }
        }
    }while(change)
}

/**
 * 3) function bind with apply
 * @param fun
 * @param context
 * @returns {function(...[*]=): *}
 */
function myBindApply(fun, context=null){
    return (...values) =>{
        return fun.apply(context, values);
    }
}

/**
 * function bind with call
 * @param fun
 * @param context
 * @returns {function(...[*]): *}
 */
function mybindCall(fun, context=null){
    return (...values) =>{
        return fun.call(context, ...values);
    }
}

