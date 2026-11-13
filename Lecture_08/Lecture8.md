# Lecture 08 — JavaScript Values and Data Structures

> **Core idea:** JavaScript programs store values, transform them with expressions and methods, and group related data in arrays and objects.

## Learning goals
- Run JavaScript in a browser and inspect results in the console.
- Declare variables and distinguish primitive values from objects.
- Use common number, string, array, and object operations to transform data.

## Introduction to JavaScript
### JavaScript
**JavaScript** is a programming language used in browsers and in other runtimes such as Node.js. In the browser it can respond to events, update the page, and request data. JavaScript source files commonly use the `.js` extension.
### Adding JavaScript to a Webpage
Add JavaScript directly in a `<script>` element or load it from an external file:
#### Internal Script
Use an inline script for a small example or page-specific code:
**Example**
```
<script>
  // Your JavaScript code here
  alert("Hello from an internal script!");
</script>
```
#### External Script
External files are easier to organize and reuse. `defer` lets a classic script wait until the HTML has been parsed:
**Example**
```
<script src="scripts/main.js" defer></script>
```
### The Browser Console
The browser console displays logs and runtime errors, and it can evaluate JavaScript expressions. Use it to inspect values and try short examples.
#### Opening The Console
Keyboard shortcuts vary by browser and operating system. In most browsers, open Developer Tools from the browser menu or use its console shortcut.
**Task**  
Open the browser console and write the following script:
```
alert("Hello !");
```
## Variables and Data Types
### Introduction
Declare a variable with `let` when its binding will be reassigned. `let` is block-scoped. `var` is function-scoped and has older hoisting behavior; prefer `let` or `const` in modern code.

Names can contain letters, digits, `_`, and `$`, but cannot begin with a digit. Use descriptive names such as `userName` or `_count`; `2ndPlace` is invalid.
#### Example 
```
var name = "Ali";
let age = 23;
let m;
```
JavaScript can insert semicolons automatically in many cases. Consistent explicit semicolons avoid ambiguity and are a common style choice.
### Constant
`const` declares a block-scoped binding that cannot be reassigned. Its value must be initialized when declared. `const` does not make an object or array immutable.
```
const PI = 3.14;
```
Use `UPPER_CASE` by convention for some global constants; ordinary JavaScript variables, including most `const` bindings, usually use `camelCase`.
### Data Types
JavaScript values have types. The language groups them into **primitives** and **objects**; arrays and functions are object types.
### Primitive Data Types
Primitive values are immutable and copied by value when assigned or passed to a function. Do not rely on a particular physical memory representation.
#### Number
`number` represents integers and floating-point values. Very large integers may exceed its exact precision; use `bigint` when exact integer arithmetic is needed beyond the safe-integer range.
```
let age = 23;
let pi = 3.14;
let negative_number = -5;
```
#### Bigint
`bigint` represents integers beyond the safe range of `number`. Create one with an `n` suffix or `BigInt()`; do not mix `bigint` and `number` in arithmetic without an explicit conversion.
```
let number1 = 12345678901234567890n
let number2 = BigInt("9007199254740991")
```
#### Symbol
`symbol` creates a unique primitive value, often used as a non-colliding object property key:
```
const id = Symbol("id");
const record = { [id]: 123 };
```
#### String  
Strings store text. Use single or double quotes for ordinary strings and backticks for template literals.
```
let greeting = "Hello World";
let name = 'Alice';
```
Template literals interpolate expressions with `${...}`:
```
let name = "Alice";
let greeting = `Hello, ${name}!`; 
```
The value of `greeting` is `Hello, Alice!`.
#### Boolean
The Boolean type has two values: `true` and `false`.
```
let is_adult = false;
```
In Boolean contexts, values are coerced to truthy or falsy:

**Truthy Values**
```
true, "text", 1, [], {}, 3.14, Infinity, -1, "false"
```
**Falsy Values**
```
false, 0, "", null, undefined, NaN, 0n
```
#### Undefined  
`undefined` commonly indicates a missing value, including a declared variable that has not been assigned.
```
let number;
```
Here type of number will be `undefined`
#### Null  
`null` is an explicit “no value” marker. JavaScript’s `typeof null` result is the historical string `"object"`, even though `null` is a primitive.
```
let user = null;
```
### Non-Primitive Data Types
Objects are mutable values compared by identity. Assigning an object or passing it to a function copies the reference value, so both bindings can refer to the same object; JavaScript is still pass-by-value.
#### Object
Objects store properties. Property keys are strings or Symbols; values can be any JavaScript value, including nested objects and functions.

To create an object, we place key-value pairs inside curly braces `{}`. We separate each key from its value with a colon (`:`), and multiple pairs with commas (`,`):
```
const user = {
  name: "Alex",       
  age: 30,            
  isAdmin: true,     
  address: {          
    city: "Berlin",
    country: "Germany"
  }
}
```
There are two ways to access elements inside an object:
1. **Dot Notation**  
    We start with the object name, followed by a dot (`.`), then the key:
