Vuex の型定義。

`node_modules/vuex/types/index.d.ts`

```ts
export type Getter<S, R> = (
  state: S,
  getters: any,
  rootState: R,
  rootGetters: any
) => any;
export type Action<S, R> = ActionHandler<S, R> | ActionObject<S, R>;
export type Mutation<S> = (state: S, payload: any) => any;

export interface GetterTree<S, R> {
  [key: string]: Getter<S, R>;
}
export interface ActionTree<S, R> {
  [key: string]: Action<S, R>;
}
export interface MutationTree<S, R> {
  [key: string]: Mutation<S>;
}
```

# Vuex の型推論問題

Vuex の公式の型定義では、様々な箇所に any 型が利用されているので、本来コンパイルエラーが発生して欲しい箇所でコンパイルエラーが発生せず、ランタイムエラーが発生する可能性が高いよ。困るよ。

それだとまずいので、公式型定義に即した独自の型を定義することで、この問題（不安）を解決しようぜ！！

- state の参照
- getter 関数同士の参照
- RootState/RootGetters の参照
- MutationType/ActionType と実装関数の整合性担保
- mutation 関数と action 関数の payload

## state の参照

State の型を定義しようぜ！

んで、それを getter 関数の第一引数にキャストしようぜ！

`store/counter.ts`

```ts
interface State {
  count: number;
}
const state: State = {
  count: 0,
};

const getters = {
  // 型アノテーションを付与
  double(state: State) {
    return state.count * 2;
  },
  // 型アノテーションを付与
  expo2(state: State) {
    return state.count ** 2;
  },
  // 型アノテーションを付与
  expo(state: State) {
    return (amount) => state.count ** amount;
  },
};
```

getter 関数ごとに型アノテーションを付与しなきゃいけないので、くっそ面倒くさいぜ！！

どうにかしたいぜ！！なので、`getters`にまとめて指定できる Getters 型を用意するぜ！

### Getters 型の用意

Getters 型を準備することで、型アノテーションは不要になった。やったぜ。

```ts
interface State {
  count: number;
}
const state: State = {
  count: 0,
};

// 受け取ったS型をもとにobject型を返却する
// キーはstring型
// プロパティは`state`というS型の引数をとり、unknown型を返す関数だったらなんでも良いぜ
type Getters<S> = {
  [k: string]: (state: S) => unknown;
};

const getters: Getters<State> = {
  // 型アノテーションを付与しなくて良くなった。やったぜ。
  double(state) {
    return state.count * 2;
  },
  expo2(state) {
    return state.count ** 2;
  },
  expo(state) {
    return (amount) => state.count ** amount;
  },
};
```

けど、これだと公式が提供している GetterTree 型とさほど変わらないのでは...?

もっとイケてる書き方はないんですか..?（憤怒）

### getters の型を解決する

つーわけで、以下のように`getters`の要件も`interface`で明示して、上記の ↑ の Getter 型に注入すれば解決 👏👏👏

`interface`があれば、`interface`に沿わない定義が受け付けないし、型推論もできちゃうぞ ⭐️️

```ts
interface State {
  count: number;
}
const state: State = {
  count: 0,
};
interface IGetters {
  double: number;
  expo2: number;
  expo: (amount: number) => number;
}
type Getters<S, G> = { [K in keyof G]: (state: S, getters: G) => G[K] };

const getters: Getters<State, IGetters> = {
  double(state, getters) {
    return state.count * 2;
  },
  expo2(state, getters) {
    return state.count ** 2;
  },
  expo(state, getters) {
    return (amount) => state.count ** amount;
  },
};
```

これでインラインキャスト（引数に型アノテーションを付与する）が不要にとなり、すべての関数引数が、型を付与された状態になったぜ ♪♪♪ やったぜ!!

## mutations の型を解決する

↑ の Getters 型と同じように Mutations 型を定義するぜ

```ts
const mutations = {
  setCount(state, payload) {
    state.count = payload.amount;
  },
  multi(state, payload) {
    state.count = state.count * payload;
  },
  increment(state) {
    state.count++;
  },
};
```

### IMutations 型の定義

getter 関数とは異なり、mutation 関数の戻り値は void で固定でっせ。

プログラマが定義できるのは「関数名」と「ペイロード」だけなので、その要件を`interface`に表現するとこーなります。

```ts
interface IMutations {
  setCount: { amount: number };
  multi: number;
  increment: void;
}

type Mutations<S, M> = { [K in keyof M]: (state: S, payload: M[K]) => void };

const mutations = Mutations<State, IMutations> = {
  setCount(state, payload) {
    state.count = payload.amount;
  },
  multi(state, payload) {
    state.count = state.count * payload
  },
  increment(state)  {
    state.count++
  }
}
```

## actions の型を解決する

```ts
const actions = {
  asyncSetCount(ctx, payload) {
    ctx.commit('setCount', { amount: payload.amount });
  }
};

interface IActions {
  asyncSetCount: { amount: number };
  asyncMulti: number;
  asyncIncrement: void;
}

type Actions<S, A> = {
  [K in keyof A]: (ctx: unknown)
}
```
