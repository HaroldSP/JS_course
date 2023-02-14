/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
'use strict';

const title = document.getElementsByTagName('h1')[0];
let buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback > .main-controls__range > input');
const inputRangeValue = document.querySelector('.rollback > .main-controls__range > span');

let startBtn = document.getElementsByClassName('handler_btn')[0];
let resetBtn = document.getElementsByClassName('handler_btn')[1];

let total_PriceLayout = document.getElementsByClassName('total-input')[0];
let totalCount_numberOfScreens = document.getElementsByClassName('total-input')[1];
let totalCountOther_priceAddService = document.getElementsByClassName('total-input')[2];
let fullTotalCount_fullPrice = document.getElementsByClassName('total-input')[3];
let totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
  title: '',
  screens: [],
  screensTotalNumber: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isCalculated: false,

  init: function () {
    this.addTitle();
    startBtn.addEventListener('click', this.start);
    resetBtn.addEventListener('click', this.reset);
    buttonPlus.addEventListener('click', this.addScreenBlock);
    inputRange.addEventListener('input', this.addRollbackValues);
  },

  // nested methods: start, reset, addScreenBlock, addRollbackValues. Can't use "this." inside of them.

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    let checkPrice = 0;
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      checkPrice = +select.value * +input.value;
    });

    if (checkPrice === 0) {
      alert('Убедитесь, что вы корректно выбрали типы и стоимости экранов');
      return;
    }
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
    appData.blockSelectandInput();
    // appData.logger();
  },

  showResult: function () {
    total_PriceLayout.value = this.screenPrice;
    totalCountOther_priceAddService.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount_fullPrice.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount_numberOfScreens.value = this.screensTotalNumber;
    this.isCalculated = true;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value
      });
    })
  },

  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    })

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    })
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll('.screen');
  },

  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }

    for (let screen of this.screens) {
      this.screensTotalNumber += +screen.count;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
  },

  addRollbackValues: function (e) {
    inputRangeValue.textContent = e.target.value;
    appData.rollback = +inputRangeValue.textContent;
    if (appData.screensTotalNumber !== 0) {
      totalCountRollback.value = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
    }
  },

  determineDiscount: function (price) {
    if (price > 30000) {
      return 'Даем скидку в 10%';
    } else if (price >= 15000 && price <= 30000) {
      return 'Даем скидку в 5%';
    } else if (price >= 0 && price < 15000) {
      return 'Скидка не предусмотрена';
    } else if (price < 0) {
      return 'Что-то пошло не так';
    } else {
      return 'Точно что-то пошло не так';
    }
  },

  blockSelectandInput: function () {
    if (this.isCalculated === true) {
      let input = document.querySelectorAll('input[placeholder="Количество экранов"]');
      input.forEach(function (item) { item.disabled = true });

      let mainSelect = document.querySelectorAll('select[name="views-select"]');
      mainSelect.forEach(function (item) { item.disabled = true });

      let checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(function (item) { item.disabled = true });

      buttonPlus = document.querySelector('.screen-btn');
      buttonPlus.disabled = true;

      startBtn.hidden = true;
      resetBtn.style = 'display: true;';
    }
  },

  reset: function () {
    appData.title = '';
    appData.screens = [];
    appData.screensTotalNumber = 0;
    appData.screenPrice = 0;
    appData.adaptive = true;
    appData.rollback = 0;
    appData.servicePricesPercent = 0;
    appData.servicePricesNumber = 0;
    appData.fullPrice = 0;
    appData.servicePercentPrice = 0;
    appData.servicesPercent = {};
    appData.servicesNumber = {};
    appData.isCalculated = false;

    let input = document.querySelectorAll('input[placeholder="Количество экранов"]');
    input.forEach(function (item) { item.disabled = false });

    let mainSelect = document.querySelectorAll('select[name="views-select"]');
    mainSelect.forEach(function (item) { item.disabled = false });

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (item) { item.disabled = false });

    let cmsCheckbox = document.querySelector('#cms-open');
    cmsCheckbox.checked = false;

    buttonPlus = document.querySelector('.screen-btn');
    buttonPlus.disabled = false;

    startBtn.hidden = false;
    resetBtn.style = 'display: none;';

    for (let index = (screens.length - 1); index > 0; index--) {
      screens[index].remove();
    }

    // let selectScreen = document.querySelector('[name="views-select"]');
    // console.dir(selectScreen);
    // selectScreen.option = 0;

    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      if (check.checked) check.checked = '';
    })

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      if (check.checked) check.checked = '';
    })

    total_PriceLayout.value = appData.screenPrice;
    totalCountOther_priceAddService.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount_fullPrice.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount_numberOfScreens.value = appData.screensTotalNumber;
  },

  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
    console.log(this.services);
  }
}

appData.init();
