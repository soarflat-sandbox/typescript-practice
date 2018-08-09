"use strict";
var GreeterClass;
(function (GreeterClass) {
    var Greeter = /** @class */ (function () {
        function Greeter(message) {
            this.greeting = message;
        }
        Greeter.prototype.greet = function () {
            return "Hello, " + this.greeting;
        };
        return Greeter;
    }());
    // OK
    var greeter = new Greeter('world');
    // 文字列しか渡せないのでError
    // const greeter2 = new Greeter(2);
})(GreeterClass || (GreeterClass = {}));
