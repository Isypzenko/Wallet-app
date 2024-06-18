export default class View {
  _date;
  _parent = document.querySelector("main");
  _header = document.querySelector("header");
  _messageError = "Something went wrong !";
  _renderParentElement() {
    this.clear();
    const markup = this.generateMarkup();
    this._parent.insertAdjacentHTML("afterbegin", markup);
  }
  clear() {
    this._parent.innerHTML = "";
  }
  clearInput(...inputs) {
    inputs.forEach((item) => (item.value = ""));
  }
  renderError(message = this._messageError) {
    const markup = this.generateMarkup(message);
    this.clear();
    this._parent.insertAdjacentHTML("afterbegin", markup);
  }
  generateErrorInputMessage(message) {
    return `<span class="flex input-error-container items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
    ${message}
  </span>`;
  }
  addErrorColorInput(message, element) {
    if (element.classList.contains("border-red-500")) return;
    const markup = this.generateErrorInputMessage(message);
    element.classList.add("border-1", "border-red-500");
    element.closest("div").insertAdjacentHTML("beforeend", markup);
  }
  removeErrorColorInput(element) {
    element.classList.remove("border-red-500");
    const error = element
      .closest("div")
      .querySelector(".input-error-container");
    if (error) error.remove();
  }
  generateMarkup(date) {
    return `
        <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <div>
        <span class="font-medium">${date}</span>
      </div>
    </div>
    `;
  }
  update() {
    const newMarkup = this.generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parent.querySelectorAll("*"));

    curElements.forEach((curEl, i) => {
      const newEl = newElements[i];

      // Updates changed TEXT
      if (!newEl) {
        curEl.innerHTML = "";
        return;
      }
      if (curEl != newEl) {
        curEl.innerHTML = newEl.innerHTML;
      }
    });
  }
}
