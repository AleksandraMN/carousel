/*
№1 Задание
В Bootstrap есть компонент Carousel. Этот слайдер устроен так же, как и все остальное в Bootstrap. В верстке определяются атрибуты data, по которым Bootstrap определяет карусель и оживляет ее.

На слайдере отображаются две стрелки — одна влево, другая вправо. Клики по этим стрелкам приводят к перемотке слайдов по кругу. Если слайды заканчиваются, то происходит переход от конца к началу или наоборот. С точки зрения DOM происходит следующее:

Класс active снимается с текущего элемента .carousel-item
Активный элемент получает класс active
application.js
Реализуйте логику слайдера в функции, экспортированной по умолчанию.
Постройте свою логику так, чтобы можно было использовать на одной странице любое количество компонентов carousel с любым количеством картинок внутри.
Решите задачу, используя методы jQuery.

Подсказки
Изучите документацию для работы с коллекциями, поиском и изменением атрибутов. Например, методы для работы с классами:
removeClass()
addClass()
Кроме того, вам могут понадобиться следующие методы взаимодействия с DOM:
next()
prev()
first()
last()
siblings()
*/

const aElems = $('[data-slide]');
aElems.on('click', function() {
  const parentElem = $(this).parent('[data-ride="carousel"]');
  const currentActiveElem = $('.carousel-item.active', parentElem);
  const elVelue = $(this).data('slide');
  currentActiveElem.removeClass('active');
  if (elVelue === 'next' && currentActiveElem.next().length !== 0) {
    currentActiveElem.next().addClass('active');
  }
  if (elVelue === 'prev' && currentActiveElem.prev().length !== 0) {
    currentActiveElem.prev().addClass('active');
  }
  if (elVelue === 'next' && currentActiveElem.next().length === 0) {
    currentActiveElem.siblings().first().addClass('active');
  }
  if (elVelue === 'prev' && currentActiveElem.prev().length === 0) {
    currentActiveElem.siblings().last().addClass('active');
  }
})

/*
решение преподавателя:

export default () => {
  $('a[data-slide]').click((e) => {
    const carousel = e.target.closest('[data-ride="carousel"]');
    const active = $('.carousel-item.active', carousel);
    const direction = e.currentTarget.dataset.slide;
    const map = {
      next: active.next().length > 0 ? active.next() : active.siblings().first(),
      prev: active.prev().length > 0 ? active.prev() : active.siblings().last(),
    };
    const newActive = map[direction];
    active.removeClass('active');
    newActive.addClass('active');
  });
};
----------------------------------------------------------------------------------------------
*/

//№2 Задание
/*
В этом упражнении нужно реализовать логику добавления алертов по клику на кнопку.

Изначально на странице есть одна кнопка. Верстка выглядит так:

<button id="alert-generator" class="btn btn-primary">Generate Alert</button>
<div class="alerts m-5"></div>
После клика на кнопку в контейнер с классом alerts добавляется алерт Alert 1:

<div class="alerts m-5">
  <div class="alert alert-primary">Alert 1</div>
</div>
Последующий клик добавляет новый алерт первым в списке:

<div class="alerts m-5">
  <div class="alert alert-primary">Alert 2</div>
  <div class="alert alert-primary">Alert 1</div>
</div>
Каждый клик добавляет новый алерт, меняя число в его имени.

src/application.js
Реализуйте и установите обработчик события click на кнопке по логике выше.

Подсказки
Саму кнопку можно получить в коде через ее id
После выполнения задания подумайте, как добавить возможность скрывать алерты
Поэкспериментируйте с отладкой в этом упражнении, опирайтесь на наш гайд, чтобы разобраться с тестами

*/

const alerts = document.querySelector('.alerts');
const button = document.querySelector('#alert-generator');
const buttonRemove = document.querySelector('#alert-remove');
let count = 1;

const createAlert = () => {
   const alertElement = document.createElement('div');
   alertElement.classList.add('alert', 'alert-primary');
   alertElement.innerHTML = `Alert `+ count;
   alerts.append(alertElement);
   count++;
};

button.addEventListener('click', createAlert);

const removeAlert = () => {
   const elements = alerts.children;
   elements[elements.length-1].remove();
   count--;
};

buttonRemove.addEventListener('click', removeAlert);

