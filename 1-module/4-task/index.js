function checkSpam(str) {
  // let regExp = new RegExp('1xbet|xxx', 'gi');
  // return regExp.test(str);
  let lowerStr = str.toLowerCase();
  return lowerStr.includes('1xbet') || lowerStr.includes('xxx');
}
