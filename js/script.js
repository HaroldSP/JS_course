/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
'use strict';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
// В index.html код менять нельзя, только подключите скрипт
=======
let title = document.getElementsByTagName('h1')[0];
let buttonPlus = document.querySelector('.screen-btn');
let otherItemsPercent = document.querySelectorAll('.other-items.percent');
let otherItemsNumber = document.querySelectorAll('.other-items.number');
=======
// 1) Запретить нажатие кнопки Рассчитать если не выбран ни один тип экрана в выпадающем списке и не введено их количество.
// Учесть что блоков с типом экранов может быть несколько, но пустых (незаполненных) элементов быть не должно
>>>>>>> 7b0f0da (after practice before HW start (task))

// 2) Повесить на input[type=range] (в блоке с классом .rollback) обработчик события.
// При перемещении ползунка значение под ним (в элементе span) должно меняться.
// А так же это значение должно заноситься в свойство rollback нашего объекта для последующих расчетов!

// 3) В нашем объекте присутствует метод getServicePercentPrice.
// Данный метод рассчитывает доход с учетом отката посреднику.
// Перенести его логику в метод addPrices и выводить в поле с подписью "Стоимость с учетом отката"

=======
>>>>>>> 0a4cd9d (main task done)
// 4) В методе addScreens мы добавляем в свойство appData.screens новые объекты.
// Добавить свойство count в которое занести количество экранов из input.
// В методе addPrices посчитать общее количество экранов и вывести на страницу итоговое значение в поле с подписью "Количество экранов"

=======
>>>>>>> 37fc953 (+additional task (live rollback values))
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
>>>>>>> 8ff44b3 (Start of the practice)

<<<<<<< HEAD
// Используя только файл скрипта выполнить такие действия:

// Удалить рекламу со страницы

const adv = document.querySelector('.adv');
adv.remove();

// Восстановить порядок книг

let books = document.querySelectorAll('.book');

books[1].after(books[0]);
books[0].after(books[4]);
books[4].after(books[3]);
books[3].after(books[5]);

books = document.querySelectorAll('.book');

// Заменить картинку заднего фона на другую из папки image

let body = document.querySelector('body');
body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")

let bookHeaders = document.querySelectorAll('[target="_blank"]')

bookHeaders[2].innerHTML = 'Книга 3. this и Прототипы Объектов';

// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)

// 5th book

let contents = document.querySelectorAll('ul');
contents[4].classList.add('contents_5');
let chapters = document.querySelectorAll('ul.contents_5 > li');

chapters[2].before(chapters[9]);
chapters[9].after(chapters[3]);
chapters[3].after(chapters[4]);
chapters[7].after(chapters[5]);
=======
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
>>>>>>> 7b0f0da (after practice before HW start (task))

<<<<<<< HEAD
chapters = document.querySelectorAll('ul.contents_5 > li');

// 2nd book

contents[1].classList.add('contents_2');
let chaptersSecond = document.querySelectorAll('ul.contents_2 > li');

chaptersSecond[9].before(chaptersSecond[2]);
chaptersSecond[3].after(chaptersSecond[6]);
chaptersSecond[6].after(chaptersSecond[8]);
chaptersSecond[7].after(chaptersSecond[9]);

chaptersSecond = document.querySelectorAll('ul.contents_2 > li');

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место

contents[5].classList.add('contents_6');
let chaptersSix = document.querySelectorAll('ul.contents_6 > li');

let chapterEight = document.createElement('li');
chapterEight.textContent = 'Глава 8: За пределами ES6';
chaptersSix[8].after(chapterEight);
=======
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);
  }
}

<<<<<<< HEAD
appData.start();
>>>>>>> 8ff44b3 (Start of the practice)
=======
appData.init();
>>>>>>> 7b0f0da (after practice before HW start (task))
