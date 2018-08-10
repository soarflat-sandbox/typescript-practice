var Public;
(function (Public) {
    var Animal = /** @class */ (function () {
        function Animal(theName) {
            this.name = theName;
        }
        return Animal;
    }());
    console.log(new Animal('Cat').name); // => Cat
    var Animal2 = /** @class */ (function () {
        function Animal2(theName) {
            this.name = theName;
        }
        return Animal2;
    }());
    console.log(new Animal2('Cat').name); // => Cat
})(Public || (Public = {}));
