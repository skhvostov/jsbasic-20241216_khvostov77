function sumSalary(salaries) {
  // ваш код...
  let result = 0;
  if (Object.entries(salaries).length === 0) {
    return result;
  }
  for (let key in salaries) {
    if (Number.isFinite(salaries[key])) {
      result = result + salaries[key];
    }
  }
  return result;
}