/*
-------------------------------------------------------------------------------------------------------------
№3 Задание
/*
В веб-приложениях часто встречаются кнопки, переключающие содержимое контейнера. Например, похожий компонент вы можете посмотреть в Bootstrap nav. Один из вариантов этого компонента — это табы, которые переключаются по нажатию без перезагрузки страницы:

<nav>
    <div class="nav nav-tabs">
        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button">Home</button>
        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button">Profile</button>
    </div>
</nav>
<div class="tab-content">
    <div class="tab-pane active" id="home">Home tab</div>
    <div class="tab-pane" id="profile">Profile tab</div>
</div>
По клику на таб происходит следующее:

Класс active снимается с текущего элемента меню и активного блока с данными
Класс active добавляется табу, по которому кликнули и соответствующему блоку с данными
Сопоставление таба и блока данных идет по идентификатору, который прописывается в атрибут табов data-bs-target. По клику на таб код должен извлечь id, найти соответствующий элемент и сделать его активным. При этом важно не забыть снять класс active с таба и с блока, которые были активными до клика.

src/application.js
Реализуйте логику переключения табов. Постройте свою логику так, чтобы она позволила использовать на одной странице любое количество компонентов nav.

Подсказки
В коде можно использовать глобальный объект document
Селектор по data элементам [data-toggle], например: document.querySelectorAll('h1[data-key]');
Получить необходимый атрибут data можно через dataset
Постарайтесь не завязываться на конкретные идентификаторы и элементы
Вы можете использовать другой метод извлечения списка — например, document.getElementsByClassName(). При этом обратите внимание, что он возвращает HTMLCollection, а не NodeList. HTMLCollection не поддерживает метод forEach(). Однако вы можете привести такой список к массиву — например, используя Array.from()
Переключение должно работать на любой реализации — и с использованием button, и на div
*/

const btnElements = document.querySelectorAll('[data-bs-toggle]');

btnElements.forEach((elem) => {
  elem.addEventListener('click', () => {
    const a = elem.dataset.bsTarget;
    const tab = document.querySelector(`${a}`);
    const nav = elem.closest('.nav');
    const activeElem = nav.querySelector('.active');
    const b = activeElem.dataset.bsTarget;
    const activeTab = document.querySelector(`${b}`);
    activeElem.classList.remove('active');
    activeTab.classList.remove('active');
    elem.classList.add('active');
    tab.classList.add('active');
  })
});

/*
решение учителя:
  функция-обработчик в качестве параметров
   получает event и элемент

  const handle = (e, container) => {
    const targetTab = e.target;

     если элемент, на котором произошел клик
     уже активный, то делаем возврат

    if (targetTab.classList.contains('active')) {
      return;
    }

     получем id элемента на котором был клик,
     и далее по нему получаем сам элемент

    const targetTabContentId = targetTab.dataset.bsTarget;
    const targetTabContent = document.querySelector(targetTabContentId);

     находим и получаем элемент, который был активным до клика

    const activeTab = container.querySelector('.active');
    const activeTabContentId = activeTab.dataset.bsTarget;
    const activeTabContent = document.querySelector(activeTabContentId);

     добавляем класс active чтобы сделать элемент,
     на котором произошел клик активным

    targetTab.classList.add('active');
    targetTabContent.classList.add('active');

    удаляем класс с элемента который был активным до клика

    activeTab.classList.remove('active');
    activeTabContent.classList.remove('active');
  };

   находим все элементы с классом .nav

  const navs = document.querySelectorAll('.nav');

  
   на каждую кнопку в nav вешаем событие
  
    для этого обходим все элементы и на каждый вешаем обработчик по событию click

  navs.forEach((nav) => {
    const tabs = nav.querySelectorAll('[data-bs-toggle]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', (event) => handle(event, nav));
    });
  });

  ---------------------------------------------------------------------------------------------------
  */
/*
№4 Задание
В предыдущих уроках мы познакомились со свойством textContent, которое позволяет безопасно вставлять данные на страницу, чтобы избежать уязвимостей. В этом упражнении мы отработаем ручное экранирование данных при установке их через свойство innerHTML.

src/application.js
В задании дана форма обратной связи, состоящая из трех полей: email, name и comment.

Напишите и экспортируйте функцию по умолчанию, которая при отправке формы получает из нее данные и экранирует их. Когда форма заполнена и отправлена (нажата кнопка send), то элемент формы заменяется на другой элемент. Другими словами, вместо формы появляется документ с такой структурой:

<div>
  <p>Feedback has been sent</p>
  <div>Email: test@email.com</div>
  <div>Name: Matz</div>
  <div>Comment: My Comment</div>
</div>
Для экранирования введенных данных используйте функцию htmlEscape() из библиотеки escape-goat.

После отправки формы выводятся данные, которые пользователь ввел.

Подсказки
Проще всего подготовить необходимый HTML и подставлять в него данные через innerHTML
Экранирование символов
*/

import { htmlEscape } from 'escape-goat';

