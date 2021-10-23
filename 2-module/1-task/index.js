function sumSalary(salaries) {
  let res = 0;
  for (let key in salaries) {
    if (typeof salaries[key] === 'number') {
      if (!isNaN(salaries[key]) && salaries[key] !== Infinity && salaries[key] !== -Infinity) {
        res += salaries[key];
      }
    }
  }
  return res;
}
