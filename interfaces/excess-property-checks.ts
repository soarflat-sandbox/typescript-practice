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

// `colour`は`interface SquareConfig`で宣言してないプロパティのため、エラーが発生する
const mySquare = createSquare({ colour: 'red', width: 100 });
