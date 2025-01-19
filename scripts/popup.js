// Массив с вопросами и ответами
let questionsData = [];

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

// Функция для получения случайного вопроса
function getRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questionsData.length);
  return questionsData[randomIndex];
}

// Функция для отображения случайного вопроса
function showRandomQuestion() {
  if (questionsData.length > 0) {
    const randomQuestion = getRandomQuestion();
    popupQuestionTitle.innerHTML = randomQuestion.title;
    popupAnswer.innerHTML = `<p>${randomQuestion.content}</p>`;
    
    // Скрываем ответ, когда открывается попап
    popupAnswer.classList.remove('show');
  }
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
  showRandomQuestion(); // Показываем новый случайный вопрос
});

// Обработчик для клика по заголовку аккордеона (блок теперь кликабельный)
document.querySelector('.accordion-header').addEventListener('click', () => {
  popupAnswer.classList.toggle('show'); // Показываем или скрываем ответ
});

// Загружаем данные при загрузке страницы
window.addEventListener('DOMContentLoaded', loadQuestions);
