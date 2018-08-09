namespace Private {
  class Animal {
    private name: string;

    constructor(theName: string) {
      this.name = theName;
    }
  }

  // Error
  // console.log(new Animal('Cat').name);
}
