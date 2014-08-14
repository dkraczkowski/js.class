js.class [![Build Status](https://travis-ci.org/dkraczkowski/js.class.svg?branch=master)](https://travis-ci.org/dkraczkowski/js.class)
========

js.class is a library which focuses on simplifying OOP in javascript. Additionaly it is very fast if you compare it to libraries like: `klass`, `ee-class` or even `Class`.


###Features:
 - super fast!
 - small footprint, no dependency, 0.2K minimized
 - works on both browser and node.js
 - supports: inheritance, statics, constans, mixins
 - typeOf

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

###typeOf

js.class provides handy `typeOf` method in every instance of class,
the method allows you to determine whather object is a mixin of given class:

```js
var pluto = new Dog();

console.log(pluto.typeOf(Dog));//true
console.log(pluto.typeOf(Animal));//true
console.log(pluto.typeOf(Pet));//true
console.log(pluto.typeOf(MyClass));//false
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

For Developers
==============
###Running tests
```
npm install
npm test
```
###Running benchmarks
```
node ./benchmark/class-extend.js
node ./benchmark/class-declaration.js
```

####Class declaration benchs
```
class x 75,624 ops/sec ±3.23% (86 runs sampled)
js.class x 50,721 ops/sec ±9.67% (63 runs sampled)
klass x 44,743 ops/sec ±8.60% (74 runs sampled)
ee-class x 25,366 ops/sec ±6.20% (77 runs sampled)
```

####Class extension benchs
```
js.class x 126,312 ops/sec ±3.57% (92 runs sampled)
class x 78,576 ops/sec ±5.05% (85 runs sampled)
klass x 59,602 ops/sec ±7.94% (76 runs sampled)
ee-class x 37,730 ops/sec ±4.70% (85 runs sampled)
```

####Mixins benchs
```
js.class x 3,711,831 ops/sec ±42.60% (49 runs sampled)
class x 659,439 ops/sec ±0.31% (99 runs sampled)
klass x 253,159 ops/sec ±0.32% (99 runs sampled)
ee-class x 151,110 ops/sec ±0.66% (98 runs sampled)
```
| Note that only js.class supports typeof method, which allows you to determine whether given object is a mixin of other class.

####Conclusion
You can notice that simple class declaration is the fastest in `class` library, but when it comes to using more
advanced oop features `js.class` is a good choice.

Version History
===============
### 2.2.1
Fixed instance's statics. Now if you change instance's static it will be changed across all other instances of the same class
### 2.2.0
Removed behaviour which was copying consts/statics into children class