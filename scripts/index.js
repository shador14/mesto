import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//Выборка DOM эелементов
const popupElementEdit = document.querySelector('.popup_type_edit');
const popupElementAdd = document.querySelector('.popup_type_add');
const popupElementImg = document.querySelector('.popup_type_img');
const popupOpenButtonElementEdit = document.querySelector('.profile__button-edit');
const popupOpenButtonElementAdd = document.querySelector('.profile__button-add');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = popupElementEdit.querySelector('.popup__el_type_name');
const inputJob = popupElementEdit.querySelector('.popup__el_type_job');
const inputMesto = popupElementAdd.querySelector('.popup__el_type_mesto');
const inputUrl = popupElementAdd.querySelector('.popup__el_type_url');

const popupImg = popupElementImg.querySelector('.popup__img');
const popupCaption = popupElementImg.querySelector('.popup__caption');

const sectionCards = document.querySelector('.cards');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const options = {
  formSelector: '.popup__container',
  inputSelector: '.popup__el',
  submitButtonSelector: '.popup__submite',
  inactiveButtonClass: 'popup__submite_inactive',
  inputErrorClass: 'popup__el_type_error',
  errorClass: 'popup__el-error_active',
  popupTypeAdd: '.popup_type_add'
};

const addCardForm = popupElementAdd.querySelector('.popup__container');
const editProfileForm = popupElementEdit.querySelector('.popup__container');

const addCardFormValidator = new FormValidator(options, addCardForm);
const editProfileFormValidator = new FormValidator(options, editProfileForm);

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

//Функции
function renderItems(item) {
  const cardTemplate = document.querySelector('.item-template');
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();

  sectionCards.prepend(cardElement);
};

initialCards.forEach((item) => {
  renderItems(item);
});

function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const popupElement = document.querySelector('.popup_is-opened');
    closePopup(popupElement);
  }
};

function handleSubmitEditProfile (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupElementEdit);
};

function addElement(event) {
  event.preventDefault();

  const buttonElement = popupElementAdd.querySelector('.popup__submite')
  const newCard = ({name: inputMesto.value, link: inputUrl.value});
  renderItems(newCard);

  closePopup(popupElementAdd);
  popupElementAdd.querySelector('.popup__container').reset();
  buttonElement.classList.add(options.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'true');
};

function handleCardClick(cardImg, name) {
  popupImg.src = cardImg.src;
  popupImg.alt = name;
  popupCaption.textContent = name;

openPopup(popupElementImg);
};

//Регистрируем обработчики событий по клику
popupOpenButtonElementEdit.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup(popupElementEdit);
});
popupOpenButtonElementAdd.addEventListener('click', function() {
  // addCardFormValidator.resetValidation();
  // addCardFormValidator.toggleButtonDisabled();
  addCardFormValidator.resetValidation();
  openPopup(popupElementAdd);
});
popupElementEdit.addEventListener('click', function(event) {
  if (event.target.className === 'popup__close' || event.target === event.currentTarget) {
    closePopup(popupElementEdit);
  }
});
popupElementAdd.addEventListener('click', function(event) {
  if (event.target.className === 'popup__close' || event.target === event.currentTarget) {
    closePopup(popupElementAdd);
  }
});
popupElementImg.addEventListener('click', function(event) {
  if (event.target.className === 'popup__close' || event.target === event.currentTarget) {
    closePopup(popupElementImg);
  }
});
popupElementEdit.addEventListener('submit', handleSubmitEditProfile);
popupElementAdd.addEventListener('submit', addElement);
