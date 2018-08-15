var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MethodDecoratorInDeepIntoTypeSriptDecorator2;
(function (MethodDecoratorInDeepIntoTypeSriptDecorator2) {
    /**
     * （メソッド）デコレータ
     * @param target staticメンバのクラスのコンストラクター関数、またはインスタンスメンバーのクラスのprototype
     * @param key メンバの名前
     * @param descriptor メンバのプロパティディスクリプタ
     */
    function log(target, key, descriptor) {
        var originalMethod = descriptor.value;
        // 宣言箇所の引数（今回の場合はfoo(a, b)のa、b)を利用したい場合は
        // 以下のように関数を定義すれば利用できる（argumentsから参照できる）
        descriptor.value = function () {
            console.log(key + " was called with:", arguments);
            // 以下のように originalMethod（foo）を apply して返さないと
            // fooの本来の処理が実行されない
            var result = originalMethod.apply(this, arguments);
            return result;
        };
        return descriptor;
    }
    var P = /** @class */ (function () {
        function P() {
        }
        // デコレータを宣言する
        P.prototype.foo = function (a, b) {
            console.log('a is', a);
            console.log('b is', b);
            console.log("Do something");
        };
        __decorate([
            log
        ], P.prototype, "foo", null);
        return P;
    }());
    var p = new P();
    p.foo('hello', 'world');
    // => foo was called with: { '0': 'hello', '1': 'world' }
    // => Do something
})(MethodDecoratorInDeepIntoTypeSriptDecorator2 || (MethodDecoratorInDeepIntoTypeSriptDecorator2 = {}));
