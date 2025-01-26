// Flag to track the state of section openings
let allSectionsOpen = false;

// Function to create a section
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

// Load data from data.json file
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
    const accordion5Container = document.getElementById('accordion5');

    const internetSections = data.slice(0, 46);
    const theorySections = data.slice(46, 105);
    const sqlSections = data.slice(105, 114);
    const postmanSections = data.slice(114, 126);
    const hrSections = data.slice(126);

    const accordion1Items = createAccordionSections(accordion1Container, internetSections);
    const accordion2Items = createAccordionSections(accordion2Container, theorySections);
    const accordion3Items = createAccordionSections(accordion3Container, sqlSections);
    const accordion4Items = createAccordionSections(accordion4Container, postmanSections);
    const accordion5Items = createAccordionSections(accordion5Container, hrSections);

    initializeHandlers([...accordion1Items, ...accordion2Items, ...accordion3Items, ...accordion4Items, ...accordion5Items]);

    // Add handler for the button to open/close all sections
    const openAllBtn = document.getElementById('openAllBtn');
    openAllBtn.addEventListener('click', () => {
      const allContent = document.querySelectorAll('.accordion-content');

      if (allSectionsOpen) {
        // If sections are open, close them
        allContent.forEach(content => {
          content.classList.remove('show');
        });

        // Change the button text
        openAllBtn.innerText = 'Відкрити всі секції';
      } else {
        // If sections are closed, open them
        allContent.forEach(content => {
          content.classList.add('show');
        });

        // Change the button text
        openAllBtn.innerText = 'Закрити всі секції';
      }

      // Toggle the flag to the opposite value
      allSectionsOpen = !allSectionsOpen;
    });
  })
  .catch(error => console.error('Error loading JSON:', error));

// Function to create accordion sections
function createAccordionSections(container, sections) {
  return sections.map(sectionData => {
    return createSection(container, sectionData);
  });
}

// Handler for clicking on the section name
function handleSectionNameClick({ checkbox, content }) {
  if (checkbox.checked) return;
  content.classList.toggle('show');
}
  