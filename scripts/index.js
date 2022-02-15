//Выборка DOM эелементов
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');

const submitPopup = document.querySelector('.popup__submite');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = popupElement.querySelector('.popup__el_type_name');
const inputJob = popupElement.querySelector('.popup__el_type_job');

//Функции
const openPopup = function() {
  popupElement.classList.add('popup_is-opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

const closePopup = function() {
  popupElement.classList.remove('popup_is-opened');
};

const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup()
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup();
};

//Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupElement.addEventListener('submit', formSubmitHandler);