```
user.name;
```
2. **Bracket Notation**  
	We start with the object name, followed by square brackets `[]` containing the key (as a string):
```
user["name"];
```
#### Arrays
Arrays are ordered, zero-indexed collections. Their `length` changes as elements are added or removed, and an element can hold any value.

To create an array, we place values inside **square brackets `[]`**. We separate the values with commas (`,`):
```
const mixedArray = [
  "text",          
  42,              
  true,            
  { id: 1 },       
  ["nested"]
];
```
We access values inside an array by using indexes. The first element has index 0. For example, to access the value 42 we use `mixedArray[1]`.
#### Functions
Functions are callable objects used to package reusable behavior.
```
function greet(name) {
  return `Hello, ${name}!`;
}
greet("Ali");
```
### Using console.log()
To display values or print messages to the console, we use the `console.log()` function. Inside the parentheses `()`, we specify what we want to output:
```
console.log("Hello World");
console.log(42);           
console.log(myVariable);    
```
### Comments
Comments are special lines of code that the browser won't execute, but they're useful for us programmers to leave hints or mark tasks for later. There are two types of comments:
- **Single-line comments**: We create them using `//` - everything after these slashes on the same line becomes a comment and gets ignored.
```
// this is single line comment
```
- **Multi-line comments**: We create them using `/* */` - all text between these symbols, even across multiple lines, will be ignored and not executed.
```
/*
	this 
	is 
	multi-line
	comment
*/
```
## Working with Numbers and Strings
### Arithmetic Operations
JavaScript allows us to do more than just store numbers, it provides arithmetic operators to perform calculations and manipulate numeric values.
#### Addition
Add two numbers using the `+` operator:
```
let a = 4;
let b = 5;
let c = a + b; // 9
```
#### Subtraction
Subtract numbers using the `-` operator:
```
let a = 4;
let b = 5;
let c = a - b; // -1
```
#### Multiplication
Multiply numbers using the `*` operator:
```
let a = 4;
let b = 5;
let c = a * b; // 20
```
#### Division
Divide numbers using the `/` operator:
```
let a = 4;
let b = 5;
let c = a / b; // 0.8
```
#### Remainder
Calculate division remainders using the `%` operator:
```
let a = 5;
let b = 4;
let c = a % b; // 1
```
#### Exponentiation
Raise numbers to powers using the `**` operator:
```
let a = 2;
let b = 3;
let c = a ** b;  // 8
```
### Number Methods
Number methods format values or check numeric properties. Note that `toFixed()` and `toPrecision()` return strings:
#### Example
```
let num = 123.4567;

num.toFixed(2);      // "123.46" (Rounds to 2 decimal places)
num.toPrecision(4);   // "123.5" (Formats to 4 significant digits)
num.toString(16);     // "7b.74bc6a7ef9" (Converts to hexadecimal)
Number.isInteger(num); // false (Checks if value is integer)
```
### Math Object
For more complex mathematical operations beyond basic arithmetic, JavaScript provides the built-in `Math` object. This object contains methods and constants for advanced calculations including:
- Trigonometric functions (`sin`, `cos`, `tan`)
- Rounding operations (`round`, `ceil`, `floor`)
- Logarithmic and exponential calculations
- Random number generation
- Mathematical constants (π, e, etc.)
#### Example
```
Math.sin(45 * Math.PI/180);  // Calculate sine (0.7071)
Math.round(3.7);             // Round to nearest integer (4)
Math.random();               // Generate random number (0-1)
```
### String concatenation
The `+` operator concatenates when either operand is a string; template literals are another readable option:
```
let greeting = "Hello" + " " + "World";  // "Hello World"
```
### String indexing
Strings support zero-based indexing, but indexing returns UTF-16 code units rather than complete user-perceived characters in every case.
```
const word = "hello";
word[0];  // 'h' (first character)
word[4];  // 'o' (last character)
```
### String methods
#### Case Conversion
Case conversion methods return new strings; strings are immutable.
```
'hello'.toUpperCase();  // 'HELLO'
'HELLO'.toLowerCase();  // 'hello'
```
#### Searching & Checking
Use these methods to check for text and find positions:
1. **Check for a substring**
```
'JavaScript'.includes('Script');  // true
```
2. **Find character/word positions**
```
'hello'.indexOf('e');     // 1 (first occurrence)
'hello'.lastIndexOf('l'); // 3 (last occurrence)
```
3. **Check starting/ending patterns**
```
'file.txt'.startsWith('file'); // true
'image.png'.endsWith('.png');  // true
```
#### Extraction & Slicing
`slice()` extracts from a start index up to, but not including, an end index. Negative indices count from the end:
```
'JavaScript'.slice(0, 4);  // 'Java'  
'JavaScript'.slice(4);     // 'Script' (to end)  
'JavaScript'.slice(-6);    // 'Script' (from end)
```
`substring()` is similar but treats negative values as zero and swaps its arguments when the start is greater than the end:
```
'JavaScript'.substring(0, 4);  // 'Java'
```
`substr()` uses a start index and length but is deprecated; prefer `slice()`:
```
'JavaScript'.substr(4, 3);  // 'Scr'
```
`charAt()` returns the code unit at an index:
```
'Hello'.charAt(1);  // 'e'
```
#### Modification
These methods return new strings; the original string does not change.
1. **Trimming Whitespace**
	- `trim()`: Removes whitespace from both ends
	- `trimStart()`: Removes only leading whitespace
	- `trimEnd()`: Removes only trailing whitespace
