var Class = require('../src/class');
describe("Class test", function() {

    it("Class - mixins", function() {

        var Other = Class({
            other: function(){}
        });

        var Other2 = Class({
            other2: function() {}
        });

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

        var ManyOthers = Class({}).mixin(Other, Other2);

        var o = new ManyOthers();
        expect(o.isA(Animal)).toBeFalsy();
        expect(o.isA(Pet)).toBeFalsy();
        expect(o.isA(Dog)).toBeFalsy();
        expect(o.isA(ManyOthers)).toBeTruthy();
        expect(o.isA(Other)).toBeTruthy();
        expect(o.isA(Other2)).toBeTruthy();

    });

});