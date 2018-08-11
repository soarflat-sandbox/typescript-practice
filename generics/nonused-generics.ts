namespace NonusedGenerics {
  function identity(arg: number): number {
    return arg;
  }

  // OK
  identity(2);

  // 文字列を渡しているのでError
  // identity('soarflat');

  function identity2(arg: string): string {
    return arg;
  }

  // OK
  identity2('soarflat');

  // 数値を渡しているのでError
  // identity2(2);
}

function identity<T>(arg: T): T {
  return arg;
}
let myIdentity: { <T>(arg: T): T } = identity;
