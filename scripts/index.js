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

function renderItems(initialCards) {
  initialCards.forEach(renderItem);
};

renderItems(initialCards);

function renderItem(item) {
  const cardTemplate = document.querySelector('.item-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardNameElement = cardElement.querySelector('.card__name');
  const cardImageElement = cardElement.querySelector('.card__image');

  cardNameElement.textContent = item.name;
  cardImageElement.src = item.link;
  cardImageElement.alt = item.name;

  setEventListners(cardElement);

  sectionCards.prepend(cardElement);
};

function setEventListners(cardElement) {
  const cardLike = cardElement.querySelector('.card__like');

  cardElement.querySelector('.card__delete').addEventListener('click', handleDelete);
  cardLike.addEventListener('click', function(event) {
    event.target.classList.toggle('card__like_active');
  });
};

function handleDelete(event) {
  const cardElement = event.target.closest('.card');

  cardElement.remove();
};

function addElement(event) {
  event.preventDefault();

  const cardTemplate = document.querySelector('.item-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardNameElement = cardElement.querySelector('.card__name');
  const cardImageElement = cardElement.querySelector('.card__image');

  cardNameElement.textContent = inputMesto.value;
  cardImageElement.src = inputUrl.value;
  cardImageElement.alt = inputMesto.value;

  sectionCards.prepend(cardElement);
  closePopupAdd();
  setEventListners(cardElement);
};

//Регистрируем обработчики событий по клику
popupOpenButtonElementEdit.addEventListener('click', openPopup);
popupOpenButtonElementAdd.addEventListener('click', openPopup);
popupCloseButtonElementEdit.addEventListener('click', closePopupEdit);
popupCloseButtonElementAdd.addEventListener('click', closePopupAdd);
popupElementEdit.addEventListener('click', closePopupByClickOnOverlay);
popupElementAdd.addEventListener('click', closePopupByClickOnOverlay);
popupElementEdit.addEventListener('submit', formSubmitHandler);
popupElementAdd.addEventListener('submit', addElement);
