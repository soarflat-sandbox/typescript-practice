namespace ReadOnly {
  class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(name: string) {
      this.name = name;
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
}
