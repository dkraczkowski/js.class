var Class = require('../src/js.class');
describe("Class super test", function() {

    it("Class - super", function() {
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
        });

        var Dog = Pet.extend({
            eat: function() {
                this.super();
            }
        });

        var pluto = new Dog();
        pluto.eat();


    });

});
