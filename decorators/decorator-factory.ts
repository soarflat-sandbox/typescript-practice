// decorator factory
function f() {
  console.log('f(): evaluated');
  // decorator
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('f(): called');
  };
}

// decorator factory
function g() {
  console.log('g(): evaluated');
  // decorator
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('g(): called');
  };
}

class C {
  @f()
  @g()
  method() {}
}

// 各デコレータの式は上から下に向かって評価される
// また、その結果は下から上へ関数として呼び出される
// そのため、console.logの出力は以下のようになる
// f(): evaluated
// g(): evaluated
// g(): called
// f(): called
