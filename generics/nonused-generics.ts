namespace NonusedGenerics {
  function identity(arg: number): number {
    return arg;
  }

  identity(2);

  // 文字列を渡しているのでError
  // identity('soarflat');

  function identity2(arg: string): string {
    return arg;
  }

  identity2('soarflat');

  // 数値を渡しているのでError
  // identity2(2);
}
