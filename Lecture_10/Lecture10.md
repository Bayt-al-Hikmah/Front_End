## Learning Objectives

By the end of this lecture, students should be able to:

- Create functions using declarations, expressions, and arrow syntax.
- Explain parameters, arguments, return values, and variable scope.
- Use default parameters, rest parameters, and destructuring.
- Recognize callbacks, closures, and higher-order functions.
- Explain the purpose of pure functions and immutability.
- Describe how asynchronous JavaScript works with callbacks, Promises, and `async`/`await`.
- Use timers and the Fetch API to work with asynchronous operations.

## Why Functions Matter

A function is a reusable block of code designed to perform a particular task. Functions help divide a program into smaller pieces, reduce repeated code, and give meaningful names to operations. Instead of rewriting the steps required to calculate a price in several places, for example, we can create one function and call it whenever the calculation is needed.

A well-designed function usually has a clear purpose, receives the information it needs through parameters, and returns a result when appropriate. This makes it easier to test and maintain the program.

## Creating Functions

JavaScript supports several ways to create functions. The three forms introduced here are function declarations, function expressions, and arrow functions.

### Function Declarations

A function declaration uses the `function` keyword followed by a name and a parameter list:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Amira"));
```

The function is called by writing its name followed by parentheses. The value inside the parentheses is passed to the function as an argument. Function declarations are hoisted, so they can generally be called before their declaration appears in the source file. While this behavior is useful to know, placing declarations before their first use can make code easier to read.

### Function Expressions

A function expression creates a function value and assigns it to a variable:

```javascript
const greet = function (name) {
  return `Hello, ${name}!`;
};

console.log(greet("Amira"));
```

The function can be anonymous, as in this example, or it can have an internal name. Because the function is assigned to a `const` variable, it is available after that declaration has been evaluated.

### Arrow Functions

Arrow functions provide a shorter syntax and are widely used for callbacks and small functions:

```javascript
const greet = (name) => {
  return `Hello, ${name}!`;
};
```

When the function body contains only a single expression, braces and the `return` keyword can be omitted:

```javascript
const square = number => number * number;
const add = (a, b) => a + b;
```

Arrow functions do not have their own `this` value. This makes them useful for many callbacks, but they are not a direct replacement for every ordinary function. We will see why this matters when working with objects and classes.

## Parameters and Arguments

A **parameter** is a variable listed in a function definition. An **argument** is the value provided when the function is called.

```javascript
function describeStudent(name, age) { // name and age are parameters.
  return `${name} is ${age} years old.`;
}

console.log(describeStudent("Amira", 20)); // Arguments are "Amira" and 20.
```

If a function is called without providing a value for one of its parameters, the missing parameter normally receives `undefined`.

### Default Parameters

A default parameter provides a fallback value when the corresponding argument is missing or is `undefined`:

```javascript
function greet(name = "Guest", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log(greet());
console.log(greet("Amira"));
console.log(greet("Yacine", "Welcome"));
```

A default is not used for values such as `null`, `0`, or an empty string. Those are supplied values, even if they may be falsy.

### The `arguments` Object

Ordinary functions have access to a special array-like object named `arguments`. It contains the arguments passed to that function, even when the function has not declared a matching parameter for each one:

```javascript
function showArguments() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(`Argument ${i}: ${arguments[i]}`);
  }
}

showArguments("apple", "banana", "cherry");
```

The `arguments` object is not a real array, and it is not available inside arrow functions. In modern JavaScript, rest parameters are generally clearer when a function needs to accept a variable number of arguments.

### Rest Parameters

A rest parameter uses three dots (`...`) before the final parameter name. It gathers the remaining arguments into a real array:

```javascript
function greetGroup(greeting, ...names) {
  return `${greeting}, ${names.join(" and ")}!`;
}

