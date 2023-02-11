/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
'use strict';

// В index.html код менять нельзя, только подключите скрипт

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
