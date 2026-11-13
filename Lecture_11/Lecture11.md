## Learning Objectives

By the end of this lecture, students should be able to:

- Explain the purpose of object-oriented programming.
- Create objects and define properties and methods.
- Describe constructor functions and JavaScript prototypes.
- Create classes and instances.
- Use inheritance, encapsulation, static members, and polymorphism.
- Define getters and setters for controlled property access.
- Recognize common JavaScript errors and handle exceptions with `try...catch`.
- Create and throw custom errors.

## Introduction to Object-Oriented Programming

**Object-oriented programming (OOP)** is a way of organizing software around objects that combine data and behavior. An object can describe something in an application, such as a user, product, bank account, or order. Its properties represent information about it, while its methods represent actions it can perform.

OOP can help organize larger programs into reusable components. Instead of keeping all data and operations in unrelated variables and functions, related information can be grouped into objects with clear responsibilities.

Four concepts are commonly associated with OOP:

- **Encapsulation** groups data and the operations that work with it, while controlling access to internal state.
- **Abstraction** exposes the useful behavior of a component while hiding implementation details that callers do not need to know.
- **Inheritance** allows one class to build on another class's behavior.
- **Polymorphism** allows different objects to be used through a shared interface while providing their own implementations.

JavaScript uses a prototype-based object model. Its `class` syntax provides a familiar way to create objects and inheritance hierarchies, but it is built on the language's prototype system.

## Objects, Properties, and Methods

An object is a collection of properties. A property associates a key with a value, and that value can be data or a function. A function stored on an object is commonly called a **method**.

```javascript
const person = {
  name: "Amira",
  age: 20,
  greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }
};

person.greet();
```

In this example, `name` and `age` are properties, while `greet()` is a method. The `this` keyword refers to the object used as the method's receiver in this call, so `this.name` accesses the person's name.

A property can be accessed or updated through dot notation or bracket notation:

```javascript
console.log(person.name);
person.age = 21;
person["city"] = "Algiers";
```

## Constructor Functions

Before JavaScript classes were introduced, constructor functions were a common way to create multiple objects with similar structures. A constructor function is called with the `new` keyword. During that call, JavaScript creates a new object and makes it available through `this` inside the constructor.

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const amira = new Person("Amira", 20);
const yacine = new Person("Yacine", 22);

console.log(amira.name);
console.log(yacine.age);
```

Constructor functions conventionally begin with an uppercase letter. Calling one without `new` can produce unexpected behavior, so the `new` keyword is essential when using this pattern.

## Prototypes

JavaScript objects can inherit properties and methods from another object through the **prototype chain**. A constructor function has a `prototype` property. When an instance is created with `new`, its internal prototype is linked to that constructor's prototype object.

This allows methods to be shared by every instance rather than creating a separate copy of the method inside each object:

```javascript
function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
}

Car.prototype.getInfo = function () {
  return `${this.brand} ${this.model} (${this.year})`;
};

const firstCar = new Car("Toyota", "Corolla", 2020);
const secondCar = new Car("Honda", "Civic", 2022);

console.log(firstCar.getInfo());
console.log(secondCar.getInfo());
```

Both instances can call `getInfo()` because the method is found through the prototype chain. This is one of the mechanisms behind inheritance in JavaScript.

## Classes

Modern JavaScript provides the `class` syntax as a clearer way to define a constructor and its prototype methods. A class describes how instances should be created and what behavior they should share.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

const dog = new Animal("Buddy");
dog.speak();
```

The `constructor()` method runs when an instance is created with `new`. It is commonly used to initialize the object's properties. Other methods are placed on the class prototype and are shared by instances.

## Inheritance

Inheritance allows a class to extend another class. The child class receives accessible behavior from the parent and can add new behavior or override inherited methods.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const myDog = new Dog("Rex");
myDog.speak();
```

The `extends` keyword establishes the inheritance relationship. If the child class defines its own constructor, it must call `super()` before using `this`:

```javascript
class GuideDog extends Dog {
  constructor(name, owner) {
    super(name);
    this.owner = owner;
  }
}
```

Inheritance is useful when there is a genuine shared relationship, but deep inheritance hierarchies can become difficult to maintain. Composition—building objects from smaller components—can sometimes be a simpler alternative.

## Encapsulation and Private Fields

**Encapsulation** means controlling how an object's internal state is accessed and changed. JavaScript supports private class fields using the `#` prefix. A private field can be accessed only from within the class body.

```javascript
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Deposit must be greater than zero.");
    }

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

The private field prevents outside code from changing the balance directly. The class exposes a method that validates the requested operation before updating its internal state. Encapsulation does not automatically make a system secure, but it helps preserve the rules that the class is responsible for enforcing.

## Static Properties and Methods

A static method belongs to the class itself rather than to an instance. It is useful for behavior that relates to the class as a whole or for utility operations that do not need instance state.

```javascript
class MathHelper {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathHelper.add(5, 3)); // 8
```

Calling `add()` on an instance would not work because the method is attached to the class, not to its prototype. Static properties follow the same general idea and are accessed through the class name.

## Polymorphism

**Polymorphism** allows objects of different classes to be used through a common interface. One common JavaScript example is method overriding: a child class provides its own implementation of a method inherited from a parent class.

```javascript
class Shape {
  draw() {
    console.log("Drawing a shape.");
  }
}

class Circle extends Shape {
  draw() {
    console.log("Drawing a circle.");
  }
}

class Rectangle extends Shape {
  draw() {
    console.log("Drawing a rectangle.");
  }
}

