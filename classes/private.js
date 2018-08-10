var Private;
(function (Private) {
    var Animal = /** @class */ (function () {
        function Animal(theName) {
            this.name = theName;
        }
        return Animal;
    }());
    // Error
    // console.log(new Animal('Cat').name);
})(Private || (Private = {}));
