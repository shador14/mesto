class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage) {
    const { inputErrorClass, errorClass } = this._settings;
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._settings;
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  _isValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonDisabled() {
    const { inactiveButtonClass } = this._settings;

    this._buttonElement.classList.add(inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'true');
  };

  _toggleButtonEnabled() {
    const { inactiveButtonClass } = this._settings;

    this._buttonElement.classList.remove(inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', 'false');
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._toggleButtonDisabled();
    } else {
      this._toggleButtonEnabled();
    }
  };

  _setEventListeners() {
    const { inputSelector, submitButtonSelector } = this._settings;

    this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
    this._buttonElement = this._form.querySelector(submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  };

  resetInputError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  };

  resetValidation() {
    this._form.reset();
    this.resetInputError();
  };
};

export { FormValidator };
