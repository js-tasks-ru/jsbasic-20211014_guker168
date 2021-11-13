import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`<div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
  </div>`);
  }

  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.elem);
  }

  setTitle(titleInner) {
    let title = this.elem.querySelector(".modal__title");
    title.innerHTML = titleInner;
  }

  setBody(bodyInner) {
    let body = this.elem.querySelector(".modal__body");
    body.innerHTML = null;
    body.append(bodyInner);
  }

  close() {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
  }

  addEventListeners() {
    this.elem.onclick = ({ target }) => {
      if (target.closest(".modal__close")) {
        this.close();
        this.elem.remove();
      }
    };
    let escFunc = (event) => {
      if (event.code === "Escape") {
        this.close();
        document.removeEventListener("keydown", escFunc);
      }
    };
    document.addEventListener("keydown", escFunc);
  }
}