function makeCounter() {
  let count = 0;
  
  return function () {
    const current = count;
    count = (count + 1) % 6; // Reset to 0 after 5
    return current;
  };
}

const counter = makeCounter();

console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
console.log(counter()); // 4
console.log(counter()); // 5
console.log(counter()); // 0
console.log(counter()); // 1