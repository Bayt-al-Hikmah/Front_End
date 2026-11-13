## Learning Objectives

By the end of this lecture, students should be able to:

- Explain the role of JavaScript in a web page.
- Add JavaScript to an HTML document using internal and external scripts.
- Use the browser console to test and debug basic code.
- Declare variables with `let` and `const`.
- Recognize JavaScript's primitive and object types.
- Work with numbers and strings using operators and common methods.
- Create, read, update, and remove array elements and object properties.

## Introduction to JavaScript

**JavaScript** is a programming language used to add behavior and logic to web pages. HTML describes the content, CSS controls its presentation, and JavaScript responds to events, processes information, communicates with servers, and updates the page.

JavaScript was created by Brendan Eich in 1995 and has become a central technology of web development. It runs in all modern browsers and can also run outside the browser through environments such as Node.js. This means the same language can be used for front-end applications, server-side services, command-line tools, and other software.

JavaScript code is commonly stored in files with the `.js` extension. A small script can be written directly in an HTML document, but external files are easier to organize as a project grows.

## Adding JavaScript to a Web Page

### Internal Scripts

An internal script is written inside a `<script>` element:

```html
<script>
  console.log("Hello from JavaScript!");
</script>
```

This is useful for a short demonstration, but larger scripts should usually be kept in separate files.

### External Scripts

An external script is stored in a `.js` file and connected to the HTML page through the `src` attribute:

```html
<script src="scripts/main.js" defer></script>
```

The `defer` attribute allows the browser to download the script while parsing the HTML and execute it after the document has been parsed. This is a practical default for many classic scripts that need to access page elements.

A JavaScript file can also be loaded as a module:

```html
<script type="module" src="scripts/main.js"></script>
```

Modules provide a way to organize code across multiple files. We will focus on the language fundamentals first and revisit larger project structures later.

## The Browser Console

The browser's Developer Tools include a **Console** where developers can inspect messages, view errors, and execute JavaScript while a page is open. It is one of the most useful tools for learning and debugging.

In most desktop browsers, Developer Tools can be opened with `F12` or through the browser's menu. Keyboard shortcuts vary by browser and operating system. Select the **Console** tab and enter:

```javascript
alert("Hello!");
console.log("Testing JavaScript");
```

The first statement displays a browser dialog. The second writes a message to the console. In application code, prefer `console.log()` for simple diagnostic messages and avoid using alerts as the normal way to communicate with users.

## Variables and Constants

A **variable** is a named place in a program where a value can be stored. JavaScript provides `let` and `const` for declaring variables.

Use `let` when the variable will be assigned a new value later:

```javascript
let score = 10;
score = 15;
```

Use `const` when the variable binding should not be reassigned:

```javascript
const courseName = "Front-End Development";
```

A `const` declaration must receive a value when it is created. It prevents reassignment of the variable, but it does not make an object or array immutable:

```javascript
const student = { name: "Amira" };
student.name = "Amira Benali"; // Allowed: the object is modified.

// student = {}; // Not allowed: the const binding cannot be reassigned.
```

The older `var` keyword is function-scoped and has different hoisting behavior. It is still found in older code, but modern JavaScript generally uses `const` by default and `let` when reassignment is needed.

### Naming Variables

Variable names may contain letters, digits, underscores, and dollar signs, but they cannot begin with a digit. Names are case-sensitive, so `userName` and `username` are different identifiers. Use descriptive names such as `totalPrice` or `isLoggedIn` rather than short names that do not explain their purpose.

JavaScript statements often end with semicolons. The language can automatically insert semicolons in many situations, but using them consistently helps make code easier to read.

## JavaScript Data Types

A data type describes the kind of value being stored. JavaScript is dynamically typed, which means a variable can hold values of different types during its lifetime. The language has **primitive values** and **objects**.

### Primitive Types

Primitive types are immutable values. When a primitive value is assigned to another variable, the value is copied. JavaScript has seven primitive types:

- `string` — text, such as `"Hello"`.
- `number` — integers and floating-point numbers, such as `42` and `3.14`.
- `bigint` — integers larger than the safe range of the Number type.
- `boolean` — either `true` or `false`.
- `undefined` — a value commonly used when a variable has been declared but not assigned.
- `null` — an intentional absence of a value.
- `symbol` — a unique identifier value, often used as an object property key.

#### Number

The `number` type represents both whole numbers and decimal values:

```javascript
const age = 23;
const temperature = 18.5;
const balance = -12;
```

