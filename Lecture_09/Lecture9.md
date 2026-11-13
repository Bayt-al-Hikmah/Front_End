## Learning Objectives

By the end of this lecture, students should be able to:

- Compare values using equality and relational operators.
- Combine conditions with logical operators.
- Explain truthy and falsy values in conditional expressions.
- Choose an appropriate conditional structure.
- Repeat instructions using `while`, `do...while`, and `for` loops.
- Iterate through arrays and object properties.

## Introduction to Control Flow

So far, most examples have executed from top to bottom. Real applications need to make decisions and repeat operations. A program may display a different message depending on the user's input, show a discount when an order meets a condition, or process every product in a list.

**Control flow** describes the order in which statements execute. JavaScript provides comparison operators, logical operators, conditional statements, and loops to control that order.

## Comparison Operators

Comparison operators evaluate the relationship between two values and return a boolean result (`true` or `false`). They are commonly used in conditions.

| Operator | Meaning | Example |
| --- | --- | --- |
| `===` | Strictly equal | `5 === 5` is `true` |
| `!==` | Strictly not equal | `5 !== "5"` is `true` |
| `==` | Equal after type coercion | `5 == "5"` is `true` |
| `!=` | Not equal after type coercion | `5 != "5"` is `false` |
| `>` | Greater than | `8 > 5` is `true` |
| `<` | Less than | `3 < 5` is `true` |
| `>=` | Greater than or equal to | `5 >= 5` is `true` |
| `<=` | Less than or equal to | `4 <= 5` is `true` |

### Strict and Loose Equality

The `==` and `!=` operators may convert values to a common type before comparing them. This behavior is known as **type coercion**:

```javascript
console.log(5 == "5");  // true
console.log(5 === "5"); // false
```

The strict equality operator (`===`) checks both type and value without performing the same kind of coercion. In most application code, use `===` and `!==` because they make comparisons more predictable. Loose equality has some specific rules and can be encountered in older code, so it is still useful to recognize.

### Relational Comparisons

The operators `>`, `<`, `>=`, and `<=` compare values. When both operands are strings, JavaScript compares them lexicographically rather than as numbers. Convert text input to a number before performing numeric comparisons:

```javascript
const enteredAge = Number("18");
console.log(enteredAge >= 18); // true
```

## Logical Operators

Logical operators combine or invert conditions. They are useful when a decision depends on more than one piece of information.

### AND (`&&`)

The AND operator requires both conditions to be truthy for the overall expression to be truthy:

```javascript
const hasAccount = true;
const hasPassword = true;

console.log(hasAccount && hasPassword); // true
```

### OR (`||`)

The OR operator is truthy when at least one operand is truthy:

```javascript
const hasEmail = false;
const hasPhone = true;

console.log(hasEmail || hasPhone); // true
```

### NOT (`!`)

The NOT operator reverses the truthiness of a value:

```javascript
const isBlocked = false;
console.log(!isBlocked); // true
```

### Truth Table

| A | B | A `&&` B | A `||` B | `!A` |
| --- | --- | --- | --- | --- |
| `true` | `true` | `true` | `true` | `false` |
| `true` | `false` | `false` | `true` | `false` |
| `false` | `true` | `false` | `true` | `true` |
| `false` | `false` | `false` | `false` | `true` |

JavaScript's `&&` and `||` operators do not always return the literal boolean values `true` or `false`; they return one of their operands. In an `if` condition, JavaScript evaluates the resulting value using truthiness. This behavior is also used for short-circuit expressions.

## Conditional Statements

A conditional statement allows a program to choose which block of code should run. The condition is evaluated, and the program follows the branch that matches the result.

### The `if` Statement

Use `if` when a block should execute only when a condition is true:

```javascript
const temperature = 28;

if (temperature > 25) {
  console.log("It is a warm day.");
}
```

### The `if...else` Statement

Use `else` when the program needs an alternative path:

```javascript
const isLoggedIn = false;

if (isLoggedIn) {
  console.log("Welcome back!");
} else {
  console.log("Please sign in.");
}
```

### The `else if` Chain

When several conditions must be checked in order, use `else if`:

```javascript
const score = 82;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 75) {
  console.log("Very good");
} else if (score >= 60) {
  console.log("Passed");
} else {
  console.log("Needs more practice");
}
```

The first matching branch executes. Therefore, the order of conditions matters. In this example, a score of `82` enters the second branch and later conditions are skipped.

### The `switch` Statement

A `switch` statement is useful when one expression is compared against several known values. Each matching `case` normally ends with `break` to prevent execution from continuing into the next case.

```javascript
const role = "student";

switch (role) {
  case "admin":
    console.log("Full access");
    break;
  case "teacher":
    console.log("Teacher dashboard");
    break;
  case "student":
    console.log("Student dashboard");
    break;
  default:
    console.log("Unknown role");
}
```

