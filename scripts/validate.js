const formElement = document.querySelector('.popup__container');
const formInput = formElement.querySelector('.popup__el');

const showError = (input) => {
  input.classList.add('popup__el_type_error');
};

const hideError = (input) => {
  input.classList.remove('popup__el_type_error');
};

const isValidity = () => {
  if (!formInput.validity.valid) {
    showError(formInput);
  } else {
    hideError(formInput);
  }
};



formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  isValidity();
});
