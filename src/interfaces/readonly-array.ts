const a: number[] = [1, 2, 3, 4];
const ro: ReadonlyArray<number> = a;

// 以下は全てエラーが発生する
ro[0] = 12;
ro.push(5);
ro.length = 100;
a = ro;