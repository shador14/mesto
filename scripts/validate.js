const options = {
  formSelector: '.popup__container',
  inputSelector: '.popup__el',
  submitButtonSelector: '.popup__submite',
  inactiveButtonClass: 'popup__submite_inactive',
  inputErrorClass: 'popup__el_type_error',
  errorClass: 'popup__el-error_active',
  popupTypeAdd: '.popup_type_add'
};

const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
};

const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
};

const isValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  if (formElement.closest(options.popupTypeAdd)) {
    toggleButtonState(inputList, buttonElement, options);
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValidity(formElement, inputElement, options);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    toggleButtonDisabled(buttonElement, options);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'false');
  }
};

const toggleButtonDisabled = (buttonElement, options) => {
  buttonElement.classList.add(options.inactiveButtonClass);
  buttonElement.setAttribute('disabled', 'true');
};

enableValidation(options);