```
'  hello  '.trim();       // 'hello'
'  hello  '.trimStart();  // 'hello  '
'  hello  '.trimEnd();    //  '  hello'
```
2. **Replacing Text**
	- `replace()`: Replaces the first matching pattern
	- `replaceAll()`: Replaces all matching patterns
```
'apple orange apple'.replace('apple', 'banana');    // 'banana orange apple'
'apple orange apple'.replaceAll('apple', 'banana'); // 'banana orange banana'
```
3. **Repeating Strings**
	- `repeat()` Creates repeated copies: 
```
'ha'.repeat(3);  // 'hahaha'
```
4. **Padding Strings**
	- ``padStart()`` Adds characters to the **beginning** (left side) of a string until it reaches the specified length.
	- ``padEnd()`` Adds characters to the **end** (right side) of a string until it reaches the specified length.
```
'5'.padStart(3, '0');    // '005'
'5'.padEnd(3, '!');      // '5!!'
```
#### Splitting and joining
`split(separator)` returns an array of pieces:
```
'a,b,c'.split(',');      // ['a', 'b', 'c']  
'hello'.split('');       // ['h', 'e', 'l', 'l', 'o']
```
`join(separator)` combines array elements into a string:
```
['a', 'b', 'c'].join('-');  // 'a-b-c'  
['2023', '10', '05'].join('/'); // '2023/10/05'
```
## Working with Arrays and Objects
### Arrays
Array methods can add, remove, search, transform, sort, combine, and slice elements.
#### Getting Array Length
We can determine the number of elements in an array using the `length` property:
```
let fruits = ['apple', 'banana', 'orange'];
console.log(fruits.length);  // 3
```
#### Searching Elements
Use these methods to find array elements:
- `includes()`: Checks if an element exists in the array
```
[1, 2, 3].includes(2);  // true
```
- `indexOf()` : Finds the **first occurrence** of an element 
```
['a', 'b', 'a'].indexOf('a');  // 0
```
- `lastIndexOf()`:  Finds the **last occurrence** of an element (searches from the end)
```
['a', 'b', 'a'].lastIndexOf('a');  // 2
```
- `find()`: Returns the **first element** matching a condition
```
let users = [{id: 1}, {id: 2}];
users.find(user => user.id === 2);  // {id: 2}
```
#### Adding and Remove Elements
1. `push()`: Add to End
```
let fruits = ['apple', 'banana'];
fruits.push('orange'); 
// ['apple', 'banana', 'orange']
```
2. `unshift()`: Add to Start
```
let fruits = ['apple', 'banana'];
fruits.unshift('orange'); 
// ['orange', 'apple', 'banana']
```
3.  `pop()`: Remove Last Element
```
let fruits = ['apple', 'banana', 'orange'];
const last = fruits.pop();
// fruits = ['apple', 'banana']
// last = 'orange'
```
4. `shift()`: Remove First Element
```
let fruits = ['apple', 'banana', 'orange'];
const first = fruits.shift();
// fruits = ['banana', 'orange']
// first = 'apple'
```
5. `splice()`: Removes, inserts, or replaces elements in the original array.
```
let colors = ['red', 'green', 'blue'];

// 1. Add without removing (deleteCount = 0)
colors.splice(1, 0, 'yellow');
// ['red', 'yellow', 'green', 'blue']

// 2. Remove without adding
colors.splice(2, 1);
// ['red', 'yellow', 'blue']

// 3. Replace elements
colors.splice(1, 1, 'purple');
// ['red', 'purple', 'blue']
```

