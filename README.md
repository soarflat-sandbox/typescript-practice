# Learning TypeScript

- [基本の型](basic-types/)
- [関数](functions/)
- [クラス](classes/)
- [インターフェイス](interfaces/)
- [ジェネリクス](generics/)
- [名前空間](namespaces/)

## 基本的な用語

- 型注釈（Type Annotation）

### 型注釈（Type Annotation）

変数、引数、およびオブジェクトプロパティに型を指定することで、特定の型を持つ値以外の代入を防げる機能（構文）のこと。

そのため、型を指定することを

- 「型注釈を利用する」
- 「型注釈を付ける」
- 「型注釈を書く」
- 「型注釈する」

などと言い、型が指定されていないことを

- 「型注釈が利用されていない」
- 「型注釈が付いていない」
- 「型注釈が書かれていない」
- 「型注釈されてない」

などと言う。

#### 型注釈（Type Annotation）の利用例

以下のように変数や引数の後ろに`: 型`を記述すれば、型が指定される。

```ts
// 型注釈あり
let name: string = 'soarflat'
name = 1; // エラー

// 型注釈なし
let fullName = 'soarflat'
fullName = 1;

// 型注釈あり
function square(number: number) {
  return number ** 2
}
square(2);
square('2'); // エラー

// 型注釈なし
function square2(number) {
  return number ** 2
}
square2(2);
square2('2');
```
