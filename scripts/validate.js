const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__el_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__el-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__el_type_error');
  errorElement.classList.remove('popup__el-error_active');
  errorElement.textContent = '';
};

const isValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__el'));
  const buttonElement = formElement.querySelector('.popup__submite');

  if (formElement.closest('.popup_type_add')) {
    toggleButtonState(inputList, buttonElement);
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submite_inactive');
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove('popup__submite_inactive');
    buttonElement.removeAttribute('disabled', 'false');
  }
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__el',
  submitButtonSelector: '.popup__submite',
  inactiveButtonClass: '.popup__submite_inactive',
  inputErrorClass: '.popup__el_type_error',
  errorClass: '.popup__el-error_active'
});
