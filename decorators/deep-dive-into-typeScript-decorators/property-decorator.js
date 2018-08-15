var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PropertyDecoratorInDeepIntoTypeSriptDecorator;
(function (PropertyDecoratorInDeepIntoTypeSriptDecorator) {
    /**
     * （プロパティ）デコレータ
     * @param target staticメンバのクラスのコンストラクター関数、またはインスタンスメンバーのクラスのprototype
     * @param key メンバの名前
     */
    function calcCircleParams(target, key) {
        var _val = this[key];
        var getter = function () {
            return _val;
        };
        var setter = function (newVal) {
            _val = newVal;
            this['Area'] = _val * _val * Math.PI;
            this['Circumference'] = 2 * _val * Math.PI;
        };
        if (delete this[key]) {
            // Create new property with getter and setter
            Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true,
            });
        }
    }
    var Circle = /** @class */ (function () {
        function Circle() {
        }
        __decorate([
            calcCircleParams
        ], Circle.prototype, "Radius", void 0);
        return Circle;
    }());
    var c = new Circle();
    c.Radius = 3;
    console.log("Radius: " + c.Radius + ", Area: " + c.Area + ", Circumference: " + c.Circumference);
    c.Radius = 5;
    console.log("Radius: " + c.Radius + ", Area: " + c.Area + ", Circumference: " + c.Circumference);
})(PropertyDecoratorInDeepIntoTypeSriptDecorator || (PropertyDecoratorInDeepIntoTypeSriptDecorator = {}));
