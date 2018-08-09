# ジェネリクス

1 つの型ではなく様々な型で動作する関数やメソッドを作成できる仕組み。

別の言い方をすれば、型を変数にして利用できる関数やメソッドを作成できる仕組み。

## ジェネリクスの利用例

ジェネリクスは任意の型で関数やメソッドを利用できる。

ジェネリクスを利用しない例と、利用する例を比較してみて、どんな時にジェネリクスを利用すれば良いのかを見ていく。

### ジェネリクスを利用しない例

以下はジェネリクスを利用していない`identity`関数。

引数をただ返すだけの関数であり、引数に数値を渡し数値の戻り値を返すことを保証している。

[nonused-generics.ts](./nonused-generics.ts)

```ts
function identity(arg: number): number {
  return arg;
}

identity(2);

// 文字列を渡しているのでError
// identity('soarflat');
```

以下は引数に文字列を渡し文字列の戻り値を返すことを保証する`identity2`関数。`identity`関数とは型の指定が違うだけで機能は同じ。

[nonused-generics.ts](./nonused-generics.ts)

```ts
function identity2(arg: string): string {
  return arg;
}

identity2('soarflat');

// 数値を渡しているのでError
// identity2(2);
```

ジェネリクスを利用しない場合、機能は同じだが型の指定が違う関数をチェックしたい型の数だけ作成しなければならず、非常に大変である。

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

`<T>`は仮型引数と言い、ここに`<string>`などの実型引数を渡す。

そのため、`identity<T>`の`<T>`に渡した型が`identity`関数内の`T`に定義される。

このようにジェネリクスを利用すれば、1 つの関数、クラスなどで複数の型を利用できる。

### 型変数の利用

上記の`identity`のようなジェネリック関数を作成すると、コンパイラは関数本体に型付けされたパラメータを正しく利用するように強制するが、これらのパラメータは、any 型のように扱われる。

そのため、以下のジェネリック関数はエラーが発生する。

```ts
function loggingIdentity<T>(arg: T): T {
  // `arg`が`length`を持つ、つまり array 型という定義がどこにもされていない
  // また、現状の宣言だと、数値や文字列も渡せてしまうためエラーが発生する
  console.log(arg.length);
  return arg;
}
```

```ts
// 数値の配列のみ利用できる
function identity(arg: number[]): number[] {
  console.log(arg.length);
  return arg;
}

identity([2, 2, 2]);

// 文字列の配列のみ利用できる
function identity2<T>(arg: string[]): string[] {
  console.log(arg.length);
  return arg;
}

identity2(['2', '2', '2']);

// 数値、文字列のどちらの配列も利用できる
function identity3<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

identity3<number>([2, 2, 2]);
identity3<string>(['2', '2', '2']);
```
