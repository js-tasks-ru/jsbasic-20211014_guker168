function showSalary(users, age) {
  let filteredUsers = users.filter((el) => {
    if (el.age <= age) {
      return true;
    } else {
      return false;
    }
  });
  return filteredUsers
    .map((el, index, arr) => {
      if (index === arr.length - 1) {
        return `${el.name}, ${el.balance}`;
      } else {
        return `${el.name}, ${el.balance}\n`;
      }
    })
    .join("");
}
