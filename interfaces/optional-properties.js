var OptionalProperties;
(function (OptionalProperties) {
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
    // `interface SquareConfig`で宣言した`width?`は任意のプロパティのため
    // width を渡さなくてもエラーは発生しない
    var mySqure = createSquare({ color: 'black' });
})(OptionalProperties || (OptionalProperties = {}));
