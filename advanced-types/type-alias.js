var TypeAlias;
(function (TypeAlias) {
    var x = 10;
    var y = '10';
    // NumberOrStringはnumber型とstring型しか参照していないためエラー
    var z = true;
})(TypeAlias || (TypeAlias = {}));
