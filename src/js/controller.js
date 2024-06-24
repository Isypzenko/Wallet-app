import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./config";
import "firebase/firestore";
import { doc, getFirestore, Timestamp } from "firebase/firestore";
import * as model from "./model.js";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import * as helpers from "./helpers.js";
import * as config from "./config.js";
import LoaderView from "./views/LoaderView";
import MainPageView from "./views/MainPageView";
import SideBarView from "./views/SideBarView";
import CategoriesPageView from "./views/CategoriesPageView";
import PlanningView from "./views/PlanningViewPage";
import ConverterView from "./views/ConverterViewPage";

import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

// UPDATE DOM WITHOUT RELOADING THE PAGE
if (module.hot) {
  module.hot.accept();
}

// Set up all user's data getting from database
async function setUpUserData() {
  const nickname = document.querySelector(".user-nickname");
  nickname.textContent = model.state.userInfo.nickname;
  MainPageView.setCurrency(
    model.state.userInfo.bill,
    model.state.currency.usd,
    model.state.currency.eur
  );
}
// Function for checking whether value for changing limit is validated or not
function CheckValidateInputChangeLimit(category, limit) {
  const categoryValue = category.value;
  const limitValue = limit.value;
  let result = true;
  if (limitValue > 999999999 || limitValue < 0) {
    CategoriesPageView.addErrorColorInput(
      "Your limit is under zero or bigger than billion",
      limit
    );
    result = false;
  } else CategoriesPageView.removeErrorColorInput(limit);
  if (
    categoryValue != null &&
    categoryValue != undefined &&
    categoryValue != "Select category"
  )
    CategoriesPageView.removeErrorColorInput(category);
  else {
    CategoriesPageView.addErrorColorInput("Please choose category", category);
    result = false;
  }
  return result;
}
// Function for DO change limit
function changeLimitCategory(category, limit, currency) {
  const validation = CheckValidateInputChangeLimit(category, limit);
  let ref = null;
  if (validation) {
    const categoryValue = category.value;
    const limitValue = limit.value;
    model.state.categories.forEach((arr) => {
      if (arr.info.title == categoryValue) {
        arr.info.limit = limitValue;
        ref = arr.id;
      }
    });
    const currencyValue = currency.value;
    CategoriesPageView.setNewLimitInCategoryList(
      limitValue,
      categoryValue,
      currencyValue
    );
    model.changeLimitCategoryDataBase(ref, limitValue, database);
  }
  CategoriesPageView.clearInput(limit);
}
// Function for checking whether values for creating category is validated or not
function CheckValidateInputCategory(limit, currency, categoryName) {
  const limitValue = limit.value;
  const currencyValue = currency.value;
  const categoryTitle = categoryName.value.trim();
  let result = true;
  if (limitValue >= 0 && limitValue <= 999999999)
    CategoriesPageView.removeErrorColorInput(limit);
  else {
    result = false;
    CategoriesPageView.addErrorColorInput(
      "Your limit is under zero or bigger than billion",
      limit
    );
  }
  if (currencyValue != null && currencyValue != undefined);
  else {
    result = false;
    CategoriesPageView.addErrorColorInput(
      "Please, choose a currency",
      currency
    );
  }
  if (
    categoryTitle != null &&
    categoryTitle != undefined &&
    categoryTitle != ""
  )
    CategoriesPageView.removeErrorColorInput(categoryName);
  else {
    result = false;
    CategoriesPageView.addErrorColorInput(
      "Please, input correct title",
      categoryName
    );
  }
  return result;
}
// Function set value to input on Categories Page
function setLimitToInput(value) {
  let limitValue = null;
  model.state.categories.forEach((arr) => {
    if (arr.info.title == value) {
      limitValue = arr.info.limit;
    }
  });
  CategoriesPageView.setLimitToInput(limitValue);
}
// Generating unique id
function generateUniqueId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
// Adding new category to page and database
async function addNewCategory(limit, currency, categoryName) {
  const limitValue = limit.value;
  const currencyValue = currency.value;
  const categoryTitle = categoryName.value;
  const result = CheckValidateInputCategory(limit, currency, categoryName);
  if (result) {
    const id = generateUniqueId();
    CategoriesPageView.addCategoryToListOnPage(
      limitValue,
      categoryTitle,
      id,
      currencyValue
    );
    CategoriesPageView.addCategoryToSelectList(categoryTitle);
    await model.addCategoryToDataBase(
      limitValue,
      currencyValue,
      categoryTitle,
      database,
      id
    );
  }
  checkForCategories();
  CategoriesPageView.clearInput(limit, categoryName);
}
// Deleting category from database
function deleteCategory(category) {
  const categoryId = category.dataset.id;
  const index = model.state.categories.findIndex(
    (item) => item.id === categoryId
  );

  if (index !== -1) {
    model.state.categories.splice(index, 1);
    model.removeCategoryFromDatabase(category.textContent, database);
  }
  checkForCategories();
}
// Checking whether categories is or not
function checkForCategories() {
  if (model.state.categories.length == 0) {
    CategoriesPageView.createEmptyListMessage();
  }
  if (model.state.categories.length > 0) {
    CategoriesPageView.hideEmptyMessage();
  }
}
// Function for checking whether values for creating record is validated or not
function CheckValidateCreateRecord(category, type, sum, description) {
  const categoryValue = category.value;
  const typeValue = type.value;
  const sumValue = sum.value;
  const descriptionValue = description.value;
  let result = true;
  PlanningView.removeErrorColorInput(category);
  PlanningView.removeErrorColorInput(type);
  PlanningView.removeErrorColorInput(sum);
  if (categoryValue == "Select category") {
    result = false;
    PlanningView.addErrorColorInput("Please, select category", category);
  }
  if (typeValue != "income" && typeValue != "outcome") {
    result = false;
    PlanningView.addErrorColorInput("Please, select type", type);
  }
  if (sumValue <= 0 || sumValue > 1000000) {
    PlanningView.addErrorColorInput(
      "Your value should be more than 0 and less than million",
      sum
    );
    result = false;
  }
  if (descriptionValue.trim().length > 50) {
    PlanningView.addErrorColorInput(
      "Your value should be less than 50 symbols",
      description
    );
    result = false;
  }

  return result;
}
// Adding handler to button add record
async function handlerAddRecord(category, type, sum, description) {
  const result = CheckValidateCreateRecord(category, type, sum, description);
  if (result) {
    const categoryValue = category.value;
    const typeValue = type.value;
    const sumValue = sum.value;
    const descriptionValue = description.value;
    const id = generateUniqueId();
    const res = await model.addRecordToDataBase(
      database,
      categoryValue,
      typeValue,
      sumValue,
      descriptionValue,
      id
    );
  }
}
// Check and render category percent limit
function checkCategoryLimit(select) {
  const selectValue = select.value;
  if (selectValue == "Select category") {
    PlanningView.addErrorColorInput("You can choose any category", select);
    return;
  } else PlanningView.removeErrorColorInput(select);
  let result = model.calculatePercentLimitBar(selectValue);
  if (result > 100) result = 100;
  if (result < 0) result = 0;
  PlanningView.renderPercentLimit(result);
}
// Log out user from page
async function logOutFromPage() {
  try {
    const auth = getAuth(app); // Get the Firebase authentication instance
    await model.logOut(auth); // Log out the user

    model.resetAllState(); // Reset all application state
    resetPage(); // Reset the current page
    initLogin(); // Initialize the login page
  } catch (error) {
    console.error("Error logging out:", error); // Log any error that occurs during the logout process
  }
}
// Toggle sideBar Eventlistener for log out from page
function toggleEventSideBar() {
  SideBarView.insertMarkUp(setHandlersSideBar);
}
// Set to default page
function resetPage() {
  const header = document.querySelector("header");
  header.classList.add("hidden");
  const sideBarButton = document.querySelector(".open-sidemenu");
  sideBarButton.removeEventListener("click", toggleEventSideBar);
  const side = document.querySelector(".side-bar");
  side.remove();
}
// Setting handlers to sidebar buttons
function setHandlersSideBar(el, page) {
  el.addEventListener("click", function () {
    if (page === "categories") {
      CategoriesPageView._renderParentElement();
      CategoriesPageView.renderCategoryList(model.state.categories);
      CategoriesPageView.createNewCategory(addNewCategory);
      CategoriesPageView.setHandlerChangeLimit(changeLimitCategory);
      CategoriesPageView.setHandlerSetLimitToInput(setLimitToInput);
      CategoriesPageView.setHandlerDeleteCategory(deleteCategory);
    } else if (page === "planning") {
      PlanningView._renderParentElement();
      PlanningView.setHandlerAddRecord(handlerAddRecord);
      PlanningView.setCategoriesToSelectList(model.state.categories);
      PlanningView.setHandlerCheckLimit(checkCategoryLimit);
      PlanningView.addHandlerRefreshLimit(checkCategoryLimit);
    } else if (page === "main-page") {
      MainPageView._renderParentElement();
      MainPageView.setRecords(model.state.records, Timestamp);
      MainPageView.setCurrency(
        model.state.userInfo.bill,
        model.state.currency.usd,
        model.state.currency.eur
      );
      MainPageView.addHandlerDeleteRecord(deleteRecord);
    } else if (page === "converter") {
      ConverterView._renderParentElement();
      ConverterView.setHandler(handlerGetDataFromConverterPage);
    } else if (page === "logout") {
      logOutFromPage();
    }
  });
}
// Checking whether records is or not
function checkForRecords() {
  if (model.state.records.length == 0) {
    MainPageView.setEmptyRecordsList();
  }
}
// Deleting record from database
async function deleteRecord(id) {
  try {
    await model.removeRecordFromDatabase(id, database); // Remove the record from the database
    checkForRecords(); // Check and update the records list
  } catch (error) {
    console.error("Error deleting record:", error); // Log any error that occurs during the deletion process
  }
}

