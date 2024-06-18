import View from "./View";

class ConverterView extends View {
  _parent = document.querySelector(".content");
  generateMarkup() {
    return `<div class="converter-page w-full flex justify-center mt-6 pr-5">
    <div class="convert-currency mr-24">
    <div>
    <label
        for="price"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Convert currency</label
      >
      <select
        class="bg-gray-50 select-currency border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Select currency</option>
        <option value="dollar">USD</option>
        <option value="euro">EUR</option>
      </select>
      </div>
      <div>
      <select
        class="bg-gray-50 select-operation mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Select operation</option>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      </div>
      <div class="mt-5 flex flex-col">
        <label
          for="currency"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Input amount</label
        >
        <div class="relative mt-2 rounded-md shadow-sm">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          ></div>
          <input
            type="number"
            name="currency"
            id="amount"
            class="block w-full rounded-md border-0 py-1.5 pl-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
        </div>
        <button
          type="button"
          class="change-currency mt-2 focus:outline-none text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          CONVERT
        </button>
      </div>
    </div>
    <div class="convert-result flex flex-col">
      <div class="mb-4">
        <label
          for="price"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Result</label
        >
        <div class="relative mt-2 rounded-md shadow-sm">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          ></div>
          <input
            type="number"
            name="price"
            readonly="readonly"
            class="block w-full convert-result rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-red-400 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  </div>`;
  }
  setHandler(handler) {
    const btnConvert = document.querySelector(".change-currency");
    btnConvert.addEventListener("click", function () {
      const amount = document.querySelector("#amount");
      const operation = document.querySelector(".select-operation");
      const currency = document.querySelector(".select-currency");
      handler(amount, operation, currency);
    });
  }
  setConverResult(result) {
    const outputResult = document.querySelector("input.convert-result");
    result = result.toFixed(2);
    outputResult.placeholder = result;
  }
}

export default new ConverterView();
