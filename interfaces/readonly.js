"use strict";
var p1 = { x: 10, y: 30 };
// error TS2540: Cannot assign to 'x' because it is a constant or a read-only property.
p1.x = 5;
