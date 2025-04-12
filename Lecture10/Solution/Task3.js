function map(fn, arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(fn(arr[i]));
  }
  return result;
}

const numbers = [1, 2, 3, 4];
const doubledNumbers = map(x => x * 2, numbers);
console.log(doubledNumbers);