//Выборка DOM эелементов
const popupElement = document.querySelector('.popup');
const popupElementEdit = document.querySelector('.popup_type_edit');
const popupElementAdd = document.querySelector('.popup_type_add');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupCloseButtonElementEdit = popupElementEdit.querySelector('.popup__close');
const popupCloseButtonElementAdd = popupElementAdd.querySelector('.popup__close');
const popupOpenButtonElementEdit = document.querySelector('.profile__button-edit');
const popupOpenButtonElementAdd = document.querySelector('.profile__button-add');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = popupElementEdit.querySelector('.popup__el_type_name');
const inputJob = popupElementEdit.querySelector('.popup__el_type_job');
const inputMesto = popupElementAdd.querySelector('.popup__el_type_mesto');
const inputUrl = popupElementAdd.querySelector('.popup__el_type_url');

// console.log(inputUrl);

//Функции
const openPopup = function(event) {
  if (event.target === popupOpenButtonElementEdit) {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    popupElementEdit.classList.add('popup_is-opened');
  } else
    if (event.target === popupOpenButtonElementAdd) {
      inputMesto.placeholder = 'Название';
      inputUrl.placeholder = 'Ссылка на картинку';
      popupElementAdd.classList.add('popup_is-opened');
    }
};

const closePopupEdit = function() {
  popupElementEdit.classList.remove('popup_is-opened');
};

const closePopupAdd = function() {
  popupElementAdd.classList.remove('popup_is-opened');
};

// const closePopup = function(event) {
//   const popupElement = event.target.closest('.popup');
//   popupElement.classList.remove('popup_is-opened');
// };

const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopupEdit()
  closePopupAdd()
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupEdit();
};

//Регистрируем обработчики событий по клику
popupOpenButtonElementEdit.addEventListener('click', openPopup);
popupOpenButtonElementAdd.addEventListener('click', openPopup);
popupCloseButtonElementEdit.addEventListener('click', closePopupEdit);
popupCloseButtonElementAdd.addEventListener('click', closePopupAdd);
popupElementEdit.addEventListener('click', closePopupByClickOnOverlay);
popupElementAdd.addEventListener('click', closePopupByClickOnOverlay);
popupElementEdit.addEventListener('submit', formSubmitHandler);
