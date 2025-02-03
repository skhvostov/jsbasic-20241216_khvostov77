export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.slider = this.createSlider();
  }

  get elem() {
    return this.slider;
  }

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

    sliderElement.addEventListener('click', (ev) => {
      const left = ev.clientX - sliderElement.getBoundingClientRect().left;
      const leftRelative = left / sliderElement.offsetWidth;
      const segments = this.steps - 1;
      const approximateValue = leftRelative * segments;
      const value = Math.round(approximateValue);
      const valuePercents = value / segments * 100;

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      valueElem.textContent = value;

      const spans = sliderElement.querySelectorAll('.slider__steps span');
      for (let i = 0; i < spans.length; i++) {
        spans[i].classList.remove('slider__step-active');
      }
      spans[value].classList.add('slider__step-active');

      let event = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true,
      });
      sliderElement.dispatchEvent(event);
    });

    thumb.addEventListener('pointerdown', () => {
      thumb.style.position = 'absolute';
      thumb.style.zIndex = 1000;
      sliderElement.classList.add('slider_dragging');

      let onMouseMove = (mousemoveEvent) => {
        // sliderElement.classList.add('slider_dragging');

        let left = mousemoveEvent.clientX - sliderElement.getBoundingClientRect().left;
        let leftRelative = left / sliderElement.offsetWidth;
        let segments = this.steps - 1;
        let approximateValue = leftRelative * segments;
        let value = Math.round(approximateValue);

        if (leftRelative < 0) {
          leftRelative = 0;
        } else if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        valueElem.textContent = value;

        let spans = sliderElement.querySelectorAll('.slider__steps span');
        for (let i = 0; i < spans.length; i++) {
          spans[i].classList.remove('slider__step-active');
        }
        spans[value].classList.add('slider__step-active');

        let event = new CustomEvent('slider-change', {
          detail: value,
          bubbles: true,
        });
        sliderElement.dispatchEvent(event);
      };
      document.addEventListener('pointermove', onMouseMove);

      document.addEventListener('pointerup', () => {
        document.removeEventListener('pointermove', onMouseMove);
        document.onpointerup = null;
        sliderElement.classList.remove('slider_dragging');
      });
    });

    return sliderElement;
  }
}
