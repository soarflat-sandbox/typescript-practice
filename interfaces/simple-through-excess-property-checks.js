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
// 別の変数にオブジェクトを参照し、それを`createSquare()`に渡せば
// 過剰プロパティのチェックは回避されるため、エラーは発生しない
var squareOptions = { colour: 'red', width: 100 };
var mySquare = createSquare(squareOptions);
