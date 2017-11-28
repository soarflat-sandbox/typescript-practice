# クラス
TypeScriptではES2015のクラスを利用できる。

以下はクラスの簡単な例。

```ts
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return 'Hello, ' + this.greeting;
  }
}

const greeter = new Greeter('world');
```

このクラスには、`greeting`という名前のプロパティ、コンストラクタ、および`greet`メソッドという3つのメンバがある。

## インターフェイス
TypeScriptでは、オブジェクト指向の共通のパターンを利用できる。

クラスベースのプログラミングで最も基本的なパターンの1つは、継承を利用して新しいクラスを作成するために既存のクラスを拡張できることである。

以下は継承の例。

```ts
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!');
  }
}

const dog = new Dog();
dog.bark(); // => Woof! Woof!
dog.move(10); // => Animal moved 10m.
dog.bark(); // => Woof! Woof!
```

上記の例は、最も基本的な継承機能を示している。

クラスは、基本クラスからプロパティとメソッドを継承する。ここで`Dog`は、`extends`を利用して`Animal`基本クラスから派生した派生クラスとなる。

派生クラスはしばしばサブクラスと呼ばれ、基本クラスはスーパークラス（基底クラス）と呼ばれることが多い。

### より複雑な継承

以下はより複雑な継承の例。

```ts
class Animal {
  name: string;

  constructor(theName: string) {
    this.name = theName
  }

  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    // スーパークラスのコンストラクタを実行する
    super(name);
  }

  // Animalのmoveメソッドをオーバーライド
  move(distanceInMeters = 5) {
    console.log('Slithering...');
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    // スーパークラスのコンストラクタを実行する
    super(name);
  }

  // Animalのmoveメソッドをオーバーライド
  move(distanceInMeters = 45) {
    console.log('Galloping...');
    super.move(distanceInMeters);
  }
}

let sam = new Snake('Sammy the Python');
let tom: Animal = new Horse('Tommy the Palomino');

sam.move();
// => Slithering...
// => Sammy the Python moved 5m.

tom.move(34);
// => Slithering...
// => Tommy the Palomino moved 34m.
```

コンストラクタ関数を含む各派生クラスはスーパークラスのコンストラクタを実行する`super()`を必ず呼び出す必要がある。これはTypeScriptが強制する重要なルール。

`Snake`、`Horse`のどちらのクラスも`move`メソッドを定義しているため`Animal`の`move`メソッドはオーバーライドされる。

## パブリック、プライベート、および保護された修飾子
TypeScriptでは、各メンバはデフォルトでパブリック（自由にアクセスできる状態）である。

そのため、以下のそれぞれの記述は同じ動作をする認識で問題ない。

```ts
class Animal {
  name: string;

  constructor(theName: string) {
    this.name = theName
  }

  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

```ts
class Animal {
  public name: string;

  public constructor(theName: string) {
    this.name = theName
  }

  public move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```