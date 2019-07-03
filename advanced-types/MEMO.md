# 高度な型

## Generics

1 つの型ではなく、さまざまな型で動作する関数やメソッドを作成できる仕組み。

別の言い方をすれば、型を変数にして利用できる関数やメソッドを作成できる仕組み。

Generics を利用することで、型推論を可変にできる。

### 変数の Generics

#### 基本的な付与

以下は Generics を利用した型の宣言。

```ts
interface Box<T> {
  value: T;
}
```

`Box`の後に`<T>`を定義しており、こうすることが「T 型」をエイリアスとして指定される。

`<T>`のように、慣習的に「T」、「U」、「K」などが型エイリアスの名称として利用されることが多いが、名称は任意で指定できる。

Generics は以下のように動作する。

```ts
interface Box<T> {
  value: T;
}
const box0: Box = { value: 'test' }; // 型を指定していないためエラー
const box1: Box<string> = { value: 'test' };
const box2: Box<number> = { value: 'test' }; // number型ではないのでエラー
```

#### Generics の初期型

関数の`default`引数のように、Generics でも初期型を指定できる。

```ts
interface Box<T = string> {
  value: T;
}
const box0: Box = { value: 'test' };
const box1: Box<string> = { value: 'test' };
const box2: Box<number> = { value: 'test' }; // number型ではないのでエラー
```

初期型を指定していれば、型を指定しなくてもエラーは発生しない。

#### extends による制約

`extends`を利用すれば、指定可能な型を制約できる。

```ts
interface Box<T extends string | number> {
  value: T;
}
const box0: Box<string> = { value: 'test' };
const box1: Box<number> = { value: 0 };
const box2: Box<boolean> = { value: false }; // 型の制約を破っているのでエラー
```

### 関数の Generics

```ts
function boxed<T>(props: T) {
  return { value: props };
}
```

#### 暗黙的に解決される Generics

関数に Generics が利用されていても、利用時の型指定は必須ではない。

そのため、以下のように型の指定を省略しても、エラーは発生でずに型推論が行われる。

```ts
function boxed<T>(props: T) {
  return { value: props };
}

// const box0: { value: string }
const box0 = boxed('test');
// const box1: { value: number }
const box1 = boxed(0);
// const box2: { value: boolean }
const box2 = boxed(false);
// const box3: { value: null }
const box3 = boxed(null);
```

#### アサーションによる明示的な型の付与

Nullable 型などを直接適用したい場合、宣言時にアサーションを付与する。

```ts
function boxed<T>(props: T) {
  return { value: props };
}

// const box2: { value: boolean }
const box2 = boxed(false as boolean | null);
// const box3: { value: null }
const box3 = boxed<string | null>(null);
```

#### Generics を含む関数を変数に代入する

```ts
const boxed = <T>(props: T) => ({ value: props });
```

#### extends による制約

変数と同様で関数も`extends`を利用することで、指定可能な型を制約できる。

```ts
function boxed<T extends string>(props: T) {
  return { value: props };
}
const box1 = boxed(0); // エラー
const box2 = boxed('test');
```

この制約で型安全を保証できる。

以下の場合、引数の型を number 型だけにしているため、`toFixed()`が実行できることが保証されている。

```ts
interface Props {
  amount: number;
}
function boxed<T extends Props>(props: T) {
  return { value: props.amount.toFixed(1) };
}

const box1 = boxed({ amount: 0 });
const box2 = boxed({ value: 0 }); // エラー
const box3 = boxed({ amount: 'test' }); // エラー
```

#### 複数の generics

複数の Generics を指定できる。（仮型引数を指定できる）

以下のように Generics を利用すれば、第 2 引数の Generics を第 1 引数の Generics と関連付けることができる。

第 2 引数に付与された K 型は、第 1 引数のプロパティ名称であることが確約される。

そのため、`props[k]`が必ず存在する値であることが保証される。

```ts
// K型の型制約はT型のキー名
function pick<T, K extends T>(props: T, key: K) {
  return props[key];
}
```

この関数を利用すると、以下のような型推論を得ることができる、

```ts
// K型の型制約はT型のキー名
function pick<T, K extends keyof T>(props: T, key: K) {
  return props[key];
}

const obj = {
  name: 'Taro',
  amount: 0,
  flag: false
};

// const value1: number
const value1 = pick(obj, 'name');
// const value2: string
const value2 = pick(obj, 'amount');
// const value3: boolean
const value3 = pick(obj, 'flag');

const value4 = pick(obj, 'test'); // 型制約を破っている（`obj`に存在しないキー名を指定している）のでエラー
```

#### クラスの Generics

クラス宣言に Generics を利用すれば、コンスタラクターの引数を制約できる。

```ts
class Person<T extends string> {
  name: T;
  constructor(name: T) {
    this.name = name;
  }
}
const person = new Person('Taro');
// const personName: 'Taro'
const personName = person.name;
```

オブジェクトの引数を制約したい場合、以下のようになる。

```ts
interface PersonProps {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}
class Person<T extends PersonProps> {
  name: T['name'];
  age: T['age'];
  gender: T['gender'];
}
```
