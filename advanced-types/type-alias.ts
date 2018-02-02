// number型とstring型を参照する
type NumberOrString = number | string;

const x: NumberOrString = 10;
const y: NumberOrString = '10';

// NumberOrStringはnumber型とstring型しか参照していないためエラー
const z: NumberOrString = true;