console.log(greetGroup("Hello", "Amira", "Yacine", "Karim"));
```

A function can have only one rest parameter, and it must appear last in the parameter list.

### Destructuring Parameters

Destructuring allows a function to extract values from an object or array parameter directly:

```javascript
function displayUser({ name, age }) {
  console.log(`${name} is ${age} years old.`);
}

const user = { name: "Amira", age: 20 };
displayUser(user);
```

This can make functions easier to understand when they receive objects with several properties.

## Scope

**Scope** determines where a variable can be accessed. Understanding scope helps prevent naming conflicts and accidental changes to values.

### Global Scope

A variable declared at the top level of a script is generally available to other code in that script, subject to module and script rules. Such a variable is often called a global variable:

```javascript
const appName = "Student Portal";

function showAppName() {
  console.log(appName);
}
```

Global state should be limited where possible. A large number of global variables makes a program harder to reason about because many parts of the code can depend on or change the same values.

### Function Scope and Block Scope

Variables declared with `let` and `const` are **block-scoped**. They can be accessed inside the block in which they are declared and its nested blocks:

```javascript
if (true) {
  const message = "Inside the block";
  console.log(message);
}

// console.log(message); // ReferenceError: message is outside its scope.
```

A variable declared with `var` is function-scoped rather than block-scoped. For modern code, prefer `const` and `let` to avoid some of the surprising behavior associated with `var`.

## Returning Values

A function can send a result back to the code that called it by using `return`. When JavaScript reaches a return statement, the function finishes and passes the specified value back to the caller.

```javascript
function calculateTotal(price, quantity) {
  return price * quantity;
}

const total = calculateTotal(500, 3);
console.log(total); // 1500
```

A function without an explicit return value returns `undefined`. A return statement also ends the function immediately, so statements after it in the same execution path do not run.

### Returning Multiple Values

JavaScript functions return one value. When several related values are needed, we commonly return an array or object:

```javascript
function getMinAndMax(numbers) {
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}

const result = getMinAndMax([4, 9, 2, 7]);
console.log(result.min, result.max);
```

The object form is useful because the result's fields have descriptive names.

### Returning a Function and Closures

A function can return another function. The inner function can continue to access variables from the scope in which it was created. This behavior is called a **closure**.

```javascript
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

The variable `count` is not accessible directly from outside `createCounter()`, but the returned function retains access to it. Closures are useful for maintaining private state and creating configurable functions.

## Recursion

A recursive function calls itself to solve a smaller version of the same problem. Every recursive solution needs a **base case** that stops further calls. Without a base case, the function may continue calling itself until the program encounters a stack overflow.

```javascript
function countdown(number) {
  if (number <= 0) {
    console.log("Finished!");
    return;
  }

  console.log(number);
  countdown(number - 1);
}

countdown(5);
```

The base case is `number <= 0`. Each recursive call moves the argument closer to that condition. Recursion is useful for tree structures and problems that naturally divide into smaller versions, but an ordinary loop may be more appropriate for simple repetition.

## Callbacks and Higher-Order Functions

JavaScript treats functions as values. A function can be stored in a variable, passed as an argument, or returned from another function. A function that accepts another function as an argument or returns a function is called a **higher-order function**.

A **callback** is a function passed to another function so that it can be called later:

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}

function processUser(callback) {
  const name = "Amira";
  callback(name);
}

