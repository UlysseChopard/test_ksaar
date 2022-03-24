const closestToZero = (arr) => {
  if (!arr || !arr.length) {
    return 0;
  }

  return arr.reduce((closest, num) => {
    const absVal = Math.abs(num);
    const absClosest = Math.abs(closest);
    if (absVal < absClosest || (absVal === absClosest && closest < 0)) {
      return num;
    } else {
      return closest;
    }
  });
};

let items = [7, -10, 13, 8, 4, -7.2, -12, -3.7, 3.5, -9.6, 6.5, -1.7, -6.2, 7];
// Result: -1.7
console.log("Result: " + closestToZero(items));

items = [5, 6, 7, 9, 2, -2];
// Result: 2
console.log("Result: " + closestToZero(items));

items = [];
// Result: 0
console.log("Result: " + closestToZero(items));

// Result: 0
items = undefined;
console.log("Result: " + closestToZero(items));