const shapes = [new Circle(), new Rectangle()];

for (const shape of shapes) {
  shape.draw();
}
```

The loop does not need to know the specific class of every item. Each object responds to the same `draw()` method in its own way. This is useful when several types share a common behavior but need different implementations.

## Getters and Setters

Getters and setters provide controlled access to object properties. A **getter** runs when a property is read. A **setter** runs when a value is assigned to a property. They are useful when a value needs validation, formatting, or calculated behavior.

### Setters

```javascript
const user = {
  firstName: "",

  set name(value) {
    if (value.trim().length < 3) {
      throw new Error("Name must contain at least three characters.");
    }

    this.firstName = value.trim();
  }
};

user.name = "Amira";
console.log(user.firstName);
```

### Getters

```javascript
const user = {
  firstName: "Amira",

  get displayName() {
    return this.firstName.toUpperCase();
  }
};

console.log(user.displayName); // AMIRA
```

A getter is accessed like a property rather than called like a method. Avoid getters with expensive or surprising side effects; reading a property should generally be predictable.

## Understanding Errors

An **error** occurs when a program cannot perform an operation as intended. Errors may be caused by invalid syntax, incorrect assumptions, unexpected values, or problems that occur while the program is running.

It is useful to distinguish three broad categories:

- **Syntax errors** occur when the code does not follow JavaScript's grammar. The browser cannot execute the affected script until the syntax problem is corrected.
- **Runtime errors** occur while code is executing, for example when a program tries to read a property from `null`.
- **Logic errors** occur when the code runs but produces an incorrect result because the algorithm or conditions are wrong.

Some failures are caused by invalid input or external systems, such as an unavailable server. Good programs anticipate expected failures and respond in a controlled way.

### Common JavaScript Error Types

| Error type | Meaning | Example |
| --- | --- | --- |
| `SyntaxError` | Code cannot be parsed | Missing or misplaced syntax |
| `ReferenceError` | A variable or reference cannot be resolved | `console.log(unknownName)` |
| `TypeError` | An operation is invalid for the value's type | `null.toString()` |
| `RangeError` | A value is outside an allowed range | `new Array(-1)` |
| `Error` | A general error object | `throw new Error("Something failed")` |

The browser console usually shows the error type, message, and location. Use those details to find the line where the problem occurred and inspect the values involved.

## Handling Exceptions with `try...catch`

JavaScript provides `try...catch` to handle exceptions that occur while a particular section of code executes. Statements that may throw an error are placed in the `try` block. If an exception is thrown, execution moves to the `catch` block.

An optional `finally` block runs whether the `try` block succeeds or an exception is caught. It is useful for cleanup operations.

```javascript
try {
  const value = JSON.parse("{ invalid json }");
  console.log(value);
} catch (error) {
  console.error("The data could not be parsed:", error.message);
} finally {
  console.log("Parsing attempt finished.");
}
```

`try...catch` handles exceptions thrown during execution of the `try` block. It does not repair syntax errors that prevent the script from being parsed in the first place. It also does not catch an asynchronous rejection unless the Promise is awaited inside the `try` block or is handled with `.catch()`.

For example:

```javascript
async function loadData() {
  try {
    const response = await fetch("https://example.com/api/data");

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Unable to load data:", error.message);
    return null;
  }
}
```

## Creating and Throwing Custom Errors

Use `throw` to signal that a function cannot complete an operation according to its rules. A custom error message should explain what went wrong in a way that helps the caller respond.

```javascript
function divideByTwo(number) {
  if (!Number.isFinite(number)) {
    throw new TypeError("The input must be a finite number.");
  }

  if (number % 2 !== 0) {
    throw new Error("Only even numbers are accepted.");
  }

  return number / 2;
}

try {
  console.log(divideByTwo(5));
} catch (error) {
  console.error(error.message);
}
```

In larger applications, developers may create custom error classes to distinguish different failure types. For beginner projects, the built-in `Error` constructor is usually sufficient.

## Key Takeaways

- Objects group properties and methods into one structure.
- Constructor functions and prototypes are part of JavaScript's prototype-based model.
- Classes provide a clear syntax for creating instances and inheritance relationships.
- Encapsulation protects internal state by controlling how it is changed.
- Static members belong to the class; instance methods belong to individual objects through the prototype.
- Getters and setters provide controlled property access.
- Syntax, runtime, and logic errors have different causes.
- Use `try...catch` for exceptions and validate inputs before performing important operations.

## Practical Exercises

### Task 1 — Bank Account Class

Create a `BankAccount` class that stores the following private fields:

- `#accountNumber` — a string identifying the account.
- `#ownerName` — the account holder's name.
- `#balance` — the current balance, initially `0`.
- `#transactions` — an array recording account activity.

Implement a constructor that accepts an account number, owner name, and optional initial balance. Reject a negative initial balance. Add `deposit(amount)` and `withdraw(amount)` methods that validate the amount and record successful transactions. The withdrawal method must reject a request when the account does not have enough funds. Provide `getBalance()` and `getStatement()` methods. Finally, add a static `transfer(sourceAccount, targetAccount, amount)` method that transfers money only when the source account has sufficient funds.

Use meaningful error messages and avoid changing either account when a transfer cannot be completed.

### Task 2 — Error Handling Tests

Write test calls that attempt a negative deposit, a negative withdrawal, a withdrawal greater than the current balance, and an invalid transfer. Wrap the calls in `try...catch` blocks and display the error messages. Also test successful deposits, withdrawals, and transfers.
