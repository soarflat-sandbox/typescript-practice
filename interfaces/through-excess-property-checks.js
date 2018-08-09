"use strict";
function createSquare(config) {
    var newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
// `colour`は`interface SquareConfig`で宣言してないプロパティだが
// 型アサーション（`as SquareConfig`）を利用しているためエラーは発生しない
var mySquare = createSquare({ colour: 'red', width: 100 });
