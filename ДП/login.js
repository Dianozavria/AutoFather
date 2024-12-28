// Элементы
const formOpen = document.getElementById('form-open');
const overlay = document.getElementById('overlay');
const formPopup = document.getElementById('form-popup');
const form = document.getElementById('authForm');
const nameInput = document.getElementById('name');
const telInput = document.getElementById('tel');
const passInput = document.getElementById('pass');
const nameError = document.getElementById('nameError');
const telError = document.getElementById('telError');
const passError = document.getElementById('passError');

// Функция для закрытия формы
function closeForm() {
    formPopup.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Включаем прокрутку
    formPopup.innerHTML = ''; // Очищаем форму
}

// Открыть форму
formOpen.addEventListener('click', (e) => {
    e.preventDefault(); // Отключаем переход по ссылке

    // Загружаем форму из внешнего файла
    fetch('loginform.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            formPopup.innerHTML = html; // Добавляем форму в контейнер
            formPopup.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы

            // Назначаем обработчик закрытия на кнопку внутри формы
            const formClose = document.getElementById('close-btn');
            if (formClose) {
                formClose.addEventListener('click', closeForm);
            } else {
                console.error('Кнопка с ID "close-btn" не найдена');
            }
        })
        .catch(error => console.error('Ошибка загрузки формы:', error));
});

// Закрыть форму при клике на затемнение
overlay.addEventListener('click', closeForm);


document.getElementById('auth-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let valid = true;


    resetErrors();

const nameRegex = /^[A-ZА-Я][a-zа-яё]*$/;
if (!nameRegex.test(nameInput.value)) {
  nameError.textContent = 'Имя должно начинаться с заглавной буквы.';
  nameError.style.display = 'block';
  nameInput.classList.add('error');
  valid = false;
} else {
  nameError.style.display = 'none';
  nameInput.classList.remove('error');
}

// Проверка телефона

const telRegex = /^\+375\d{9}$/;
if (!telRegex.test(telInput.value)) {
  telError.textContent = 'Номер телефона должен быть в формате +375XXXXXXXXX.';
  telError.style.display = 'block';
  telInput.classList.add('error');
  valid = false;
} else {
  telError.style.display = 'none';
  telInput.classList.remove('error');
}

// Проверка пароля

if (passInput.value.length < 8) {
  passError.textContent = 'Пароль должен быть не менее 8 символов.';
  passError.style.display = 'block';
  passInput.classList.add('error');
  valid = false;
} else {
  passError.style.display = 'none';
  passInput.classList.remove('error');
}

});


function resetErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorInputs = document.querySelectorAll('.input-group input');

    errorMessages.forEach(function (message) {
        message.style.display = 'none';
    });
    errorInputs.forEach(function (input) {
        input.classList.remove('error');
    });
}


// Подключение обработчика для показа/скрытия пароля
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('pass');
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type; // Переключение типа поля
});