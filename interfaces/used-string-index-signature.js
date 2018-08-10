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
// `interface SquareConfig`で`[propName: string]: any;`を宣言しているため
// `color`、`width`以外のプロパティを指定してもエラーは発生しない
var mySquare = createSquare({ colour: 'red', ddd: 'red', width: 100 });
