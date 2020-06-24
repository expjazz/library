const tableBody = document.getElementById("table-body");
let myLibrary = [];
const formButton = document.getElementById("add-book-btn");
const form = document.getElementById("form");
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${this.title} by ${this.author} with ${this.pages} pages, ${this.read}`;
  };
}

let bookOne = new Book(
  "Harry Potter and the Deatly Hallows",
  "J.K Rownlings",
  700,
  "Read"
);

myLibrary.push(bookOne);

function showForm() {
  form.classList.toggle("hidden");
}

function render() {
  let count = 0;
  tableBody.innerHTML = `${myLibrary
    .map((book) => {
      count++;
      return `   <tr>
    <th scope="row">${count}</th>
    <td id="book-title">${book.title}</td>
    <td id="book-author">${book.author}</td>
    <td id="book-pages">${book.pages}</td>
    <td id="book-read">${book.read}</td>
  </tr>`;
    })
    .join("")}`;
}

render();

function addBook(e) {
  e.preventDefault();
  inputs = form.querySelectorAll('input');
  const tempArray = [];
  const tempObj = {

  };
  inputs.forEach((input) => {
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
  x = new Book(tempArray[0], tempArray[1], tempArray[2], tempArray[3])
  console.log(x);
  myLibrary.push(x);
  render();
}

formButton.addEventListener("click", showForm);
form.addEventListener('submit', addBook);
