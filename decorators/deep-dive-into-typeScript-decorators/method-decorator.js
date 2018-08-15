var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MethodDecoratorInDeepIntoTypeSriptDecorator;
(function (MethodDecoratorInDeepIntoTypeSriptDecorator) {
    /**
     * （メソッド）デコレータ
     * @param target staticメンバのクラスのコンストラクター関数、またはインスタンスメンバーのクラスのprototype
     * @param key メンバの名前
     * @param descriptor メンバのプロパティディスクリプタ
     */
    function log(target, key, descriptor) {
        console.log(key + " was called!");
    }
    var P = /** @class */ (function () {
        function P() {
        }
        // デコレータを宣言する
        P.prototype.foo = function () {
            console.log("Do something");
        };
        __decorate([
            log
        ], P.prototype, "foo", null);
        return P;
    }());
    var p = new P();
    p.foo();
    // => foo was called!
    // => Do something
})(MethodDecoratorInDeepIntoTypeSriptDecorator || (MethodDecoratorInDeepIntoTypeSriptDecorator = {}));
