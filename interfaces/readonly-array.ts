const a: number[] = [1, 2, 3, 4];
// `ReadonlyArray<T>`型は変更処理を行う全てのメソッドが削除された`Array<T>`と同義
// そのため、`ReadonlyArray<number>`を指定すると、配列が読み取り専用になる
const ro: ReadonlyArray<number> = a;

// 以下は全てエラーが発生する
ro[0] = 12;
ro.push(5);
ro.length = 100;
a = ro;
