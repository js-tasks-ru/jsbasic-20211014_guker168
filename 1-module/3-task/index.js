function ucFirst(str) {
  let firstChar = str[0];
  if (firstChar === undefined) {
    return str;
  }
  return firstChar.toUpperCase() + str.slice(1);

}
