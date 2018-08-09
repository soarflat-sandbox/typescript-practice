// [propName: string]: any;を宣言することにより
// `color`、`width`以外の任意のプロパティも渡せるようになった
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
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

// `interface SquareConfig`で`[propName: string]: any;`を宣言しているため
// `color`、`width`以外のプロパティを指定してもエラーは発生しない
const mySquare = createSquare({ colour: 'red', ddd: 'red', width: 100 });
