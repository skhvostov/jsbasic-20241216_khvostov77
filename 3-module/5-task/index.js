function getMinMax(str) {
  // ваш код...
  let arr = str.split(' ');
  let nums = arr.filter(num => !isNaN(Number(num)));
  let result = {
    min: Math.min(...nums),
    max: Math.max(...nums)
  };
  return result;
}
