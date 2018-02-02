var A = /** @class */ (function () {
    function A(t) {
        this.value = t;
    }
    A.prototype.getValue = function () {
        return this.value;
    };
    return A;
}());
var aTypeString = new A('instance of A');
console.log(aTypeString.getValue()); // => instance of A
var aTypeString2 = new A('instance of A');
console.log(aTypeString2.getValue()); // => instance of A
var aTypeNumber = new A(793);
console.log(aTypeNumber.getValue()); // => 793
