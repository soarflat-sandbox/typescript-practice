var ReadOnly;
(function (ReadOnly) {
    var Octopus = /** @class */ (function () {
        function Octopus(name) {
            this.numberOfLegs = 8;
            this.name = name;
        }
        return Octopus;
    }());
    // ↑は以下のようにショートハンドでも書ける
    // class Octopus {
    //   readonly numberOfLegs: number = 8;
    //   constructor(readonly name: string) {
    //     this.name = name;
    //   }
    // }
    var dad = new Octopus('Man with the 8 strong legs');
    // name は読み取り専用なので Error
    // dad.name = 'Man with the 3-piece suit';
})(ReadOnly || (ReadOnly = {}));
