const accordionContainer = document.getElementById('accordion');

// Функция для создания секции с уникальным названием и текстом
function createSection(index, sectionTitle, contentText) {
  const accordionItem = document.createElement('div');
  accordionItem.classList.add('accordion-item');
  
  const button = document.createElement('button');
  button.classList.add('accordion-button');
  button.innerHTML = `<input type="checkbox" class="section-checkbox"> ${sectionTitle}`;
  
  const content = document.createElement('div');
  content.classList.add('accordion-content');
  content.innerHTML = `<p>${contentText}</p>`;
  
  accordionItem.appendChild(button);
  accordionItem.appendChild(content);
  
  return accordionItem;
}

// Пример названий и текстов для каждой секции
const sections = [
  { title: 'Section 1: Introduction', content: 'This is the content of section 1.' },
  { title: 'Section 2: Overview', content: 'This is the content of section 2.' },
  { title: 'Section 3: Features', content: 'This is the content of section 3.' },
  { title: 'Section 4: Details', content: 'Content for section 4.' },
  { title: 'Section 5: Final thoughts', content: 'Unique information for section 5.' },
  // Добавьте сюда столько объектов, сколько нужно
  { title: 'Section 10: Conclusion', content: 'Content for section 10.' },
];

// Динамическое создание секций с уникальными названиями и текстами
for (let i = 0; i < 10; i++) {
  const sectionData = sections[i] || { title: `Section ${i + 1}`, content: `Content of section ${i + 1}` };
  const section = createSection(i, sectionData.title, sectionData.content);
  accordionContainer.appendChild(section);
}

// Обработчики событий для чекбоксов и кнопок
const buttons = document.querySelectorAll('.accordion-button');
const checkboxes = document.querySelectorAll('.section-checkbox');

checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    const button = buttons[index];
    const content = button.nextElementSibling;

    // Если чекбокс отмечен, зачеркиваем название секции
    if (checkbox.checked) {
      button.classList.add('strikethrough');
      
      // Если секция открыта, закрываем её
      if (content.classList.contains('show')) {
        content.classList.remove('show');
      }
    } else {
      button.classList.remove('strikethrough');
    }

    // При снятии галочки не меняем состояние секции, кроме как закрытия
    if (!checkbox.checked) {
      content.classList.remove('show');
    }
  });
});

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const checkbox = button.querySelector('.section-checkbox');
    const content = button.nextElementSibling;

    // Если чекбокс установлен, не выполняем никаких действий
    if (checkbox.checked) {
      return; // Просто выходим из обработчика
    }

    // Иначе, переключаем видимость секции
    content.classList.toggle('show');
  });
});
