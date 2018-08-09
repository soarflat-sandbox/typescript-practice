namespace TypeVariables {
  // 数値の配列のみ利用できる
  function identity(arg: number[]): number[] {
    console.log(arg.length);
    return arg;
  }

  identity([2, 2, 2]);

  // 文字列の配列のみ利用できる
  function identity2<T>(arg: string[]): string[] {
    console.log(arg.length);
    return arg;
  }

  identity2(['2', '2', '2']);

  // 数値、文字列のどちらの配列も利用できる
  function identity3<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
  }

  identity3<number>([2, 2, 2]);
  identity3<string>(['2', '2', '2']);
}

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

loggingIdentity<string>(['2', '2']);
