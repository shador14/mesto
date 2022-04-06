// //Выборка DOM эелементов
// const popupElement = document.querySelector('.popup');
const popupElementEdit = document.querySelector('.popup_type_edit');
const popupElementAdd = document.querySelector('.popup_type_add');
const popupElementImg = document.querySelector('.popup_type_img');
// const popupCloseButtonElement = popupElement.querySelector('.popup__close');
// const popupCloseButtonElementEdit = popupElementEdit.querySelector('.popup__close');
// const popupCloseButtonElementAdd = popupElementAdd.querySelector('.popup__close');
// const popupCloseButtonElementImg = popupElementImg.querySelector('.popup__close');
const popupOpenButtonElementEdit = document.querySelector('.profile__button-edit');
const popupOpenButtonElementAdd = document.querySelector('.profile__button-add');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const inputName = popupElementEdit.querySelector('.popup__el_type_name');
const inputJob = popupElementEdit.querySelector('.popup__el_type_job');
// const inputMesto = popupElementAdd.querySelector('.popup__el_type_mesto');
// const inputUrl = popupElementAdd.querySelector('.popup__el_type_url');

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

// //Функции
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

// function handleSubmitEditProfile (evt) {
//   evt.preventDefault();
//   profileName.textContent = inputName.value;
//   profileJob.textContent = inputJob.value;
//   closePopup(popupElementEdit);
// };

// function createCard (item) {
//   const cardTemplate = document.querySelector('.item-template').content;
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
//   const cardNameElement = cardElement.querySelector('.card__name');
//   const cardImageElement = cardElement.querySelector('.card__image');

//   cardNameElement.textContent = item.name;
//   cardImageElement.src = item.link;
//   cardImageElement.alt = item.name;

//   setEventListners(cardElement);

//   return cardElement;
// };

// function addElement(event) {
//   event.preventDefault();

//   const buttonElement = popupElementAdd.querySelector('.popup__submite')
//   const newCard = createCard({name: inputMesto.value, link: inputUrl.value});
//   sectionCards.prepend(newCard);

//   closePopup(popupElementAdd);
//   popupElementAdd.querySelector('.popup__container').reset();
//   toggleButtonDisabled(buttonElement, options);
// };

// //Регистрируем обработчики событий по клику
popupOpenButtonElementEdit.addEventListener('click', function() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup(popupElementEdit);
});
popupOpenButtonElementAdd.addEventListener('click', function() {
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
// popupElementEdit.addEventListener('submit', handleSubmitEditProfile);
// popupElementAdd.addEventListener('submit', addElement);


////
class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  };

  _getTemplate() {
    const cardElement = this._cardSelector.content.querySelector('.card').cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__image').src = this._image;

    return this._element;
  };

  _handleEstablishLike(_cardLike) {
    _cardLike.classList.toggle('card__like_active');
  };

  _handleDelete(_cardDelete) {
    _cardDelete.closest('.card').remove();
  };

  _handlePreviewImg(_cardImg) {
    const _nameImage = this._element.querySelector('.card__name');

    popupImg.src = _cardImg.src;
    popupImg.alt = _cardImg.alt;
    popupCaption.textContent = _nameImage.textContent;

    openPopup(popupElementImg);
  };

  _setEventListeners() {
    const _cardLike = this._element.querySelector('.card__like');
    const _cardDelete = this._element.querySelector('.card__delete');
    const _cardImg = this._element.querySelector('.card__image');

    _cardLike.addEventListener('click', () => {
      this._handleEstablishLike(_cardLike);
    });

    _cardDelete.addEventListener('click', () => {
      this._handleDelete(_cardDelete);
    });

    _cardImg.addEventListener('click', () => {
      this._handlePreviewImg(_cardImg);
    });
  };
};

initialCards.forEach((item) => {
  const cardSelector = document.querySelector('.item-template');
  const card = new Card(item, cardSelector);
  const cardElement = card.generateCard();

  sectionCards.prepend(cardElement);
});
