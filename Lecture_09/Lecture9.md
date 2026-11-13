# Lecture 09 — Conditions and Loops

> **Core idea:** Operators produce Boolean values; conditions choose a path, and loops repeat work while a condition or sequence supplies values.

## Learning goals
- Compare values with strict operators and combine conditions with logical operators.
- Choose between `if...else` and `switch` for branching.
- Select a loop that matches the stopping rule or collection being processed.
## Comparison and logical operators
Comparison operators produce a Boolean result. Logical operators combine conditions or select values.
### Comparison operators
Use comparison operators to test equality or ordering:
#### Common operators
- **`==`**: Compares after type coercion. Prefer strict equality unless coercion is intentional.
```
let a = 4;
let b = 6;
console.log(a == b); // false
let a = 4;
let b = "4";
console.log(a == b); // true
```
- **`!=`**: Coercing inequality; prefer `!==` in ordinary comparisons.
```
let a = 4;
let b = 6;
console.log(a != b); // true
let a = 4;
let b = "4";
console.log(a != b); // false
```
- **`===`**: Strict equality; values must have compatible types and compare equal.
```
let a = 4;
let b = "4";
console.log(a === b); // false
```
- **`!==`**: Strict inequality; true when strict equality is false.
```
let a = 4;
let b = "4";
console.log(a !== b); // true
```
- **`>`**: Checks if greater **than**
```
let a = 4;
let b = 6;
console.log(a > b); // false
```
- **`<`**: Checks if smaller **than**
```
let a = 4;
let b = 6;
console.log(a < b); // true
```
- **`>=`**: Checks if greater than or equal to
```
let a = 4;
let b = 6;
console.log(a >= b); // false
```
- **`<=`**: Checks if less than or equal to
```
let a = 4;
let b = 6;
console.log(a <= b); // true
```
### Logical operators
Logical operators are often used with Boolean conditions. In JavaScript, `&&` and `||` return one of their operands; they do not always return a Boolean.
#### Common operators

- **`&&` (AND)**: Returns the first falsy operand, or the second operand if both are truthy. In a Boolean condition, the result is true only when both sides are truthy.
```
let isSunny = true;  
let isWarm = true;  
console.log(isSunny && isWarm); // true
```
- **`||` (OR)**: Returns the first truthy operand, or the second operand if neither is truthy. In a Boolean condition, it is true when at least one side is truthy.
```
let hasCoffee = false;  
let hasTea = true;  
console.log(hasCoffee || hasTea); // true
```
- **`!` (NOT)**: Converts its operand to Boolean and inverts it.
```
let isDark = false;  
console.log(!isDark); // true
```
#### Truth Table for Logical Operators:

|**A**|**B**|**A && B**|**A \| B**|**!A**|
|---|---|---|---|---|
|true|true|true|true|false|
|true|false|false|true|false|
|false|true|false|true|true|
|false|false|false|false|true|
## Conditional statements
Conditions choose which block of code runs.
### `if...else`
Use `if`, optional `else if` branches, and optional `else` to handle Boolean conditions:
####  Single Condition
Runs the block when the condition is truthy:
```
if (condition) {  
  // Code to run if condition is true  
}  
```
####  Condition with Alternative

Choose one of two paths:
```
if (condition) {  
  // Code to run if true  
} else {  
  // Code to run if false  
}  
```
#### Multiple Conditions
Check alternatives in order; the first truthy condition wins:
```
if (condition1) {  
  // Code for condition1  
} else if (condition2) {  
  // Code for condition2  
} else {  
  // Default code if all conditions fail  
}
```
### Switch Case Statements
`switch` compares one expression with case values using strict equality. Add `break` to stop before the next case; without it, execution falls through. Use `default` for unmatched values.
```
switch (expression) {  
  case value1:  
    // Code for value1  
    break;  
  case value2:  
    // Code for value2  
    break;  
  default:  
    // Code if no case matches  
}
```
#### Example 
```
let day = "Monday";  
switch (day) {  
  case "Monday":  
    console.log("Weekday 1");  
    break;  
  case "Tuesday":  
    console.log("Weekday 2");  
    break;  
  default:  
    console.log("Not Monday/Tuesday");  
}
// It will display "Weekday 1"
```
## Loops
Loops repeat code. Choose one based on how repetition ends: a condition, a counter, or an iterable.
### While Loop
`while` checks its condition before each iteration and stops when it becomes falsy. Make sure the loop can reach that stopping condition.
#### Example
Imagine pouring water into a cup until it’s full. Here’s how this translates to a `while` loop:
```
let isNotFull = true;  

while (isNotFull) {  
  console.log("Adding water...");  
  // Eventually, set isNotFull = false when the cup is full  
}
```
**Condition**: `isNotFull` keeps the loop running.  
**Action**: The loop keeps "adding water" until the condition fails.
### Do While Loop
`do...while` checks its condition after the body, so it always runs at least once. A `while` loop may run zero times.
#### Example
The previous example of pouring water into a cup can be rewritten using a `do...while` loop as follows
```
let isNotFull = false;

do {  
  console.log("Adding water..."); // This runs ONCE, even though the condition is false  
} while (isNotFull);  
```
### For Loop
`for` puts initialization, condition, and update in one header. It is useful when a counter or index controls repetition.
#### Repeat Code N Times
This loop runs five times, with `i` taking values 0 through 4:
```
for (let i = 0; i < 5; i++) {
  console.log("This runs 5 times");
}
```
#### Using Number Ranges
Use a counter and end condition to walk through a range:
```
for (let num = 10; num <= 15; num++) {
  console.log(num);
}
```
#### Array Iteration (Traditional)
Use an indexed loop when the index is needed:
```
const colors = ['red', 'green', 'blue'];
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
```
#### Array Iteration (for...of)
Use `for...of` to visit an iterable’s values:
```
const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log(color); 
}
```
#### Object Iteration (for...in)
`for...in` visits enumerable string-keyed properties, including inherited ones. Check ownership when you need only the object’s own properties:
```
const person = {name: 'Alex', age: 30};
for (const key in person) {
  if (Object.hasOwn(person, key)) {
    console.log(`${key}: ${person[key]}`);
  }
}
```
For a concise loop over own entries, use `Object.entries(person)` with `for...of`.
## Task
### Task 1
Create a script that simulates a decision-making process based on weather conditions. The script should:
- Declare variables `isRaining` and `isWarm` (both Boolean values).
- Use a combination of **logical operators** to decide whether you need to bring an umbrella and wear a jacket:
    - If it is raining and not warm, print "Bring an umbrella and wear a jacket."
    - If it is raining but warm, print "Bring an umbrella but no jacket needed."
    - If it is not raining but warm, print "No umbrella needed, but wear light clothes."
    - If it is neither raining nor warm, print "No umbrella and no jacket needed."
### Task 2
Write a script that prints numbers from 1 to 100, but with a twist:
- For numbers divisible by 3, print "Fizz".
- For numbers divisible by 5, print "Buzz".
- For numbers divisible by both 3 and 5, print "FizzBuzz".
- For all other numbers, print the number itself.
### Task 3
Write a script that uses a **`while` loop** to find the first prime number greater than n. The script should:
- Start from the number n and check each number to see if it is prime.
- To check if a number is prime, use another **`while` loop** inside the main loop to check divisibility of the number by any number less than it.
- Once a prime number is found, print it and exit the loop.
