let questionsData = []; // Array to store questions from data.json 
let shownQuestions = []; // Array to store shown questions

// References to popup elements and buttons
const randomQuestionBtn = document.getElementById('randomQuestionBtn');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const popupQuestionTitle = document.getElementById('popupQuestionTitle');
const popupAnswer = document.getElementById('popupAnswer');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');

// Function to load data from data.json
function loadQuestions() {
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load data.');
      }
      return response.json();
    })
    .then(data => {
      questionsData = data;
    })
    .catch(error => {
      console.error('Error loading data', error);
    });
}

// Function to get a random question that hasn't been shown yet
function getRandomQuestion() {
  // Filter questions that have not been shown yet
  const remainingQuestions = questionsData.filter((question, index) => !shownQuestions.includes(index));
  
  // If there are remaining questions, select a random one
  if (remainingQuestions.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const selectedQuestion = remainingQuestions[randomIndex];
    shownQuestions.push(questionsData.indexOf(selectedQuestion)); // Add the index of the shown question to the array
    return selectedQuestion;
  } else {
    // If all questions have been shown, return null
    return null; 
  }
}

// Function to display a random question
function showRandomQuestion() {
  const randomQuestion = getRandomQuestion();
  
  if (randomQuestion) {
    popupQuestionTitle.innerHTML = randomQuestion.title;
    popupAnswer.innerHTML = `<p>${randomQuestion.content}</p>`;
    
    // Hide the answer when the popup opens
    popupAnswer.classList.remove('show');
    nextQuestionBtn.textContent = "Наступне питання"; // Change the button text
    nextQuestionBtn.classList.remove('reset-button'); // Remove the "Start Over" button style
  } else {
    // Show a message that all questions have been completed
    showAllQuestionsCompleted();
  }
}

// Function to display a message that all questions have been completed
function showAllQuestionsCompleted() {
  popupQuestionTitle.innerHTML = "Вау!!! Ви пройшли всі питання!";
  popupAnswer.innerHTML = ""; // Clear the answer
  nextQuestionBtn.textContent = "Почати заново"; // Change the button text
  nextQuestionBtn.classList.add('reset-button'); // Add the "Start Over" button style
}

// Handler for opening the popup
randomQuestionBtn.addEventListener('click', () => {
  if (questionsData.length > 0) {
    popup.classList.remove('hidden'); // Open the popup
    showRandomQuestion(); // Show a random question
  }
});

// Handler for closing the popup
closePopup.addEventListener('click', () => {
  popup.classList.add('hidden'); // Close the popup
});

// Close the popup when clicking on the darkened background
popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.classList.add('hidden'); // Close the popup
  }
});

// Handler for the "Next Question" button
nextQuestionBtn.addEventListener('click', () => {
  if (nextQuestionBtn.textContent === "Почати заново") {
    shownQuestions = []; // Reset the array of shown questions
    showRandomQuestion();  // Show a new random question
    nextQuestionBtn.textContent = "Наступне питання"; // Change the button text back   
    nextQuestionBtn.classList.remove('reset-button'); // Remove the "Start Over" button style  
  } else {
    showRandomQuestion(); // Show a new random question
  }
});

// Handler for toggling the answer visibility for the entire question block
popupQuestionTitle.parentElement.addEventListener('click', () => {
  popupAnswer.classList.toggle('show'); // Toggle the visibility of the answer
});

// Load data when the page loads
window.addEventListener('DOMContentLoaded', loadQuestions);
