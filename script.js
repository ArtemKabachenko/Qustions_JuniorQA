const accordionContainer = document.getElementById('accordion');

// Функция для создания секции с уникальным названием и текстом
function createSection(index, sectionTitle, contentText) {
  const accordionItem = document.createElement('div');
  accordionItem.classList.add('accordion-item');
  
  // Создаем контейнер для чекбокса и названия
  const checkboxWrapper = document.createElement('div');
  checkboxWrapper.classList.add('checkbox-wrapper');
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('section-checkbox');
  
  const sectionName = document.createElement('span');
  sectionName.classList.add('section-name');
  sectionName.innerText = sectionTitle;
  
  checkboxWrapper.appendChild(checkbox);
  checkboxWrapper.appendChild(sectionName);
  
  const content = document.createElement('div');
  content.classList.add('accordion-content');
  content.innerHTML = `<p>${contentText}</p>`;
  
  accordionItem.appendChild(checkboxWrapper);
  accordionItem.appendChild(content);
  
  return accordionItem;
}

// Пример секций с названиями и контентом
const sections = [
  { title: 'Що таке інтернет та як він працює?', content: 'Інтернет це глобальна мережа в якій всі пристрої з\'єднані між собою та мають свій унікальний ідентифікатор IP, та за допомогою протоколів ці пристрої можуть обмінюватись даними' },
  { title: 'З чого складається URI?', content:'<ol>' +
             '<li>Протокол передачі даних https://</li>' +
             '<li>subdomain.domain.root_domain</li>' +
             '<li>port (http-80, https-443), але він не показується за замовченням</li>' +
             '<li>path - путь до конкретної сторінки або файлу на сайті</li>' +
             '<li>query param - фільтри, сортування, доп. параметри</li>' +
             '<li>anchor - якір, для переходу до певної частини сторінки</li>' +
             '</ol>' },
  { title: 'Section 3: Features', content: 'This is the content of section 3.' },
  { title: 'Section 4: Details', content: 'Content for section 4.' },
  { title: 'Section 5: Final thoughts', content: 'Unique information for section 5.' },
  { title: 'Section 6: Further Analysis', content: 'Deep dive into section 6.' },
  { title: 'Section 7: Discussion', content: 'Content for section 7.' },
  { title: 'Section 8: Questions', content: 'Content for section 8.' },
  { title: 'Section 9: Answers', content: 'Content for section 9.' },
  { title: 'Section 10: Conclusion', content: 'Content for section 10.' },
];

// Динамически создаем секции
sections.forEach((sectionData, index) => {
  const section = createSection(index, sectionData.title, sectionData.content);
  accordionContainer.appendChild(section);
});

// Обработчики для чекбоксов и кнопок
const checkboxes = document.querySelectorAll('.section-checkbox');
const sectionNames = document.querySelectorAll('.section-name');
const accordionContents = document.querySelectorAll('.accordion-content');

// Обработчик для чекбоксов
checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    const sectionName = sectionNames[index];
    const content = accordionContents[index];

    // Зачеркиваем название секции, если чекбокс отмечен
    if (checkbox.checked) {
      sectionName.classList.add('strikethrough');
    } else {
      sectionName.classList.remove('strikethrough');
    }

    // Закрываем секцию при снятии чекбокса
    content.classList.remove('show');
  });
});

// Обработчик для нажатия на название секции
sectionNames.forEach((sectionName, index) => {
  sectionName.addEventListener('click', () => {
    const checkbox = checkboxes[index];
    const content = accordionContents[index];

    // Если чекбокс установлен, не открываем секцию
    if (checkbox.checked) return;

    // Переключаем видимость контента
    content.classList.toggle('show');
  });
});
