# Lecture 10 — Functions and Asynchronous JavaScript

> **Core idea:** Functions package reusable behavior; asynchronous code lets an application wait for work without blocking the browser’s main thread.

## Learning goals
- Define functions, pass arguments, return values, and reason about scope.
- Recognize callbacks, higher-order functions, and core functional programming ideas.
- Use promises, `async`/`await`, timers, and `fetch` to coordinate asynchronous work.
## Functions and functional programming
Functional programming emphasizes composing functions and limiting shared mutable state. JavaScript supports this style without requiring every part of a program to be purely functional.
### Creating functions
JavaScript functions can be written as declarations, expressions, or arrow functions.
#### Function declaration
A declaration names the function and its parameters:
```
function greet(name) {
  return "Hello, " + name;
}
greet("Alice"); // calling the function

```
#### Function expression
A function expression is a value that can be assigned to a variable:
```
const greet = function(name) {
  return "Hello, " + name;
};
greet("Alice"); // calling the function
```
#### Arrow function
Arrow functions use `=>`. A concise body returns its expression; a braced body needs an explicit `return`. Arrow functions do not have their own `this` or `arguments`.
```
const greet = name => `Hello, ${name}`;
greet("Alice");
```
### Scope
**Scope** determines where a binding can be accessed. JavaScript uses lexical scope: nested code can access bindings from enclosing scopes.
#### Top-level scope
At the top level, `let` and `const` are available within their script or module. Browser classic scripts and modules differ in how top-level declarations interact with the global object; avoid unnecessary globals.
#### Function and block scope
Parameters and local declarations are available inside their function. `let` and `const` are also limited to the block where they are declared.
### Parameters 
Parameters are names in a function definition; arguments are values passed when calling it.
```
function greet(name, age) {
	return `Hello, ${name}! You are ${age} years old.`; 
}
```
Here, `name` and `age` are parameters. If an argument is omitted, its parameter value is `undefined` unless a default is provided.
#### Default Parameters
Default parameters apply when an argument is omitted or explicitly `undefined`; `null` does not trigger the default.
```
function greet(name = "Guest", greeting = "Hello") {
  console.log(`${greeting}, ${name}!`);
}

greet(); // "Hello, Guest!" (uses both defaults)
greet("Alice"); // "Hello, Alice!" (uses default greeting)
```
#### The Arguments Object
Regular functions can read the array-like `arguments` object, which contains the arguments passed to the call:
```
function logAllArguments() { 
	for (let i = 0; i < arguments.length; i++) { 
		console.log(`Argument ${i}: ${arguments[i]}`); 
		} 
} 
logAllArguments("apple", "banana", "cherry"); 
// Outputs: 
// Argument 0: apple 
// Argument 1: banana 
// Argument 2: cherry
```
`arguments` is not an array. Convert it with `Array.from()` to use array methods:
```
function sumAll() { 
	const args = Array.from(arguments); 
	console.log(args) 
}
```
However, the `arguments` object has some limitations:
- It's not available in arrow functions
- It can be confusing in nested functions
- It doesn't have array methods by default
#### Rest Parameters
Use a rest parameter (`...name`) to collect remaining arguments into a real array. It must be the final parameter:
```
function greet(greeting, ...names) {
  console.log(`${greeting}, ${names.join(' and ')}!`);
}
greet('Hello', 'Alice', 'Bob'); // "Hello, Alice and Bob!"
```
#### Argument Destructuring
Object destructuring in a parameter extracts properties into local bindings. A default can handle a missing property:
```
function printUser({ name, age, country = "Unknown" }) {
  console.log(`${name} (${age}) from ${country}`);
}

const user = { name: "Alice", age: 28 };
printUser(user); // "Alice (28) from Unknown"
```
#### Passing values to functions
JavaScript passes all arguments by value. For an object, the copied value is a reference, so a function can mutate the same object; reassigning its parameter does not reassign the caller’s variable.
```
function modifyPrimitive(num) { 
	num = num * 2; 
	console.log(num); // 10 
} 
let x = 5; 
modifyPrimitive(x); 
console.log(x); // Still 5, unchanged 
function modifyObject(obj) { 
	obj.name = "Modified"; 
	console.log(obj.name); // "Modified" 
	} 
let user = { name: "Original" }; 
modifyObject(user); 
console.log(user.name); // "Modified", the original object was changed
```
### Functions Returning Values
#### Return Statements in Functions
Every function returns a value. Without an explicit `return`, it returns `undefined`:
```
function greet(name) { 
	console.log(`Hello, ${name}!`);
	} 
const result = greet("Alice"); // Logs: "Hello, Alice!" 
console.log(result); // undefined
```
`return` immediately exits the function; later statements in that call do not run:
```
function add(a, b) { 
	return a + b; // Code after return is never executed 
	console.log("This will never run"); 
} 
const sum = add(5, 3); // 8
```
#### Returning Multiple Values
Return an array or object when a function needs to provide several related values:
```
function getUserStats(user) { 
	return { 
		name: user.name, 
		postsCount: user.posts.length, 
		followersCount: user.followers.length 
	}; 
}
```
### Returning functions
Functions are values. A **function factory** returns a function configured with values it closes over:
```
function multiplier(factor) {
  return function(x) {
    return x * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```
