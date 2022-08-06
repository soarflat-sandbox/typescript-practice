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
  flag: false,
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

  constructor(props: T) {
    this.name = props.name;
    this.age = props.age;
    this.gender = props.gender;
  }
}
const person = new Person({
  name: 'Taro',
  age: 28,
  gender: 'male',
});
```

## Conditional Types

型の互換性を条件分岐にかけ、型推論を導き出す型。

型が互換性を満たす場合、任意の型を返却する。

### 型の条件分岐

`T extends X ? Y : X`という構文で表現される。

上記の場合、T 型と X 型と互換性がある場合は Y 型が適用され、そうでない場合は Z 型が適用される。

JS の参考演算子と同じ。

以下は利用例。

```ts
type isString<T> = T extends string ? true : false;
type X = IsString<'test'>; // type X = true
type Y = IsString<0>; // type Y = false
```

#### Mapped Types での利用

```ts
interface Properties {
  name: string;
  age: number;
  flag: boolean;
}
type IsType<T, U> = { [K in keyof T]: T[K] extends U ? true : false };

// 型で型を変換する
// type IsString = {
//   name: true;
//   age: false;
//   flag: false;
// }
type IsString = IsType<Properties, string>;

// type IsNumber = {
//   name: false;
//   age: true;
//   flag: false;
// }
type IsNumber = IsType<Properties, number>;

