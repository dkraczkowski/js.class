var Class = require('../src/class');
describe("Class test", function() {

    it("Class - mixins", function() {

        var Pet = Class({
            name: function() {
                return 'flaffy';
            }
        });

        function unusedMixin() {};

        var Animal = Class({
            eat: function() {
                this.hungry = false;
            },
            drink: function() {
                this.thirsty = false;
            }
        });

        var Dog = Class({
            create: function() {
                this.hungry = true;
                this.thirsty = true;
            }
        }).mixin(Animal, Pet);

        var flaffy = new Dog();

        expect(flaffy.hungry).toBeTruthy();
        expect(flaffy.thirsty).toBeTruthy();
        expect(typeof flaffy['eat'] === 'function').toBeTruthy();
        expect(typeof flaffy['drink'] === 'function').toBeTruthy();
        expect(typeof flaffy['name'] === 'function').toBeTruthy();
        expect(flaffy.isA(Animal)).toBeTruthy();
        expect(flaffy.isA(Pet)).toBeTruthy();
        expect(flaffy.isA(Dog)).toBeTruthy();
        expect(flaffy.isA(unusedMixin)).toBeFalsy();

        flaffy.eat();
        expect(flaffy.hungry).toBeFalsy();
    });

});