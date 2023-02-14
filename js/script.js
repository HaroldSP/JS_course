/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
'use strict';

// 1) Перевести весь проект на стрелочные функции (кроме методов объекта)

// 2) В нашем объекте везде использовать this как ссылку на объект appData. Если какой то обработчик ломает контекст - привязать нужный контекст в виде объекта appData.

// 3) Блокировать (свойство disabled) все input[type=text] и select с левой стороны после нажатия кнопки Рассчитать, после этого кнопка Рассчитать пропадает и появляется кнопка Сброс (id=reset)

// 4) В объекте реализовать метод reset(), срабатывающий по нажатию на кнопку Сброс. Метод reset() должен привести объект к исходному состоянию:

// Кнопка Сброс должна замениться на кнопку Рассчитать
// Должны быть убраны все дополнительные элементы (которые добавлялись динамически) и значения полей ввода
// Все input[type=text] и select должны быть разблокированы

// Метод reset должен всю программу возвращать в исходное состояние
// Метод reset() пишем самостоятельно, никаких перезагрузок страницы. Метод должен быть расписан наподобие start().

// Проверить, чтобы все работало и не было ошибок в консоли

// Добавить папку с уроком на свой GitHub

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback > .main-controls__range > input');
const inputRangeValue = document.querySelector('.rollback > .main-controls__range > span');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

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

  init: function () {
    appData.addTitle();
    startBtn.addEventListener('click', appData.start);
    buttonPlus.addEventListener('click', appData.addScreenBlock);
    inputRange.addEventListener('input', appData.addRollbackValues);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  start: function () {
    let checkPrice = 0;
    screens = document.querySelectorAll('.screen');
    screens.forEach(function (screen) {
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
    // appData.logger();
    console.log(appData);
    appData.showResult();
  },

  showResult: function () {
    total_PriceLayout.value = appData.screenPrice;
    totalCountOther_priceAddService.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount_fullPrice.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount_numberOfScreens.value = appData.screensTotalNumber;
  },

  addScreens: function () {
    screens = document.querySelectorAll('.screen');
    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value
      });
    })
  },

  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    })

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    })
  },

  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll('.screen');
  },

  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let screen of appData.screens) {
      appData.screensTotalNumber += +screen.count;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber;

    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
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

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);
  }
}

appData.init();
