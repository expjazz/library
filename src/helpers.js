/* eslint-disable import/extensions */

import {
  myLibrary, form,
} from './elements.js';

const formReset = () => {
  const inputs = form.querySelectorAll('input');
  inputs.forEach((i) => i.classList.remove('is-valid'));
  form.reset();
};

function showForm() {
  form.classList.toggle('hidden');
}

function checkIfValid(object) {
  let checked = false;
  myLibrary.forEach((book) => {
    const regex = new RegExp(book.title, 'gi');
    if (object.title.match(regex) !== null) {
      checked = true;
    }
  });
  return checked;
}

const errors = (input) => {
  if (input.type !== 'checkbox') {
    const small = input.parentNode.querySelector('small');

    if (input.value === '') {
      input.classList.add('is-invalid');
      small.innerText = `The ${input.placeholder} can't be empty`;
      small.classList.add('text-danger');
      return false;
    }
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    small.innerText = `The ${input.placeholder} is valid`;
    small.classList.remove('text-danger');
    return true;
  }
  return '';
};

export {
  formReset, showForm, errors, checkIfValid,
};