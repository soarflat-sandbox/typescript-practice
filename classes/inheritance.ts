namespace Inheritance {
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
}