// type IsBoolean = {
//   name: false;
//   age: false;
//   flag: true;
// }
type IsBoolean = IsType<Properties, boolean>;
```

#### 条件に適合した型を抽出する型

```ts
interface Properties {
  name: string;
  age: number;
  walk: () => void;
  jump: () => Promise<void>;
}
// プロパティ名称のUnion Typesを得るFilter型
type Filter<T, U> = {
  // T型のキー名を保証する
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// type StringKeys = "name"
type StringKeys = Filter<Properties, string>;

// type NumberKeys = "age"
type NumberKeys = Filter<Properties, number>;

// type FunctionKeys = "walk" | "jump"
type FunctionKeys = Filter<Properties, Function>;

// type ReturnPromiseKeys = "jump"
type ReturnPromiseKeys = Filter<Properties, () => Promise<any>>;
```

#### 一致するプロパティ名称から型を生成

取得した名称を元にして、新しい型を生成する。

組み込み Utility Types である Pick 型を利用すると、元の Object 型から街灯のプロパティのみを抽出した Object 型を生成できる。

```ts
interface Properties {
  name: string;
  age: number;
  walk: () => void;
  jump: () => Promise<void>;
}
// プロパティ名称のUnion Typesを得るFilter型
type Filter<T, U> = {
  // T型のキー名を保証する
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type StringKeys<T> = Filter<T, string>;
type NumberKeys<T> = Filter<T, number>;
type FunctionKeys<T> = Filter<T, Function>;
type ReturnPromiseKeys<T> = Filter<T, () => Promise<any>>;

// type Strings = {
//   name: string;
// }
type Strings = Pick<Properties, StringKeys<Properties>>;

// type Numbers = {
//   age: number;
// }
type Numbers = Pick<Properties, NumberKeys<Properties>>;

// type Functions = {
//   walk: () => void;
//   jump: () => Promise<void>;
// }
type Functions = Pick<Properties, FunctionKeys<Properties>>;

// type ReturnPromises = {
//   jump: () => Promise<void>;
// }
type ReturnPromises = Pick<Properties, ReturnPromiseKeys<Properties>>;
```

#### 条件分岐で得られる型

型の条件分岐が成立した場合、Indexed Access Types による型参照が可能になる。

```ts
interface DeepNest {
  deep: { nest: { value: sting } };
}
interface ShallowNest {
  shallow: { value: sting };
}
interface Properties {
  deep: DeepNest;
  shallow: ShallowNest;
}

// T型をDeepNest型と互換性あることを制約する
type Salvage<T extends DeepNest> = T['deep']['nest']['value'];
type DeepDive<T> = {
  // K型はT型のキー名
  // T[K]がDeepNest型と互換性があれば、Salvage<T[K]>（今回の場合string型）を返却する
  [K in keyof T]: T[K] extends DeepNest ? Salvage<T[K]> : never //
}[key of T];

// type X = string;
type X = DeepDive<Properties>
```

#### 部分的な型抽出

Conditional Types 構文の中のみで利用できる`infer`を利用すると、部分的な型抽出が可能。

```ts
function greet() {
  return 'Hello';
}

// (...arg: any[]) => infer U が関数型かつ戻り値がある型を条件としている
// T型か条件に合う型であれば、戻り値の型を返却する
type Return<T> = T extends (...arg: any[]) => infer U ? U : never;

// greetの戻り値の型はstring型なので
// type R = string
type R = Return<typeof greet>;
```

#### 引数型の抽出

```ts
function greet(name: string, age: number) {
  return 'Hello! I am ${name}. ${age} years old';
}

// 関数型かつ、第１引数がある場合、第１引数の型を返却する
type A1<T> = T extends (...arg: [infer U, ...any[]]) => any ? U : never;

// 関数型かつ、第２引数がある場合、第２引数の型を返却する
type A2<T> = T extends (...arg: [any, infer U, ...any[]]) => any ? U : never;

// 関数型である場合、引数をTuple型で返却する
type AA<T> = T extends (...arg: infer U) => any ? U : never;

// type X = string
type X = A1<greet>;

// type Y = number
type Y = A2<greet>;

// type Z = [string, number]
type Z = AA<greet>;
```

#### Promise.resolve 引数型の抽出

```ts
async function greet() {
  return 'Hello!';
}

type ResolveArg<T> = T extends () => Promise<infer U> ? U : never;

// type X = () => Promise<string>
type X = typeof greet;

// greet()がresolveするのは'Hello'であり、string型なので
// type Y = string
type Y = ResolveArg<greet>;
```

### Utility Types

TypeScript には組み込みである Utility Types が存在する。

#### 従来(TypeScript 2.8 以前)の組み込み Utility Types

#### Readonly 型

Object 型のプロパティを全て`readonly`に変換する。

```ts
interface User {
  name: string;
  age: number | null;
  gender: 'male' | 'female' | 'other';
  birthplace?: string;
}
type ReadonlyWrapUser = Readonly<User>;
// type ReadonlyWrapUser = {
//   readonly name: string;
//   readonly age: number | null;
//   readonly gender: 'male' | 'female' | 'other';
//   readonly birthplace?: string;
// };
```

#### Partial 型

Object 型のプロパティを全て`optional`に変換する。

```ts
interface User {
  name: string;
  age: number | null;
  gender: 'male' | 'female' | 'other';
  birthplace?: string;
}
type PartialWrapUser = Partial<User>;
// type PartialWrapUser = {
//   name?: string;
//   age?: number | null;
//   gender?: 'male' | 'female' | 'other';
//   birthplace?: string;
// };
```

#### Required 型

Object 型のすべてのプロパティかた`optional`を取り除く。

```ts
interface User {
  name: string;
  age: number | null;
  gender: 'male' | 'female' | 'other';
  birthplace?: string;
}
type RequiredWrapUser = Required<User>;
// type RequiredWrapUser = {
//   name: string;
//   age: number | null;
//   gender: 'male' | 'female' | 'other';
//   birthplace: string;
// };
```

#### Record 型

第１仮型引数に指定したプロパティ名称で、Object 型を生成する。

```ts
interface User {
  name: string;
  age: number | null;
  gender: 'male' | 'female' | 'other';
  birthplace?: string;
}
type UserRecord = Record<'user', User>;
// type UserRecord = {
//   user: User;
// };
```

#### Pick 型

第２仮型引数に指定したプロパティ型を、第１仮型引数に指定した型から抽出する。

```ts
interface User {
  name: string;
  age: number | null;
  gender: 'male' | 'female' | 'other';
  birthplace?: string;
}
type UserGender = Pick<User, 'gender'>;
// type UserGender = {
//   gender: 'male' | 'female' | 'other';
// };
```

#### Omit 型（3.5 で実装予定）

第２仮型引数に指定したプロパティ型を、第１仮型引数に指定した型から取り除いた型を生成する。

```ts
interface User {
  name: string;
  age: number | null;
  gender: 'male' | 'female' | 'other';
  birthplace?: string;
}
type withoutBirthplace = Omit<User, 'birthplace'>;
// type withoutBirthplace = {
//   name: string;
//   age: number | null;
//   gender: 'male' | 'female' | 'other';
// };
```
