# 基本の型

TypeScript では以下の型が定義できる。

- Boolean
- Number
- String
- Array
- Tuple（タプル）
- Enum(イーナム)
- Any
- Void
- Null and Undefined
- Never

## Boolean

真偽値のデータ型。

```ts
let isDone: boolean = false;
```

## Number

数値（浮動小数点値）のデータ型。

TypeScript は、16 進リテラルおよび 10 進リテラルに加えて、ES2015 で導入されたバイナリおよび 8 進リテラルもサポートしている。

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

## String

文字列のデータ型。文字列は`"`か`'`で囲む。

```ts
let color: string = 'blue';
color = 'red';
```

テンプレート文字列（ES2015 で追加された構文）も利用できる。

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ fullName }.
```

## Array

配列のデータ型。配列の型の宣言方法を２つある。

1 つめは`[]`の前に型を宣言するもの。

```ts
let list: number[] = [1, 2, 3];
```

2 つめは`Array<型>`のように宣言するもの。

```ts
let list: Array<number> = [1, 2, 3];
```

## Tuple（タプル）

タプル型。指定した型の要素を持つ配列を宣言する。

```ts
let x: [string, number];

// OK
x = ['hello', 10];

// エラーが出力される
x = [10, 'hello'];
```

型を宣言した要素にアクセスした際に、その要素が正しい振る舞いをしているかどうかもチェックしてくれる。

```ts
let x: [string, number];

x = ['hello', 10];

// OK
console.log(x[0].substr(1));

// x[1]には数値の型を宣言しているため、文字列のsubstr()が実行されることはありえない
// そのため、エラーが出力される
console.log(x[1].substr(1));
```

型を宣言していないインデックスにアクセスする場合、`Union types`（詳細は後述）が利用される。

```ts
// インデックス2以降が`Union types`
let x: [string, number];

// 文字列なのでOK
x[3] = 'world';

// 文字列なのでOK
console.log(x[5].toString());

// 文字列でも数値でもないため、エラーが発生する
x[6] = true;
```

## Enum(イーナム)

列挙型。一連の定数を分かりやすく管理できる。

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
```

Enum のメンバ値は連番であり 0 から始まる。

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

console.log(c === Color.Green); // => true
console.log(c === 1); // => true
```

連番の開始は変更できる。

```ts
enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green;

console.log(c === Color.Green); // => true
console.log(c === 2); // => true
```

値を連番ではなく、自由に変更できる。

```ts
enum Color {
  Red = 1,
  Green = 3,
  Blue = 5,
}
let c: Color = Color.Green;

console.log(c === Color.Green); // => true
console.log(c === 3); // => true
```

列挙型の便利な機能は、数値から列挙型の値の名前に移動できること。

値がわかっていても、enum で何がマップされているかわからない場合は、以下のように対応する名前を検索できる。

```
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName); // => Displays 'Green' as it's value is 2 above
```

## Any

何でもありな型。通常の JavaScript のように、変数に文字列でも数字でも自由に入れることができる。

型が分からないケース（ユーザーや 3rd パーティ製のライブラリなどの動的なコンテンツからの値を利用したり）で利用する。

ノーチェックでコンパイルを通過するためできる限り使わない。

```ts
let notSure: any = 4;

// OK
notSure = 'maybe a string instead';

// OK
notSure = false;

// 型を省略すると勝手にanyになる
let x;

// OK
x = 'maybe a string instead';

// OK
x = false;
```

## Void

如何なる型も存在しないことを表す型。値を返さない関数の戻り値として利用する。

```ts
function warnUser(): void {
  alert('This is my warning message');
}
```

変数の定義に利用することは不可能。

## Null and Undefined

TypeScript では`undefined`と`null`の両方に、 それぞれ undefined と null という自身の型を持つ。

void と同じく、それだけで特に役に立つというわけではない。

```ts
let u: undefined = undefined;
let n: null = null;
```
