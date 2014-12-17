var Class = require('../src/js.class');
describe("Class test", function() {

    it("Class - statics", function() {
        var Pet = Class({
            create: function() {
                this.hungry = true;
                this.thirsty = true;

            },
            eat: function() {
                this.hungry = false;
            },
            drink: function() {
                this.thirsty = false;
            }
        }).static({
            CONST_TEST: 'constTest',
            staticTest: 'staticTest'
        });

        expect(Pet.CONST_TEST).toEqual('constTest');
        expect(Pet.staticTest).toEqual('staticTest');
        Pet.CONST_TEST = 'fail';
        Pet.staticTest = 'pass';
        expect(Pet.CONST_TEST).toEqual('constTest');
        expect(Pet.staticTest).toEqual('pass');


        var dog = new Pet();
        expect(dog.CONST_TEST).toEqual('constTest');
        expect(dog.staticTest).toEqual('pass');




        var Pet2 = Class({singleton: true}).static({
            st1: {
                a: 1
            }
        });
        expect(Pet2.st1.a).toEqual(1);


    });



});