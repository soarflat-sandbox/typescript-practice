namespace Public {
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
}
