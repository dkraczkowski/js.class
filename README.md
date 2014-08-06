class.js [![Build Status](https://travis-ci.org/dkraczkowski/class.js.svg?branch=master)](https://travis-ci.org/dkraczkowski/class.js)
========

class.js is a library which focuses on simplifying OOP in javascript.

###Features:
 - super fast!
 - small footprint, no dependency, 0.2K minimized
 - works on both browser and node.js
 - supports: inheritance, statics, constans, mixins
 - isA

API
=========================

###Class declaration

```js
var MyClass = Class({
    myMethod: function() {} //your method declaration
});
```

###Constructor pattern

```js
var MyClass = Class({
    create: function(param1, param2) {//this will be called with new keyword
        this.param1 = param1;
        this.param2 = param2;
    }
});

var instance = new MyClass(1,2);
console.log(instance.param1);//1
console.log(instance.param2);//2
```

###Inheritance
```js
var MyChildClass = MyClass.extend({});
```

###Invoking overridden methods
```js
var MyClass = Class({
    myMethod: function() {};
});
var MyChildClass = MyClass.extend({
    myMethod: function() {
        MyClass.prototype.myMethod.apply(this, arguments);
    }
});
```

###Statics and constans
> Constans will not work in ie >=8 due to lack of Object.define property support


Static variables can be easy defined by usage of `static` function, which accepts literal object.

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
var ConstantExample = Class({
}).static({
    MY_CONST: 'const'
});
console.log(ConstantExample.MY_CONST);//const
ConstantExample.MY_CONST = 'otherValue';
console.log(ConstantExample.MY_CONST);//const
```

###Mixins

Mixin is a class which contains a combination of methods from other classes
Its really usefull strategy if you are going to follow DRY methodology.
To define mixin we need to simply use `mixin` method:
```js
var Pet = Class({
    name: function(name) {
        if (typeof name === 'undefined') {
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

###isA

js-class provides handy isA method, which tells you whether class is an instance or mixin of passed class.
```js
var pluto = new Dog();

console.log(pluto.isA(Dog));//true
console.log(pluto.isA(Animal));//true
console.log(pluto.isA(Pet));//true
console.log(pluto.isA(MyClass));//false
```

Instance of support
===================
js.class does support `instanceof` operator. Consider the following example:

```js
var MyClass = Class({
    create: function(param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
});
var MyChildClass = MyClass.extend({});

var t = new MyChildClass();

console.log(t instanceof MyClass);//true
console.log(t instanceof MyChildClass);//true
```
