var FunctionType;
(function (FunctionType) {
    // 名前付き関数
    function add(x, y) {
        return x + y;
    }
    // 無名関数
    var add2 = function (x, y) {
        return x + y;
    };
})(FunctionType || (FunctionType = {}));
