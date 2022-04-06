export { FormValidator };

class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  };

  _isValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonDisabled(buttonElement) {
    buttonElement.classList.add(this._settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  };

  _toggleButtonEnabled(buttonElement) {
    buttonElement.classList.remove(this._settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'false');
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._toggleButtonDisabled(buttonElement);
    } else {
      this._toggleButtonEnabled(buttonElement);
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);

    if (this._form.closest(this._settings.popupTypeAdd)) {
      this._toggleButtonState(inputList, buttonElement);
    };

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  };
};
