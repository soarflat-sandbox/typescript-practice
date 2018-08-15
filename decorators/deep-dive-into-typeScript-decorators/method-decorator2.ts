namespace MethodDecoratorInDeepIntoTypeSriptDecorator2 {
  /**
   * （メソッド）デコレータ
   * @param target staticメンバのクラスのコンストラクター関数、またはインスタンスメンバーのクラスのprototype
   * @param key メンバの名前
   * @param descriptor メンバのプロパティディスクリプタ
   */
  function log(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    // 宣言箇所の引数（今回の場合はfoo(a, b)のa、b)を利用したい場合は
    // 以下のように関数を定義すれば利用できる（argumentsから参照できる）
    descriptor.value = function() {
      console.log(`${key} was called with:`, arguments);

      // 以下のように originalMethod（foo）を apply して返さないと
      // fooの本来の処理が実行されない
      const result = originalMethod.apply(this, arguments);
      return result;
    };

    return descriptor;
  }

  class P {
    // デコレータを宣言する
    @log
    foo(a, b) {
      console.log('a is', a);
      console.log('b is', b);
      console.log(`Do something`);
    }
  }

  const p = new P();
  p.foo('hello', 'world');
  // => foo was called with: { '0': 'hello', '1': 'world' }
  // => Do something
}
