import View from "./View";

class RegisterView extends View {
  _parent = document.querySelector(".content");
  generateMarkup() {
    return `
    <div
        class="w-full register-page flex isolate min-h-full flex-col justify-center items-center px-6 py-12 mt-12 lg:px-8 z-10"
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
              Register your account
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
              <label
                for="nickname"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Your nickname</label
              >
              <div class="mt-2">
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  required
                  class="block nickname w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                class="flex btn-register w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

        </div>
      </div>
    `;
  }
  addHandlerReg(handler) {
    const inputEmail = document.querySelector(".email");
    const inputPassword = document.querySelector(".password");
    const inputNickname = document.querySelector(".nickname");
    const btnReg = document.querySelector(".btn-register");
    btnReg.addEventListener("click", function (e) {
      e.preventDefault();
      handler(inputEmail, inputPassword, inputNickname);
    });
    this.clearInput(inputEmail, inputPassword, inputNickname);
  }
}

export default new RegisterView();