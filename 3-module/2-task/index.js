function filterRange(arr, a, b) {
  return arr.filter((el) => {
    if (el >= a && el <= b) {
      return true;
    } else {
      return false;
    }
  });
}
