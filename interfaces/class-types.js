var ClassTypes;
(function (ClassTypes) {
    var Clock = /** @class */ (function () {
        function Clock(h, m) {
        }
        Clock.prototype.setTime = function (d) {
            this.currentTime = d;
        };
        return Clock;
    }());
})(ClassTypes || (ClassTypes = {}));
