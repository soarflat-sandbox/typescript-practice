var FullTypeFunction;
(function (FullTypeFunction) {
    // 完全な関数の型
    var add = function (x, y) {
        return x + y;
    };
    // ↑のaddは以下のように記述することもできる
    var add2 = function (x, y) {
        return x + y;
    };
})(FullTypeFunction || (FullTypeFunction = {}));
