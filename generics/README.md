# ジェネリクス

1つの型ではなく、さまざまな型で動作する関数やメソッドを作成できる仕組み。

別の言い方をすれば、型を変数にして利用できる関数やメソッドを作成できる仕組み。

## ジェネリクスの利用例

ジェネリクスは任意の型で関数やメソッドを実行できる。

ジェネリクスを利用しない例と、利用する例を比較してみて、どんな時にジェネリクスを利用すれば良いのかを見ていく。

### ジェネリクスを利用しない例

以下はジェネリクスを利用していない`identity()`と`identity2()`関数。

引数を返すだけの関数であり、それぞれの関数は以下を保証する。

- `identity()`: 引数に数値を渡し数値の戻り値を返すことを保証する
- `identity2()`: 引数に文字列を渡し文字列の戻り値を返すことを保証する

[nonused-generics.ts](./nonused-generics.ts)

```ts
function identity(arg: number): number {
  return arg;
}

// OK
identity(2);

// 文字列を渡しているのでError
// identity('soarflat');

function identity2(arg: string): string {
  return arg;
}

// OK
identity2('soarflat');

// 数値を渡しているのでError
// identity2(2);
```

`identity()`と`identity2`関数は**型の宣言が違うだけで機能は同じ**である。

ジェネリクスを利用しない場合、機能は同じだが型の宣言が違う関数を、チェックしたい型の数だけ作成しなければならず、非常に大変である。

こんな時にジェネリクスを利用する。

### ジェネリクスを利用する例

以下はジェネリクスを利用している`identity`関数。関数名である`identity`の後に`<T>`と、引数と戻り値の型に型変数`T`を定義している。

[used-generics.ts](./used-generics.ts)

```ts
function identity<T>(arg: T): T {
  return arg;
}

// Tをnumber型として実行
identity<number>(2);

// Tをstring型として実行
identity<string>('soarflat');
```

`<T>`は**仮型引数**と言い、ここに`<string>`などの実型引数を渡す。

そのため、`identity<T>`の`<T>`に渡した型が`identity`関数内の`T`に定義される。

このようにジェネリクスを利用すれば、1つの関数、クラスなどで複数の型を利用できる。

## ジェネリクスの型変数の利用

上記の`identity`のような関数の場合、仮型引数`T`は any 型のように扱われる。

そのため、以下の関数はエラーが発生する。

```ts
function loggingIdentity<T>(arg: T): T {
  // `T`は any 型のように扱われるため、array 型を前提とした記述をするとエラーが発生する
  console.log(arg.length);
  return arg;
}
```

以下のように`T`を直接扱うのではなく、`T`の array 型を宣言すればエラーは解消される。

```ts
function identity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

// 数値、文字列のどちらの配列も利用できる
identity<number>([2, 2, 2]);
identity<string>(['2', '2', '2']);
```

## ジェネリクスの型

## ジェネリクスのクラス
