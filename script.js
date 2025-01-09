const buttons = document.querySelectorAll('.accordion-button');
const checkboxes = document.querySelectorAll('.section-checkbox');

checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    const button = buttons[index];

    // If checkbox is checked, strike through the title
    if (checkbox.checked) {
      button.classList.add('strikethrough');
    } else {
      button.classList.remove('strikethrough');
    }
  });
});

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const content = button.nextElementSibling;

    // Toggle the display of the content
    content.classList.toggle('show');
  });
});
