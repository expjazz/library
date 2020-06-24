const tableBody = document.getElementById("table-body");
let myLibrary = [];
const formButton = document.getElementById("add-book-btn");
const form = document.getElementById("form");
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = "Not Read";
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
