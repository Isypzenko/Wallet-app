import View from "./View";

class CategoriesPage extends View {
  _parent = document.querySelector(".content");
  generateMarkup() {
    return `
    <div
    class="categories-page w-full flex-col mt-6 pr-5"
  >
    <div class="container-limit flex flex-row justify-center">
      <div class="change-limit mr-24">
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Change the limit</label
        >
        <div>
        <select
          id="categories"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Select category</option>
        </select>
        </div>
        <div class="mt-5">
          <label
            for="price"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Limit</label
          >
          <div class="relative mt-2 rounded-md shadow-sm">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            ></div>
            <input
              type="text"
              name="price"
              id="limit-change"
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />
            <div class="absolute h-[36px] inset-y-0 right-0 flex items-center">
              <label for="currency" class="sr-only">Currency</label>
              <select
                id="currency-change"
                name="currency"
                class="h-[36px] rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option>USD</option>
                <option>UAH</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="change-limit mt-2 focus:outline-none text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          CHANGE LIMIT
        </button>
      </div>
      <div class="create-category flex flex-col">
        <div class="mb-4">
          <label
            for="price"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Title</label
          >
          <div class="relative mt-2 rounded-md shadow-sm">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            ></div>
            <input
              type="text"
              name="category-name"
              id="category-name"
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Food"
            />
          </div>
        </div>

        <div>
          <label
            for="price"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Limit</label
          >
          <div class="relative mt-2 rounded-md shadow-sm">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            ></div>
            <input
              type="text"
              name="price"
              id="limit"
              class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />
            <div class="absolute  h-[36px] inset-y-0 right-0 flex items-center">
              <label for="currency" class="sr-only">Currency</label>
              <select
                id="currency"
                name="currency"
                class="h-[36px] rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option>USD</option>
                <option>UAH</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="button"
          class="add-category mt-2 focus:outline-none text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          ADD CATEGORY
        </button>
      </div>
    </div>
    <div class="category-list flex flex-col justify-center items-center p-5">
    <div class="text-3xl m-3">CATEGORY LIST</div>
      <div class="category-container w-[100%] flex flex-col ">
      </div>
    </div>
  </div>`;
  }
  generateCategoryMarkUp(limit, title, id, currency) {
    return `
    <div class="flex justify-between text-2xl mt-4">
            <div class="category-name w-[200px]" data-id='${id}'>${title}</div>
            <div class="category-limit w-[200px]" data-category='${title}'>${limit} ${currency}</div>
            <button class="transaction-delete delete-category">DELETE</button>
        </div>
    `;
  }
  createEmptyListMessage() {
    const element = document.querySelector(".empty-message");
    if (element) {
      element.classList.remove("hidden");
      return;
    }
    const createdElement = `<div class="text-3xl m-3 empty-message text-center">There are not any categories yet.</div>`;
    const list = document.querySelector(".category-container");
    list.insertAdjacentHTML("afterbegin", createdElement);
    return;
  }
  hideEmptyMessage() {
    const el = document.querySelector(".empty-message");
    el?.classList.add("hidden");
  }
  renderCategoryList(list) {
    if (list.length == 0) {
      this.createEmptyListMessagel;
      return;
    }
    list.forEach((element) => {
      if (element.info.title) {
        this.addCategoryToListOnPage(
          element.info.limit,
          element.info.title,
          element.id,
          element.info.currency
        );
        this.addCategoryToSelectList(element.info.title);
      }
    });
  }
  setHandlerDeleteCategory(handler) {
    const btnDelete = document.querySelector("div.category-container");
    btnDelete.addEventListener("click", function (e) {
      if (e.target.classList.contains("delete-category")) {
        const categoryElement = e.target
          .closest("div")
          .querySelector("div[data-id]");
        handler(categoryElement);
        e.target.closest("div").remove();
      }
    });
  }
  setHandlerChangeLimit(handler) {
    const btnChangeLimit = document.querySelector("button.change-limit");
    const selectedCategory = document.querySelector("#categories");
    const newLimit = document.querySelector("#limit-change");
    const newCurrency = document.querySelector("#currency-change");
    btnChangeLimit.addEventListener("click", function () {
      handler(selectedCategory, newLimit, newCurrency);
    });
  }
  setNewLimitInCategoryList(limit, title, currency) {
    const categoryListElement = document.querySelector(
      `div[data-category='${title}']`
    );
    categoryListElement.textContent = `${limit} ${currency}`;
  }
  addCategoryToListOnPage(limit, title, id, currency) {
    const containerCategory = document.querySelector(".category-container");
    const markupCategory = this.generateCategoryMarkUp(
      limit,
      title,
      id,
      currency
    );
    containerCategory.insertAdjacentHTML("afterbegin", markupCategory);
  }
  createNewCategory(handler) {
    const btnAddCategory = document.querySelector(".add-category");
    const selectCurrency = document.querySelector("#currency");
    const inputLimit = document.querySelector("input#limit");
    const categoryName = document.querySelector("input#category-name");
    btnAddCategory.addEventListener("click", function () {
      handler(inputLimit, selectCurrency, categoryName);
    });
  }
  addCategoryToSelectList(title) {
    const select = document.querySelector("#categories");
    const markup = `<option value="${title}">${title}</option>`;
    select.insertAdjacentHTML("beforeend", markup);
  }
  setHandlerSetLimitToInput(handler) {
    const selectLimit = document.querySelector("#categories");
    selectLimit.addEventListener("change", function () {
      handler(this.value);
    });
  }
  setLimitToInput(limit) {
    const inputChangeLimit = document.querySelector("#limit-change");
    inputChangeLimit.value = limit;
  }
}

export default new CategoriesPage();
