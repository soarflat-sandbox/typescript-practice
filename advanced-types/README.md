# 高度な型

## Intersection Types

複数の型を1つに結合した型。

```ts
type Dog = {
  bark: () => void
}
type Bird = {
  fly: () => void
}
type Chimera = Dog & Bird;

const heinkel: Chimera = {
  bark: () => {
    console.log('bark')
  },
  fly: () => {
    console.log('fly')
  }
}

// fly()がないのでエラー
const darius: Chimera = {
  bark: () => {
    console.log('bark')
  }
}
```

## Union Types

複数の型のうちの1つの型が成立することを示す型。

```ts
let value: boolean | number | string;
value = false;
value = 1;
value = '2';
// どの型にも一致しないためエラー
value = null;
```

array 型を含む要素をUnion Typesにする場合、以下のように型を定義する。

```ts
let numberOrStrings: (number | string)[];
numberOrString = [0, 1];
numberOrString = [0, '1'];
// どの型にも一致しないためエラー
numberOrString = [0, '1', false];
```

## Literal Types

リテラルの型。

文字列リテラルや数値リテラルを型として利用できる。

### String Literal Types

```ts
type CardinalDirection = 'North' | 'East' | 'South' | 'West';

function move(distance: number, direction: CardinalDirection) {
  // ...
}

move(1, 'North');
move(1, 'Nurth'); // エラー
```

### Numeric Literal Types

```ts
type OneToFive = 1 | 2 | 3 | 4 | 5;

const number: OneToFive = 3;
const number2: OneToFive = 6; // エラー
```

### Boolean Literal Types

```ts
let truth: true;
truth = true;
truth = false; // エラー
```

## typeof/keyOf

### typeof

`typeof`を利用すれば、宣言済みの変数の型を取得できる。

```ts
let asString = ''
// asString が string 型なので、value の型は string 型になる
let value: typeof asString;
value = 'value'
value = 0; // エラー
```

```ts
let myObject = { foo: 'foo' };
// 型注釈`type { foo: string; }`と同じ
let anotherObject: typeof myObject = { foo: '' };
anotherObject.foo = 'value';
anotherObject.bar = 'value'; // エラー
```

### keyOf

`typeof`を利用すれば、TypeやInterfaceのプロパティの名称をString Literal Union Typesで取得できる。

```ts
type SomeType = {
  foo: string;
  bar: string;
  baz: string;
};

// 型注釈`'foo' | 'bar' | 'baz'`と同じ
let someKey: keyof SomeType;
someKey = 'foo';
someKey = 'hoge'; // エラー

interface User {
  name: string;
  age: number;
}

// 型注釈`'name' | 'age'`と同じ
type UserKey = keyof User;
let user: UserKey;
user = 'name';
user = 'names'; // エラー
```

### typeof と keyOf の併用

```ts
const myObject = {
  foo: 'FOO',
  bar: 'BAR',
  baz: 'BAZ'
};

// typeof myObject の型注釈は
// {
//   foo: string;
//   bar: string;
//   baz: string;
// }
// なので`keyof typeof myObject`は
// 型注釈` 'foo' | 'bar' | 'baz'`と同じ
let someKey: keyof typeof myObject;
someKey = 'foo';
someKey = 'hoge'; // エラー
```

## 型アサーション（Type Assertion）

型推論で指定された型を上書きする。

型アサーションには2つの構文があり、以下のように`<>`を利用したものと

```ts
let foo: any = 'this is a string';
foo = 2;
// foo が string 型 になるので bar は string型
let bar = <string>foo;
bar = 2; // エラー
```

`as`を利用したものがある。

```ts
let foo: any = 'this is a string';
foo = 2;
// foo が string 型 になるので bar は string型
let bar = foo as string;
bar = 2; // エラー
```

### `<>`と`as`のどちらを利用すべき？

JSXでは`<>`は利用できないため、一貫性のために`as`を利用した方が良い。

## 列挙型

### 数値列挙

数値列挙の場合、Enum のメンバ値は連番であり 0 から始まる。

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

const d: Direction = Direction.Up;
const d2: Direction = Direction.Left;

console.log(d === Direction.Up); // => true
console.log(d === 0); // => true
console.log(d2 === Direction.Left); // => true
console.log(d2 === 2); // => true
```

### 文字列列挙

```ts
enum Ports {
  USER_SERVICE = '8080',
  REGISTER_SERVICE = '8081',
  MEDIA_SERVICE = '8888'
}
const p: Ports = Ports.USER_SERVICE;
console.log(p === Ports.USER_SERVICE); // => true
console.log(p === '8080'); // => true
```

### open ended

以下のように1度宣言した列挙型に対して、列挙値を追加することが可能。

```ts
enum Ports {
  USER_SERVICE = '8080'
}
enum Ports {
  REGISTER_SERVICE = '8081'
}
enum Ports {
  MEDIA_SERVICE = '8888'
}

const p: Ports = Ports.USER_SERVICE;
const p2: Ports = Ports.MEDIA_SERVICE;
console.log(p === Ports.USER_SERVICE); // => true
console.log(p === '8080'); // => true
console.log(p === Ports.MEDIA_SERVICE); // => true
console.log(p === '8888'); // => true
```
