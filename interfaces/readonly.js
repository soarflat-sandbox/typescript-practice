"use strict";
var p1 = { x: 10, y: 30 };
// `interface Point`で宣言した`x`と`y`は読み取り専用のため、変更をしようとエラーが発生する
// error TS2540: Cannot assign to 'x' because it is a constant or a read-only property.
p1.x = 5;
