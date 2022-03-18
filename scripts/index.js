//Выборка DOM эелементов
const popupElement = document.querySelector('.popup');
const popupElementEdit = document.querySelector('.popup_type_edit');
const popupElementAdd = document.querySelector('.popup_type_add');
const popupElementImg = document.querySelector('.popup_type_img');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupCloseButtonElementEdit = popupElementEdit.querySelector('.popup__close');
const popupCloseButtonElementAdd = popupElementAdd.querySelector('.popup__close');
const popupCloseButtonElementImg = popupElementImg.querySelector('.popup__close');
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

//Функции
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
};

function closePopupByClickOnOverlay(event, popupElement) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(popupElement);
};

function closePopupByEsc(event, popupElement) {
  if (event.key !== 'Escape') {
    return;
  }
  closePopup(popupElement);
};

function submitFormHandler (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupElementEdit);
};

function createCard (item) {
  const cardTemplate = document.querySelector('.item-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardNameElement = cardElement.querySelector('.card__name');
  const cardImageElement = cardElement.querySelector('.card__image');

  cardNameElement.textContent = item.name;
  cardImageElement.src = item.link;
  cardImageElement.alt = item.name;

  setEventListners(cardElement);

  return cardElement;
};

const renderItem = (item, sectionCards) => {
  const cardElement = createCard(item);
  sectionCards.prepend(cardElement);
};

initialCards.forEach((item) => {
  renderItem(item, sectionCards);
});

function setEventListners(cardElement) {
  const cardLike = cardElement.querySelector('.card__like');
  const imgPopup = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__delete').addEventListener('click', handleDelete);
  cardLike.addEventListener('click', function(event) {
    event.target.classList.toggle('card__like_active');
  });

  imgPopup.addEventListener('click', function(event) {
    const nameImage = cardElement.querySelector('.card__name');

    popupImg.src = imgPopup.src;
    popupImg.alt = imgPopup.alt;
    popupCaption.textContent = nameImage.textContent;

    openPopup(popupElementImg);
  });
};

function handleDelete(event) {
  const cardElement = event.target.closest('.card');

  cardElement.remove();
};

function addElement(event) {
  event.preventDefault();

  const card = {name: inputMesto.value, link: inputUrl.value};
  const newCard = createCard(card);
  sectionCards.prepend(newCard);

  closePopup(popupElementAdd);
  inputMesto.value = '';
  inputUrl.value = '';
};


//Регистрируем обработчики событий по клику
popupOpenButtonElementEdit.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup(popupElementEdit);
});
popupOpenButtonElementAdd.addEventListener('click', function() {
  openPopup(popupElementAdd);
});
popupCloseButtonElementEdit.addEventListener('click', function() {
  closePopup(popupElementEdit);
});
popupCloseButtonElementAdd.addEventListener('click', function() {
  closePopup(popupElementAdd);
});
popupCloseButtonElementImg.addEventListener('click', function() {
  closePopup(popupElementImg);
});
popupElementEdit.addEventListener('click', function(event) {
  closePopupByClickOnOverlay(event, popupElementEdit);
});
popupElementAdd.addEventListener('click', function(event) {
  closePopupByClickOnOverlay(event, popupElementAdd);
});
popupElementImg.addEventListener('click', function(event) {
  closePopupByClickOnOverlay(event, popupElementImg);
});
popupElementEdit.addEventListener('keydown', function(event) {
  closePopupByEsc(event, popupElementEdit);
});
popupElementAdd.addEventListener('keydown', function(event) {
  closePopupByEsc(event, popupElementAdd);
});
popupElementImg.addEventListener('keydown', function(event) {
  closePopupByEsc(event, popupElementImg);
});
popupElementEdit.addEventListener('submit', submitFormHandler);
popupElementAdd.addEventListener('submit', addElement);