function setHandlerBtnSideMenu() {
  const btnSideMenu = document.querySelector(".open-sidemenu");
  btnSideMenu.addEventListener("click", toggleEventSideBar);
}

// GET DATA FROM INPUT
async function handlerBtnLogin(email, password) {
  const { flag, userEmail, userPassword } = CheckValidateInput(email, password);
  if (flag) {
    await model.getRelevantExchange(config.EXCHANGE_API);
    LoaderView._renderParentElement();

    const result = await helpers.StartStopLoader(
      model.registerOrLoginUser(userEmail, userPassword, "", false, database)
    );
    const { isOk } = result;
    if (isOk) {
      MainPageView._renderParentElement();
      MainPageView.addHandlerDeleteRecord(deleteRecord, database);
      setHandlerBtnSideMenu();
      SideBarView.insertMarkUp(setHandlersSideBar);
      await setUpUserData();
      await checkForLoadingDataRecords();
    } else {
      LoaderView.stopLoader();
      LoginView.renderError(result.error);
    }
  }
  LoginView.clearInput(email, password);
}
// Checking whether records is loaded or not
async function checkForLoadingDataRecords() {
  async function getRecords() {
    const prom = new Promise((resolve, reject) => {
      const maxWaitTime = 6000;
      const checkInterval = 100;

      const intervalId = setInterval(() => {
        if (model.state.records.length > 0) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          MainPageView.setRecords(model.state.records);
          resolve(model.state.records);
        }
      }, checkInterval);

      const timeoutId = setTimeout(() => {
        clearInterval(intervalId);
        reject(MainPageView.setEmptyRecordsList());
      }, maxWaitTime);
    });
    return prom;
  }
  const res = await helpers.StartStopLoader(getRecords());
}
// Set handler register to button
async function handlerGetRegister(email, password, nickname) {
  const { flag, userEmail, userPassword, userNickname } = CheckValidateInput(
    email,
    password,
    nickname
  );
  if (flag) {
    await model.getRelevantExchange(config.EXCHANGE_API);
    LoaderView._renderParentElement();
    const result = await helpers.StartStopLoader(
      model.registerOrLoginUser(
        userEmail,
        userPassword,
        userNickname,
        true,
        database
      )
    );
    const { isOk } = result;
    if (isOk) {
      MainPageView._renderParentElement();
      await setUpUserData();
      setHandlerBtnSideMenu();
      SideBarView.insertMarkUp(setHandlersSideBar);
    } else {
      LoaderView.stopLoader();
      LoginView.renderError(result.error);
    }
  }
  RegisterView.clearInput(email, password, nickname);
}
// START RENDER REGISTER BUTTON
function handlerStartReg() {
  RegisterView._renderParentElement();
  initRegister();
}