**Closure:** A closure is a function together with access to bindings from its lexical scope, even after the outer function has returned.
```
function counter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  };
}

const increment = counter();
console.log(increment()); // 1
console.log(increment()); // 2
```
**Higher-order functions** take a function as an argument, return a function, or both.
```
function greet(name) {
  return `Hello, ${name}!`;
}

function processUserInput(callback) {
  const name = "Alice";
  console.log(callback(name));
}

processUserInput(greet);
```
### Recursion
A recursive function calls itself until it reaches a **base case**. For factorial:
- 0! is equal to 1
- 1! is equal to 1 = 1\*0!
- 2! is equal to 2\*1 = 2\*1!
- 3! is equal to 3\*2\*1 = 3\*2!
- 4! is equal to 4\*3\*2\*1 = 4\*3!
- 5! is equal to 5\*4\*3\*2\*1 = 5\*4!

The base case is `0! = 1`; otherwise, `n! = n × (n - 1)!`. This example assumes a non-negative integer; deep recursion can exceed the call stack.
```
function factorial(n){
	if (n === 0){
		return 1;
	}else{
	return n * factorial(n - 1);
	}
}

let n = 5;
let r = factorial(5); // r = 120
```
### Callbacks
A callback is a function passed to another function for it to call. Callbacks may be synchronous, as with many array methods, or asynchronous, as with events and older I/O APIs.
```
function greet(name) {
	console.log(`Hello, ${name}!`); 
} 
function processUserInput(callback) { 
		const name = "Alice"; // In a real app, this might come from user input 
		callback(name); 
		} 
processUserInput(greet);
```
Here, `greet` is passed to `processUserInput`, which invokes it with a name.
#### Callback hell
Deeply nested callbacks can make dependent asynchronous steps difficult to read and handle. Promises and `async`/`await` offer alternative ways to express that flow.
```
getUser(userId, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      getReplies(comments[0].id, function(replies) {
        console.log(replies); // Deeply nested!
      });
    });
  });
});
```
We can avoid callback hell by using either:
1. **Promises** (`.then()` chains)
2. **Async/await** (synchronous-style syntax)
### Functional programming concepts
These ideas make functions easier to reason about and reuse:
#### Pure functions
A pure function returns the same result for the same inputs and causes no observable side effects. It does not mutate inputs or depend on changing external state.
#### Recursion
Recursion solves a problem by reducing it to a smaller case until a base case is reached. It is one technique for repetition, not the only one.
#### First-class and higher-order functions
Functions are first-class values: they can be assigned, passed as arguments, returned, and stored. A higher-order function accepts or returns a function.
#### Referential transparency
An expression is referentially transparent when it can be replaced by its value without changing program behavior. Pure functions support this property.
#### Immutability
Prefer creating updated values instead of mutating shared data when that makes state changes easier to track. JavaScript does not require all bindings or objects to be immutable.
## Asynchronous JavaScript
### Introduction
Asynchronous programming lets JavaScript start work such as a network request and continue running other code while it waits. In the browser, the host environment handles I/O and schedules callbacks; JavaScript on the main thread is not doing multiple CPU tasks at once.
### Promises
A **Promise** represents the eventual success or failure of an operation. It starts `pending` and settles once as either `fulfilled` or `rejected`:

| **State**   | **Description**                                                    |
| ----------- | ------------------------------------------------------------------ |
| `Pending`   | The initial state. The async operation hasn’t completed yet.       |
| `Fulfilled` | The operation completed successfully. The `.then()` callback runs. |
| `Rejected`  | The operation failed. The `.catch()` callback runs.                |


