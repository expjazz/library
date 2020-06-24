const myLibrary = JSON.parse(localStorage.getItem("Books")) || [];
const tableBody = document.getElementById("table-body");
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
    .join("")}`;
}

render();

function addBook(e) {
  e.preventDefault();
  inputs = form.querySelectorAll("input");
  const tempArray = [];
  const tempObj = {};
  inputs.forEach((input) => {
    if (input.type === "checkbox") {
      if (input.checked) {
        tempArray.push("Read");
      } else {
        tempArray.push("Not Read");
      }
    } else {
      tempArray.push(input.value);
    }
  });
  x = new Book(tempArray[0], tempArray[1], tempArray[2], tempArray[3]);
  console.log(x);
  myLibrary.push(x);
  render();
  localStorage.setItem("Books", JSON.stringify(myLibrary));
}

function readStatus(e) {
  if (e.target.id.includes("btn-read-status")) {
    let el = e.target.id.split("-");
    let elId = el[el.length - 1];
    let tempObj = myLibrary[elId - 1];
    if (tempObj.read === "Read") {
      tempObj.read = "Not Read";
    } else {
      tempObj.read = "Read";
    }
  } else if (e.target.id.includes("btn-remove")) {
    let el = e.target.id.split("-");
    let elId = el[el.length - 1];
    console.log(myLibrary.splice(elId - 1, 1));
  }
  localStorage.setItem("Books", JSON.stringify(myLibrary));
  render();
}

formButton.addEventListener("click", showForm);
form.addEventListener("submit", addBook);
tableBody.addEventListener("click", readStatus);