// GET DATA FROM CONVERTER PAGE
function handlerGetDataFromConverterPage(amount, operation, currency) {
  const amountValue = +amount.value;
  const operationValue = operation.value;
  const currencyValue = currency.value;
  if (amountValue <= 0)
    ConverterView.addErrorColorInput(
      "Please, enter a number greater than zero",
      amount
    );
  if (operationValue != "buy" && operationValue != "sell")
    ConverterView.addErrorColorInput("Please, choose an operation", operation);
  if (currencyValue != "dollar" && currencyValue != "euro")
    ConverterView.addErrorColorInput("Please, choose a currency", currency);
  const result = model.convertCurrency(
    amountValue,
    operationValue,
    currencyValue
  );
  ConverterView.setConverResult(result);
}

// VALIDATE INPUT'S DATA
function CheckValidateInput(email, password, nickname = null) {
  const userEmail = email.value.trim();
  const userPassword = password.value.trim();
  let flag = true;
  let userNickname = "";
  const emailLength = email.value.trim().length;
  const passwordLength = password.value.trim().length;

  if (nickname) {
    userNickname = nickname.value.trim();
    if (userNickname.length < 3) {
      LoginView.addErrorColorInput(
        "It should be more than 3 characters.",
        nickname
      );
      flag = false;
    }
    if (userNickname.length > 15) {
      LoginView.addErrorColorInput(
        "Your nickname is too long ! It has to be less than 15 characters.",
        nickname
      );
      flag = false;
    }
  }
  if (userEmail.length < 10) {
    LoginView.addErrorColorInput("Your email is invalid or empty !", email);
    flag = false;
  }
  if (userEmail.length > 25) {
    LoginView.addErrorColorInput(
      "Your email is too long ! It has to be less than 25 characters.",
      email
    );
    flag = false;
  }
  if (userPassword.length < 8) {
    LoginView.addErrorColorInput(
      "Your password is too short ! It has to be more than 8 characters.",
      password
    );
    flag = false;
  }
  return {
    flag: flag,
    userEmail: userEmail,
    userPassword: userPassword,
    userNickname: userNickname,
  };
}

// ADD HANDLERS
function initRegister() {
  RegisterView.addHandlerReg(handlerGetRegister);
}
function initLogin() {
  LoginView._renderParentElement();
  LoginView.addHandlerLogin(handlerBtnLogin);
  LoginView.addHandlerStartReg(handlerStartReg);
}

function startApp() {
  const savedData = JSON.parse(localStorage.getItem("state"));
  if (savedData && savedData.isLogged) {
    model.test(savedData);
    setHandlerBtnSideMenu();
    SideBarView.insertMarkUp(setHandlersSideBar);
    MainPageView._renderParentElement();
    setUpUserData();
    MainPageView.setRecords(model.state.records);
    MainPageView.addHandlerDeleteRecord(deleteRecord, database);
    setLocalStorageEvent();
  } else {
    initLogin();
    setLocalStorageEvent();
  }
}

function setLocalStorageEvent() {
  window.addEventListener("beforeunload", (event) => {
    console.log(model.state);
    localStorage.setItem("state", JSON.stringify(model.state));
  });
}

startApp();
