/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
'use strict';

const appData = {
  title: '',
  screens: '',
  screenPrice: 0,
  adaptive: true,
  rollback: 10, // rollback: Math.round((Math.random() * 100));
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: '',
  service2: '',
  asking: function () {
    appData.title = prompt('Как называется ваш проект?', ' rOcket ');
    appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

    do {
      appData.screenPrice = prompt('Сколько будет стоить данная работа?', 10000);
    } while (!appData.isNumber(appData.screenPrice));

    appData.screenPrice = Number(appData.screenPrice);

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');
  },
  isNumber: function (str) {
    if (str == null) return false;
    let num = Number(str);
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let answer;

      if (i === 0) {
        appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Премиум дизайн, сжатые сроки и т.п.');
      } else if (i === 1) {
        appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Премиум дизайн, сжатые сроки и т.п.');
      }

      do {
        answer = prompt('Сколько это будет стоить?', 10000);
      } while (!appData.isNumber(answer));

      answer = Number(answer);
      sum += answer;
    }
    return sum;
  },
  getFullPrice: function () {
    return appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    return Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
  },
  getTitle: function () {
    return appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase();
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
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    for (let key in appData) {
      console.log(`Ключ: ${key}. Значение: ${appData[key]}`)
    }
  }
}

appData.start();
appData.logger();

// console.log(allServicePrices, 'allServicePrices - сумма всех доп. услуг');

// console.log(determineDiscount(fullPrice));
// console.log(servicePercentPrice, 'итоговая стоимость за вычетом отката посреднику');

// console.log(rollback, 'базовый процент отката');
// console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
// console.log('Стоимость разработки сайта ' + getFullPrice() + ' рублей (учитывая стоимость верстки экранов и дополнительных услуг)');
// console.log('Экраны бывают: ' + screens.toLocaleLowerCase().split(', ')[0] + ', ' + screens.toLocaleLowerCase().split(', ')[1] + ', ' + screens.toLocaleLowerCase().split(', ')[2]);
