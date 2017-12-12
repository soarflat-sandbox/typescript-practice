class Animal {
  private name: string;

  constructor(theName: string) {
    this.name = theName;
  }
}

// エラーが発生する
console.log(new Animal('Cat').name);
