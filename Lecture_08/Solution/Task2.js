let fruits = ["apple", "banana", "mango"];

// Add "orange" to the start
fruits.unshift("orange");

// Replace "banana" with "kiwi"
let bananaIndex = fruits.indexOf("banana");
fruits[bananaIndex] = "kiwi";

// Join into a single string
let fruitsString = fruits.join(", ");
console.log(fruitsString);