JavaScript also has special numeric values such as `NaN` (Not-a-Number), `Infinity`, and `-Infinity`. For many everyday calculations, `number` is sufficient. When precision is important, remember that binary floating-point arithmetic can produce small rounding differences:

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
```

#### BigInt

`BigInt` represents integers outside the safe integer range of the regular `number` type. A BigInt literal ends with `n`:

```javascript
const largeValue = 12345678901234567890n;
const anotherValue = BigInt("9007199254740993");
```

A BigInt cannot be mixed directly with a Number in arithmetic. Convert values explicitly when an operation requires compatible types.

#### String and Template Literals

A string stores text. Strings can be written using single quotes, double quotes, or backticks:

```javascript
const firstName = "Amira";
const greeting = 'Hello';
```

Backticks create **template literals**, which allow variables and expressions to be embedded using `${}`:

```javascript
const name = "Amira";
const age = 20;
const message = `Hello, ${name}. You are ${age} years old.`;
```

Template literals are especially useful when combining text with values.

#### Boolean

A boolean represents a logical value:

```javascript
const isLoggedIn = true;
const hasPermission = false;
```

JavaScript also converts values to booleans in conditional contexts. Values such as `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN` are **falsy**. Most other values—including empty arrays and empty objects—are **truthy**.

```javascript
if ("hello") {
  console.log("This block runs because the string is truthy.");
}
```

#### Undefined and Null

`undefined` commonly means that a value has not been assigned:

```javascript
let result;
console.log(result); // undefined
```

`null` is used when the program intentionally represents the absence of a value:

```javascript
let selectedUser = null;
```

They are different values, and code should use them deliberately rather than treating them as interchangeable.

### Objects and Reference Values

Objects store collections of properties. A property associates a key with a value. The value can be a primitive, an array, another object, or a function.

```javascript
const student = {
  name: "Amira",
  age: 20,
  isEnrolled: true,
  address: {
    city: "Algiers",
    country: "Algeria"
  }
};
```

Properties can be read using dot notation or bracket notation:

```javascript
console.log(student.name);
console.log(student["age"]);
console.log(student.address.city);
```

Dot notation is convenient when the property name is known. Bracket notation is useful when the property name is stored in a variable or contains characters that are not suitable for dot notation.

When an object is assigned to another variable, the object itself is not automatically duplicated. The new variable receives a copy of the reference to the same object:

```javascript
const first = { score: 10 };
const second = first;
second.score = 20;

console.log(first.score); // 20
```

This behavior is often described as reference sharing. JavaScript still passes arguments by value; when an object is passed to a function, the value being copied is the reference to that object.

### Arrays

An array is an ordered collection of values. Array positions are called **indexes**, and indexing begins at `0`:

```javascript
const technologies = ["HTML", "CSS", "JavaScript"];

console.log(technologies[0]); // HTML
console.log(technologies[2]); // JavaScript
```

Arrays can contain different types of values, including objects and other arrays:

```javascript
const data = ["text", 42, true, { id: 1 }, ["nested"]];
```

The `length` property reports the number of elements in the array:

```javascript
console.log(technologies.length); // 3
```

### Functions as Values

Functions are callable objects in JavaScript and can be stored in variables, passed to other functions, and returned from functions. We will study function declarations and more advanced function behavior in Lecture 10.

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Amira"));
```

## Console Output and Comments

Use `console.log()` to display values during development:

```javascript
const price = 1500;
console.log("Price:", price);
```

A single-line comment begins with `//`. A multi-line comment begins with `/*` and ends with `*/`:

```javascript
// This is a single-line comment.

/*
  This is a multi-line comment.
  It can span several lines.
*/
```

Comments should explain intent or important decisions, not repeat what the code already makes obvious.

## Working with Numbers

JavaScript supports the standard arithmetic operators:

| Operator | Operation | Example |
| --- | --- | --- |
| `+` | Addition | `5 + 2` gives `7` |
| `-` | Subtraction | `5 - 2` gives `3` |
| `*` | Multiplication | `5 * 2` gives `10` |
| `/` | Division | `5 / 2` gives `2.5` |
| `%` | Remainder | `5 % 2` gives `1` |
| `**` | Exponentiation | `5 ** 2` gives `25` |

The `+` operator can also join strings. If one operand is a string, the result may be string concatenation rather than arithmetic:

```javascript
console.log("5" + 2); // "52"
console.log(5 + 2);   // 7
```

Use explicit conversion when values originate from text inputs or other string-based sources:

```javascript
const quantity = Number("12");
const price = Number("9.5");
console.log(quantity * price); // 114
```

### Number Methods and the `Math` Object

JavaScript provides methods for inspecting or formatting numeric values. For example, `Number.isInteger()` checks whether a value is an integer, and `toFixed()` formats a number with a specified number of decimal places:

```javascript
const value = 12.345;
console.log(Number.isInteger(value)); // false
console.log(value.toFixed(2));        // "12.35"
```

