// 引数`source`が文字列型、引数`subString`が文字列型
// 戻り値が真偽値方のFunction 型のインターフェイスを宣言する
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
// SearchFuncの型チェックが行われる
mySearch = function(src, sub) {
  let result = src.search(sub);

  if (result == -1) {
    return false;
  } else {
    return true;
  }
};
