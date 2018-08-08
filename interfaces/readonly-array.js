"use strict";
var a = [1, 2, 3, 4];
var ro = a;
// 以下は全てエラーが発生する
ro[0] = 12;
ro.push(5);
ro.length = 100;
a = ro;
