"use strict";
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
function Timestamped(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.timestamp = Date.now();
            return _this;
        }
        return class_1;
    }(Base));
}
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());
// Create a new class by mixing "Timestamped" into "User"
var TimestampedUser = Timestamped(User);
// Instantiate the new "TimestampedUser" class
var user = new TimestampedUser("John Doe");
// We can now access properties from both the "User" class
// and our "Timestamped" mixin in a type-safe manner
console.log(user.name);
console.log(user.timestamp);
