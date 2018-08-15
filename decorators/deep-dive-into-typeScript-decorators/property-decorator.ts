namespace PropertyDecoratorInDeepIntoTypeSriptDecorator {
  /**
   * （プロパティ）デコレータ
   * @param target staticメンバのクラスのコンストラクター関数、またはインスタンスメンバーのクラスのprototype
   * @param key メンバの名前
   */
  function calcCircleParams(target: any, key: string) {
    let _val = this[key];

    const getter = function() {
      return _val;
    };

    const setter = function(newVal) {
      _val = newVal;
      this['Area'] = _val * _val * Math.PI;
      this['Circumference'] = 2 * _val * Math.PI;
    };

    if (delete this[key]) {
      // Create new property with getter and setter
      Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    }
  }

  class Circle {
    // デコレータを宣言する
    // 今回の場合 Radius にデコレータが適用される
    @calcCircleParams
    public Radius: Number;
    public Area: Number;
    public Circumference: Number;
    constructor() {}
  }

  let c = new Circle();

  c.Radius = 3;
  console.log(
    `Radius: ${c.Radius}, Area: ${c.Area}, Circumference: ${c.Circumference}`
  );

  c.Radius = 5;
  console.log(
    `Radius: ${c.Radius}, Area: ${c.Area}, Circumference: ${c.Circumference}`
  );
}
