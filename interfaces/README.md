# インターフェイス

インターフェイスは複数のクラスで利用できるプロパティや型の定義のこと。

## 何故インターフェイスを利用するのか

- [インターフェースとは？～継承とは役割が違う～](https://www.gixo.jp/blog/5159/)
- [なぜインタフェースを使うのか？](https://oshiete.goo.ne.jp/qa/2031725.html)

## インターフェイスの利用例

### インターフェイスを利用しない例

[unused-interface.ts](./unused-interface.ts)

```ts
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
```

上記の場合、型チェッカーは`printLabel()`への呼び出しをチェックする。

`printLabel()`は、渡されたオブジェクトに`label`という string 型のプロパティが必要である。

`myObj`は`label`以外のプロパティを持っているが、型チェッカーは必要なプロパティを持っているかどうかだけチェックする。

### インターフェイスを利用する例

上記をインターフェイスを利用して書くと以下のようになる。

[used-interface.ts](./used-interface.ts)

```ts
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: 'Size 10 Object' };
printLabel(myObj);
```

`LabelledValue`インタフェースに string 型の`label`プロパティが必要であることを示す。

<!-- 自分で何言っているのか不明 -->
<!-- 関数に渡すオブジェクトがリストされた要件を満たしている場合は、それが許可される（`size`プロパティを渡すだけではエラーは発生しない）。 -->

## 任意のプロパテイ

インターフェイスは全てのプロパティを必須にする必要はない。幾つかのプロパティはある条件下でのみ必須にするようにしたり、全く必須にしないようにすることも可能。

以下はインターフェイスに任意のプロパティを指定した例。

`color?`、`width?`のように任意にしたいプロパティの末尾に`?`を付ける。

[used-interface.ts](./optional-properties.ts)

```ts
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
```

`createSquare({color: 'black'})`のように`color`プロパティしか渡していないがエラーは発生しない。

任意のプロパティの利点は、利用できるプロパティを宣言し、インターフェースの一部では無いプロパティが使用されることを防ぐ。

例えば、`createSquare()`内の`color`プロパティを打ち間違えたとしても、エラーメッセージがそのことをすぐに知らせてくれる。

[optional-properties-with-error.ts](./optional-properties-with-error.ts)

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 };
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

const mySquare = createSquare({ color: 'black' });
```

## 読み取り専用プロパティ

プロパティの前に`readonly`を付けることで、読み取り専用にできる。

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

以下は`x`と`y`に値を割り当てた後に、変更をしようとするとエラーが発生する。

[readonly.ts](./readonly.ts)

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

const p1: Point = { x: 10, y: 30 };
// `interface Point`で宣言した`x`と`y`は読み取り専用のため、変更をしようとエラーが発生する
// error TS2540: Cannot assign to 'x' because it is a constant or a read-only property.
p1.x = 5;
```

### `ReadonlyArray<T>`

配列も読み取り専用にできる。

[readonly-array.ts](./readonly-array.ts)

```ts
const a: number[] = [1, 2, 3, 4];
// `ReadonlyArray<T>`型は変更処理を行う全てのメソッドが削除された`Array<T>`と同義
// そのため、`ReadonlyArray<number>`を指定すると、配列が読み取り専用になる
const ro: ReadonlyArray<number> = a;

// 以下は全てエラーが発生する
ro[0] = 12;
ro.push(5);
ro.length = 100;
a = ro;
```

### `const`と`readonly`のそれぞれの使い所

変数を読み取り専用にしたいのであれば`const`を。プロパティを読み取り専用にしたいのであれば`readonly`を利用する。

## 過剰（余分な）プロパティのチェック

以下のようにインターフェイスで宣言していないプロパティ（過剰なプロパティ）をチェックをしてくれる。

[excess-property-checks.ts](./excess-property-checks.ts)

```ts
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
```

もし、このチェックを回避したいのであれば型アサーション（Type assertions）を利用する。

[`through-excess-property-checks.ts'](./through-excess-property-checks.ts)

```ts
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

// `colour`は`interface SquareConfig`で宣言してないプロパティだが
// 型アサーション（`as SquareConfig`）を利用しているためエラーは発生しない
const mySquare = createSquare({ colour: 'red', width: 100 } as SquareConfig);
```

上記のようなチェック回避でも良いが、オブジェクトが`colour`のような追加のプロパティを持つことができる場合は、以下のように文字列インデックスシグネチャ（string index signature）を追加する方が良い。

[`used-string-index-signature.ts'](./used-string-index-signature.ts)

```ts
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
```

実は以下のような単純な方法でもチェック回避はできる。

[`simple-through-excess-property-checks.ts'](./simple-through-excess-property-checks.ts)

```ts
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

// 別の変数にオブジェクトを参照し、それを`createSquare()`に渡せば
// 過剰プロパティのチェックは回避されるため、エラーは発生しない
const squareOptions = { colour: 'red', width: 100 };
const mySquare = createSquare(squareOptions);
```

## Function 型

インターフェイスには以下の様に Function 型も定義できる。

[`function-types.ts'](./function-types.ts)

```ts
// 引数`source`が文字列型、引数`subString`が文字列型
// 戻り値が真偽値方のFunction 型のインターフェイスを宣言する
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
// SearchFuncの型チェックが行われる
mySearch = function(src, sub) {
  let result = src.search(sub);

  if (result == -1) {
    return false;
  } else {
    return true;
  }
};
```

## インデックス可能な型

<!-- TODO: すぐに理解できなさそうなので後回し -->
