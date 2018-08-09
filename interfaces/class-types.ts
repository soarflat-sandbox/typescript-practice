interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {}
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
