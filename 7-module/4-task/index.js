export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.slider = this.createSlider();
  }

  get elem() {
    return this.slider;
  }

  onClick = (ev) => {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valueElem = this.elem.querySelector('.slider__value');
    const left = ev.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    const value = Math.round(approximateValue);
    const valuePercents = value / segments * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    valueElem.textContent = value;

    const spans = this.elem.querySelectorAll('.slider__steps span');
    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.remove('slider__step-active');
    }
    spans[value].classList.add('slider__step-active');

    let event = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  };

  onPointermove = (mousemoveEvent) => {
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const valueElem = this.elem.querySelector('.slider__value');

    let left = this.calcLeft(mousemoveEvent);
    let value = Math.round((this.steps - 1) * left);
    valueElem.textContent = value;

    this.value = value;


    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;

    let valuePercents = left * 100;

    if (leftRelative < 0) {
      leftRelative = 0;
    } else if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = valuePercents;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;


    let spans = this.elem.querySelectorAll('.slider__steps span');
    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.remove('slider__step-active');
    }
    spans[value].classList.add('slider__step-active');

    let event = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);

  };

  onPointerdown = () => {
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.style.position = 'absolute';
    thumb.style.zIndex = 1000;
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointerup', this.onPointerup);
  };

  onPointerup = () => {
    document.removeEventListener('pointermove', this.onPointermove);
    document.removeEventListener('pointerup', this.onPointerup);
    this.elem.classList.remove('slider_dragging');

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  };

  calcLeft = (event) => {
    let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
    if (newLeft < 0) { newLeft = 0; }
    if (newLeft > 1) { newLeft = 1; }
    return newLeft;
  };

  createSlider() {
    const sliderElement = document.createElement('div');
    sliderElement.classList.add('slider');
    sliderElement.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
      </div>
        `;

    const sliderSteps = sliderElement.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement('span');
      sliderSteps.append(step);
    }

    sliderSteps.querySelector('span').classList.add('slider__step-active');

    const thumb = sliderElement.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    const progress = sliderElement.querySelector('.slider__progress');
    const valueElem = sliderElement.querySelector('.slider__value');

    document.addEventListener('pointermove', this.onPointermove);

    sliderElement.addEventListener('click', this.onClick);

    thumb.addEventListener('pointerdown', this.onPointerdown);

    return sliderElement;
  }
}
