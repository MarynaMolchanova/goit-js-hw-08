import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

formEl.addEventListener('submit', formSubmit);
formEl.addEventListener('input', throttle(saveValueForm, 500));

updateValueForm();

function formSubmit(event) {
  event.preventDefault();

  const { email, message } = event.currentTarget;
  const valueInput = { email: email.value, message: message.value };

  console.log(valueInput);
  event.currentTarget.reset();
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
  
}

function saveValueForm(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function updateValueForm() {
  if (localStorage.getItem(STORAGE_KEY)) {
    formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    for (const key in formData) {
      formEl.elements[key].value = formData[key];
    }
  }
}
