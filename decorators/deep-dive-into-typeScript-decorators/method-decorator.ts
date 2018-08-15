namespace MethodDecoratorInDeepIntoTypeSriptDecorator {
  /**
   * （メソッド）デコレータ
   * @param target staticメンバのクラスのコンストラクター関数、またはインスタンスメンバーのクラスのprototype
   * @param key メンバの名前
   * @param descriptor メンバのプロパティディスクリプタ
   */
  function log(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(`${key} was called!`);
  }

  class P {
    // デコレータを宣言する
    @log
    foo() {
      console.log(`Do something`);
    }
  }

  const p = new P();
  p.foo();
  // => foo was called!
  // => Do something
}
