"use strict";
function identity(arg) {
    return arg;
}
identity(2);
// コンパイル時にエラーが発生する
identity('soarflat');
function identity2(arg) {
    return arg;
}
identity2('soarflat');
// コンパイル時にエラーが発生する
identity2(2);
