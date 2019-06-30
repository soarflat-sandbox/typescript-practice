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

利用できるプリミティブ値を定義した型。

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
