function toggleText() {
  // ваш код...
  let btn = document.querySelector('.toggle-text-button');
  let txt = document.querySelector('#text');

  btn.addEventListener('click', () => {
    if (txt.hidden) {
      txt.hidden = false;
    } else {
      txt.hidden = true;
    }
  });
}
