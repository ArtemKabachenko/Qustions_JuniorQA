// Флаг для отслеживания состояния открытия секций
let allSectionsOpen = false;

// Функция для создания секции
function createSection(container, sectionData) {
  const accordionItem = document.createElement('div');
  accordionItem.classList.add('accordion-item');
  
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
    const accordion1Container = document.getElementById('accordion1');
    const accordion2Container = document.getElementById('accordion2');
    const accordion3Container = document.getElementById('accordion3');
    const accordion4Container = document.getElementById('accordion4');

    const firstSections = data.slice(0, 41);
    const secondSections = data.slice(41, 100);
    const thirdSections = data.slice(100, 120);
    const fourthSections = data.slice(120);

    const accordion1Items = createAccordionSections(accordion1Container, firstSections);
    const accordion2Items = createAccordionSections(accordion2Container, secondSections);
    const accordion3Items = createAccordionSections(accordion3Container, thirdSections);
    const accordion4Items = createAccordionSections(accordion4Container, fourthSections);

    initializeHandlers([...accordion1Items, ...accordion2Items, ...accordion3Items, ...accordion4Items]);

    // Добавляем обработчик для кнопки открытия/закрытия всех секций
    const openAllBtn = document.getElementById('openAllBtn');
    openAllBtn.addEventListener('click', () => {
      const allContent = document.querySelectorAll('.accordion-content');
      const allSectionNames = document.querySelectorAll('.section-name');
      const allCheckboxes = document.querySelectorAll('.section-checkbox');

      if (allSectionsOpen) {
        // Если секции открыты, закрываем их
        allContent.forEach(content => {
          // Проверяем, активен ли чекбокс. Если активен, не закрываем секцию.
          const checkbox = content.previousElementSibling.querySelector('.section-checkbox');
          if (!checkbox.checked) {
            content.classList.remove('show');
          }
        });

        // Убираем "зачеркнутый" стиль с названий секций, если чекбокс не активен
        allSectionNames.forEach((sectionName, index) => {
          const checkbox = allCheckboxes[index];
          if (!checkbox.checked) {
            sectionName.classList.remove('strikethrough');
          }
        });

        // Меняем текст кнопки
        openAllBtn.innerText = 'Открыть все секции';
      } else {
        // Если секции закрыты, открываем их
        allContent.forEach(content => {
          // Проверяем, активен ли чекбокс. Если активен, не открываем секцию.
          const checkbox = content.previousElementSibling.querySelector('.section-checkbox');
          if (!checkbox.checked) {
            content.classList.add('show');
          }
        });

        // Убираем "зачеркнутый" стиль с названий секций, если чекбокс не активен
        allSectionNames.forEach((sectionName, index) => {
          const checkbox = allCheckboxes[index];
          if (!checkbox.checked) {
            sectionName.classList.remove('strikethrough');
          }
        });

        // Меняем текст кнопки
        openAllBtn.innerText = 'Закрыть все секции';
      }

      // Меняем флаг на противоположное значение
      allSectionsOpen = !allSectionsOpen;
    });
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
  document.addEventListener('change', (event) => {
    if (event.target && event.target.classList.contains('section-checkbox')) {
      const checkbox = event.target;
      const sectionItem = items.find(item => item.checkbox === checkbox);
      if (sectionItem) {
        handleCheckboxChange(sectionItem);
      }
    }
  });

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
  if (checkbox.checked) return;
  content.classList.toggle('show');
}

// Подсветка текущего раздела
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".anchor-link a");

  const removeActiveClasses = () => {
    navLinks.forEach(link => link.classList.remove("active"));
  };

  const highlightCurrentSection = () => {
    let currentSectionId = null;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    removeActiveClasses();
    if (currentSectionId) {
      const activeLink = document.querySelector(`.anchor-link a[href="#${currentSectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  };

  highlightCurrentSection();
  window.addEventListener("scroll", highlightCurrentSection);
});
