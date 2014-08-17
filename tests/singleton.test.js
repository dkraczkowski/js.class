var Class = require('../src/js.class');
describe("Class basic test", function() {

    it("Class - singleton", function() {

        var Pet = Class({
            singleton: true,
            create: function() {
                this.a = this.a || 0;
                this.a++;
            }
        });

        var d1 = Pet.instance();
        var d2 = Pet.instance();

        expect(d1 === d2).toBeTruthy();
        expect(d1.a).toEqual(1);
        expect(d2.a).toEqual(1);


        var Pet2 = Class({
            singleton: true,
            a: function() {
                return 'b';
            }
        });

        var d3 = Pet2.instance();

        expect(d1 === d2 !== d3).toBeTruthy();

        expect(typeof d3['a'] === 'function').toBeTruthy();

        var exception;
        try {
            new Pet2();
        } catch (e) {
            exception = e;
        }

        expect(exception instanceof Error).toBeTruthy();



    });



});