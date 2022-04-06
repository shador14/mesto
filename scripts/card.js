export { Card };
import { popupImg, popupCaption, openPopup, popupElementImg } from './index.js';

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
