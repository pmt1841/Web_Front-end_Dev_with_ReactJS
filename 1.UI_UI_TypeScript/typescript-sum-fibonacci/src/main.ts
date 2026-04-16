function findFibonacci(arr: number[], count: number): number[] {
    if (arr.length >= count) {
        return arr;
    }

    if (arr.length === 0) {
        arr.push(0);
    } else if (arr.length === 1) {
        arr.push(1);
    } else {
        const len = arr.length;
        arr.push(arr[len - 1] + arr[len - 2]);
    }

    return findFibonacci(arr, count);
}

let result: number[] = findFibonacci([0, 1], 10);
let sum: number = 0;
for (let item of result) {
    console.log(item);
    sum += item;
}
console.log(`SUM: ${sum}`);