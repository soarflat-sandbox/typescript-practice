var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Inheritance;
(function (Inheritance) {
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 0; }
            console.log("Animal moved " + distanceInMeters + "m.");
        };
        return Animal;
    }());
    var Dog = /** @class */ (function (_super) {
        __extends(Dog, _super);
        function Dog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dog.prototype.bark = function () {
            console.log('Woof! Woof!');
        };
        return Dog;
    }(Animal));
    var dog = new Dog();
    dog.bark(); // => Woof! Woof!
    dog.move(10); // => Animal moved 10m.
    dog.bark(); // => Woof! Woof!
    // 文字列しか渡せないのでError
    // dog.move('sfsdf');
})(Inheritance || (Inheritance = {}));
