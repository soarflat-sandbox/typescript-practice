"use strict";
/**
 * Boolean 真偽値のデータ型
 */
var isDone = false;
/**
 * Number数値（浮動小数点値）のデータ型
 */
var decimal = 6;
var hex = 0xf00d;
var binary = 10;
var octal = 484;
/**
 * String 文字列のデータ型。文字列は`"`か`'`で囲む
 */
var color = 'blue';
/**
 * Array 配列のデータ型。配列の型の宣言方法を２つある。
 */
// 1.`[]`の前に型を宣言するもの。
var list = [1, 2, 3];
// 2.`Array<型>`のように宣言するもの。
var list2 = [1, 2, 3];
/**
 * Tuple タプル型。指定した型の要素を持つ配列を宣言する。
 */
var tuple;
// OK
tuple = ['hello', 10];
// エラーが出力される
// tuple = [10, 'hello'];
// 型を宣言した要素にアクセスした際に、その要素が正しい振る舞いをしているかどうかもチェックしてくれる。
// OK
console.log(tuple[0].substr(1));
// x[1]には数値の型を宣言しているため、文字列のsubstr()が実行されることはありえない
// そのため、エラーが出力される
// console.log(tuple[1].substr(1));
// 型を宣言していないインデックスにアクセスする場合、`Union types`（詳細は後述）が利用される。
// 今回（`let tuple: [string, number];`）の場合、インデックス 2 以降が`Union types`
// 文字列なのでOK
tuple[2] = 'world';
// 文字列でも数値でもないため、エラーが発生する
// tuple[3] = true;
/**
 * Enum 列挙型。一連の定数を分かりやすく管理できる。
 */
