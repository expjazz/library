const myLibrary = JSON.parse(localStorage.getItem('Books')) || [];
const tableBody = document.getElementById('table-body');
const formButton = document.getElementById('add-book-btn');
const form = document.getElementById('form');

export {
  myLibrary, tableBody, formButton, form,
};