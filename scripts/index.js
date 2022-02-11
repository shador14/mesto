const elementLike = document.querySelector('.element__like');
const toggleElementLike = function() {
  elementLike.classList.toggle('element__like_active');
};

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__button-edit');

const openPopup = function() {
  popupElement.classList.add('popup_is-opened');
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


//Регистрируем обработчики событий по клику
elementLike.addEventListener('click', toggleElementLike);
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);

