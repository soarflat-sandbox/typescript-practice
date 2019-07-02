# 型の互換性

## 互換性の基礎

TypeScriptでは型チェックに「互換性」を用いている。

String Literal Types は、string 型のサブタイプ（派生型）。

そのため、string 型が抽象、String Literal Typesは具象（詳細）の関係になる。

以下のように、詳細な型に抽象的な型を代入するとコンパイルエラーになる。逆の場合はエラーが発生しない。

```ts
let s1: 'test' = 'test';
let s2: string = s1;
let s3: string = 'test';
let s4: 'test' = s3; // エラー
```

number 型も同様。

```ts
let n1: 0 = 0;
let n2: number = n1;
let n3: number = 0;
let n4: 0 = s3; // エラー
```
### any型のunknown型の互換性

危ないから利用しない。

### 互換性のないアサーション

アサーション付与時に、値と互換性のない型宣言を試みると失敗する。

```ts
const s1 = '0';
const s2 = '0' as string;
const s3 = 0 as string; // エラー
const s4 = 0 as {};
```

`as {}`は通る。

### {}型の互換性

JavaScriptは数値や文字列もすべてオブジェクトであるため、以下のように{}型を利用してもエラーが発生しない

```ts
let o1: {} = 0;
let o2: {} = '1';
let o3: {} = false;
let o4: {} = {};
```

つまり、プリミティブ型は{}型のサブタイプ。

型推論は以下のようになる。

```ts
// type K0 = never
type K0 = keyof {};
// type K1 = 'K'
type K1 = keyof { k: 'K' };
// type K2 = 'toString' | 'toFixed'
type K2 = keyof 0;
// type K3 = number | 'toString' | 'charAt' ...
type K3 = keyof '1';
// type K4 = 'valueOf'
type K4 = keyof false;
```

### {}型の代入

以下のようにお互いに一致するプロパティが存在する場合、互換性があると判断され、オブジェクトの代入ができる。

```ts
let o1 = { p1: 'test' };
let o2 = { p1: 'test', p2: 0 };
o1 = o2;
o2 = o1; // エラー
```

そのため、プロパティを持たないオブジェクトへの代入もエラーにならない。

```ts
let o1 = {};
let o2 = { p1: 'test' };
o1 = o2;
o2 = o1; // エラー
```

### 関数型の互換性

関数型も、お互いに一致するプロパティが存在する場合、互換性があると判断され、関数の代入ができる。

オブジェクトとは逆で、引数が多い関数に引数が少ない関数を代入できる。

```ts
let fn1 = (a: number) => 0;
let fn2 = (b: number, s: string) => 0;
fn2 = fn1;
fn1 = fn2; // エラー
```

### クラスの互換性

```ts
type Gender = 'male' | 'female';

class Animal {
  feet: number = 4;
  constructor(name: string, numFeet: number) {}
}

class Human {
  feet: number = 4;
  hands: number = 2;
  constructor(name: string, gender: Gender) {}
}
let animal: Animal = new Animal('dog', 4);
let human: Human = new Human('Taro', 'male');
animal = human;
human = animal; // エラー
```

## 宣言の結合

### 宣言空間

TypeScriptには、「宣言空間（declaration space）」と言う宣言方法・種別によって振り分けられる3つのグループがある。

- Value（値）
- Type（型）
- Namespace（名前空間）

以下のコードは、値、型、名前空間の名称がすべて同じだが、それぞれが異なる宣言空間にアサインされるため、競合せずにコンパイルエラーは発生しない。

```ts
const Test = {};
interface Test = {};
namespace Test {}
```

#### Value 宣言空間

変数や関数の宣言空間は Value に当てはめられるため、以下のように宣言が重複するとコンパイルエラーになる。

```ts
const value1 = 'test';
let value2 = 'test';
function greet() {} // エラー
const greet = 'hello'; // エラー
```

#### Type 宣言空間

Type を宣言するためには、`interface`もしくは`type alias`を利用する。

両者の違いは「open ended」に準拠しているかいないかの違いがある。

open ended に準拠していれば「型拡張（オーバーロード）」が可能。

##### `interface`

`interface`は open ended に準拠しているため、以下のように「型拡張（オーバーロード）」が可能。

```ts
interface User {
  name: string;
}
interface User {
  age: number;
}
// ↑の定義は以下のように結合される
interface User {
  name: string;
  age: number;
}
```

##### `type alias`

`type alias`は open ended に準拠していないため以下のように同一名称の型宣言を試みるとエラーが発生する。

```ts
type User = {
  name: string;
};
type User = {
  age: number;
};
```

#### Namespace 宣言空間

Namespace 宣言空間内で型定義をエクスポートすると、以下の`Test.Properties`のように参照できる。

```ts
interface Test {
  value: string;
}

namespace Test {
  export interface Properties {
    name: string;
  }
}

const test: Test = {
  value: 'value'
};

const properties: Test.Properties = {
  name: 'value'
};
```

#### interface の結合

```ts
interface Bounds {
  width: number;
  height: number;
}

interface Bounds {
  left: number;
  top: number;
}

// ↑は以下のように結合される
// interface Bounds {
//   width: number;
//   height: number;
//   left: number;
//   top: number;
// }
```

すでに宣言されているメンバを異なる型で宣言しようとするとエラーになる。

```ts
interface Bounds {
  width: number;
  height: number;
}

interface Bounds {
  left: number;
  height: string; // エラー
}
```

関数メンバはオーバーロードされる。

```ts
interface Bounds {
  width: number;
  height: number;
  move(amount: string): string;
}

interface Bounds {
  left: number;
  top: number;
  move(amount: number): string;
}

const bounds: Bounds = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  move: (amount: string | number) => {
    return `${amount}`;
  }
};
```

#### namespece の結合

`interface`と同様で`namespace`も自動的に結合する。

以下の場合、`Publisher`名前空間が2回宣言されている。

同じ名前空間でもエクスポートされていない型定義は参照できないため、`Appearance`は参照できずにエラーになる。

```ts
namespace Publisher {
  export const name = '';
  interface Appearance {
    color: 'monochrome' | '4colors' | 'fullcolors';
  }
  export interface Book {
    title: string;
    appearance: Appearance;
  }
}

namespace Publisher {
  export interface CookingBook extends Book {
    category: 'cooking';
    appearance: Appearance; // エラー
  }
}
```

```ts
namespace Publisher {
  export const name = '';
  export interface Appearance {
    color: 'monochrome' | '4colors' | 'fullcolors';
  }
  export interface Book {
    title: string;
    appearance: Appearance;
  }
}

namespace Publisher {
  export interface CookingBook extends Book {
    category: 'cooking';
    appearance: Appearance;
  }
}

namespace Publisher {
  export interface Book {
    lang: 'ja';
  }
  export interface TravelBook extends Book {
    category: 'travel';
  }
}

const cookingBook: Publisher.CookingBook = {} as Publisher.CookingBook;
// 型推論結果
// CookingBookを宣言時には`lang: 'ja'`は存在しないが、メンバが挿入されている。
// const cookingBook: {
//   title: string;
//   appearance: Appearance;
//   lang: 'ja';
//   category: 'cooking';
// };
const travelBook: Publisher.TravelBook = {} as Publisher.TravelBook;
// 型推論結果
// const travelBook: {
//   title: string;
//   appearance: Appearance;
//   lang: 'ja';
//   category: 'travel';
// };
```