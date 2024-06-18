import View from "./View";

class LoaderView extends View {
  _parent = document.querySelector(".content");
  generateMarkup() {
    return `
   <div class='loader !absolute top-[45%] left-[45%] translate-x-[45%] translate-y-[45%]'> 
   <div
    class="relative inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-indigo-600"
    role="status">
    <span
      class="!absolute !-m-px !h-px !w-px  !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Loading...</span
    >
  </div></div>
    `;
  }
  stopLoader() {
    const loader = document.querySelector(".loader");
    loader.classList.add("hidden");
  }
}

export default new LoaderView();
