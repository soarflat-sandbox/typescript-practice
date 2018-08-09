namespace GreeterClass {
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

  // 文字列しか渡せないのでError
  // const greeter2 = new Greeter(2);
}
