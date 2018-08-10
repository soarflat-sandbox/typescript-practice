var UsedGenerics;
(function (UsedGenerics) {
    function identity(arg) {
        return arg;
    }
    // Tをnumber型として実行
    identity(2);
    // Tをstring型として実行
    identity('soarflat');
})(UsedGenerics || (UsedGenerics = {}));
