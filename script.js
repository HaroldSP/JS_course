/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
const title = 'Мой первый проект';
let screens = 'Простые, Сложные, Интерактивные';
const screensLowerCase = screens.toLocaleLowerCase();
const screenPrice = 15000;
const rollback = Math.round((Math.random() * 100));
const fullPrice = 100000;
const adaptive = true;

console.log(typeof title, typeof fullPrice, typeof adaptive);
console.log(screens.length);
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');
console.log(screensLowerCase.split(', '));
console.log(fullPrice * (rollback / 100));
