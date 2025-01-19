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
  
