import View from "./View";

class LoginView extends View {
  _parent = document.querySelector(".content");
  generateMarkup() {
    return `
    <div
        class="w-full login-page flex isolate min-h-full flex-col justify-center items-center px-6 py-12 mt-12 lg:px-8 z-10"
      >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2
            class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Log into your Wallet account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Email address</label
              >
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block email w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block password w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex btn-login w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <button
              class="btn-start-register font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start to use Wallet app
            </button>
          </p>
        </div>
      </div>
    `;
  }

  renderError(message) {
    const loginPage = document.querySelector("main");
    const el = `<div class="mx-auto mt-5 flex items-center p-4 mb-4 text-xl text-white rounded-lg bg-indigo-600" role="alert">
    <svg class="flex-shrink-0 inline w-7 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <div>
      <span class="font-medium">${message}</span>
    </div>
  </div>`;
    loginPage.insertAdjacentHTML("afterbegin", el);
  }

  addHandlerLogin(handler) {
    const btnLogin = document.querySelector(".btn-login");
    const inputEmail = document.querySelector(".email");
    const inputPassword = document.querySelector(".password");
    btnLogin.addEventListener("click", function (e) {
      e.preventDefault();
      handler(inputEmail, inputPassword);
    });
    this.clearInput(inputEmail, inputPassword);
  }
  addHandlerStartReg(handler) {
    const btnReg = document.querySelector(".btn-start-register");
    btnReg.addEventListener("click", function (e) {
      e.preventDefault();
      handler("awda");
    });
  }
}

export default new LoginView();
