# 型推論

>プログラミング言語の機能の1つで、静的な型付けを持つ言語において、変数や関数シグネチャの型を明示的に宣言しなくても、初期化のための代入式の右辺値や関数呼び出し時の実引数などといった、周辺情報および文脈などから自動的に（暗黙的に）各々の型を決定する機構のこと。

## const/letの型推論

### letの型推論

```ts
// let user: string = 'Taro'; と同じ
let user = 'Taro';

// let value: number = 0; と同じ
let value = 0;

// let flag: boolean = false; と同じ
let flag = false;
```

### constの型推論

`const`を利用した場合、推論される型はWidening Literal Typesになる。

```ts
// const user: 'Taro' = 'Taro'; と同じ
const user = 'Taro';

// const value: 0 = 0; と同じ
const value = 0;

// const flag: false = false; と同じ
const flag = false;
```

#### Widening Literal Typesとは

型の指定はLiteral Typesと同じだが、Widening Literal Typesを持つ変数を再代入可能な変数に代入すると、Literal Typesではなくなる（型が変換される）。

```js
const zero = 0;
const zeros = {
  // 再代入可能な変数に代入したことにより
  // 型が zero: number に変換される
  zero
}
zeros.zero = 10; // OK
```

変換を防ぐには、型アノテーションを付与する

```ts
const zero: 0 = 0;
const zeros = {
  zero
}
zeros.zero = 10; // エラー
```

`as const`アサーションを利用する（TypeScript3.4から）。

```js
const zero = 0 as const;
const zeros = {
  // 再代入可能な変数に代入したことにより
  // 型が zero: number に変換される
  zero
}
zeros.zero = 10; // エラー
```

## Array/Tupleの型推論

### Arrayの型推論

型アノテーションなしで配列を宣言した場合、宣言時の初期要素によって配列の型が決定する。

```ts
// const a1 = boolean[]
const a1 = [true, false];

// const a2 = (string | number)[]
const a2 = [0, 1, '2'];

// const a3 = (string | number | boolean)[]
const a3 = [false, 1, '2'];
```

配列に含むことのできる型をリテラルなどの固定にしたい場合、代入時にアサーションを付与すると、型推論に適用される。

```ts
// const a1 = (0 | 1)[]
const a1 = [0 as 0, 1 as 1];
a1.push(0);
a1.push(2); // エラー
```

型アノテーションを付与した値を配列に代入しても、同様の型推論が適用される。

```ts
const zero: 0 = 0;
const one: 1 = 1;
// const a1 = (0 | 1)[]
const a1 = [zero, one]
a1.push(0);
a1.push(2); // エラー
```

### Tupleの型推論

Tuple型をアサーションで付与すれば、型推論が適用される。

```ts
// 別にこれでもよくない？なぜ型推論を利用するのかがわからない
// const t1: [boolean] = [false]
const t1 = [false] as [boolean];
const t2 = [false, 1] as [boolean, number];
const t3 = [false, 1, '2'] as [boolean, number, string];
```

Tuple型の配列の要素を参照して代入すると、代入された値も型推論される。

```ts
const t1 = [false] as [boolean];
// t1[0] が boolean 型なので、v1 も boolean型になる
let v1 = t1[0];
v1 = true;
v1 = 2; // エラー
```


## objectの型推論

objectの宣言時に初期値を定義すれば、型推論が適用される。

```ts
// const obj: {
//   foo: boolean;
//   bar: number;
//   baz: string;
// };
const obj = {
  foo: false,
  bar: 1
  baz: '2'
};

obj.foo = true;
obj.foo = 2; // エラー
```

プロパティをLiteral Typesにしたい場合は、アサーションを利用する。

```ts
const obj = {
  foo: false as false,
  bar: 1 as 1,
  baz: '2' as '2'
};
obj.foo = true; // エラー
```

## 関数の戻り値推論

関数の定義内容に応じて、型推論が行われる。

```ts
// function getPriceLabel(amount: number, tax: number): string
function getPriceLabel(amount: number, tax: number) {
  return `${amount * tax}円`;
}
```

### 処理内容により変わる型推論

関数内に条件分岐が存在し、戻り値の型が複数ある場合でも、Union Typesで型推論が行われる。

```ts
// function getScore(score: number): number | null
function getScore(score: number) {
  if (score < 0 || score > 100) return null;
  return score
}
```

Literal Union Typesも推論される。

