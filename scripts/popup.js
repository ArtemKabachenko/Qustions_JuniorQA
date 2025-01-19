// Массив с вопросами и ответами
let questionsData = [];
let shownQuestions = []; // Массив для хранения показанных вопросов

// Ссылки на элементы попапа и кнопки
const randomQuestionBtn = document.getElementById('randomQuestionBtn');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const popupQuestionTitle = document.getElementById('popupQuestionTitle');
const popupAnswer = document.getElementById('popupAnswer');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');

// Функция для загрузки данных из data.json
function loadQuestions() {
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные.');
      }
      return response.json();
    })
    .then(data => {
      questionsData = data;
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error);
    });
}

// Функция для получения случайного вопроса, который ещё не показывался
function getRandomQuestion() {
  // Фильтруем вопросы, которые ещё не показывались
  const remainingQuestions = questionsData.filter((question, index) => !shownQuestions.includes(index));
  
  // Если есть оставшиеся вопросы, выбираем случайный
  if (remainingQuestions.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    const selectedQuestion = remainingQuestions[randomIndex];
    shownQuestions.push(questionsData.indexOf(selectedQuestion)); // Добавляем индекс в массив показанных
    return selectedQuestion;
  } else {
    // Если все вопросы были показаны, сбрасываем массив и показываем все заново
    return null; // Возвращаем null, чтобы показать сообщение о завершении
  }
}

// Функция для отображения случайного вопроса
function showRandomQuestion() {
  const randomQuestion = getRandomQuestion();
  
  if (randomQuestion) {
    popupQuestionTitle.innerHTML = randomQuestion.title;
    popupAnswer.innerHTML = `<p>${randomQuestion.content}</p>`;
    
    // Скрываем ответ, когда открывается попап
    popupAnswer.classList.remove('show');
    nextQuestionBtn.textContent = "Наступне питання"; // Вернем текст кнопки в изначальное состояние
    nextQuestionBtn.classList.remove('reset-button'); // Убираем стиль кнопки "Почати заново"
  } else {
    // Показать сообщение, что все вопросы пройдены
    showAllQuestionsCompleted();
  }
}

// Функция для отображения сообщения о том, что все вопросы пройдены
function showAllQuestionsCompleted() {
  popupQuestionTitle.innerHTML = "Ви пройшли всі питання!";
  popupAnswer.innerHTML = ""; // Скрываем ответ
  nextQuestionBtn.textContent = "Почати заново"; // Меняем текст кнопки
  nextQuestionBtn.classList.add('reset-button'); // Добавляем стиль кнопки "Почати заново"
}

// Обработчик для открытия попапа
randomQuestionBtn.addEventListener('click', () => {
  if (questionsData.length > 0) {
    popup.classList.remove('hidden'); // Открываем попап
    showRandomQuestion(); // Показываем случайный вопрос
  }
});

// Обработчик для закрытия попапа
closePopup.addEventListener('click', () => {
  popup.classList.add('hidden'); // Закрываем попап
});

// Закрытие попапа при клике на затемненный фон
popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.classList.add('hidden');
  }
});

// Обработчик для кнопки "Следующий вопрос"
nextQuestionBtn.addEventListener('click', () => {
  if (nextQuestionBtn.textContent === "Почати заново") {
    shownQuestions = []; // Очищаем массив с показанными вопросами
    showRandomQuestion(); // Начинаем с первого вопроса
    nextQuestionBtn.textContent = "Наступне питання"; // Возвращаем текст кнопки
    nextQuestionBtn.classList.remove('reset-button'); // Убираем стиль кнопки "Почати заново"
  } else {
    showRandomQuestion(); // Показываем новый случайный вопрос
  }
});

// Обработчик для раскрытия/сокрытия ответа на весь блок вопроса
popupQuestionTitle.parentElement.addEventListener('click', () => {
  popupAnswer.classList.toggle('show'); // Показываем или скрываем ответ
});

// Загружаем данные при загрузке страницы
window.addEventListener('DOMContentLoaded', loadQuestions);