The `Math` object provides useful mathematical operations:

```javascript
console.log(Math.round(4.6)); // 5
console.log(Math.floor(4.9)); // 4
console.log(Math.ceil(4.1)); // 5
console.log(Math.max(4, 9, 2)); // 9
console.log(Math.min(4, 9, 2)); // 2
console.log(Math.sqrt(25)); // 5
console.log(Math.random()); // A number from 0 up to, but not including, 1
```

## Working with Strings

Strings are immutable: string methods return new strings rather than changing the original string.

### String Length and Indexing

The `length` property reports the number of UTF-16 code units in a string. Bracket notation and `charAt()` can access characters by index:

```javascript
const language = "JavaScript";
console.log(language.length); // 10
console.log(language[0]);     // J
console.log(language.charAt(1)); // a
```

For many basic examples, index-based access is sufficient. Some Unicode characters are represented by more than one code unit, so `length` is not always the same as the number of user-perceived characters.

### Changing Letter Case

`toUpperCase()` returns an uppercase version of a string, while `toLowerCase()` returns a lowercase version:

```javascript
const name = "amira";
console.log(name.toUpperCase()); // AMIRA
```

### Searching Within a String

`includes()` checks whether a substring exists. `indexOf()` returns the first matching position or `-1` when no match is found. `lastIndexOf()` searches from the end. `startsWith()` and `endsWith()` check the beginning and end of a string:

```javascript
const fileName = "photo-profile.png";

console.log(fileName.includes("profile")); // true
console.log(fileName.indexOf("photo"));    // 0
console.log(fileName.endsWith(".png"));    // true
```

### 8.4 Extracting Parts of a String

The `slice()` method extracts part of a string. Its second argument is an ending index that is not included in the result:

```javascript
const language = "JavaScript";
console.log(language.slice(0, 4));  // Java
console.log(language.slice(4));     // Script
console.log(language.slice(-6));    // Script
```

`substring()` is another extraction method, but its handling of negative values differs from `slice()`. Prefer `slice()` for most modern examples because it supports negative indexes. The older `substr()` method is deprecated and should not be used in new code.

### Trimming, Replacing, and Padding

`trim()` removes whitespace from both ends of a string. `trimStart()` and `trimEnd()` remove it from one side:

```javascript
const input = "  hello  ";
console.log(input.trim()); // "hello"
```

`replace()` replaces the first matching occurrence, while `replaceAll()` replaces all matching occurrences:

```javascript
const sentence = "apple, orange, apple";
console.log(sentence.replace("apple", "banana"));
console.log(sentence.replaceAll("apple", "banana"));
```

`repeat()` repeats a string. `padStart()` and `padEnd()` add characters until the string reaches a target length:

```javascript
console.log("ha".repeat(3));        // hahaha
console.log("5".padStart(3, "0")); // 005
```

### Splitting and Joining

`split()` divides a string into an array. The array `join()` method combines array elements into one string:

```javascript
const words = "HTML CSS JavaScript".split(" ");
console.log(words); // ["HTML", "CSS", "JavaScript"]

console.log(words.join(", ")); // HTML, CSS, JavaScript
```

## Working with Arrays

Arrays provide methods for searching, adding, removing, copying, and rearranging elements. Some methods modify the original array, while others return a new array. It is important to know which behavior a method has.

### Searching Arrays

`includes()` checks whether a value exists. `indexOf()` returns the first index of a matching value, or `-1` if it is not found. `lastIndexOf()` returns the last matching index.

```javascript
const fruits = ["apple", "banana", "mango"];
console.log(fruits.includes("banana")); // true
console.log(fruits.indexOf("mango"));   // 2
```

The `find()` method returns the first element that satisfies a condition:

```javascript
const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
const selectedUser = users.find(user => user.id === 2);
console.log(selectedUser); // { id: 2 }
```

### Adding and Removing Elements

`push()` adds an element to the end, and `unshift()` adds one to the beginning. `pop()` removes and returns the last element, while `shift()` removes and returns the first element:

```javascript
const fruits = ["apple", "banana"];
fruits.push("orange");
fruits.unshift("pear");

const lastFruit = fruits.pop();
const firstFruit = fruits.shift();
```

The `splice()` method can add, remove, or replace elements at a chosen index. It modifies the original array:

```javascript
const colors = ["red", "green", "blue"];

colors.splice(1, 0, "yellow"); // Insert at index 1.
colors.splice(2, 1);            // Remove one item at index 2.
colors.splice(1, 1, "purple");  // Replace one item at index 1.
```

Its first argument is the starting index, the second is the number of elements to remove, and later arguments are the values to insert.

