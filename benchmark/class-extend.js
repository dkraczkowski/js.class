var JSClass = require('../src/class.js');
var Class = require('class');
var EEClass = require('ee-class');
var Benchmark = require('benchmark').Benchmark;
var suite = new Benchmark.Suite;

// add tests
suite.add('ee-class', function() {
    var Animal = new EEClass({
        init: function(){},
        eat: function() {},
        sleep: function() {}
    });

    var Mammal = new EEClass({
        inherits: Animal,
        eatMilk: function() {}
    });

    var bobby = new Mammal();
}).add('js.class', function() {
    var Animal = JSClass({
        create: function() {},
        eat: function() {},
        sleep: function() {}
    });

    var Mammal = Animal.extend({
        eatMilk: function() {}
    });

    var bobby = new Mammal();
}).add('class', function() {
    var Animal = Class.new(function(){
        this.class.eat = function(){};
        this.class.sleep = function(){};
        this.initialize = function(){};
    });

    var Mammal = Animal.subclass({
        eatMilk: function() {}
    });

    var bobby = Mammal.new();
}).on('cycle', function(event) {
    console.log(String(event.target));
}).on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
}).run();