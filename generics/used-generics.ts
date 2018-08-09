namespace UsedGenerics {
  function identity<T>(arg: T): T {
    return arg;
  }

  // Tをnumber型として実行
  identity<number>(2);

  // Tをstring型として実行
  identity<string>('soarflat');
}