The `Promise` constructor receives an executor with two functions:
- **`resolve(value)`**: Fulfills the promise with a value (or adopts another promise’s state).
- **`reject(reason)`**: Rejects the promise with a reason, usually an `Error`.
```
function makeCoffee(type) {
  return new Promise((resolve, reject) => {
    console.log(`Brewing ${type} coffee...`);
    setTimeout(() => {
      if (type === "espresso") {
        resolve("Here's your espresso!");
      } else {
        reject(new Error("We don't serve that type"));
      }
    }, 2000); 
  });
}


makeCoffee("espresso")
  .then(coffee => console.log(coffee)) 
  .catch(error => console.log(error));
```
### The `async` keyword
An `async` function always returns a Promise. A returned value fulfills that promise; a thrown error rejects it:
```
async function fetchData() {
  // Our async code goes here
}
```
The function body still runs synchronously until it reaches an `await` or returns.
### Non-blocking execution
`await` pauses the current async function while the promise is pending. The event loop can run other work in the meantime:
```
async function getData() {
  console.log("Starting fetch...");
  const response = await fetch('/api/data'); // Waits for the response without blocking the main thread
  console.log("Fetch complete!");
}

getData();
console.log("We can do other work while waiting!");
```
**Output Order:**
1. "Starting fetch..."
2. "We can do other work while waiting!"
3. "Fetch complete!"
### The `await` keyword
`await` unwraps a fulfilled promise’s value or throws its rejection reason. It pauses the current async function, not the whole program. Use it inside an async function or at top level in a JavaScript module.
```
async function fetchUser() {
  console.log("Fetching user data...");
  const response = await fetch('https://api.example.com/user/1');
  const user = await response.json();
  console.log("User data received:", user);
  return user;
}

fetchUser(); 
console.log("Loading page content...");
```
The synchronous log runs before the awaited fetch completes:
```
"Fetching user data..."
"Loading page content..."
"User data received: {...}"
```
### JavaScript Timers
JavaScript timers schedule callbacks with a minimum delay; they do not guarantee an exact execution time:
1. **`setTimeout`** schedules a callback once.
2. **`setInterval`** schedules a callback repeatedly until cleared.
#### setTimeout
Schedules a callback once after the delay:
```
setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);
```
#### **`setInterval`**
Schedules a callback repeatedly at an interval until cleared:
```
let counter = 0;
const timer = setInterval(() => {
  counter++;
  console.log(`Tick ${counter}`);
  if (counter === 8) clearInterval(timer); 
}, 1000);
```
#### Managing Timers
Keep the returned timer ID when you may need to cancel the callback:
```
const timeoutId = setTimeout(() => console.log('This runs later'), 2000);
```
Cancel scheduled callbacks with the matching clear function:
```
clearTimeout(timeoutId); // Cancels the timeout before it runs

const intervalId = setInterval(() => console.log('Tick'), 1000);
clearInterval(intervalId);
```
### The Fetch Function
`fetch()` sends an HTTP request and returns a Promise for a `Response`. It rejects on network failures, but an HTTP error such as 404 still fulfills the promise; check `response.ok` before reading the body.
```
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  })
  .then(data => console.log(data))   
  .catch(error => console.error('Error:', error));
```
## Tasks:
### Task 1
Write a function `makeCounter()` that returns a function to increment a private count. Add logic so that:
- If the counter reaches 5, it resets to 0 automatically.
### Task 2
Write a function `filter(fn, arr)` that takes a function `fn` and an array `arr`, and returns a new array with elements that pass the test implemented by `fn`.
Then, use it with a function that returns true only for even numbers.
### Task 3
Write a function `map(fn, arr)` that:
- Takes a callback function `fn` and an array `arr`. 
- Returns a new array with `fn` applied to every element.  
Test it with an arrow function that doubles the values.
### Task 4
You're simulating a file upload system that performs 3 steps using chained promises:
1. Select a file.
2. Upload the file (takes 1.5 seconds).
3. Confirm success.

**Your Task**:
1. Implement the following functions:
    - `selectFile()` — returns a Promise that resolves immediately with `"myPhoto.png"`.
    - `uploadFile(file)` — returns a Promise that resolves in 1.5 seconds with `"Upload complete: " + file`.
    - `confirmUpload(message)` — logs the message and returns a resolved Promise.
2. Chain the promises so that:
    - You select the file.
    - Then upload it.
    - Then confirm the upload.
### Task 5
Write an `async` function `countdown(n)` that:
1. Takes an integer `n` as input.
2. Recursively logs the current number to the console.
3. Waits for 1 second using `await` before proceeding to the next number in the countdown.
4. Stops the countdown when it reaches 0, and logs `"Countdown finished!"`.
5. Use `await` to ensure that each countdown step is delayed by 1 second.  

Create a helper function `sleep(ms)` that returns a `Promise` resolving after `ms` milliseconds. This function will simulate the 1-second delay between each step of the countdown
