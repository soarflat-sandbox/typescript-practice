# keyof とか Mapped types に関して

## keyof

`type`や`interface`のプロパティ名の String Literal Types の Union Types を返却する演算子。

以下は`keyof`の利用例。

```ts
type Person = {
  name: string;
  age: number;
  gender: string;
};

let personKey: keyof Person; // let personKey: 'name' | 'age' | 'gender'
personKey = 'name';
personKey = 'hoge'; // エラー
```

## Mapped Types（マップ型）

指定した型をマッピング（変換）して新しい型を生成する型（機能）。

### Mapped Types の構文（記法）

```ts
{ [ P in K ] : T }
{ [ P in K ] ? : T }
{ readonly [ P in K ] : T }
{ readonly [ P in K ] ? : T }
```

それぞの型引数の詳細は以下の通り。

- `P`: `K`型に応じたプロパティ
- `K`: マッピングする型
- `T`: 付与する型

例えば、`{ [ P in K ] : T }`の場合、`K`に対する値は`T`という型になることを示している。

実際のコードを見た方がが理解しやすいので、利用例を見ていく。

### Mapped Types の利用例

```ts
type Item = { a: string; b: number; c: boolean };

type Item = { a: string; b: number; c: boolean };

// `x`プロパティと`y`プロパティにnumber型が付与される
type T1 = { [P in 'x' | 'y']: number };
// type T1 = { x: number, y: number }

// `x`プロパティに'x'型が付与され、`y`プロパティに'y'型が付与される
type T2 = { [P in 'x' | 'y']: P };
// type T2 = { x: "x", y: "y" }

// Item['a']がstring型で、Item['b']がnumber型なので、
// `a`プロパティにstring型が付与され、`b`プロパティにnumber型が付与される
type T3 = { [P in 'a' | 'b']: Item[P] };
// type T3 = { a: string, b: number }

// `keyof Item`は`'a' | 'b' | 'c'`と等価なので
// `a`、`b`、`c`プロパティにDate型が付与される
type T4 = { [P in keyof Item]: Date };
// type T4 = { a: Date, b: Date, c: Date }

// Item['a']がstring型、Item['b']がnumber型で、Item['c']がboolean型なので
// `a`プロパティにstring型、`b`プロパティにnumber型、`c`プロパティにboolean型が付与される
type T5 = { [P in keyof Item]: Item[P] };
// type T5 = { a: string, b: number, c: boolean }

// Item['a']がstring型、Item['b']がnumber型で、Item['c']がboolean型なので
// `a`プロパティにstring型、`b`プロパティにnumber型、`c`プロパティにboolean型が付与される
// そして、今回`readonly`を記述しているため、全ての型に`readonly`が付与される
type T6 = { readonly [P in keyof Item]: Item[P] };
// type T6 = { readonly a: string, readonly b: number, readonly c: boolean }

type T7 = { [P in keyof Item]: Array<Item[P]> };
// type T7 = { a: string[], b: number[], c: boolean[] }
```

```ts
// `keyof T`で T 型のプロパティ名の String Literal Types の Union Type を示している
// `[P in keyof T]: T[P]`で`keyof T`で返却される、T 型の各プロパティの P 型が
// `T[P]`に変換されることを示す
type Readonly<T> = { readonly [P in keyof T]: T[P] };

interface User {
  name: string;
  age: number | null;
  gender: 'male' | 'female' | 'other';
}
type ReadonlyWrapUser = Readonly<User>;
// type ReadonlyWrapUser = {
//   readonly name: string;
//   readonly age: number | null;
//   readonly gender: 'male' | 'female' | 'other';
// };
//
// readonly [P in keyof T]: T[P]
// [P in keyof T]は name
// T[P]はUser['name']なのでstring
// そのため、readonly name: string のようになる
//
```

### Mapped Tuple Type（v3.1 から）

上記の利用例の場合、`K`型引数（マッピングする型）に String Literal 型を代入していたが、array 型か tuple 型が代入されると、異なるマッピングの挙動になる。

この挙動（機能）のことを「Mapped Tuple Type」と言う。

#### Mapped Tuple Type の利用例

配列、タプルの要素だけに型が付与される。

```typescript
type MapToPromise<T> = { [P in keyof T]: Promise<T[P]> };

type Coordinate = [number, number];
type Coordinate2 = number[];

type PromiseCoordinate = MapToPromise<Coordinate>;
// type PromiseCoordinate = [Promise<number>, Promise<number>]

type PromiseCoordinate2 = MapToPromise<Coordinate2>;
// type PromiseCoordinate2 = Promise<number>[]
```

要素だけに方が付与されるため、`Array.map`や`Array.reduce`などのメソッドには型は付与されない。
