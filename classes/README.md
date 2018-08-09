# クラス

TypeScript では ES2015 のクラスを利用できる。

以下はクラスの簡単な例。

[greeter-class.ts](./greeter-class.ts)

```ts
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return `Hello, ${this.greeting}`;
  }
}

// OK
const greeter = new Greeter('world');

// 引数には文字列しか渡せないのでError
// const greeter2 = new Greeter(2);
```

このクラスには、`greeting`という名前のプロパティ、`constructor`、および`greet`メソッドという 3 つのメンバがある。

## 継承

TypeScript では、オブジェクト指向の共通のパターンを利用できる。

クラスベースのプログラミングで最も基本的なパターンの 1 つは、継承を利用して新しいクラスを作成するために既存のクラスを拡張できることである。

以下は継承の例。

[inheritance.ts](./inheritance.ts)

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

// 文字列しか渡せないのでError
// dog.move('sfsdf');
```

上記の例は、最も基本的な継承機能を示している。

クラスは、基本クラスからプロパティとメソッドを継承する。ここで`Dog`は、`extends`を利用して`Animal`基本クラスから派生した派生クラスとなる。

派生クラスはしばしばサブクラスと呼ばれ、基本クラスはスーパークラス（基底クラス）と呼ばれることが多い。

### より複雑な継承

以下はより複雑な継承の例。

[complex-inheritance.ts](./complex-inheritance.ts)

```ts
namespace ComplexInheritance {
  class Animal {
    name: string;

    constructor(theName: string) {
      this.name = theName;
    }

    move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
  }

  class Snake extends Animal {
    constructor(name: string) {
      // スーパークラス（Animal）のコンストラクタを実行する
      super(name);
    }
  }

  class Horse extends Animal {
    constructor(name: string) {
      // スーパークラス（Animal）のコンストラクタを実行する
      super(name);
    }

    // スーパークラス（Animal）のmoveメソッドをオーバーライド
    move(distanceInMeters = 45) {
      console.log('Galloping...');
      super.move(distanceInMeters);
    }
  }

  let sam = new Snake('Sammy the Python');
  let tom: Animal = new Horse('Tommy the Palomino');

  sam.move();
  // => Sammy the Python moved 5m.

  tom.move(34);
  // => Galloping...
  // => Tommy the Palomino moved 34m.
}
```

コンストラクタ関数を含む各派生クラスはスーパークラスのコンストラクタを実行する`super()`を必ず呼び出す必要がある。これは TypeScript が強制する重要なルール。

`Horse`には`move`メソッドを定義しているため`Animal`の`move`メソッドはオーバーライドされる。

## アクセス修飾子（public、private、protected）

### public

TypeScript では、各メンバはデフォルトで public（自由にアクセスできる状態）である。

そのため、以下のそれぞれの記述はどちらも同じ動作をする。

[public.ts](./public.ts)

```ts
class Animal {
  name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

console.log(new Animal('Cat').name); // => Cat

class Animal2 {
  public name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

console.log(new Animal2('Cat').name); // => Cat
```

### private

メンバが private の場合、クラスの外部からアクセスできない。

[private.ts](./private.ts)

```ts
namespace Private {
  class Animal {
    private name: string;

    constructor(theName: string) {
      this.name = theName;
    }
  }

  // Error
  console.log(new Animal('Cat').name);
}
```

### protected

private とは異なり、派生クラスのメソッドからアクセスできる。

[protected.ts](./protected.ts)

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

let howard = new Employee('Howard', 'Sales');
// 派生クラスのメソッドなのでnameにアクセスできる
console.log(howard.getElevatorPitch());

// 直接アクセスできないためError
// console.log(howard.name);
```

`constructor`を protected にすることもできる。

[protected-to-constructor.ts](./protected-to-constructor.ts)

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

// Employee は Person のインスタンスのため
// スーパークラスである Person の constructor を実行できる
let howard = new Employee('Howard', 'Sales');

// Person の constructor は protected のため Error
// let john = new Person('John');
```

## 読み取り専用

`readonly`を指定すればプロパティを読み取り専用にできる。

[readonly.ts](./readonly.ts)

```ts
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}

// ↑は以下のようにショートハンドでも書ける
// class Octopus {
//   readonly numberOfLegs: number = 8;
//   constructor(readonly name: string) {
//     this.name = name;
//   }
// }

let dad = new Octopus('Man with the 8 strong legs');

// name は読み取り専用なので Error
// dad.name = 'Man with the 3-piece suit';
```

`constructor(readonly name: string)`のようなショートハンドは`readonly`だけではなく、`private`、`public`なども書ける。

## アクセサ

以下のように getter/setter を利用できる。

[getter-setter.ts](./getter-setter.ts)

```ts
class Employee {
  private _fullName: string = '';
  private _isAdministrator: boolean = false;

  constructor(isAdministrator: boolean) {
    this._isAdministrator = isAdministrator;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (this._isAdministrator) {
      this._fullName = newName;
    } else {
      console.log('Error: You dont have the permission');
    }
  }
}

let employee = new Employee(true);
employee.fullName = 'Bob Smith';
if (employee.fullName) {
  console.log(employee.fullName);
}
```

## Static プロパティ

インスタンスではなく、クラスそのものに属しているメンバを宣言できる。

```ts
class Grid {
  static origin = { x: 0, y: 0 };

  constructor(public scale: number) {}

  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    // static　プロパティにアクセスするために以下のようにクラス名とプロパティを指定する
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
}
let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
```

## Abstract Class（抽象クラス）

継承されることを前提としたスーパークラス。そのため、抽象クラスは直接インスタンス化できない。

抽象クラスのコンストラクタ内に抽象メソッドも定義できる。

```ts
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log(`Department name: ${this.name}`);
  }

  // 抽象メソッド
  abstract printMeeting(): void;
}

class AccountingDepartment extends Department {
  constructor() {
    // 継承したクラスのコンストラクタ内で`super()`を必ず呼ばなけれいけない
    super('Accounting and Auditing');
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
    console.log('Generating accounting reports...');
  }
}

// 抽象型への参照を生成
let department: Department;

// 抽象クラスは直接インスタンス化できないためError
// department = new Department();

// 非抽象のサブクラスを生成する
department = new AccountingDepartment();

department.printName();
department.printMeeting();

// 抽象クラスで定義されていないためError
// department.generateReports();
```

## 高度なテクニック

### コンストラクタ関数

### インターフェースとしてクラスを使用
