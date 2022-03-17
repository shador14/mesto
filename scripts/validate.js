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

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function() {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
