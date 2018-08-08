"use strict";
// 数値の配列のみ利用できる
function identity(arg) {
    console.log(arg.length);
    return arg;
}
identity([2, 2, 2]);
// 文字列の配列のみ利用できる
function identity2(arg) {
    console.log(arg.length);
    return arg;
}
identity2(['2', '2', '2']);
// 数値、文字列のどちらの配列も利用できる
function identity3(arg) {
    console.log(arg.length);
    return arg;
}
identity3([2, 2, 2]);
identity3(['2', '2', '2']);
