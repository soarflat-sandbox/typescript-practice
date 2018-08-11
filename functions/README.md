# Functions

名前付き関数と無名関数で、宣言の記述が少しだけ異なる。

以下は、第 1 引数が number 型、第 2 引数が number 型、返り値が number 型の関数の型。

[function-type.ts](./function-type.ts)

```ts
// 名前付き関数
function add(x: number, y: number): number {
  return x + y;
}

// 無名関数
const add2 = function(x: number, y: number): number {
  return x + y;
};
```

以下は完全な関数の型（↑ の型との違いが良くわかっていない）。

[full-type-function.ts](./full-type-function.ts)

```ts
// 完全な関数の型
const add: (baseValue: number, increment: number) => number = function(
  x: number,
  y: number
): number {
  return x + y;
};

// ↑のaddは以下のように記述することもできる
const add2: (baseValue: number, increment: number) => number = function(x, y) {
  return x + y;
};
```

## 任意引数

以下のような関数の型の場合、指定した引数と同じ数の引数を渡す必要がある（`(firstName: string, lastName: string)`と指定しているので、数値の引数を必ず 2 つ渡す必要がある）。

```ts
function buildName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

// 引数が少ないのでエラー
const result1 = buildName('Bob');

// 引数が多いのでエラー
const result2 = buildName('Bob', 'Adams', 'Sr.');

// OK
const result3 = buildName('Bob', 'Adams');
```

任意で引数を渡せるようにするためには、以下のように引数の後ろに`?`を記述する。

```ts
function buildName(firstName: string, lastName?: string): string {
  if (lastName) return `${firstName} ${lastName}`;
  else return firstName;
}

// OK
const result1 = buildName('Bob');

// 引数が多いのでエラー
const result2 = buildName('Bob', 'Adams', 'Sr.');

// OK
const result3 = buildName('Bob', 'Adams');
```

任意の引数は、必須の引数よりも後ろに指定する必要がある。そのため、`(firstName?: string, lastName: string)`のように指定しても、うまく動作しないため注意。

## デフォルト引数

以下のようにデフォルト引数（`lastName = 'Smith'`）を指定できる。

```ts
function buildName(firstName: string, lastName = 'Smith'): string {
  return `${firstName} ${lastName}`;
}

// OK "Bob Smith"を返す
const result1 = buildName('Bob');

// OK undefined を渡してもデフォルト引数は有効になるため、"Bob Smith"を返す
const result2 = buildName('Bob', undefined);

// 引数が多いのでエラー
const result3 = buildName('Bob', 'Adams', 'Sr.');

// OK
const result4 = buildName('Bob', 'Adams');
```

デフォルト引数は、任意の引数とは異なり、必須の引数の前に指定しても問題ない。

しかし、その状態でデフォルト引数を有効にしたい場合、明示的に`undefined`を渡す必要がある。

```js
function buildName(firstName = 'Will', lastName: string): string {
  return `${firstName} ${lastName}`;
}

// 引数が少ないのでエラー
const result1 = buildName('Bob');

// 引数が多いのでエラー
const result2 = buildName('Bob', 'Adams', 'Sr.');

// OK
const result3 = buildName('Bob', 'Adams');

// OK 明示的に`undefined`を渡しているのでデフォルト引数が有効になる
const result4 = buildName(undefined, 'Adams');
```

## Rest Parameters

以下のように任意の複数の引数を指定できる。

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  // `restOfName`には任意で渡した引数（`'Samuel', 'Lucas', 'MacKinzie'`）が
  // 配列(`['Samuel', 'Lucas', 'MacKinzie']`)で保持されている
  return `${firstName} ${restOfName.join(' ')}`;
}

const employeeName = buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie');
```

## this

```ts
let deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function() {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`);
```

```ts
interface Card {
  suit: string;
  card: number;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

const deck: Deck = {
  suits: ['hearts', 'spades', 'clubs', 'diamonds'],
  cards: Array(52),
  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    };
  },
};

const cardPicker = deck.createCardPicker();
const pickedCard = cardPicker();
console.log(`card: ${pickedCard.card} of ${pickedCard.suit}`);
```

### this parameters in callbacks

<!-- TODO: よくわからなかったので後回し -->
