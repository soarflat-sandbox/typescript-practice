var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// https://msdn.microsoft.com/ja-jp/magazine/mt791799.aspx
var PersonWithDecorator;
(function (PersonWithDecorator) {
    // Decorator Factory
    function log() {
        // Decorator
        return function (target, propertyKey, descriptor) {
            // Save a reference to the original method
            var originalMethod = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var argsLog = args.map(function (a) { return JSON.stringify(a); }).join();
                var result = originalMethod.apply(this, args);
                var resultLog = JSON.stringify(result);
                console.log("Call: " + propertyKey + "(" + argsLog + ") => " + resultLog);
                return result;
            };
            // Return edited descriptor instead of overwriting
            // the descriptor by returning a new descriptor
            return descriptor;
        };
    }
    PersonWithDecorator.log = log;
    var NormalPerson = /** @class */ (function () {
        function NormalPerson(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
        NormalPerson.prototype.greet = function () {
            return this.fullName + " says hello!";
        };
        Object.defineProperty(NormalPerson.prototype, "fullName", {
            get: function () {
                return this.firstName + " " + this.lastName;
            },
            enumerable: true,
            configurable: true
        });
        return NormalPerson;
    }());
    var Manager = /** @class */ (function (_super) {
        __extends(Manager, _super);
        function Manager(firstName, lastName) {
            return _super.call(this, firstName, lastName) || this;
        }
        Manager.prototype.greet = function () {
            return this.fullName + " says let's dialogue about common synergies!";
        };
        __decorate([
            log()
        ], Manager.prototype, "greet", null);
        return Manager;
    }(NormalPerson));
    var ted = new Manager('Ted', 'Neward');
    console.log(ted.greet());
})(PersonWithDecorator || (PersonWithDecorator = {}));
