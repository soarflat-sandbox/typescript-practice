namespace FunctionType {
  // 名前付き関数
  function add(x: number, y: number): string {
    return String(x + y);
  }
  add(1, 2); // OK
  add('1', '2'); // 数値以外は渡せないのでエラー

  // 無名関数
  const add2 = function(x: number, y: number): string {
    return String(x + y);
  };
  add2(1, 2); // OK
  add2('1', '2'); // 数値以外は渡せないのでエラー
}
