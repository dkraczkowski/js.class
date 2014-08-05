js.class
========

js.class is a library which focuses on simplifying OOP in javascript.
Features:
 - easier inheritance model
 - isA operator
 - statics/constans
 - mixins

Example class declaration
=========================
In order to define new class, consider following example

```js
var MyClass = Class({
    myMethod: function() {} //your method declaration
});
```

This corresponds to:

```js
var MyClass = function() {
    //your constructor goes here
};
MyClass.prototype.myMethod = function() {
};
```

Constructors
============

Js-class comes with build-in constructor pattern:

```js
var MyClass = Class({
    create: functon(param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
});
```
This corresponds to:

```js
var MyClass = function(param1, param2) {
    this.param1 = param1;
    this.param2 = param2;
};
```


Inheritance
===========

Inheritance in js-class is a brief consider following examples:

```js
var MyChildClass = MyClass.extend({});
```

corresponds to

```js
var MyChildClass = function(param1, param2) {
    MyClass.apply(this, arguments);
};
MyChildClass.prototype = new MyClass();
```

Static and constans
===================
> Constans will not work in ie >=8 due to lack of Object.define property support


Static variables can be easly defined by usage of `static` function, which accepts literal object.

```js
var StaticExample = Class({
}).static({
    myStatic: 'myStatic'
});
console.log(StaticExample.myStatic);//myStatic
StaticExample.myStatic = 'otherValue';
console.log(StaticExample.myStatic);//otherValue
```

If literal object will contain a key in uppercase js-class will treat a variable as a constans:
```js
var StaticExample = Class({
}).static({
    MY_CONST: 'const'
});
console.log(StaticExample.MY_CONST);//const
StaticExample.MY_CONST = 'otherValue';
console.log(StaticExample.MY_CONST);//const
```

Mixins
======
Mixin is a class which contains a combination of methods from other classes
Its really usefull strategy if you are going to follow DRY methodology.
To define mixin we need to simply use `mixin` method:
```js
var Pet = Class({
    name: function(name) {
        if (typeof name === undefined) {
            return this.name;
        }
        this.name = name;
    }
});
var Animal = Class({
    eat: function() {
        this.fed = true;
    },
    drink: function() {
        this.drunk = true;
    }
});
var Dog = Class({
}).mixin(Pet, Animal);
var pluto = new Dog();
pluto.eat();
pluto.name('pluto');

console.log(pluto.name());//pluto
console.log(pluto.fed);//true
```

isA
===

js-class provides handy isA method, which tells you whater class is an instance or mixin of passed class.
```js
var pluto = new Dog();

console.log(pluto.isA(Dog));//true
console.log(pluto.isA(Animal));//true
console.log(pluto.isA(Pet));//true
console.log(pluto.isA(MyClass));//false
```