# インターフェイス
インターフェイスは複数のクラスで利用できるプロパティや型の定義のこと。

## 何故インターフェイスを利用するのか
- [インターフェースとは？～継承とは役割が違う～](https://www.gixo.jp/blog/5159/)
- [なぜインタフェースを使うのか？](https://oshiete.goo.ne.jp/qa/2031725.html)

## インターフェイスの利用例

### インターフェイスを利用しない例

```ts
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: 'Size 10 Object'};
printLabel(myObj);
```

上記の場合、型チェッカーは`printLabel()`への呼び出しをチェックする。

`printLabel()`は、渡されたオブジェクトに`label`というstring型のプロパティが必要である。

`myObj`は`label`以外のプロパティを持っているが、型チェッカーは必要なプロパティを持っているかどうかだけチェックする。

### インターフェイスを利用する例

上記をインターフェイスを利用して書くと以下のようになる。

```ts
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

`LabelledValue`インタフェースにstring型の`label`プロパティが必要であることを示す。

関数に渡すオブジェクトがリストされた要件を満たしている場合は、それが許可される（`size`プロパティを渡すだけではエラーは発生しない）。

## 任意のプロパテイ
インターフェイスは全てのプロパティを必須にする必要はない。幾つかのプロパティはある条件下でのみ必須にするようにしたり、全く必須にしないようにすることも可能。

以下はインターフェイスに任意のプロパティを指定した例。

`color?`、`width?`のように任意にしたいプロパティの末尾に`?`を付ける。

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};

  if (config.color) {
    newSquare.color = config.color;
  }

  if (config.width) {
    newSquare.area = config.width * config.width;
  }

  return newSquare;
}

const mySqure = createSquare({color: 'black'});
```

`createSquare({color: 'black'})`のように`color`プロパティしか渡していないがエラーは発生しない。

任意のプロパティの利点は、利用できるプロパティを宣言し、インターフェースの一部では無いプロパティが使用されることを防ぐ。

例えば、`createSquare()`内の`color`プロパティを打ち間違えたとしても、エラーメッセージがそのことをすぐに知らせてくれる。

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    // error TS2551: Property 'collor' does not exist on type 'SquareConfig'. Did you mean 'color'?
    newSquare.color = config.collor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

const mySquare = createSquare({color: "black"});
```

## 読み込み専用プロパティ
プロパティの前に`readonly`を付けることで、読み込み専用にできる。

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

以下は`x`と`y`に値を割り当てた後に、変更をしようとするためエラーが発生する。

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

const p1: Point = {x: 10, y: 30};
// error TS2540: Cannot assign to 'x' because it is a constant or a read-only property.
p1.x = 5;
```

### `ReadonlyArray<T>`

配列も読み込み専用にできる。

```ts
const a: number[] = [1, 2, 3, 4];
const ro: ReadonlyArray<number> = a;

// 以下は全てエラーが発生する
ro[0] = 12;
ro.push(5);
ro.length = 100;
a = ro;
```

### `const`と`readonly`のそれぞれの使い所
変数を読み込み専用にしたいのであれば`const`を。プロパティを読み込み専用にしたいのであれば`readonly`を利用する。

