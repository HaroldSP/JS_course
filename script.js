/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
'use strict';
const title = prompt('Как называется ваш проект?', 'Мой первый проект');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const screensLowerCase = screens.toLocaleLowerCase();
const screenPrice = +prompt('Сколько будет стоить данная работа?', 15000);
const rollback = Math.round((Math.random() * 100));
const adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'Премиум дизайн, сжатые сроки и т.п.');
let servicePrice1 = +prompt('Сколько это будет стоить?', '10000, 15000 и т.п.')
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'Премиум дизайн, сжатые сроки и т.п.');
let servicePrice2 = +prompt('Сколько это будет стоить?', '10000, 15000 и т.п.')
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback / 100)));

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
// console.log(rollback, 'базовый процент отката');
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей (учитывая стоимость верстки экранов и дополнительных услуг)');
console.log(screensLowerCase.split(', '));
console.log(Math.ceil(fullPrice * (rollback / 100)), 'откат посреднику');
console.log(servicePercentPrice, 'итоговая стоимость за вычетом отката посреднику');

// 10) Написать конструкцию условий (расчеты приведены в рублях) (вывести в консоль)
//   -
//   -
//   - Если fullPrice меньше 15000 и больше 0 то в консоль вывести сообщение “Скидка не предусмотрена”
//   - Если отрицательное значение то вывести “Что то пошло не так”

if (fullPrice > 30000) {
  console.log('Даем скидку в 10%');
} else if (fullPrice >= 15000 && fullPrice <= 30000) {
  console.log('Даем скидку в 5%');
} else if (fullPrice >= 0 && fullPrice < 15000) {
  console.log('Скидка не предусмотрена')
} else if (fullPrice < 0) {
  console.log('Что-то пошло не так');
} else {
  console.log('Точно что-то пошло не так');
}
