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

## 継承
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

## アクセス修飾子（public、private、protected）

### public
TypeScriptでは、各メンバはデフォルトでpublic（自由にアクセスできる状態）である。

そのため、以下のそれぞれの記述はどちらも同じ動作をする。

```ts
class Animal {
  name: string;

  constructor(theName: string) {
    this.name = theName
  }
}

console.log(new Animal('Cat').name); // => Cat
```

```ts
class Animal {
  public name: string;

  public constructor(theName: string) {
    this.name = theName
  }
}

console.log(new Animal('Cat').name); // => Cat
```

### private
メンバがprivateの場合、クラスの外部からアクセスできない。

```ts
class Animal {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

// エラーが発生する
console.log(new Animal('Cat').name);
```

### protected
privateとは異なり、派生クラスのメソッドからアクセスできる。

```ts
class Person {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
// 派生クラスのメソッドなのでnameにアクセスできる
console.log(howard.getElevatorPitch());

// エラーが発生する
console.log(howard.name);
```

`constructor`をprotectedにすることもできる。

```ts
class Person {
  protected name: string;

  protected constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

// Personのインスタンスのため、Personのconstructorを実行できる。
let howard = new Employee('Howard', 'Sales');

// Personのconstructorはprotectedのためエラーが発生する
let john = new Person('John');
```

## 読み取り専用

## アクセサ

## Staticプロパティ

## Abstract Class（抽象クラス）

