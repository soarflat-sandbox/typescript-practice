"use strict";
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    return Animal;
}());
// エラーが発生する
console.log(new Animal('Cat').name);
