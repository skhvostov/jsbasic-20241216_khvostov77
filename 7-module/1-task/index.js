import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.ribbonMenu = this.createRibbonMenu();
  }

  get elem() {
    return this.ribbonMenu;
  }

  createRibbonMenu() {
    const ribbonMenu = createElement(`
  <div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `);

    const ribbonInner = ribbonMenu.querySelector('.ribbon__inner');
    for (let category of this.categories) {
      const categoryLink = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
      `);
      ribbonInner.append(categoryLink);

      categoryLink.addEventListener('click', (ev) => {
        ev.preventDefault();
        const activeItem = ribbonInner.querySelector('.ribbon__item_active');
        if (activeItem) {
          activeItem.classList.remove('ribbon__item_active');
        }
        categoryLink.classList.add('ribbon__item_active');
        let event = new CustomEvent('ribbon-select', {
          detail: category.id,
          bubbles: true,
        });
        categoryLink.dispatchEvent(event);
      });
    }

    const ribbonArrowLeft = ribbonMenu.querySelector('.ribbon__arrow_left');
    const ribbonArrowRight = ribbonMenu.querySelector('.ribbon__arrow_right');

    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    ribbonArrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);

      if (scrollLeft === 0) {
        ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
      }
      ribbonArrowRight.classList.add('ribbon__arrow_visible');
    });

    ribbonArrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);

      if (scrollRight < 1) {
        ribbonArrowRight.classList.remove('ribbon__arrow_visible');
      }
      ribbonArrowLeft.classList.add('ribbon__arrow_visible');
    });

    return ribbonMenu;
  }
}
