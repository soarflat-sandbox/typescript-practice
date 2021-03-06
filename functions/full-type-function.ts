namespace FullTypeFunction {
  const add: (x: number, y: number) => string = function(x, y) {
    return String(x + y);
  };
  add(1, 2); // OK
  add('1', '2'); // 数値以外は渡せないのでエラー

  // ↑は型推論が有効になっているため、以下の記述と同じ（無名関数の型が暗黙的に宣言されている）
  const add2: (x: number, y: number) => string = function(
    x: number,
    y: number
  ): string {
    return String(x + y);
  };
  add2(1, 2); // OK
  add2('1', '2'); // 数値以外は渡せないのでエラー
}
