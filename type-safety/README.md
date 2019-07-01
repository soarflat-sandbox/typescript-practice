# TypeScript の型安全

> 「型検査を通過したなら、ある種のバグが存在しない」という性質

## 制約による型安全

### 関数で Nullable 型を扱う

以下は引数が数値か`null`であることがわかっている関数。

```ts
function getFormattedValue(value) {
  return `${value.toFixed(1)} pt`;
}
console.log(getFormattedValue(0.1)); // 0.1 pt
console.log(getFormattedValue(0)); // 0.0 pt
console.log(getFormattedValue(null)); // ランタイムエラー
```

`null`を安全に扱ることができない処理なので、ランタイムエラーが発生する。

引数に型アノテーションをつけ、引数に`null`を渡された時は文字列を返すようにすれば解決する。

```ts
function getFormattedValue(value: number | null) {
  if (value === null) return '-- pt';
  return `${value.toFixed(1)} pt`;
}
console.log(getFormattedValue(0.1)); // 0.1 pt
console.log(getFormattedValue(0)); // 0.0 pt
console.log(getFormattedValue(null)); // -- pt
```

`number | null`のような型を Nullable 型（Null 許容型）と呼ぶ。

### 関数の引数をオプションにする

引数を必ず与える必要がないことを明示するためには`?`を記述する。

```ts
// `?`を利用すると、`undefined`型が自動で付与される
// function greet(name: string | undefined)
function greet(name?: string) {
  return `Hello ${name}`;
}
console.log(greet('Taro')); // Hello Taro
console.log(greet()); // Hello undefined
```

#### ランタイムエラーを防ぐ

上記の関数に`toUpperCase()`を追加すると、ランタイムエラーが発生するようになる。

```ts
function greet(name?: string) {
  return `Hello ${name.toUpperCase()}`;
}
console.log(greet('Taro')); // Hello TARO
console.log(greet()); // ランタイムエラー
```

これを防ぐためには、引数に`undefined`を渡された時は文字列を返すようにする。

```ts
function greet(name?: string) {
  if (name === undefined) return 'Hello';
  return `Hello ${name.toUpperCase()}`;
}
console.log(greet('Taro')); // Hello TARO
console.log(greet()); // ランタイムエラー
```

### デフォルト引数の型推論

引数にデフォルト値を指定することで、その値に応じた型推論が行われる。

以下の関数の場合、`unit`のデフォルト値は`'pt'`であり、string 型なので、`unit`の型は string 型になる。

```ts
function getFormattedValue(value: number, unit = 'pt') {
  return `${value.toFixed(1)} ${unit.toUpperCase()}`;
}
console.log(getFormattedValue(100)); // 100.0 PT
console.log(getFormattedValue(100, 'kg')); // 100.0 KG
console.log(getFormattedValue(100, 0)); // エラー
```

デフォルト値を指定しつつ、複数の型を指定したい場合は型アノテーションを付与する。

```ts
function getFormattedValue(value: number, unit: string | null = null) {
  return `${value.toFixed(1)} ${unit.toUpperCase()}`;
}
```

このままだと、ランタイムエラーが発生する可能性があるため、修正する（Type Guard を追加する）。

```ts
function getFormattedValue(value: number, unit: string | null = null) {
  const _value = value.toFixed(1);
  if (unit === null) return `${_value}`;
  return `${_value} ${unit.toUpperCase()}`;
}
```

### オブジェクトの型安全

以下の`User`型のようなすべてのプロパティがオプショナルな型は「Weak Type」と言う。

```js
type User = {
  age?: number,
  name?: string
};
function registerUser(user: User) {}
```

#### Weak Type

意図しないオブジェクトの代入を防ぐ型。

```ts
type User = {
  age?: number;
  name?: string;
};
function registerUser(user: User) {}

// User型に一致するプロパティと一致しないプロパティを持つオブジェクト
const maybeUser = {
  age: 22,
  name: 'Taro',
  gender: 'male'
};

// User型に一致しないプロパティを持つオブジェクト
const notUser = {
  gender: 'male',
  graduate: 'Tokyo'
};

registerUser(maybeUser);
registerUser(notUser); // エラー
```

#### Excess Property Checks

上記のコードだと、`maybeUser`などの変数を一度宣言し、引数として渡しているが、オブジェクトリテラルを引数に直接記述すると、挙動が変わる。

```ts
type User = {
  age?: number;
  name?: string;
};
function registerUser(user: User) {}

const maybeUser = {
  age: 22,
  name: 'Taro',
  gender: 'male'
};
registerUser(maybeUser);
registerUser({
  age: 22,
  name: 'Taro',
  gender: 'male' // エラー
});
```