The `default` branch runs when no case matches. A switch comparison uses strict equality semantics for its case values.

## Loops

A **loop** repeats a block of code. Loops reduce repetition and are essential when processing collections or repeating an operation until a condition changes.

Every loop needs a clear stopping condition. An incorrect condition can create an infinite loop, so make sure the values controlling the loop are updated as expected.

### The `while` Loop

A `while` loop checks its condition before each iteration. If the condition is false at the beginning, the body does not run:

```javascript
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}
```

The variable `count` is initialized before the loop and increased after each iteration. When it becomes `6`, the condition is false and the loop ends.

A real-life example is repeating an action until a container is full. The loop continues while there is still space, and a condition eventually becomes false when the container is full.

### The `do...while` Loop

A `do...while` loop checks its condition after executing the body. Therefore, it always runs at least once:

```javascript
let attempts = 0;

do {
  console.log("Checking connection...");
  attempts++;
} while (attempts < 3);
```

This form is useful when an operation must happen once before the program decides whether it should repeat.

### The `for` Loop

A `for` loop combines initialization, condition checking, and an update expression in one structure:

```javascript
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}
```

The three parts are separated by semicolons:

1. `let i = 0` initializes the counter.
2. `i < 5` is checked before each iteration.
3. `i++` updates the counter after each iteration.

A `for` loop is convenient when the number of iterations is known or when an index is needed.

### Iterating Through an Array

An indexed `for` loop gives access to both the array index and its value:

```javascript
const colors = ["red", "green", "blue"];

for (let i = 0; i < colors.length; i++) {
  console.log(i, colors[i]);
}
```

The `for...of` loop provides a simpler way to read each value from an iterable such as an array or string:

```javascript
for (const color of colors) {
  console.log(color);
}
```

Use an indexed loop when the index is needed. Use `for...of` when the value itself is what matters.

### Iterating Through an Object

The `for...in` loop iterates over enumerable property keys of an object:

```javascript
const person = {
  name: "Amira",
  age: 20
};

for (const key in person) {
  if (Object.hasOwn(person, key)) {
    console.log(`${key}: ${person[key]}`);
  }
}
```

The `Object.hasOwn()` check ensures that the loop handles properties owned by the object itself rather than inherited properties. Another common approach is `Object.entries()` with `for...of`:

```javascript
for (const [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
```

### Controlling a Loop with `break` and `continue`

The `break` statement exits the nearest loop immediately. The `continue` statement skips the remainder of the current iteration and moves to the next one.

```javascript
for (let number = 1; number <= 10; number++) {
  if (number === 6) {
    break;
  }
  console.log(number); // Prints 1 through 5.
}
```

```javascript
for (let number = 1; number <= 5; number++) {
  if (number % 2 === 0) {
    continue;
  }
  console.log(number); // Prints 1, 3, 5.
}
```

Use these statements when they make the loop's intent clearer. A loop with a simple condition is often easier to understand than a loop with many jumps.

## Key Takeaways

- Comparison operators produce boolean results.
- Prefer strict equality (`===` and `!==`) in most application code.
- Logical operators combine or invert conditions.
- Conditional statements choose between different execution paths.
- `while` checks before running, while `do...while` checks after running.
- `for` is useful when the number of iterations or index is known.
- `for...of` iterates over values; `for...in` iterates over enumerable property keys.

## Practice Exercises

### Task 1 — Weather Decision

Create two boolean variables, `isRaining` and `isWarm`. Use conditional and logical operators to display the correct message for each combination:

- If it is raining and not warm, print `Bring an umbrella and wear a jacket.`
- If it is raining but warm, print `Bring an umbrella but no jacket needed.`
- If it is not raining but warm, print `No umbrella needed, but wear light clothes.`
- If it is neither raining nor warm, print `No umbrella and no jacket needed.`

Test all four possible combinations of the variables.

### Task 2 — FizzBuzz

Write a program that prints the numbers from 1 to 100. For numbers divisible by 3, print `Fizz`. For numbers divisible by 5, print `Buzz`. For numbers divisible by both 3 and 5, print `FizzBuzz`. For all other numbers, print the number itself.

**Hint:** Check divisibility by both 3 and 5 before checking each condition separately.

### Task 3 — Find the Next Prime Number

Write a program that finds the first prime number greater than a given value `n`. Start checking at `n + 1`, test whether each candidate has a divisor other than 1 and itself, and stop when a prime is found.

Use a loop to test successive candidates and a nested loop to check divisibility. Consider testing divisors only up to the square root of the candidate to avoid unnecessary work. Handle small or negative starting values correctly.