const sendForm = () => {
  const form = document.querySelector('.feedback-form');

  const createElem = (formData) => {
  const email = formData.get('email');
  const name =  formData.get('name');
  const comment =  formData.get('comment');
  const div = document.createElement('div');
  div.innerHTML= `
    <p>Feedback has been sent</p>
    <div>Email: ${htmlEscape(email)}</div>
    <div>Name: ${htmlEscape(name)}</div>
    <div>Comment: ${htmlEscape(comment)}</div>
    `;
  return div;
};

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const button = form.querySelector('.btn-primary');
    if (e.submitter === button) {
      const div = createElem(formData);
      form.replaceWith(div);
    }
  })
};

export default sendForm;
/*
Решение преподавателя:

const render = (element, data) => {
  const div = document.createElement('div');
  const { email, name, comment } = data;
  div.innerHTML = `
    <p>Feedback has been sent</p>
    <div>Email: ${htmlEscape(email)}</div>
    <div>Name: ${htmlEscape(name)}</div>
    <div>Comment: ${htmlEscape(comment)}</div>
  `;
  element.replaceWith(div);
};

export default () => {
  const formElement = document.querySelector('.feedback-form');
  const handle = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    render(formElement, Object.fromEntries(formData));
  };
  formElement.addEventListener('submit', handle);
};
-------------------------------------------------------------------------------------------------------
*/

/*
№5 Задание
Задача этого упражнения — реализовать автозаполнение.

На странице присутствуют элементы input с атрибутами data-autocomplete и data-autocomplete-name, к которым нужно привязаться. Атрибут data-autocomplete содержит путь, по которому нужно сделать запрос на получение данных. Атрибут data-autocomplete-name содержит имя, по которому необходимо найти на странице список ul с точно таким же атрибутом и значением. В этом списке выводятся данные.

src/application.js
Реализуйте автозаполнение.

При изменении строки в поле ввода (ввод символов или их удаление), необходимо выполнить запрос на сервер с query-параметром search, значением которого будет строка введенная в input. Запрос должен уйти по пути, который был указан в атрибуте data-autocomplete. Сервер возвращает массив из стран на английском языке.

Если этот массив не пустой, то нужно заполнить список. Посмотреть его нахождение можно двумя способами — использовать public/index.html или открыть исходный код страницы в веб-доступе таким образом:

<ul data-autocomplete-name="country" name="Country">
  <li>pakistan</li>
  <li>panama</li>
  <li>paraguay</li>
</ul>
Если с сервера пришел пустой список, то нужно вывести:

<ul data-autocomplete-name="country" name="Country">
  <li>Nothing</li>
</ul>
Подсказки
Для формирования правильного запроса на сервер, используйте URL
Текущий хост можно извлечь так window.location.origin
Значение поля input необходимо брать из события так: e.target.value
Изучите в теории, как создается объект URL и добавляются параметры query string
Используйте async/await
Ваш код должен работать, даже если на странице множество автозаполнений
Используйте событие input
*/
  // Получаем элементы ввода значений (инпуты)
  const autocompleteElements = document.querySelectorAll('input[data-autocomplete]');
  // В цикле обрабатываем каждый элемент
  autocompleteElements.forEach((el) => {
    // Получаем путь, куда нужно сделать запрос
    const route = el.dataset.autocomplete;
    // Получаем имя из атрибута, чтобы по нему позже найти сам список
    const dataAutocompleteName = el.dataset.autocompleteName;
    // Добавляем обработчик ввода значения в инпут
    el.addEventListener('input', async (e) => {
      // Получаем элемент списка по атрибуту
      const list = document.querySelector(`ul[data-autocomplete-name="${dataAutocompleteName}"]`);
      // Формируем адрес для запроса
      const url = new URL(route, window.location.origin);
      // В адрес добавляем значение инпута
      url.searchParams.append('search', e.target.value);
      // Выполняем запрос
      const response = await fetch(url);
      // Извлекаем данные из запроса
      const items = await response.json();
      // Формируем список для вывода
      const options = items.length === 0 ? ['Nothing'] : items;
      const listHTML = options.map((item) => `<li>${item}</li>`).join('\n');
      // Выводим получившийся список на страницу
      list.innerHTML = listHTML;
    });
  });

  /*
  ---------------------------------------------------------------------------------------------------
  #
  В этом упражнении задачка, похожая на предыдущую. Но теперь мы будем использовать поисковые методы без прямого обхода дерева.

Нам нужно извлечь данные с фиксированной структурой. Мы будем парсить страницу категории статей. Эта страница содержит заголовок категории, его описание и ссылки на статьи с небольшим описанием. Эта структура не меняется, меняется только количество статей от категории к категории.

src/extractor.js
Реализуйте логику функции, которая принимает на вход document, извлекает из него данные и возвращает объект нужной структуры:

<div class="content">
  <h1>Category Name</h1>
  <div class="description">Category Description</div>
  <div class="links">
    <div>
      <h2><a href="#">Article Name 1</a></h2>
      <p>Article Description 1</p>
    </div>
    <div>
      <h2><a href="#">Article Name 2</a></h2>
      <p>Article Description 2</p>
    </div>
  </div>
</div>
Рассмотрим этот пример подробнее:

Category Name — заголовок категории
Category Description — описание категории
Article Name 1 — название статьи 1
Article Description 1 — описание статьи 1
Article Name 2 — название статьи 2
Article Description 2 — описание статьи 2
Нужно сформировать объект, в котором категория описывается следующими свойствами:

title — заголовок категории
description — описание категории
items — статьи
Структура каждой статьи определяется объектом со свойствами:

title — заголовок статьи (берется из ссылки статьи)
description — описание статьи
import extractData from './extractor.js';

const data = extractData(document);
console.log(data);
 {
   title: 'Category Name',
   description: 'Category Description',
   items: [
     { title: 'Article Name 1', description: 'Article Description 1' },
     { title: 'Article Name 2', description: 'Article Description 2' }
   ]
 }
src/index.js
Проверьте, как работает вновь созданная функция на странице доступной в веб-доступе. Импортируйте функцию в index.js, выполните ее с аргументом document и распечатайте результат в консоль. Проверьте, что в консоль вывелись нужные данные.

Подсказки
Не стесняйтесь выполнять querySelector() на любые данные
Для выборки списка статей используйте querySelectorAll
Разделение чтения и использования
*/
/*

export const extractData = (document) => {
  const date = {};
  const h1Elem = document.querySelector('.content__category');
  date.title = h1Elem.textContent;
  const descElem = document.querySelector('.description');
  date.description = descElem.textContent;
  const aElems = document.querySelectorAll('a');
  const pElems = document.querySelectorAll('p');
  date.items = [];
  for(let i = 0; i < aElems.length; i++) {
    date.items.push({title: aElems[i].textContent, description: pElems[i].textContent});
  }
  return date;
};
*/

