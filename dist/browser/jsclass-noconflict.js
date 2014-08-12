/**
 *
 * Copyright (C) 2011 by crac <![[dawid.kraczkowski[at]gmail[dot]com]]>
 * Thanks for Hardy Keppler<![[Keppler.H[at]online.de]]> for shortened version
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 **/
var JSClass = (function() {
    var _supportConsts = typeof Object.defineProperty === 'function';

    function _rewriteStatics(fnc, statics) {
        for (var prop in statics) {
            if (prop === 'extend' || prop === 'static' || prop === 'isA' || prop === 'mixin' ) {
                continue;
            }
            //do not rewrite objects to statics
            if (typeof statics[prop] === 'object') {
                continue;
            }

            //check if static is a constant
            if (_supportConsts && prop === prop.toUpperCase()) {
                Object.defineProperty(fnc, prop, {
                    writable: false,
                    configurable: false,
                    enumerable: true,
                    value: statics[prop]
                });
            } else {
                fnc[prop] = statics[prop];
            }
        }
    }
    return function (classBody) {

        var _preventCreateCall = false;

        return (function createClass(self, classBody) {

            var _mixins = [];

            var classConstructor = function () {
                //apply constructor pattern
                if (typeof this['create'] === 'function' && _preventCreateCall === false) {
                    this.create.apply(this, arguments);
                }
            };

            //make new class instance of extended object
            if (self !== null) {
                _preventCreateCall = true;
                classConstructor.prototype = new self();
                _preventCreateCall = false;
                _rewriteStatics(classConstructor, self);
            }

            var classPrototype = classConstructor.prototype;

            /*if (typeof classPrototype.isA === 'undefined') {
            classPrototype.isA = function(cls) {

                if (this instanceof cls) {
                    return true;
                } else if (_mixins.indexOf(cls) >= 0) {
                    return true;
                }
                return false;
            };
            //}*/

            //create class body
            for (var prop in classBody) {
                classPrototype[prop] = classBody[prop];
            }

            /**
             * Creates and returns new constructor function which extends
             * its parent
             *
             * @param {Object} classBody
             * @returns {Function}
             */
            classConstructor.extend = function (classBody) {
                return createClass(this, classBody);
            };

            /**
             * Defines statics and constans in class' body.
             *
             * @param {Object} statics
             * @returns {Function}
             */
            classConstructor.static = function(statics) {
                _rewriteStatics(classConstructor, statics);
                return classConstructor;
            };

            /**
             * Extends class body by passed other class declaration
             * @param {Function} *mixins
             * @returns {Function}
             */
            classConstructor.mixin = function() {
                for (var i = 0, l = arguments.length; i < l; i++) {
                    //check if class implements interfaces
                    var mixin = arguments[i];
                    var methods = mixin.prototype;
                    for (var method in methods) {
                        var buildIn =  method === 'create' || method === 'isA';
                        if (methods.hasOwnProperty(method) && typeof methods[method] === 'function' && !buildIn) {
                            classPrototype[method] = methods[method];
                        }
                    }
                    _mixins.push(mixin);
                }
                return classConstructor;
            };

            return classConstructor;
        })(null, classBody);
    }
})();