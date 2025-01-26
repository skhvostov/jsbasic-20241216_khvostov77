function initCarousel() {
  // ваш код...

  let carousel = document.querySelector('.carousel__inner');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let slide = document.querySelector('.carousel__slide');
  let slideWidth = slide.offsetWidth;
  let slideCount = 4;
  let slideIndex = 0;

  arrowLeft.style.display = 'none';

  arrowRight.addEventListener('click', function () {
    slideIndex++;
    if (slideIndex === slideCount - 1) {
      arrowRight.style.display = 'none';
    }
    carousel.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
    arrowLeft.style.display = '';
  });

  arrowLeft.addEventListener('click', function () {
    slideIndex--;
    if (slideIndex === 0) {
      arrowLeft.style.display = 'none';
    }
    carousel.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
    arrowRight.style.display = '';
  });
}