### Copying and Combining Arrays

`concat()` returns a new array containing the elements of the original arrays. The spread syntax (`...`) can also copy or combine arrays:

```javascript
const first = [1, 2];
const second = [3, 4];

const combined = first.concat(second);
const combinedAgain = [...first, ...second];
const copy = [...first];
```

`slice()` returns a shallow copy of part of an array without changing the original:

```javascript
const numbers = [10, 20, 30, 40];
console.log(numbers.slice(1, 3)); // [20, 30]
```

The starting index is included and the ending index is excluded.

### Sorting and Reversing

`sort()` modifies the original array. By default, it sorts values as strings, so numeric arrays need a comparison function:

```javascript
const names = ["Yacine", "Amira", "Karim"];
names.sort();

const numbers = [40, 1, 5, 200];
numbers.sort((a, b) => a - b); // Ascending numeric order.
numbers.sort((a, b) => b - a); // Descending numeric order.
```

`reverse()` reverses the order of the original array. When the original order must be preserved, copy the array first:

```javascript
const original = [1, 2, 3];
const reversed = [...original].reverse();
```

## Working with Objects

Objects group related information into named properties. You can read, add, update, or remove properties using dot or bracket notation.

```javascript
const person = {
  name: "Amira",
  age: 20
};

person.city = "Algiers";       // Add a property.
person.age = 21;               // Update a property.
console.log(person["name"]);   // Read a property.
delete person.city;            // Remove a property.
```

### Getting Object Keys and Values

`Object.keys()` returns an array of an object's own enumerable property names. `Object.values()` returns the corresponding values, and `Object.entries()` returns arrays containing each key-value pair:

```javascript
const person = { name: "Amira", age: 20 };

console.log(Object.keys(person));
console.log(Object.values(person));
console.log(Object.entries(person));
console.log(Object.keys(person).length); // 2 properties
```

Objects do not have a built-in `length` property for counting their properties. Counting the keys is a common approach.

### Checking for Properties and Values

`Object.hasOwn()` checks whether a property belongs directly to an object. The `in` operator checks whether a property exists on the object or anywhere in its prototype chain. `Object.values()` combined with `includes()` can test whether a value exists among the object's values:

```javascript
const person = { name: "Amira", age: 20 };

console.log(Object.hasOwn(person, "age")); // true
console.log("toString" in person);         // true (inherited property)
console.log(Object.values(person).includes("Amira")); // true
```

### Combining Objects

`Object.assign()` and object spread syntax can copy enumerable properties into a new object:

```javascript
const profile = { name: "Amira" };
const details = { city: "Algiers", age: 20 };

const combined = Object.assign({}, profile, details);
const combinedAgain = { ...profile, ...details };
```

These are shallow copies. Nested objects are still shared references unless they are copied separately.

### Freezing and Sealing Objects

`Object.freeze()` prevents properties from being added, removed, or reassigned on the object itself. `Object.seal()` prevents adding and removing properties but still allows existing writable properties to change.

```javascript
const settings = { theme: "light" };
Object.freeze(settings);

const user = { name: "Amira" };
Object.seal(user);
user.name = "Amira B."; // Allowed because the property already exists.
```

These methods are shallow: nested objects are not automatically frozen or sealed. In non-strict code, some prohibited assignments may fail silently; in strict mode, they may throw an error.

## Key Takeaways

- JavaScript adds logic and behavior to web pages.
- Use `const` by default and `let` when a variable must be reassigned.
- JavaScript has seven primitive types and a broad object model.
- Primitive values are copied by value; object assignments copy references.
- Strings are immutable, and many string methods return new strings.
- Arrays are ordered collections with methods for searching and modifying data.
- Objects store data as properties and can be combined or inspected with built-in methods.

## Practice Exercises

### Task 1 — Student Information

Given the following values:

```javascript
let firstName = "luna";
let birthYear = "2000";
let currentYear = 2026;
```

Capitalize the first letter of `firstName`, convert `birthYear` to a number, calculate the student's age, and build a sentence similar to `Luna is 26 years old.`

### Task 2 — Fruit List

Given the array:

```javascript
const fruits = ["apple", "banana", "mango"];
```

Add `"orange"` to the beginning of the array. Find the index of `"banana"` with `indexOf()` and replace that element with `"kiwi"`. Finally, use `join(", ")` to create a single string from the array.

### Task 3 — User Profile

Given the object:

```javascript
const user = {
  username: "skywalker",
  hobbies: ["coding", "gaming", "reading"]
};
```

Add `"traveling"` to the hobbies array. Create a new array containing uppercase versions of all hobbies, then build a summary such as `SKYWALKER enjoys CODING, GAMING, READING, TRAVELING.`
