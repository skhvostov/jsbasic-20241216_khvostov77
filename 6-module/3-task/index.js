import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.carousel = this.createCarousel();
  }

  get elem() {
    return this.carousel;
  }

  createCarousel() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
          <div class="carousel__inner">
        </div>
      </div>
    `
    );

    let carouselInner = carousel.querySelector('.carousel__inner');
    for (let slide of this.slides) {
      let slideElem = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `
      );

      let productAddButton = slideElem.querySelector('.carousel__button');
      productAddButton.addEventListener('click', () => {
        let event = new CustomEvent('product-add', {
          bubbles: true,
          detail: slide.id
        });
        productAddButton.dispatchEvent(event);
      });

      carouselInner.append(slideElem);
    }

    let arrowRight = carousel.querySelector('.carousel__arrow_right');
    let arrowLeft = carousel.querySelector('.carousel__arrow_left');
    let slideCount = this.slides.length;
    let slideIndex = 0;

    arrowLeft.style.display = 'none';

    arrowRight.addEventListener('click', function () {
      let slideWidth = carouselInner.querySelector('.carousel__slide').offsetWidth;
      slideIndex++;
      if (slideIndex === slideCount - 1) {
        arrowRight.style.display = 'none';
      }
      carouselInner.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
      arrowLeft.style.display = '';
    });

    arrowLeft.addEventListener('click', function () {
      let slideWidth = carouselInner.querySelector('.carousel__slide').offsetWidth;
      slideIndex--;
      if (slideIndex === 0) {
        arrowLeft.style.display = 'none';
      }
      carouselInner.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
      arrowRight.style.display = '';
    });

    return carousel;
  }
}
