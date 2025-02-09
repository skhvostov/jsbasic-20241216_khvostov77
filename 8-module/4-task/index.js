import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product || typeof product !== 'object' || !product.id) {
      return;
    }

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count += 1;
    } else {
      cartItem = {
        product: product,
        count: 1
      };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);
    cartItem.count += amount;
    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    const modal = new Modal();
    modal.setTitle('Your order');
    const modalContent = createElement(`<div></div>`);
    for (let cartItem of this.cartItems) {
      modalContent.append(this.renderProduct(cartItem.product, cartItem.count));
    }
    modalContent.append(this.renderOrderForm());
    modal.setBody(modalContent);
    modal.open();


    modalContent.addEventListener('click', (event) => {
      if (event.target.closest('.cart-counter__button_plus')) {
        const productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, 1);
      }

      if (event.target.closest('.cart-counter__button_minus')) {
        const productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, -1);
      }

      const form = modalContent.querySelector('.cart-form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.onSubmit(event);
      });
    });
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    if (document.body.classList.contains('is-modal-open')) {
      let modalBody = document.querySelector('.modal__body');
      let productId = cartItem.product.id;

      if (cartItem.count === 0) {
        const productElement = modalBody.querySelector(`[data-product-id="${productId}"]`);
        productElement.remove();

        if (this.isEmpty()) {
          document.body.classList.remove('is-modal-open');
          document.querySelector('.modal').remove();
          return;
        }
      } else {
        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

        productCount.innerHTML = cartItem.count;
        productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      }

      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }


    this.cartIcon.update(this);
  }

  onSubmit(event) {
    // ...ваш код
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');

    const form = event.target;
    const formData = new FormData(form);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      const modalElement = document.querySelector('.modal');
      const modalTitle = modalElement.querySelector('.modal__title');
      const modalBody = modalElement.querySelector('.modal__body');

      modalTitle.textContent = 'Success!';
      modalBody.innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked 🙂 <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `;

      this.cartItems = [];
      this.cartIcon.update(this);
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
