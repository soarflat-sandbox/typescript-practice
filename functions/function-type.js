var FunctionType;
(function (FunctionType) {
    // 名前付き関数
    function add(x, y) {
        return String(x + y);
    }
    add(1, 2); // OK
    add('1', '2'); // 数値以外は渡せないのでエラー
    // 無名関数
    var add2 = function (x, y) {
        return String(x + y);
    };
    add2(1, 2); // OK
    add2('1', '2'); // 数値以外は渡せないのでエラー
})(FunctionType || (FunctionType = {}));
