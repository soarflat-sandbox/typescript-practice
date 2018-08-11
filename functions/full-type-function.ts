namespace FullTypeFunction {
  // 完全な関数の型
  const add: (baseValue: number, increment: number) => number = function(
    x: number,
    y: number
  ): number {
    return x + y;
  };

  // ↑のaddは以下のように記述することもできる
  const add2: (baseValue: number, increment: number) => number = function(
    x,
    y
  ) {
    return x + y;
  };
}
