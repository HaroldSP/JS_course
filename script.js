/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

const isNumber = function (str) {
  if (str == null) return false;
  let num = Number(str);
  return !isNaN(parseFloat(num)) && isFinite(num);
}

const asking = function () {
  title = prompt('Как называется ваш проект?', ' rOcket ');
  screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?', 15000);
  } while (!isNumber(screenPrice));

  screenPrice = Number(screenPrice);

  adaptive = confirm('Нужен ли адаптив на сайте?');
}

const getAllServicePrices = function () {
  let sum = 0;
  let answer;

  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?', 'Премиум дизайн, сжатые сроки и т.п.');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?', 'Премиум дизайн, сжатые сроки и т.п.');
    }

    do {
      answer = prompt('Сколько это будет стоить?', 10000);
    } while (!isNumber(answer));

    answer = Number(answer);
    sum += answer;
  }
  return sum;
};

function getFullPrice () {
  return screenPrice + allServicePrices;
}

const getTitle = function () {
  return title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase();
}

const getServicePercentPrices = function () {
  const rollback = Math.round((Math.random() * 100));
  return Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
}

const determineDiscount = function (price) {
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
}

const showTypeof = function (variable) {
  console.log(variable, typeof variable);
}

asking();
title = getTitle();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

showTypeof(title);
showTypeof(fullPrice);
showTypeof(adaptive);
showTypeof(screenPrice);
showTypeof(servicePercentPrice);
showTypeof(allServicePrices);

console.log('Экраны бывают: ' + screens.toLocaleLowerCase().split(', ')[0] + ', ' + screens.toLocaleLowerCase().split(', ')[1] + ', ' + screens.toLocaleLowerCase().split(', ')[2]);

console.log(determineDiscount(fullPrice));

console.log(servicePercentPrice, 'итоговая стоимость за вычетом отката посреднику');

// console.log(allServicePrices, 'allServicePrices - сумма всех доп. услуг');
// console.log(rollback, 'базовый процент отката');
// console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
// console.log('Стоимость разработки сайта ' + getFullPrice() + ' рублей (учитывая стоимость верстки экранов и дополнительных услуг)');
