/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10, // rollback: Math.round((Math.random() * 100));
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: [],

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },

  asking: function () {
    for (let i = 0; i < 1; i++) {
      do {
        appData.title = prompt('Как называется ваш проект?', ' rOcket ');
      } while (appData.isNumber(appData.title));
    }

    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;

      do {
        name = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
      } while (appData.isNumber(name));

      do {
        price = prompt('Сколько будет стоить данная работа?', 5000);
      } while (!appData.isNumber(price));

      price = Number(price);
      appData.screens.push({ id: i, name, price }); //      screens.push({ id: i, name: name, price: price }) full form
    }

    for (let i = 0; i < 2; i++) {
      let name = '';
      let price = 0;

      do {
        name = prompt('Какой дополнительный тип услуги нужен?', 'Премиум дизайн, сжатые сроки и т.п.');
      } while (appData.isNumber(name));

      do {
        price = prompt('Сколько это будет стоить?', 10000);
      } while (!appData.isNumber(price));

      price = Number(price);
      appData.services.push({ id: i, name, price });
    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },

  addPrices: function () {
    let someBufferObject;
    someBufferObject = appData.screens.reduce((a, b) => ({ price: a.price + b.price }));
    appData.screenPrice = someBufferObject.price;

    for (let service of appData.services) {
      appData.allServicePrices += service.price;
    }
  },

  isNumber: function (str) {
    if (str == null) return false;
    let num = Number(str);
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
  },
  getTitle: function () {
    appData.title = appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase();
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
    // console.log(appData.title);
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);
    // for (let key in appData) {
    //   console.log(`Ключ: ${key}. Значение: ${appData[key]}`)
    // }
  }
}

appData.start();
// console.log(appData.services)
// console.log(allServicePrices, 'allServicePrices - сумма всех доп. услуг');

// console.log(determineDiscount(fullPrice));
// console.log(servicePercentPrice, 'итоговая стоимость за вычетом отката посреднику');

// console.log(rollback, 'базовый процент отката');
// console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
// console.log('Стоимость разработки сайта ' + getFullPrice() + ' рублей (учитывая стоимость верстки экранов и дополнительных услуг)');
// console.log('Экраны бывают: ' + screens.toLocaleLowerCase().split(', ')[0] + ', ' + screens.toLocaleLowerCase().split(', ')[1] + ', ' + screens.toLocaleLowerCase().split(', ')[2]);