### 読み込み専用プロパティ

オブジェクトが保持する値を読み込み専用にしたい場合は、プロパティ名の前に`readonly`シグネチャを付与する。

```ts
type State = {
  readonly id: number;
  name: string;
};
const state: State = {
  id: 1,
  name: 'Taro'
};
state.name = 'Hanako';
state.id = 2; //エラー
```

#### Readonly 型

オブジェクトのすべてのプロパティに`readonly`を付与したい場合、Readonly 型を利用すれば、一括して読み込み専用にできる。

```ts
type State = {
  id: number;
  name: string;
};
const state: Readonly<State> = {
  id: 1,
  name: 'Taro'
};
state.name = 'Hanako'; // エラー
state.id = 2; //エラー
```

#### Object.freeze の型推論

`Object.freeze()`関数を利用すると、Readonly 型 が推論される。

```ts
type State = {
  id: number;
  name: string;
};
const state: State = {
  id: 1,
  name: 'Taro'
};
const frozenState = Object.freeze(state);
frozenState.name = 'Hanako'; // エラー
frozenState.id = 2; //エラー
```

## 抽象度による型安全

### アップキャスト・ダウンキャスト

#### ダウンキャスト

抽象的な型から詳細な型を付与すること。

以下の変数をダウンキャストしてみる。

```ts
// 型推論により、以下の型が指定される
// const defaultTheme = {
//   backgroundColor: string,
//   borderColor: string
// };
const defaultTheme = {
  backgroundColor: 'orange',
  borderColor: 'red'
};
```

`defaultTheme`をダウンキャスト（string 型を Literal Types に）するには、アサーションで型を宣言すれば良い。

```ts
const defaultTheme = {
  backgroundColor: 'orange' as 'orange',
  borderColor: 'red' as 'red'
};
defaultTheme.borderColor = 'blue'; // エラー
```

#### アップキャスト

型の抽象度を上げること。

以下のように無闇に使うとエラーを招くので、不要であれば利用しない。

```ts
// 型推論では、関数の戻り値の型はstring 型になるが
// any 型を付与したことにより、関数の戻り値の型はany 型になった
// 戻り値の型の抽象度が上がったので、「any 型にアップキャストした」などと言える
function toNumber(value: string): any {
  return value;
}
// `toNumber()`の戻り値の型はanyだが、fictionの型は numberなので、
// ダウンキャストしている。
const fiction: number = toNumber('1.000');
fiction.toFixed(); // ランタイムエラー
```

### オブジェクトに動的に値を追加する

インデックスシグネチャを利用すれば、オブジェクトに動的に値を追加できる。

```ts
// `name`は必須だが、それ以外のプロパティを自由に追加できる
type User = {
  name: string;
  [k: string]: any;
};

const userA: User = {
  name: 'Taro',
  age: 26
};

// const x: string
const x = userA.name;
// const y: any
const y = userA.age;
```

`[k: string]`がインデックスシグネチャ。

インデックスシグネチャには any 型以外も指定できが、今回の場合以下のように number 型を指定するとエラーが発生する。

```ts
type User = {
  name: string; // エラー
  [k: string]: number;
};
```

今回の場合、`name`が number 型と互換性がないためエラーが発生する。これを回避するためには以下のように`number | string`を指定する必要がある。

```ts
type User = {
  name: string;
  [k: string]: number | string;
};

const userA: User = {
  name: 'Taro',
  age: 26
};

// const x: string
const x = userA.name;
// const y: number | string
const y = userA.age;
```

### プロパティ型を制限する

```ts
type Answer = 'mighty' | 'lot' | 'few' | 'entirely';
type User = {
  name: string;
  enquete: { [k: string]: Answer };
};
const userA: User = {
  name: 'Taro',
  enquete: {
    exercise_habits: 'entirely',
    time_of_sleeping: 'few'
  }
};
// const x: Answer
const x = userA.enquete.exercise_habits;
// steps_per_day は存在しないのに、Answer 型を推論できてしまう
// const y: Answer
const y = userA.enquete.steps_per_day;
```

### プロパティ名を制限する

`compilerOptions.noImplictAny`もしくは、`compilerOptions.strict`が`true`に設定されている時に有効。

