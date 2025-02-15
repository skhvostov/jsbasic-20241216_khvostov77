import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor(slides, categories) {
    this.slides = slides;
    this.categories = categories;
    this.carousel = null;
    this.ribbonMenu = null;
    this.stepSlider = null;
    this.cartIcon = null;
    this.cart = null;
    this.productsGrid = null;
    this.products = null;

  }

  async render() {
    // ... ваш код

    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    const response = await fetch('products.json');
    const products = await response.json();

    const productsGridHolder = document.querySelector('[data-products-grid-holder]');
    productsGridHolder.innerHTML = '';
    this.productsGrid = new ProductsGrid(products);
    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    this.addEventListeners();

    return Promise.resolve();
  }

  addEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      const productId = event.detail;
      this.cart.addProduct(productId);
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      const spiciness = event.detail;
      this.productsGrid.updateFilter({
        maxSpiciness: spiciness
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      const categoryId = event.detail;
      this.productsGrid.updateFilter({
        category: categoryId
      });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });
  }
}
