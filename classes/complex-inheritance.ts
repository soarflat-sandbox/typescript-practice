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
