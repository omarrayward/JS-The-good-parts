/* This document is a recap of the book:
  JavaScript The good parts by Douglas Crockford (O'Reilly Media)
*/

/*  In js there are special operators:
 *  typeof
 *  yield
 *  this
 *  new
 *  in
 *  function
 *  delete (deletes objects or properties)
*/

/* objects.
/ arrays, functions, objects and regex are true objects (mutable)
/ boolean, number, string, null, undefined are object like . They
  have methods but are immutable.

 * Object literal vs object contstructor (using new).
 Object literal is preferred over object constructor
 */

 myobject = {
  "hello" : "world"
 }

 myobject = new Object()
 myobject.hello = "world"

// Properties retrieval. It's better to retrieve properties with the
// dot notation than with the curly braces

/*Every object is linked to a prototype object from which it inherit
  properties.

  Every Function has a prototype object. One of the properties of this
  object is constructor that is pointing to the Function itself

  This prototype object is where every property is going to be inherited

  Every object inherits from a function. The function that is in the top of
  the inheritance tree is the function Object.

  Every object has a hidden property [[prototype]] that in most of the browsers
  is accesible with __proto__ that points to the prototype object of the
  inherited function.
*/

// One of the worst features of js is the global scope. In order to
// prevent unexpected behaviour we can create our "own world" inside
// an object.

var MYAPP = {};
MYAPP.identifier = {
  "name"     : "Omar" ,
  "lastName" : "Rayward"
}

MYAPP.intention = {
  "shortTerm" : "Find a job",
  "longTerm"  : "Be a great programmer"
}

console.log(MYAPP.identifier.name === "Omar")

/* functions
  functions are objects and have properties and methods. As explained above
  the most important property is the prototype property. functions also have
  length as property.

  functions methods:
  * apply     <function>(thisObj[,[arg1 ,arg2, ...]]) // calls the function
  * calls     <function>(thisObj [,arg1[,arg2...]]) // calls the function
  * bind      <function>(thisObj [,arg1[,arg2...]]) // doesn't call the function
  * toString

  when the function is invoked there are 2 extra parameters:
  * arguments (array-like structure)
  * this (it depends on how the function is invoked)

  4 types of function invocation:

  A. method invocation: <this> inside the function is the object calling the method
  B. function invocation: <this> is the global object
  C. apply invocation: as stated above <this> is the first argument passed to the function apply
  D. constructor invocation: <this> is is bound to the new Object
*/

// Example of constructor invocation. By convention when a function is going
// to be used as constructor it has capital letter
var Animal = function(name){
  this.name = name
}

/* Javascript doesn't implement block scope, it implements function scope
   hoisting: The concept that in a function when a variable is declared
   this variable is created in memory before any code inside the function is run
   Then when the turn comes that variable is assigned a value.

   In a function every declaration (variable or function) is moved to the top
   of the function when by the Javascript interpreter.

   Best practice is to declare all the variables that are at the top of the function
*/

// There are a couple of ways of defining a function
// function expression finishes with semicolon, but not function declaration

//1. named function expression // with variable declaration
var add = function add(x,y){
  return x + y;
};

//2. function expression a.k.a. anonymous function // with variable declaration
var add = function(a,b) {
  return a + b;
};

// The only difference between 1 and 2 is that the property name in
// example 2 is an empty string.

//3. function declaration, is like variable declaration. Doesn't end with semicolon
function add(a, b){
  return a + b
}

// function devlarations are prohibited in blocks. Each browser implements it
// in a different way.

// Immediate functions are always expressions// Used as modules (for namespacing)
//4.
(function (){
  var hello = 'world'
})();

//5.
!function (){
  var hello = 'world'
}();

// 4 and 5 are function expressions that can be immediatly called
// Whenever possible create function expressions and not function declarations

// Immediate or selfinvoking functions (both examples are function expressions)
// Module pattern or immediate function

var adios = function(){
  var he =  function(){
    return 'adios'
  }
  return he()
}();

!function sayHello() {
    console.log("hello!");
}();

console.log(adios)

// Curry and partial. This features are not built in js. These are important functional
// concepts.
// A partial is a partial application of a function.
// It is precisely the ability to pass an uncompleted number of arguments to a function.
// Currying is a behavior that some functions have in which applying a partial number of
// arguments to a function created another function with the same name that is able to recieve
// the other arguments.

// INHERITANCE

/* JS is an object oriented programming language that doesn't implement classical inheritance.
   It implements prototypal inheritance.

   3 types of inheritance:
   1. Pseudoclassical
   2. Prototypal
   3. Functional
*/

// 1. Pseudoclassical. In this pattern we need to use the operator new
// and the function is used as a constructor.
// We use a function to create objects.
//

var Quo = function(name){
  this.name = name;
  this.age = 45;
}

Quo.prototype.add = function(a,b){
  return a + b ;
}

var myQuo = new Quo('Omar')
console.log(myQuo.name)
console.log(myQuo.add(4,5))
// Every object has a __proto__ property. __proto__ is pointing all the methods that are inherited
// by the new objects
// Only functions have prototype. This is the place where the methods that are going to be
// inherited are stored
console.log(myQuo.__proto__)
console.log(Quo.prototype)
console.log(Quo.__proto__)

// 2. Prototypal

var newObject = {
  name : "Omar",
  age  : 31
}
// The Object function has a method called create in which all the attributes and methods
// in the object passed as argument are inherited by the new object
var daObj = Object.create(newObject)

console.log(newObject.name)
console.log(daObj.name)
console.log(daObj.__proto__)
// In this pattern of inheritance __proto__ is signling the parent object
// A bad thing is that everything here is public there is no privacy.

// 3. Functional

var mammal = function(spec){
  that          = {};

  that.get_name = function(){
    return spec.name;
  };

  that.say      = function(){
    return spec.say || "What's appppp!"
  };

  return that;
}

var myMammal = mammal ({name:'Andy'})
console.log(myMammal.get_name())
console.log(myMammal.say())



