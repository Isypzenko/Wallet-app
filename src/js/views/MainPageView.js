import View from "./View";

class MainPageView extends View {
  _parent = document.querySelector(".content");
  generateMarkup() {
    const header = document.querySelector("header");
    header.classList.remove("hidden");
    return `
    <div class="main-page w-full flex flex-col p-6">
        <div class="bills self-end">
        <div class="flex bill-container flex-row">
        <div class="bill uah">10000</div>
        <div class="currency">UAH</div>
        </div>
        <div class="flex bill-container flex-row">
          <div class="bill usd">10000</div>
          <div class="currency">USD</div>
          </div>
          <div class="flex bill-container flex-row">
          <div class="bill eur">10000</div>
          <div class="currency">EUR</div>
          </div>
        </div>
        <div class="history mt-7">
          <h2 class="text-center text-3xl">HISTORY</h2>
          <h2 class="text-center text-3xl load">Loading...</h2>
          <div class="w-[80%] mt-3 flex justify-between hidden hints">
            <div class="record-data">DATA</div>
            <div class="record-type">TYPE</div>
            <div class="record-sum">SUM</div>
            <div class="record-description">DESCRIPTION</div>
          </div>
          <div class="transaction-info records w-[100%] flex flex-col mt-3">
        
        </div>
      </div>
    `;
  }
  createEmptyMessage() {
    const container = document.querySelector(".records");
    const el = `
    <div class="flex justify-center text-2xl records-empty">There are not any records yet.</div>
    `;
    container?.insertAdjacentHTML("afterbegin", el);
  }
  setEmptyRecordsList() {
    const load = document.querySelector(".load");
    load?.classList.add("hidden");
    const el = document.querySelector(".records-empty");
    const hints = document.querySelector(".hints");
    if (!hints?.classList.contains("hidden")) hints?.classList.add("hidden");
    if (!el) {
      this.createEmptyMessage();
    } else {
      el.classList.remove("hidden");
    }
  }
  removeRecordFromPage(record) {
    record.remove();
  }
  formatDateFromTimestamp(OldDate) {
    const milliseconds =
      OldDate.seconds * 1000 + Math.floor(OldDate.nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  }
  getHistoryMarkUp(record) {
    return `<div class="flex mt-2 flex-row justify-between gap-1 record" data-id=${
      record.id
    }>
    <div class="transaction-date w-[25%]">${this.formatDateFromTimestamp(
      record.info.date
    )}</div>
    <div class="transaction-type w-[25%] mr-1" >${record.info.type.toUpperCase()}</div>
    <div class="transaction-amount w-[25%] mr-1">${record.info.sum}</div>
    <div class="transaction-description w-[25%] mr-1">${
      record.info.description
    }</div>
    <button class="transaction-delete delete-record">DELETE</button></div>`;
  }
  setCurrency(bill, usd, eur) {
    const billUAH = document.querySelector(".uah");
    const billUSD = document.querySelector(".usd");
    const billEUR = document.querySelector(".eur");

    billUAH.textContent = bill;
    billUSD.textContent = (bill / usd).toFixed(2) || 0;
    billEUR.textContent = (bill / eur).toFixed(2) || 0;
  }
  addHandlerDeleteRecord(handler, db) {
    const container = document.querySelector(".records");
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-record")) {
        const record = e.target.closest(".record");
        const id = record.dataset.id;
        handler(id, db);
        this.removeRecordFromPage(record);
      }
    });
  }
  hideLoader() {
    const load = document.querySelector(".load");
    load.classList.add("hidden");
    const hints = document.querySelector(".hints");
    hints.classList.remove("hidden");
  }
  setRecords(records, Timestamp) {
    if (records.length == 0) {
      this.setEmptyRecordsList();
      return;
    }
    this.hideLoader();
    const container = document.querySelector(".records");
    records.forEach((element) => {
      const markup = this.getHistoryMarkUp(element, Timestamp);
      container.insertAdjacentHTML("afterbegin", markup);
    });
  }
}

export default new MainPageView();
