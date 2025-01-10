// Функция для создания секции
function createSection(container, sectionData) {
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
  sectionName.innerText = sectionData.title;
  
  checkboxWrapper.appendChild(checkbox);
  checkboxWrapper.appendChild(sectionName);
  
  const content = document.createElement('div');
  content.classList.add('accordion-content');
  content.innerHTML = `<p>${sectionData.content}</p>`;
  
  accordionItem.appendChild(checkboxWrapper);
  accordionItem.appendChild(content);
  
  // Добавляем секцию в переданный контейнер
  container.appendChild(accordionItem);

  return { checkbox, content, sectionName };
}

// Загружаем данные из файла data.json
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Получаем контейнеры для трех аккордеонов
    const accordion1Container = document.getElementById('accordion1');
    const accordion2Container = document.getElementById('accordion2');
    const accordion3Container = document.getElementById('accordion3');

    // Разбиваем данные на три части
    const firstSections = data.slice(0, 41);  // Первые 41 секция
    const secondSections = data.slice(41, 50);  // Секции с 42 по 50
    const thirdSections = data.slice(50);  // Оставшиеся секции

    // Создаем массивы для хранения элементов секций
    const accordion1Items = createAccordionSections(accordion1Container, firstSections);
    const accordion2Items = createAccordionSections(accordion2Container, secondSections);
    const accordion3Items = createAccordionSections(accordion3Container, thirdSections);

    // Инициализация обработчиков после добавления секций
    initializeHandlers([...accordion1Items, ...accordion2Items, ...accordion3Items]);
  })
  .catch(error => console.error('Error loading JSON:', error));

// Функция для создания секций аккордеона
function createAccordionSections(container, sections) {
  return sections.map(sectionData => {
    return createSection(container, sectionData);
  });
}

// Обработчики для чекбоксов и названий секций
function initializeHandlers(items) {
  // Делегирование событий для чекбоксов
  document.addEventListener('change', (event) => {
    if (event.target && event.target.classList.contains('section-checkbox')) {
      const checkbox = event.target;
      const sectionItem = items.find(item => item.checkbox === checkbox);
      if (sectionItem) {
        handleCheckboxChange(sectionItem);
      }
    }
  });

  // Делегирование событий для названий секций
  document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('section-name')) {
      const sectionName = event.target;
      const sectionItem = items.find(item => item.sectionName === sectionName);
      if (sectionItem) {
        handleSectionNameClick(sectionItem);
      }
    }
  });
}

// Обработчик для изменения состояния чекбокса
function handleCheckboxChange({ checkbox, sectionName, content }) {
  if (checkbox.checked) {
    sectionName.classList.add('strikethrough');
    content.classList.remove('show');  // Закрыть секцию
  } else {
    sectionName.classList.remove('strikethrough');
    content.classList.add('show');  // Открыть секцию
  }
}

// Обработчик для клика на название секции
function handleSectionNameClick({ checkbox, content }) {
  // Если чекбокс активен, не открываем/закрываем
  if (checkbox.checked) return;

  // Открываем/закрываем секцию
  content.classList.toggle('show');
}
