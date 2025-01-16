function filterRange(arr, a, b) {
  // ваш код...
  return arr.filter(num => (num >= a && num <= b) || (num >= b && num <= a));
}