```ts
type Question = 'exercise_habits' | 'time_of_sleeping';
type Answer = 'mighty' | 'lot' | 'few' | 'entirely';
type User = {
  name: string;
  // `?`がないと`enquate: {}`を定義した時にエラーが発生する
  enquete: { [k in Question]?: Answer };
};
const userA: User = {
  name: 'Taro',
  enquete: {
    exercise_habits: 'entirely',
    time_of_sleeping: 'few'
  }
};
// const x: Answer
const x = userA.enquete.exercise_habits;
// const y: Answer
const y = userA.enquete.steps_per_day; // エラー
```

### インデックスシグネチャを用いた Object のプロパティ型の制約

なんでも許容するインデックスシグネチャの指定

```ts
interface User {
  [k: string]: any;
}
const user: User = {
  name: 'Taro',
  age: 26,
  walk: () => {},
  talk: () => {}
};
```

関数型のプロパティだけを許容してい場合、以下のようになる。

```ts
interface Functions {
  [k: string]: Function;
}
const functions: Functions = {
  name: 'Taro', // エラー
  age: 26, // エラー
  walk: () => {},
  talk: () => {}
};
```

Proise を返す関数型のプロパティだけを許容してい場合、以下のようになる。

```ts
interface ReturnPromises {
  [k: string]: () => Promise<any>;
}
const returnPromises: ReturnPromises = {
  walk: () => {}, // エラー
  talk: async () => {}
};
```

### const assertion

TypeScript 3.4 で追加されたシグネチャ。

以下のように`as const`シグネチャを付与することで、 Tuple を簡潔に宣言できる。

```ts
// const tuple1:  [false, 1, '2']
const tuple1 = [false, 1, '2'] as [false, 1, '2'];
// const tuple2:  readonly [false, 1, '2']
const tuple2 = [false, 1, '2'] as const;
```

#### Widening Literal Type を防止する

```ts
function increment() {
  return { type: 'INCREMENT' };
}

function decrement() {
  return { type: 'DECREMENT' } as const;
}

// Widening Literal Typeと判定され、型がstring型に変換される
// const x: { type: string }
const x = increment();
// const y: { readonly type: 'DECREMENT' }
const y = decrement();
```

以下のように定数を管理するファイルに一括して`as const`を付与できるので、従来に比べて簡単に Widening Literal Type を防止できる。

`constants.ts`

```ts
export default {
  increment: 'INCREMENT',
  decrement: 'DECREMENT',
  setCount: 'SET_COUNT'
} as const;
```

`index.ts`

```ts
import constants from './constants.ts';

// const n: {
//   readonly increment: 'INCREMENT'
//   readonly decrement: 'DECREMENT'
//   readonly setCount: 'SET_COUNT'
// }
const n = constants;
```

### 危険な型の付与

以下はコンパイルエラーをすり抜け、ランタイムエラーが発生してしまう例。

```ts
function greet(): any {
  console.log('hello');
}
const message = greet();
console.log(message.toUpperCase()); // ランタイムエラー
```

`greet()`関数は戻り値がないが、戻り値がないことを示す void 型、any 型の付与により相殺されてしまっている。

そのため、any 型を取り除けばコンパイルエラーが発生する。

```ts
function greet() {
  console.log('hello');
}
const message = greet();
console.log(message.toUpperCase()); // ランタイムエラー
```

そのため、必要でない限り any のような緩い型を付与すべきではない。

#### Non-null assertion

`!`が Non-null assertion。

```ts
function greet(name?: string) {
  console.log(`Hello ${name!.toUpperCase()}`);
}
greet();
```

利用すべきではないシグネチャ。

#### double assertion

以下のように型を都合よく書き換えることができる。

```ts
const myName = (0 as any) as string;
console.log(myName.toUpperCase());
```

これを「double assertion」と言う。

よほどのことがない限り利用すべきではない。

## 絞り込みによる型安全

### typeof type guards

`typeof`演算子を利用した条件分岐を利用することで、推論される型が絞り込まれる。

```ts
function reset(value: number | string | boolean) {
  // const v0: number | string | boolean
  const v0 = value;
  if (typeof value === 'number') {
    // const v1: number
    const v1 = value;
    return 0;
  }
  // const v2: string | boolean
  const v2 = value;
  if (typeof value === 'string') {
    // const v3: string
    const v3 = value;
    return '';
  }
  // const v4: boolean
  const v4 = value;
  return false;
}
```

### in type guards

引数に渡されるオブジェクトのうち、どちらかのみに存在するプロパティを`in`演算子で比較すると、型の絞り込みが適用される。

