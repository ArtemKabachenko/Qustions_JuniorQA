const buttons = document.querySelectorAll('.accordion-button');
const checkboxes = document.querySelectorAll('.section-checkbox');

checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    const button = buttons[index];
    const content = button.nextElementSibling;

    // If the checkbox is checked, cross out the section name
    if (checkbox.checked) {
      button.classList.add('strikethrough');
      
      // Если секция открыта, закрываем её
      if (content.classList.contains('show')) {
        content.classList.remove('show');
      }
    } else {
      button.classList.remove('strikethrough');
    }

    // Unchecking the checkbox does not change the state of the section other than closing it
    if (!checkbox.checked) {
      content.classList.remove('show');
    }
  });
});

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const checkbox = button.querySelector('.section-checkbox');
    const content = button.nextElementSibling;

    // If the checkbox is checked, do not perform any actions
    if (checkbox.checked) {
      return; // Just exit the handler
    }

    // Otherwise, we switch the section's visibility
    content.classList.toggle('show');
  });
});
