class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._image = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = this._cardTemplate.content.querySelector('.card').cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__name').textContent = this._name;
    this._cardImg.src = this._image;
    this._cardImg.alt = this._name;

    return this._element;
  };

  _handleEstablishLike() {
    this._cardLike.classList.toggle('card__like_active');
  };

  _handleDelete() {
    this._cardDelete.closest('.card').remove();
  };

  _setEventListeners() {
    this._cardLike = this._element.querySelector('.card__like');
    this._cardDelete = this._element.querySelector('.card__delete');
    this._cardImg = this._element.querySelector('.card__image');

    this._cardLike.addEventListener('click', () => {
      this._handleEstablishLike();
    });

    this._cardDelete.addEventListener('click', () => {
      this._handleDelete();
    });

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._cardImg, this._name);
    });
  };
};

export { Card };
