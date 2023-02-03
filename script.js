/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
'use strict';

let title = prompt('Как называется ваш проект?', 'Мой первый проект');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const screenPrice = +prompt('Сколько будет стоить данная работа?', 15000);
const adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'Премиум дизайн, сжатые сроки и т.п.');
let servicePrice1 = +prompt('Сколько это будет стоить?', 10000);
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'Премиум дизайн, сжатые сроки и т.п.');
let servicePrice2 = +prompt('Сколько это будет стоить?', 15000);

const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
};
let allServicePrices = getAllServicePrices();

function getFullPrice () {
  return screenPrice + allServicePrices;
}
let fullPrice = getFullPrice();

const getTitle = function () {
  return title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase();
}

const getServicePercentPrices = function () {
  const rollback = Math.round((Math.random() * 100));
  return Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
}
let servicePercentPrice = getServicePercentPrices();

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

showTypeof(getTitle());
showTypeof(fullPrice);
showTypeof(adaptive);

console.log('Экраны бывают: ' + screens.toLocaleLowerCase().split(', ')[0] + ', ' + screens.toLocaleLowerCase().split(', ')[1] + ', ' + screens.toLocaleLowerCase().split(', ')[2]);

console.log(determineDiscount(fullPrice));

console.log(servicePercentPrice, 'итоговая стоимость за вычетом отката посреднику');

// console.log(rollback, 'базовый процент отката');
// console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
// console.log('Стоимость разработки сайта ' + getFullPrice() + ' рублей (учитывая стоимость верстки экранов и дополнительных услуг)');
