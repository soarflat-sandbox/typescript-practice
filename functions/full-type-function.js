var FullTypeFunction;
(function (FullTypeFunction) {
    var add = function (x, y) {
        return String(x + y);
    };
    add(1, 2); // OK
    add('1', '2'); // 数値以外は渡せないので Error
    // ↑は型推論が有効になっているため、以下の記述と同じ（無名関数の型が暗黙的に宣言されている）
    var add2 = function (x, y) {
        return String(x + y);
    };
    add2(1, 2); // OK
    add2('1', '2'); // 数値以外は渡せないので Error
})(FullTypeFunction || (FullTypeFunction = {}));
