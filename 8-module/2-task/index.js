import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.productGrid = this.createProductGrid();
  }

  get elem() {
    return this.productGrid;
  }

  createProductGrid() {
    const productGrid = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
      `);

    const productGridInner = productGrid.querySelector('.products-grid__inner');

    for (let product of this.products) {
      let productCard = new ProductCard(product);
      productGridInner.append(productCard.elem);
    }

    return productGrid;
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.updateProducts();
  }

  updateProducts() {
    const productGridInner = this.productGrid.querySelector('.products-grid__inner');
    productGridInner.innerHTML = '';

    const filteredProducts = this.products.filter(product => this.filterProduct(product));
    for (let product of filteredProducts) {
      let productCard = new ProductCard(product);
      productGridInner.append(productCard.elem);
    }
  }

  filterProduct(product) {
    const { noNuts, vegeterianOnly, maxSpiciness, category } = this.filters;

    if (noNuts && product.nuts) {
      return false;
    }

    if (vegeterianOnly && !product.vegeterian) {
      return false;
    }

    if (maxSpiciness !== undefined && product.spiciness > maxSpiciness) {
      return false;
    }

    if (category && product.category !== category) {
      return false;
    }

    return true;
  }
}
