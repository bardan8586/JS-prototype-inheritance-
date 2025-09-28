// JavaScript Prototype & __proto__ Code Samples

// =================
// STRING PROTOTYPES
// =================

const str = "Hello World";

console.log(str.__proto__); // String.prototype
console.log(str.__proto__.__proto__); // Object.prototype
console.log(str.__proto__.__proto__.__proto__); // null

// String methods come from String.prototype
console.log(str.toUpperCase()); // "HELLO WORLD"
console.log(str.slice(0, 5)); // "Hello"

// Adding custom method to String prototype
String.prototype.reverse = function() {
    return this.split('').reverse().join('');
};

console.log(str.reverse()); // "dlroW olleH"

// =================
// NUMBER PROTOTYPES
// =================

const num = 42;

console.log(num.__proto__); // Number.prototype
console.log(num.__proto__.__proto__); // Object.prototype

// Number methods from Number.prototype
console.log(num.toString()); // "42"
console.log(num.toFixed(2)); // "42.00"

// Custom method for Numbers
Number.prototype.isEven = function() {
    return this % 2 === 0;
};

console.log(num.isEven()); // true
console.log((43).isEven()); // false

// =================
// OBJECT CONSTRUCTOR & PROTOTYPE
// =================

function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Adding method to prototype
Person.prototype.greet = function() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
};

Person.prototype.getBirthYear = function() {
    return new Date().getFullYear() - this.age;
};

const john = new Person("John", 30);

console.log(john.greet()); // "Hi, I'm John and I'm 30 years old"
console.log(john.getBirthYear()); // 1994

// Prototype chain exploration
console.log(john.__proto__ === Person.prototype); // true
console.log(john.__proto__.__proto__ === Object.prototype); // true

// =================
// ARRAY PROTOTYPE CHAIN
// =================

const arr = [1, 2, 3];

console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true
console.log(arr.__proto__.__proto__.__proto__); // null

// Array methods from Array.prototype
arr.push(4);
console.log(arr.filter(x => x > 2)); // [3, 4]

// =================
// FUNCTION PROTOTYPE CHAIN
// =================

function myFunc() {
    return "Hello";
}

console.log(myFunc.__proto__ === Function.prototype); // true
console.log(myFunc.__proto__.__proto__ === Object.prototype); // true

// Function methods from Function.prototype
console.log(myFunc.call()); // "Hello"
console.log(myFunc.length); // 0 (number of parameters)

// =================
// PRACTICAL APPLICATIONS
// =================

// 1. Polyfills
if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement) {
        return this.indexOf(searchElement) !== -1;
    };
}

// 2. Method Chaining
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.addExclamation = function() {
    return this + '!';
};

console.log("hello world".capitalize().addExclamation()); // "Hello world!"

// 3. Type Checking
Number.prototype.getType = function() {
    if (Number.isInteger(this)) return 'integer';
    return 'float';
};

console.log((42).getType()); // "integer"
console.log((3.14).getType()); // "float"

// =================
// MODERN CLASS SYNTAX (still uses prototypes)
// =================

class ModernPerson {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hi, I'm ${this.name}`;
    }
}

// Still uses prototypes under the hood!
console.log(ModernPerson.prototype.greet); // function

// =================
// BETTER PRACTICE
// =================

// Use Object.getPrototypeOf() instead of __proto__
const obj = {};
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
