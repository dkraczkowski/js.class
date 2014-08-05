var MyClass = Class({
    create: function(param1, param2) {
    this.param1 = param1;
    this.param2 = param2;
}
});

var MyChildClass = MyClass.extend({});

var StaticExample = Class({
}).static({
        myStatic: 'myStatic'
    });
console.log('StaticExample.myStatic', StaticExample.myStatic);//myStatic
StaticExample.myStatic = 'otherValue';
console.log('StaticExample.myStatic = "otherValue";', StaticExample.myStatic);//otherValue

var ConstExample = Class({
}).static({
        MY_CONST: 'const'
    });
console.log('ConstExample.MY_CONST', ConstExample.MY_CONST);//const
StaticExample.MY_CONST = 'otherValue';
console.log('ConstExample.MY_CONST = "otherValue";', ConstExample.MY_CONST);//const

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

console.log('pluto.name()', pluto.name());//pluto
console.log('pluto.fed', pluto.fed);//true

console.log('pluto.isA(Dog)', pluto.isA(Dog));//true
console.log('pluto.isA(Animal)', pluto.isA(Animal));//true
console.log('pluto.isA(Pet)', pluto.isA(Pet));//true
console.log('pluto.isA(MyClass)', pluto.isA(MyClass));//false