"use strict";
var Clock = /** @class */ (function () {
    function Clock() {
    }
    return Clock;
}());
var mySearch;
// SearchFuncの型チェックが行われる
mySearch = function (src, sub) {
    var result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