processUser(greet);
```

Callbacks are used in event handling, array methods, and asynchronous operations. For example, an event listener receives a callback that runs when a user clicks a button.

### Callback Nesting

When several asynchronous operations depend on one another, placing callbacks inside callbacks can produce deeply nested code. This is often called **callback hell** because the logic becomes difficult to follow and maintain.

```javascript
getUser(userId, function (user) {
  getPosts(user.id, function (posts) {
    getComments(posts[0].id, function (comments) {
      console.log(comments);
    });
  });
});
```

Promises and `async`/`await` provide more manageable ways to express many asynchronous workflows.

## Functional Programming Concepts

**Functional programming** is a programming style that emphasizes functions, predictable transformations, and reduced reliance on shared mutable state. JavaScript supports both functional and object-oriented approaches; they can be combined in the same application.

### Pure Functions

A **pure function** produces the same output whenever it receives the same input and does not cause observable side effects, such as changing global state or modifying an input object.

```javascript
function add(a, b) {
  return a + b;
}
```

This function is pure because its result depends only on its arguments. By contrast, a function that changes a global variable or writes to the page has a side effect.

Pure functions are easier to test because they do not depend on hidden external state.

### Immutability

Immutability means avoiding changes to existing data and creating updated values instead. JavaScript does not enforce immutability for ordinary objects and arrays, but developers can follow immutable patterns:

```javascript
const originalScores = [10, 15, 20];
const updatedScores = [...originalScores, 25];
```

The spread syntax creates a new array, leaving the original unchanged. This example is a shallow copy; nested objects still require care.

### First-Class and Higher-Order Functions

Functions are **first-class values** in JavaScript because they can be assigned to variables, stored in arrays or objects, passed as arguments, and returned from other functions. Higher-order functions use this capability to accept or return functions.

Array methods such as `forEach()`, `map()`, and `filter()` are common examples. We can use callbacks to define the operation to perform on each value.

### Referential Transparency

An expression is referentially transparent when it can be replaced by its result without changing the program's behavior. Pure functions support this property because their output depends only on their inputs. Referential transparency makes complex logic easier to reason about and test.

## Asynchronous JavaScript

Some operations take time. A network request, a timer, or reading a file may not finish immediately. If the browser waited synchronously for every such operation, the page could become unresponsive. JavaScript therefore provides asynchronous APIs that allow an operation to complete later while other work continues.

JavaScript in the browser uses an event loop to coordinate synchronous code, queued callbacks, and Promise-related work. A useful beginner-level rule is: synchronous statements run in order, while an asynchronous operation schedules work that can complete later.

## Promises

A **Promise** is an object that represents the eventual success or failure of an asynchronous operation. A Promise has three states:

| State | Meaning |
| --- | --- |
| `pending` | The operation has not completed yet. |
| `fulfilled` | The operation completed successfully. |
| `rejected` | The operation failed. |

A Promise is created with the `Promise` constructor, which receives an executor function. The executor is called with two functions: `resolve` and `reject`.

```javascript
function makeCoffee(type) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (type === "espresso") {
        resolve("Your espresso is ready.");
      } else {
        reject(new Error("This coffee is not available."));
      }
    }, 1000);
  });
}

makeCoffee("espresso")
  .then(message => console.log(message))
  .catch(error => console.error(error.message));