- **First argument**: Start index.
- **Second argument**: Number of existing elements to remove.
- **Remaining arguments**: Elements to insert at that position.
#### Combining, spreading, and slicing
`concat()` returns a new array with the supplied arrays or values:
```
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = arr1.concat(arr2); // [1, 2, 3, 4]
```
The spread syntax (`...`) expands an iterable into elements:
```
// Combine arrays
let merged = [...arr1, ...arr2]; // [1, 2, 3, 4]

// Insert additional elements
let withExtras = [...arr1, 'a', ...arr2, 'b']; // [1, 2, 'a', 3, 4, 'b']
```
`slice()` returns a shallow copy of part or all of an array without changing the original:
```
let original = [1, 2, 3];
let copy1 = original.slice(); // copy1 = [1, 2, 3]
let copy2 = original.slice(1); // copy2 = [2, 3]
```
- The start index is inclusive; the end index is exclusive.
- With one argument, it copies from that index to the end. With no arguments, it copies the whole array.
#### Sorting Array
- `sort()` mutates the array. By default it sorts values as strings; provide a comparator for numeric order.
```
let fruits = ['banana', 'apple', 'orange'];
fruits.sort(); //  ['apple', 'banana', 'orange']
[40, 1, 5, 200].sort((a, b) => a - b); // small to big
[40, 1, 5, 200].sort((a, b) => b - a); // big to small
```
- `reverse()` mutates the array by reversing its current order:
```
let letters = ['a', 'b', 'c'];
letters.reverse(); // ['c', 'b', 'a']
```
### Objects
Object operations can inspect, update, combine, and restrict properties.
#### Getting values and keys
`Object.keys()` returns an array of an object’s own enumerable string keys. `Object.values()` returns the corresponding values; neither includes inherited or Symbol-keyed properties.
```
let person = {"name": 'Alex', "age": 30};
Object.keys(person); // ["name", "age"]
```
```
let person = {"name": 'Alex', "age": 30};
Object.values(person); // ["Alex", 30]
```
#### Object length
Objects have no built-in `length` property. Count own enumerable string-keyed properties with `Object.keys(obj).length`:
```
let person = {"name": 'Alex', "age": 30};
Object.keys(person).length; // 2
```
#### Checking properties
Use `Object.hasOwn()` to check for an object’s own property. Use `in` when inherited properties should also count:
```
let person = {"name": 'Alex', "age": 30};
Object.hasOwn(person, 'age');  // true
Object.hasOwn(person, 'id'); // false
```
- `in` Checks if a property exists **anywhere** in the object
```
let person = {"name": 'Alex', "age": 30};
"name" in person; // true
```
- `Object.values()` plus `includes()` checks whether an own enumerable value matches:
```
let person = {"name": 'Alex', "age": 30};
Object.values(person).includes('Alex'); // true
```
#### Adding and removing properties
Use dot notation for known identifier-like keys and bracket notation for dynamic keys:
```
const user = {};
user.name = 'Alex';    // Adds new property
user.name = 'Sarah';   // Modifies existing property
user["age"] = 20;
```
Use `delete` to remove a configurable property:
```
let person = {"name": 'Alex', "age": 30};
delete person["age"]
```
#### Combining objects
`Object.assign()` copies enumerable own properties into a target object. The empty object below ensures a new top-level result:
```
let obj1 = { a: 1 };
let obj2 = { b: 2 };
let merged = Object.assign({}, obj1, obj2); // { a: 1, b: 2 }
```
Object spread also creates a new top-level object:
```
let obj1 = { a: 1 };
let obj2 = { b: 2 };
let merged = {...obj1, ...obj2}; // { a: 1, b: 2 }
```
#### Freeze and seal
`Object.freeze()` prevents adding or removing own properties and changing existing data properties. It is shallow, so nested objects can still change:
```
let person = {"name": 'Alex', "age": 30};
Object.freeze(person);
person.name = 'Max'; // Throws in strict mode; otherwise the assignment is ignored
```
`Object.seal()` prevents adding or removing own properties but permits updates to existing writable properties. It is also shallow:
```
let person = {"name": 'Alex', "age": 30};
Object.seal(person);
person.id = '49416548'; // Throws in strict mode; otherwise the assignment is ignored
```
## Task
### Task 1
You have the following data:
```
let firstName = "luna";
let birthYear = "2000";
let currentYear = 2025;
```
- Capitalize the first letter of `firstName` using string methods.
- Convert `birthYear` to a number and calculate the age.
- Build a sentence like: `"Luna is 25 years old."`
### Task 2
You have the following array:
```
let fruits = ["apple", "banana", "mango"];
```
- Add `"orange"` to the **start** of the array.
- Replace `"banana"` with `"kiwi"` using `indexOf()` and direct assignment.
- Use `.join(", ")` to turn the array into a single string.
### Task 3
You have the following object:
```
let user = {
  username: "skywalker",
  hobbies: ["coding", "gaming", "reading"]
};
```
- Add a new hobby `"traveling"` using `.push()`.
- Convert all hobbies to **uppercase**.
- Create a summary like: `"SKYWALKER enjoys CODING, GAMING, READING, TRAVELING."`
