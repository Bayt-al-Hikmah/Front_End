let firstName = "luna";
let birthYear = "2000";
let currentYear = 2025;
// Capitalize first letter
firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

// Convert birthYear to number and calculate age
let age = currentYear - Number(birthYear);

// Build the sentence
let sentence = `${firstName} is ${age} years old.`;
console.log(sentence);