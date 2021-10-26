function getMinMax(str) {
  let arr = str.split(" ");
  let numArr = arr
    .filter((el) => {
      if (isNaN(parseInt(el))) {
        return false;
      } else {
        return true;
      }
    })
    .map((el) => +el);
  let min = Math.min(...numArr);
  let max = Math.max(...numArr);
  return {
    min: min,
    max: max,
  };
}
