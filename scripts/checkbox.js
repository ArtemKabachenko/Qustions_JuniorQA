// Handlers for checkboxes and section names
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
  
  // Handler for checkbox state change
  function handleCheckboxChange({ checkbox, sectionName, content }) {
    if (checkbox.checked) {
      sectionName.classList.add('strikethrough');
      content.classList.remove('show');  // Close section
    } else {
      sectionName.classList.remove('strikethrough');
      content.classList.add('show');  // Open section
    }
  }
  
