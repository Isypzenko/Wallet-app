import View from "./View";

class SideBarView extends View {
  insertMarkUp(handler) {
    const sideBar = document.querySelector(".side-bar");
    if (!sideBar) {
      const markup = this.generateMarkup();
      this._parent.insertAdjacentHTML("afterbegin", markup);
      this.setHandlersSideBar(handler);
    } else {
      sideBar.classList.toggle("hidden");
    }
  }
  setHandlersSideBar(handler) {
    const categories = document.querySelector(".categories");
    const planning = document.querySelector(".planning");
    const converter = document.querySelector(".converter");
    const logout = document.querySelector(".logout");
    const mainPage = document.querySelector(".main-page");
    handler(mainPage, "main-page");
    handler(categories, "categories");
    handler(planning, "planning");
    handler(converter, "converter");
    handler(logout, "logout");
  }
  generateMarkup() {
    return `<div class="side-bar  max-w-[200px] hidden flex justify-center" role="dialog" aria-modal="true">
    <div class="z-10 w-96 overflow-hidden px-6">
      <div class="flow-root">
        <div
          class="-my-6 divide-y sm:text-left text-center divide-gray-500/10"
        >
          <div class="space-y-2 py-6">
              <button class="-mx-3 block main-page rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900">
              Main Page
              </button>
              <button
                class="-mx-3 block planning rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
              >
                Planning
              </button>
            <button
              class="-mx-3 block categories rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
              >Categories</
            >
            <button
              class="-mx-3 converter block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
              >Converter</
            >
          </div>
          <div class="py-6">
            <button
              class="-mx-3 logout block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900"
              >Log out</
            >
          </div>
        </div>
      </div>
    </div>
  </div>`;
  }
}

export default new SideBarView();