/*
решение преподавателя:

export default (document) => {
  
  const root = document.querySelector('.content');

  const categoryTitleElement = root.querySelector('h1');
  const categoryTitle = categoryTitleElement.innerHTML;
  const categoryDescriptionElement = root.querySelector('.description');
  const categoryDescription = categoryDescriptionElement.innerHTML;

  const itemElements = root.querySelectorAll('.links div');
  const items = Array.from(itemElements).map((element) => {
    const titleElement = element.querySelector('a');
    const descriptionElement = element.querySelector('p');

    return {
      title: titleElement.innerHTML,
      description: descriptionElement.innerHTML,
    };
  });

  return {
    title: categoryTitle,
    description: categoryDescription,
    items,
  };
  
};
--------------------------------------------------------------------------------------------------
*/
/*
#
normalize.js
Реализуйте и экспортируйте по умолчанию функцию, которая нормализует имена классов для всех элементов на странице. Изначально названия всех классов написаны в стиле kebab-case, а при нормализации нужно изменить их названия на стиль camelCase: text-center => textCenter.

Попробуйте решить эту задачу без использования регулярных выражений.

Примеры
 <body>
   <div class="text-center row-b">Bam</div>
 </body>
normalize(document);
console.log(document.body.innerHTML);
 <body>
   <div class="textCenter rowB">Bam</div>
 </body>
Подсказки
Самый простой способ найти все элементы в документе — это document.body.getElementsByTagName('*')
Приведение к camelCase https://lodash.com/docs#camelCase
Замена классов replace у объекта classList
*/
/*

function upperCaseAt(text, i) {
  return text.substring(0, i) + text.charAt(i).toUpperCase() + text.substring(i + 1);
}

export const normalize = (document) => {
const tags = document.body.getElementsByTagName('*');

[...document.body.getElementsByTagName('*')].forEach((tag) => {
    const classes = tag.classList;

    const results = [...classes].map((text) => {

      while (text.indexOf("-") !== -1) {
        let i = text.indexOf("-") + 1;
        let result1 = upperCaseAt(text, i);
        text = result1;
        let result2 = text.replace("-", '');
        text = result2;
      }
      return text;
    });
    return tag.classList = results.join(' ');
  });
};
*/

/*
решение преподавателя

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import camelCase from 'lodash/camelCase';


export default (document) => {
  const allNodes = [...document.body.getElementsByTagName('*')];
  allNodes.forEach((node) => {
    const process = (item) => node.classList.replace(item, camelCase(item));
    node.classList.forEach(process);
  });
};
*/
