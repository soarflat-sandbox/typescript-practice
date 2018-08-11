namespace OptionalProperties {
  // `color?`、`width?`と指定しているため、どちらも任意のプロパティ
  interface SquareConfig {
    color?: string;
    width?: number;
  }

  function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: 'white', area: 100 };

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
  const mySqure = createSquare({ color: 'black' });
}
