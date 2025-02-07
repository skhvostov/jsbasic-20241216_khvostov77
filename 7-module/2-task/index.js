import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.createModal();
  }

  createModal() {
    const modal = createElement(`
      <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
          </h3>
        </div>

        <div class="modal__body">
        </div>
      </div>
    </div>
    `);

    modal.querySelector('.modal__close').addEventListener('click', () => this.close());

    return modal;
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');

    this.escKey = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };

    document.addEventListener('keydown', this.escKey);
  }

  setTitle(title) {
    const modalTitle = this.modal.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody(node) {
    const modalBody = this.modal.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.escKey);
  }
}
