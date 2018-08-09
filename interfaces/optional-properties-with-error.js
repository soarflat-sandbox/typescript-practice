"use strict";
function createSquare(config) {
    var newSquare = { color: 'white', area: 100 };
    if (config.color) {
        // `interface SquareConfig`では`collor`プロパティは宣言していないため、以下のようなエラーが発生する
        // error TS2551: Property 'collor' does not exist on type 'SquareConfig'. Did you mean 'color'?
        newSquare.color = config.collor;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: 'black' });
