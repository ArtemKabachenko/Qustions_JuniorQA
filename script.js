const accordionContainer = document.getElementById('accordion');

// Функция для создания секции
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

// Загружаем данные из файла data.json
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Создаем секции на основе данных
    data.forEach((sectionData, index) => {
      const section = createSection(index, sectionData.title, sectionData.content);
      accordionContainer.appendChild(section);
    });

    // Инициализация обработчиков после добавления секций
    initializeHandlers();
  })
  .catch(error => console.error('Error loading JSON:', error));

// Обработчики для чекбоксов и названий секций
function initializeHandlers() {
  const checkboxes = document.querySelectorAll('.section-checkbox');
  const sectionNames = document.querySelectorAll('.section-name');
  const accordionContents = document.querySelectorAll('.accordion-content');

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      const sectionName = sectionNames[index];
      const content = accordionContents[index];

      if (checkbox.checked) {
        sectionName.classList.add('strikethrough');
      } else {
        sectionName.classList.remove('strikethrough');
      }

      content.classList.remove('show');
    });
  });

  sectionNames.forEach((sectionName, index) => {
    sectionName.addEventListener('click', () => {
      const checkbox = checkboxes[index];
      const content = accordionContents[index];

      if (checkbox.checked) return;

      content.classList.toggle('show');
    });
  });
}
