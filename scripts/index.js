//Выборка DOM эелементов
const popupElement = document.querySelector('.popup');
const popupElementEdit = document.querySelector('.popup_type_edit');
const popupElementAdd = document.querySelector('.popup_type_add');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElementEdit = document.querySelector('.profile__button-edit');
const popupOpenButtonElementAdd = document.querySelector('.profile__button-add');

// console.log(popupCloseButtonElement);

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = popupElement.querySelector('.popup__el_type_name');
const inputJob = popupElement.querySelector('.popup__el_type_job');

//Функции
const openPopup = function(event) {
  if (event.target === popupOpenButtonElementEdit) {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    popupElementEdit.classList.add('popup_is-opened');
  } else
    if (event.target === popupOpenButtonElementAdd) {
      popupElementAdd.classList.add('popup_is-opened');
    }
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
popupOpenButtonElementEdit.addEventListener('click', openPopup);
popupOpenButtonElementAdd.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupElement.addEventListener('submit', formSubmitHandler);
