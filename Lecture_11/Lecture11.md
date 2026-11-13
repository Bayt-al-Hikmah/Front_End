# Lecture 11 — Objects, Classes, and Error Handling

> **Core idea:** Objects keep related state and behavior together; error handling makes failure paths explicit and recoverable.

## Learning goals
- Create objects with properties and methods, using prototypes and classes where appropriate.
- Explain encapsulation, inheritance, polymorphism, and getters/setters in JavaScript.
- Diagnose runtime errors and handle expected failures with `try...catch` and custom errors.
## Object-oriented programming
Object-oriented programming organizes code around objects that combine state (properties) and behavior (methods). JavaScript uses prototypes for inheritance; `class` syntax provides a familiar way to define constructors and methods.

**Core Principles of OOP:**
- **Encapsulation**: Groups state with the operations that manage it and limits direct access where useful.
- **Abstraction**: Exposes the operations a caller needs while hiding implementation details.
- **Inheritance**: Lets an object or class reuse and specialize behavior through a prototype chain.
- **Polymorphism**: Lets different objects respond to the same operation in their own way.
### Objects
Objects in JavaScript are collections of key-value pairs where the keys are strings (or Symbols) and the values can be any data type, including functions. Objects are the foundation of OOP in JavaScript.

**Object Literal Example:**

```
const person = {
  name: "Alice",
  age: 30,
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};
```

`person` has `name` and `age` properties and a `greet()` method. Access properties with dot notation (`person.name`) or bracket notation (`person["name"]`). Objects can be nested, and properties can be added, updated, or deleted.
### Properties and methods
Properties hold an object’s state; methods are functions that define or perform its behavior. A `car` might store `make`, `model`, and `year`, with methods such as `startEngine()`.
### Constructor Functions
Constructor functions initialize objects when called with `new`. In that call, `this` refers to the new object; assign its instance properties there.

```
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const john = new Person("John", 25);
john.greet();
```
### Prototypes 
Each constructor function has a `.prototype` object. Instances created with `new` link to it through their prototype chain, so methods added there are shared by existing and future instances.
```
function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
}

Car.prototype.getInfo = function() {
  return `${this.brand} ${this.model} (${this.year})`;
};

const car1 = new Car("Toyota", "Corolla", 2020);
const car2 = new Car("Honda", "Civic", 2022);

console.log(car1.getInfo()); // Toyota Corolla (2020)
console.log(car2.getInfo());
```
### Classes
`class` syntax groups a constructor and methods. Class methods are placed on the class’s prototype; classes still use JavaScript’s prototype-based model.
```
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

const dog = new Animal("Buddy");
dog.speak();
```
### Inheritance
Inheritance allows a class to inherit properties and methods from another class. In JavaScript, this is done using the `extends` keyword and `super()` function.

```
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  speak() {
    console.log(`${this.name} barks`);
  }
}

const myDog = new Dog("Rex");
myDog.speak(); // Rex barks
```

`Dog` inherits `Animal` behavior and overrides `speak()`. A derived constructor calls `super(name)` before using `this` to initialize parent state. Use inheritance when the relationship is meaningful; composition is often simpler for shared capabilities.
### Encapsulation

Encapsulation is the practice of hiding the internal state and requiring all interaction to be performed through an object’s methods. In JavaScript, you can use closures or private fields (with `#`) to encapsulate data.

```
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
```

The `#` prefix creates a private class field that code outside the class cannot access. It supports encapsulation; it is not a way to store secrets securely.
### Static Methods and Properties

Static methods belong to the class itself rather than to any instance. They are useful for utility functions or class-wide behaviors.

```
class MathHelper {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathHelper.add(5, 3)); // 8
```

Call a static method or access a static property on the class itself, not on an instance. Static members belong to the class.
### Polymorphism
Polymorphism lets different objects support the same operation. One way to implement it is method overriding in a subclass:

```
class Shape {
  draw() {
    console.log("Drawing a shape");
  }
}

class Circle extends Shape {
  draw() {
    console.log("Drawing a circle");
  }
}

const s1 = new Shape();
const s2 = new Circle();
s1.draw(); // Drawing a shape
s2.draw(); // Drawing a circle
```

