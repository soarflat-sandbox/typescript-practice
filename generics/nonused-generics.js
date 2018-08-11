var NonusedGenerics;
(function (NonusedGenerics) {
    function identity(arg) {
        return arg;
    }
    // OK
    identity(2);
    // 文字列を渡しているのでError
    // identity('soarflat');
    function identity2(arg) {
        return arg;
    }
    // OK
    identity2('soarflat');
    // 数値を渡しているのでError
    // identity2(2);
})(NonusedGenerics || (NonusedGenerics = {}));
function identity(arg) {
    return arg;
}
var myIdentity = identity;
