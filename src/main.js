const myLibrary = JSON.parse(localStorage.getItem('Books')) || [];
const tableBody = document.getElementById('table-body');
const formButton = document.getElementById('add-book-btn');
const form = document.getElementById('form');
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => `${this.title} by ${this.author} with ${this.pages} pages, ${this.read}`;
}

function showForm() {
  form.classList.toggle('hidden');
}

function render() {
  let count = 0;
  tableBody.innerHTML = `${myLibrary
    .map((book) => {
      count += 1;
      return `   <tr>
    <th scope="row">${count}</th>
    <td id="book-title">${book.title}</td>
    <td id="book-author">${book.author}</td>
    <td id="book-pages">${book.pages}</td>
    <td id="book-read">
    <span class="mr-3"> ${book.read} </span>
    <button class="btn btn-primary btn-sm" id="btn-read-status-${count}">
      Status
    </button>
    </td>
    <td class="mid="delete">
    <button class="btn btn-danger btn-sm" id="btn-remove-${count}">
      Remove
    </button>
  </td>
  </tr>`;
    })
    .join('')}`;
}

render();

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
};

function addBook(e) {
  e.preventDefault();
  const inputs = form.querySelectorAll('input');
  const validator = [];
  const tempArray = [];
  inputs.forEach((input) => {
    validator.push(errors(input));
    if (input.type === 'checkbox') {
      if (input.checked) {
        tempArray.push('Read');
      } else {
        tempArray.push('Not Read');
      }
    } else {
      tempArray.push(input.value);
    }
  });
  if (validator.includes(false)) {
    return;
  }
  const x = new Book(tempArray[0], tempArray[1], tempArray[2], tempArray[3]);
  if (checkIfValid(x)) {
    alert(`${x.title} is already in the library.`);
    form.reset();
    form.querySelectorAll('input').forEach(i => i.classList.remove('is-valid'));
    return;
  }
  myLibrary.push(x);
  render();
  localStorage.setItem('Books', JSON.stringify(myLibrary));
}

function readStatus(e) {
  if (e.target.id.includes('btn-read-status')) {
    const el = e.target.id.split('-');
    const elId = el[el.length - 1];
    const tempObj = myLibrary[elId - 1];
    if (tempObj.read === 'Read') {
      tempObj.read = 'Not Read';
    } else {
      tempObj.read = 'Read';
    }
  } else if (e.target.id.includes('btn-remove')) {
    const el = e.target.id.split('-');
    const elId = el[el.length - 1];
    myLibrary.splice(elId - 1, 1);
  }
  localStorage.setItem('Books', JSON.stringify(myLibrary));
  render();
}

formButton.addEventListener('click', showForm);
form.addEventListener('submit', addBook);
tableBody.addEventListener('click', readStatus);
