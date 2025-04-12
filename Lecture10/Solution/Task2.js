function filter(fn, arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }
  return result;
}

function isEven(x) {
  return x % 2 === 0;
}

const numbers = [1, 2, 3, 4, 5, 6];
const evens = filter(isEven, numbers);

console.log(evens); 