import View from "./View";

class PlanningView extends View {
  _parent = document.querySelector(".content");
  generateMarkup() {
    return `<div class="w-full planning-page flex flex-col items-center">
    <div
      class="w-[300px] mt-20 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
    >
      <div class="h-2.5 w-[0px] status-bar rounded-full dark:bg-indigo-500"></div>
      <div class="text-center text-xl percent-limit">Limit</div>
    </div>
    <div class="convert-currency mt-12">
      <label
        for="price"
        class="block text-lg font-medium leading-6 text-xl text-gray-900"
        >Select category</label
      >
      <select
        class="bg-gray-50 category-list mt-3 border pr-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Select category</option>
      </select>

      <button
      type="button"
      class="refresh-limit mt-2 focus:outline-none text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
    >
    REFRESH
    </button>
    </div>
    <hr
      class="h-px my-8 w-[80%] opacity-20 bg-gray-200 border-0 dark:bg-gray-700"
    />

    <div class="add-record w-[40%]">
    <div>  
    <label
        for="price"
        class="block text-lg font-medium leading-6 text-gray-900"
        >Add a record</label
      >
      <select
        id="categories"
        class="bg-gray-50 mt-3 border pr-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Select category</option>
      </select>
      </div>
      <div>
      <label
        for="price"
        class="block mt-3 text-lg font-medium leading-6 text-gray-900"
        >Type</label
      >
      <select
        id="record-type"
        class="bg-gray-50 mt-3 border pr-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Select type</option>
        <option value="income">Income</option>
        <option value="outcome">Outcome</option>
      </select>
      </div>
      <div class="mb-4">
        <label
          for="record"
          class="block mt-3 text-lg font-medium leading-6 text-gray-900"
          >Record</label
        >
        <div class="relative mt-2 rounded-md shadow-sm">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          ></div>
          <input
            type="number"
            name="record"
            class="block record-sum w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            min="0" max="1000000" step="10" placeholder="0.00" 
          />
        </div>
        <label
          for="record-description"
          class="block mt-3 text-lg font-medium leading-6 text-gray-900"
          >Description</label
        >
        <div class="relative mt-2 rounded-md shadow-sm">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          ></div>
          <input
            type="text"
            name="record-description"
            class="block record-description w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Bought some meet"
          />
        </div>
      </div>
      
    </div>

    <button
      type="button"
      class="add-record focus:outline-none text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
    >
      ADD RECORD
    </button>
  </div>`;
  }
  addHandlerRefreshLimit(handler) {
    const el = document.querySelector(".refresh-limit");
    el.addEventListener("click", function (e) {
      const select = document.querySelector(".category-list");
      handler(select);
    });
  }
  renderPercentLimit(percent) {
    const el = document.querySelector(".percent-limit");
    el.textContent = `${percent} %`;
    const statusBar = document.querySelector(".status-bar");
    statusBar.style.width = `${percent}%`;
  }
  selectCategoryMarkUp(title) {
    return `
    <option value="${title}">${title}</option>
    `;
  }
  setCategoriesToSelectList(categories) {
    const selectCategory = document.querySelector("#categories");
    const selectCategoryLimit = document.querySelector(".category-list");
    categories.forEach((category) => {
      const optionCategoryMarkUp = this.selectCategoryMarkUp(
        category.info.title
      );
      selectCategory.insertAdjacentHTML("beforeend", optionCategoryMarkUp);
      selectCategoryLimit.insertAdjacentHTML("beforeend", optionCategoryMarkUp);
    });
  }
  setHandlerCheckLimit(handler) {
    const select = document.querySelector(".category-list");
    select.addEventListener("change", function (e) {
      handler(select);
    });
  }
  setHandlerAddRecord(handler) {
    const btnAddRecord = document.querySelector("button.add-record");
    const selectCategory = document.querySelector("#categories");
    const selectType = document.querySelector("#record-type");
    const recordSum = document.querySelector(".record-sum");
    const recordDescription = document.querySelector(".record-description");
    btnAddRecord.addEventListener("click", (e) => {
      handler(selectCategory, selectType, recordSum, recordDescription);
      this.clearInput(recordSum, recordDescription);
      selectType.value = "Select type";
      selectCategory.value = "Select category";
    });
  }
}

export default new PlanningView();