```ts
type User = { gender: string };
type UserA = User & { name: string };
type UserB = User & { age: number; graduate: string };

function judgeUserType(user: UserA | UserB) {
  if ('gender' in user) {
    // const u0: UserA | UserB
    const u0 = user;
    console.log('user type is UserA | UserB');
  }
  if ('name' in user) {
    // const u1: UserA
    const u1 = user;
    console.log('user type is UserA');
    // 早期returnをすることにとり、絞り込み型推論
    // これ以降の型推論にUserA型は含まれない
    return;
  }
  // const u2: UserB
  const u2 = user;
  console.log('user type is UserB');
}
```

### insranceof type guards

`typeof`演算子と同様に型の絞り込みが行われる。

```ts
class Creature {
  breathe() {}
}

class Animal extends Creature {
  snakeTail() {}
}

class Human extends Creature {
  greet() {}
}

function action(creature: Animal | Human | Creature) {
  // const c0: Animal | Human | Creature
  const c0 = creature;
  c0.breathe();
  if (creature instanceof Animal) {
    // const c1: Animal
    const c1 = creature;
    return creature.snakeTail();
  }
  // const c2: Human | Creature
  const c2 = creature;
  if (creature instanceof Human) {
    // const c3: Human
    const c3 = creature;
    return creature.greet();
  }
  // const c4: Creature
  const c4 = creature;
  return c4.breathe();
}
```

### タグ付き Union Types

引数としてとる Union Types のすべてが共通のプロパティを持ち、その型が Litral Types である場合、条件分岐で型の絞り込みを適用できる。

```ts
type UserA = { gender: 'male'; name: string };
type UserB = { gender: 'female'; age: number };
type UserC = { gender: 'other'; graduate: string };

function judgeUserType(user: UserA | UserB | UserC) {
  switch (user.gender) {
    case 'male':
      // const u0: UserA
      const u0 = user;
      return 'user type is UserA';
    case 'female':
      // const u1: UserB
      const u1 = user;
      return 'user type is UserB';
    case 'other':
      // const u2: UserC
      const u2 = user;
      return 'user type is UserA';
    default:
      // const u3: never
      const u3 = user;
      return 'user type is never';
  }
}
```

### ユーザー定義 type guards

`is`を利用すれば、型推論を補助できる。

```ts
type User = { gender: string; [k: string]: any };
type UserA = User & { name: string };
type UserB = User & { age: number };

function isUserA(user: UserA | UserB): user is UserA {
  return user.name !== undefined;
}

function isUserB(user: UserA | UserB): user is UserB {
  return user.name !== undefined;
}

function getUserType(user: any) {
  // const u0: any
  const u0 = user;
  // isUserA の戻り値の型アノテーションは`user is UserA`のため
  // この条件を通過したブロックでは`user`が UserA 型という推論が適用される
  if (isUserA(user)) {
    // const u1: UserA
    const u1 = user;
    return 'A';
  }
  // isUserB の戻り値の型アノテーションは`user is UserB`のため
  // この条件を通過したブロックでは`user`が UserB 型という推論が適用される
  if (isUserB(user)) {
    // const u2: UserB
    const u2 = user;
    return 'B';
  }
  return 'undefined';
}
// const x: 'A' | 'B' | 'unknown'
const x = getUserType({ name: 'Taro' });
```

### Array.filter で型を絞り込む

Array.filterでは、通常、型を絞り込むことができない。

たとえば、以下の場合、処理結果の型は必ず UserB[]になるが、推論結果は絞り込みが適用されない。

```ts
type User = { name: string };
type UserA = User & { gender: 'male' | 'female' | 'other' };
type UserB = User & { graduate: string };

const users: (UserA | UserB)[] = [
  { name: 'Taro', gender: 'male' },
  { name: 'Hanako', graduate: 'Tokyo' }
];
// const filteredUsers: (UserA | UserB)[]
const filteredUsers = users.filter(user => 'graduate' in user);
```

以下のようにユーザー定義ガード節が付与された関数を併用することで解決できる。

```ts
type User = { name: string };
type UserA = User & { gender: 'male' | 'female' | 'other' };
type UserB = User & { graduate: string };

const users: (UserA | UserB)[] = [
  { name: 'Taro', gender: 'male' },
  { name: 'Hanako', graduate: 'Tokyo' }
];
function filterUser(user: UserA | UserB): user is UserB {
  return 'graduate' in user;
}
// const filteredUsers: UserB[]
const filteredUsers = users.filter(filterUser);

// ↑は以下のように書ける
// const filteredUsers = users.filter(
//   (user: UserA | UserB): user is UserB => 'graduate' in user
// );
```