```ts
// function getScoreAmount(score: 'A' | 'B' | 'C'): 100 | 60 | 30
function getScoreAmount(score: 'A' | 'B' | 'C') {
  switch (score) {
    case 'A':
      return 100;
    case 'B':
      return 60;
    case 'C':
      return 30;
  }
}
```

## Promiseの型推論

```ts
// function wait(duration: number): Promise<{}>
function wait(duration: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${duration}ms passed`);
    }, duration);
  });
}
// resは {} 型
// string 型の値を返しているが、推論できない
wait(1000).then(res => {});
```

### resolve関数の引数を指定する

関数戻り値に型アノテーションを付与すれば、resolve関数の引数の型を指定できる。

```ts
function wait(duration: number): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`${duration}ms passed`);
      // string 型以外を引数に渡したらエラーになる
      // resolve(duration);
    }, duration);
  });
}
// resは string 型
wait(1000).then(res => {});
```

もしくは、Promiseインタンス生成時に型を付与する

```ts
function wait(duration: number) {
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(`${duration}ms passed`);
      // string 型以外を引数に渡したらエラーになる
      // resolve(duration);
    }, duration);
  });
}
// resは string 型
wait(1000).then(res => {});
```

### async関数

Promiseインスタンスを返す関数を、`async`関数の中で`await`で実行すると型推論が行われる。

```ts
function wait(duration: number) {
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(`${duration}ms passed`);
      // string 型以外を引数に渡したらエラーになる
      // resolve(duration);
    }, duration);
  });
}
// resは string 型
wait(1000).then(res => {});

// function queue(): Promise<string>
async function queue() {
  const message = await wait(1000); // const message: string
  return message;
}
```

### Promise.all/Promise.race

```ts
function waitThenString(duration: number) {
  return new Promise<string>(resolve => {
    setTimeout(() => {
      resolve(`${duration}ms passed`);
    }, duration);
  });
}

function waitThenNumber(duration: number) {
  return new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(duration);
    }, duration);
  });
}

// function waitAll(): Promise<[string, number, string]>
function waitAll() {
  return Promise.all([
    waitThenString(10),
    waitThenNumber(100),
    waitThenString(1000)
  ]);
}

// function waitAll(): Promise<string | number>
function waitRace() {
  return Promise.all([
    waitThenString(10),
    waitThenNumber(100),
    waitThenString(1000)
  ]);
}

async function main() {
  // a: string, b: number, c: string
  const [a, b, c] = await waitAll();

  // result: string | number
  const result = await waitRace();
}
```

## import 構文の型推論

外部モジュールで定義された変数や関数も、型推論の対象になる。

`test.ts`

```ts
export const value = 10;
export const label = 'label';
export function returnFalse() {
  return false;
}
```

`index.ts`

```ts
import { value, label, returnFalse } from './test';
// const v1: 10
const v1 = value;

// const v2: 'label'
const v2 = label;

// const v3: () => boolean
const v3 = returnFalse;
```

### dynamic import

`dynamic import`も同様に型推論をサポートしている。

`dynamic import`は戻り値がPromiseのため、適切なコードを書けば型推論が適用される。

`test.ts`

```ts
export const value = 10;
```

`index.ts`

```ts
import('./test').then(module => {
  const amount = module.value;
});

async function main() {
  const { value } = await import('./test');
  // const amount: 10
  const amount = value;
}
```

## JSONの型推論

JSONファイルを外部モジュールとしてインポートし、定義内容を型推論できる。

`users.json`

```json
[
  {
    "id": 0,
    "created_at": "Thu Jan 24 2019 14:34:32 GMT+0900",
    "profile": {
      "name": {
        "first": "Taro",
        "last": "Yamada"
      },
      "age": 28,
      "gender": "male",
      "enabled": true
    }
  },
  {
    "id": 1,
    "created_at": "Thu Jan 24 2019 14:34:32 GMT+0900",
    "profile": {
      "name": {
        "first": "Hanako",
        "last": "Suzuki"
      },
      "age": 26,
      "gender": "female",
      "enabled": false
    }
  }
]
```

このJSONを型定義で表現しようとすると以下のようになる。

```ts
interface User {
  id: number;
  created_at: string;
  profile: {
    name: {
      first: string;
      last: string;
    };
    age: number;
    gender: string;
    enabled: boolean;
  };
}
type Users = User[]
```

`typeof`を利用すれば、JSONから型推論が行える。

以下`Users`型は上記の`Users`型と等価。

```ts
import UsersJson from './users.json';
type Users = typeof UsersJson;
```