```

The `.then()` method handles a fulfilled result. The `.catch()` method handles a rejection. A `.finally()` callback can run after either outcome, for example to clean up a loading indicator.

## Async Functions and `await`

An **async function** always returns a Promise. Inside an async function, the `await` keyword pauses that function until a Promise settles. It does not block the entire browser or stop unrelated JavaScript from running.

```javascript
async function loadMessage() {
  console.log("Starting...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("One second has passed.");
}

loadMessage();
console.log("This line can run while loadMessage is waiting.");
```

In this example, the call to `loadMessage()` begins executing immediately. When it reaches `await`, the function pauses and returns control to the surrounding code. It continues after the Promise settles.

### Handling Errors with `try...catch`

An awaited Promise can reject. Use `try...catch` to handle errors in an async function:

```javascript
async function loadUser() {
  try {
    const response = await fetch("https://example.com/api/user");
    console.log("Request completed with status:", response.status);
  } catch (error) {
    console.error("The request could not be completed:", error);
  }
}
```

The Fetch API has an important detail: a response with an HTTP error status such as `404` does not normally cause `fetch()` to reject. The request itself may have succeeded at the network level, even though the server reported an error. Check `response.ok` to detect unsuccessful HTTP status codes; Lecture 12 will use this pattern in a complete example.

### Running Independent Operations Together

If two asynchronous tasks do not depend on each other's results, they can often be started together with `Promise.all()` rather than waiting for one before starting the next:

```javascript
async function loadDashboard() {
  const [usersResponse, productsResponse] = await Promise.all([
    fetch("https://example.com/api/users"),
    fetch("https://example.com/api/products")
  ]);

  console.log(usersResponse.status, productsResponse.status);
}
```

The example URLs are placeholders; a working application must use real API endpoints. `Promise.all()` rejects if any input Promise rejects. Other Promise combinators are available for different requirements.

## Timers

The browser provides timer functions for scheduling work. `setTimeout()` schedules a callback to run once after a delay. `setInterval()` schedules a callback to run repeatedly at a requested interval.

```javascript
setTimeout(() => {
  console.log("This message is scheduled once.");
}, 2000);
```

```javascript
let count = 0;

const intervalId = setInterval(() => {
  count++;
  console.log(`Tick ${count}`);

  if (count === 5) {
    clearInterval(intervalId);
  }
}, 1000);
```

The delay is a minimum scheduling delay, not a guarantee that the callback will run at the exact requested time. The browser may run it later when the main thread is busy or the page is in the background. Use `clearTimeout()` and `clearInterval()` when a scheduled operation is no longer needed.

## Fetching Data from an API

The **Fetch API** provides a Promise-based way to make HTTP requests from JavaScript. It is commonly used by front-end applications to request data from a server.

```javascript
async function loadProducts() {
  try {
    const response = await fetch("https://example.com/api/products");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const products = await response.json();
    console.log(products);
  } catch (error) {
    console.error("Could not load products:", error);
  }
}

loadProducts();
```

The `fetch()` call resolves to a `Response` object. The `response.ok` property indicates whether the HTTP status is in the successful range. The `response.json()` method reads and parses a JSON response and itself returns a Promise.

A front-end application should also consider loading and error states. For example, while products are being loaded, the page can display a progress message; if the request fails, it can show a helpful error and allow the user to try again.

## Key Takeaways

- Functions organize code into reusable units.
- Parameters receive values, and `return` sends a result back to the caller.
- Scope determines where a variable can be accessed.
- Closures allow an inner function to retain access to its outer function's variables.
- Callbacks are functions passed to other functions for later execution.
- Pure functions and immutable patterns help reduce hidden side effects.
- Promises represent future results, and `async`/`await` makes Promise-based code easier to read.
- `fetch()` requests data, but the application should inspect `response.ok` and handle errors.

## Practice Exercises

### Task 1 — Counter with a Closure

Write a function `makeCounter()` that returns another function. The returned function should increment a private counter and return its value. When the counter reaches `5`, reset it to `0` before the next increment or immediately after returning `5`; choose one behavior and document it clearly.

### Task 2 — Create a `filter` Function

Write a function `filter(fn, arr)` that accepts a callback and an array, then returns a new array containing only the values for which the callback returns a truthy result. Test it with a function that accepts only even numbers.

### Task 3 — Create a `map` Function

Write a function `map(fn, arr)` that returns a new array containing the result of calling `fn` for each item in `arr`. Test it with an arrow function that doubles every number.

### Task 4 — Promise-Based Upload Simulation

Simulate a three-step upload workflow:

1. `selectFile()` returns a Promise that resolves with `"myPhoto.png"`.
2. `uploadFile(file)` returns a Promise that resolves after 1.5 seconds with `"Upload complete: " + file`.
3. `confirmUpload(message)` displays the message and returns a resolved Promise.

Chain the Promises so that each operation starts only after the previous one succeeds. Add a `.catch()` handler to display an error if one of the steps fails.

### Task 5 — Asynchronous Countdown

Create a helper function `sleep(ms)` that returns a Promise which resolves after `ms` milliseconds. Then write an `async` function `countdown(n)` that logs the current number, waits one second, and continues until it reaches zero. Finally, log `Countdown finished!`. Use recursion or a loop, and explain why `await` pauses the countdown function without blocking the whole page.
