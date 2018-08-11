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
var ComplexInheritance;
(function (ComplexInheritance) {
    var Animal = /** @class */ (function () {
        function Animal(theName) {
            this.name = theName;
        }
        Animal.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 0; }
            console.log(this.name + " moved " + distanceInMeters + "m.");
        };
        return Animal;
    }());
    var Snake = /** @class */ (function (_super) {
        __extends(Snake, _super);
        function Snake(name) {
            // スーパークラス（Animal）のコンストラクタを実行する
            return _super.call(this, name) || this;
        }
        return Snake;
    }(Animal));
    var Horse = /** @class */ (function (_super) {
        __extends(Horse, _super);
        function Horse(name) {
            // スーパークラス（Animal）のコンストラクタを実行する
            return _super.call(this, name) || this;
        }
        // スーパークラス（Animal）のmoveメソッドをオーバーライド
        Horse.prototype.move = function (distanceInMeters) {
            if (distanceInMeters === void 0) { distanceInMeters = 45; }
            console.log('Galloping...');
            _super.prototype.move.call(this, distanceInMeters);
        };
        return Horse;
    }(Animal));
    var sam = new Snake('Sammy the Python');
    var tom = new Horse('Tommy the Palomino');
    sam.move();
    // => Sammy the Python moved 5m.
    tom.move(34);
    // => Galloping...
    // => Tommy the Palomino moved 34m.
})(ComplexInheritance || (ComplexInheritance = {}));
