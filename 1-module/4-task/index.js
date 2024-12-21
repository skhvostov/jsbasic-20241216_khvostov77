function checkSpam(str) {
  // ваш код...
  if (str.toLowerCase().includes('xxx') || str.toLowerCase().includes('1xbet')) {
    return true;
  } else {
    return false;
  }
}