The method called depends on the object. Different shapes can be used through the same `draw()` interface.
### Getters and Setters
Getters and setters run when a property is read or assigned. They can format or validate values while preserving property-like syntax.
#### Setters:
Define a setter with `set` to validate or transform an assigned value:
```
const user = {
  firstName: '',
  set name(value) {
    if (value.length < 3) {
      console.log('Name is too short.');
    } else {
      this.firstName = value;
    }
  }
};

user.name = 'Al';    // Output: Name is too short.
user.name = 'Alice'; // Valid assignment
```
#### Getters
Define a getter with `get` to return a derived or formatted value when the property is read:
```
const user = {
  firstName: 'Alice',
  get name() {
    return this.firstName.toUpperCase();
  }
};

console.log(user.name); // Output: ALICE
```
## Error handling
Errors can be found before execution, occur while code runs, or appear as incorrect behavior without throwing an exception. Validate inputs and handle failures where the program can respond meaningfully.
### Types of Errors
- **Syntax errors**: Invalid grammar, such as an unmatched brace, prevents the code from parsing.
- **Runtime errors**: Thrown while code executes, for example when a property is read from `null`.
- **Logic errors**: The code runs but produces the wrong result.
- **Arithmetic mistakes**: Incorrect formulas or operator precedence can produce wrong values. Numeric division by zero in JavaScript produces `Infinity` or `NaN`, not an exception.
- **Resource failures**: Excessive memory use or runaway work can exhaust available resources.
### JavaScript Errors

| Error Type        | Description                   | Example                              |
| ----------------- | ----------------------------- | ------------------------------------ |
| `SyntaxError`     | Invalid code structure        | `function() {` (missing name)        |
| `ReferenceError`  | Accessing undefined variables | `console.log(notDefined)`            |
| `TypeError`       | Wrong data type usage         | `null.toString()`                    |
| `RangeError`      | Numeric value out of range    | `new Array(-1)`                      |
| `Error` instances | Built-in or application-defined thrown errors | `throw new Error("Invalid input")` |

### Using The Console
The browser console reports syntax and runtime errors, usually with a message and source location. Logic errors require checking the program’s inputs, state, and output.
### Handling Runtime Errors with `try-catch`
Use `try...catch` for code that may throw or reject when awaited. JavaScript does not support typed catch clauses; inspect `error` with `instanceof` when different errors need different responses. `finally` runs whether the try block succeeds or fails.
```
const a = 4;
try {
  a = 5;
} catch (error) {
  console.log(error); // This will log the error object
} finally {
  console.log("done!");
}
```
### Throwing errors
Create an `Error` with a useful message and throw it when an operation cannot continue. Create the error at the point of failure so its stack trace is useful:
```
function divideByTwo(number) {
  if (number % 2 !== 0) {
    throw new Error("Only even numbers allowed.");
  }
  return number / 2;
}

try {
  console.log(divideByTwo(5)); 
} catch (error) {
  console.log(error.message);
}

```
## Tasks
## Task 1

Define a `BankAccount` class with:
#### Properties
- `#accountNumber` (private, string) – A unique account identifier.
- `#ownerName` (private, string) – The account holder's name.
- `#balance` (private, number) – The current balance (default: `0`).
- `#transactions` (private, array) – Stores transaction history.
#### Methods
1. **`constructor(accountNumber, ownerName, initialBalance = 0)`**
    - Initializes the account with given details.
    - Throws an error if `initialBalance` is negative.
2. **`deposit(amount)`**
    - Adds `amount` to the balance.
    - Throws an error if `amount` is negative.
    - Logs the transaction in `#transactions`.
3. **`withdraw(amount)`**
    - Deducts `amount` from the balance.
    - Throws an error if:
        - `amount` is negative.
        - Insufficient funds (`balance < amount`).
    - Logs the transaction in `#transactions`.
4. **`getBalance()`**
    - Returns the current balance.
5. **`getStatement()`**
    - Prints all transactions in a formatted way.
6. **`static transfer(sourceAccount, targetAccount, amount)`**
    - A **static method** that transfers `amount` from `sourceAccount` to `targetAccount`.
    - Throws an error if the transfer fails.
### Task 2
- Use `try-catch` blocks to handle:
    - Negative deposits/withdrawals.
    - Insufficient funds.
    - Invalid transfers.
