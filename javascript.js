//-----------------------------Declarations-----------------------------//
const myLibrary = [];
const bookCards = document.querySelector("#book-cards");

const newBookForm = document.querySelector("form");
const addNewBookBtn = document.querySelector(".add-new-book");

const submitBookBtn = document.querySelector("#submit-book-btn");

//-----------------------------Classes-----------------------------//
class Book {
  constructor(title, author, pages, haveRead, notes, bookID) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.notes = notes;
    this.bookID = bookID;
    addBookToMyLibrary(this);
  }

  haveReadMessage() {
    return this.haveRead ? "read" : "not read yet";
  }
}

//intial books
const book0 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true, "", 0);
const book1 = new Book("The Shining", "Stephen King", 303, true, "", 1);
const book2 = new Book("The Road", "Cormac McCarthy", 244, false, "", 2);
const book3 = new Book("Moby Dick", "Herman Melville", 478, false, "", 3);

//-----------------------------Methods-----------------------------//

//from initial assignment
// Book.prototype.info = function() {
//   return `${this.title} by ${this.author}, ${this.pages}, ${this.haveReadMessage()}`;
// }

//-----------------------------Functions-----------------------------//
function addBookToMyLibrary(book) {
  myLibrary.push(book);
}

function createElementWithClass(elementType, className, insertText) {
  const tempElement = document.createElement(elementType);
  tempElement.className = className;
  if (insertText === "") {
    //nothing
  } else {
    tempElement.textContent = insertText;
  }
  return tempElement;
}

//remove book from page and array
function delBtnFunction(btn) {
  let delBookID = +btn.parentElement.getAttribute("data-book-id");
  for (i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].bookID === delBookID) {
      myLibrary.splice(i, 1);
      break;
    }
  }
  btn.parentElement.remove();
}

function haveReadBtnFnc(HRBtnElement, currentBook) {
  if (currentBook.haveRead) {
    HRBtnElement.classList.remove("haveReadTrue");
    HRBtnElement.classList.add("haveReadFalse");
    currentBook.haveRead = false;
    HRBtnElement.textContent = currentBook.haveReadMessage();
  } else {
    HRBtnElement.classList.remove("haveReadFalse");
    HRBtnElement.classList.add("haveReadTrue");
    currentBook.haveRead = true;
    HRBtnElement.textContent = currentBook.haveReadMessage();
  }
}

//create book elements and add to page
function addBookToPage(book) {
  const newBookCard = createElementWithClass("div", "book-card", "");
  newBookCard.setAttribute("data-book-id", book.bookID);

  const newBookTitle = createElementWithClass("div", "title", book.title);
  const newBookAuthor = createElementWithClass("div", "author", book.author);
  const newBookPages = createElementWithClass("div", "pages", book.pages);

  const newBookHaveRead = createElementWithClass(
    "button",
    "haveRead",
    book.haveReadMessage()
  );
  if (book.haveRead) {
    newBookHaveRead.classList.add("haveReadTrue");
  } else {
    newBookHaveRead.classList.add("haveReadFalse");
  }

  newBookHaveRead.addEventListener("click", function () {
    haveReadBtnFnc(newBookHaveRead, book);
  });

  const newBookNotes = createElementWithClass(
    "div",
    "notes",
    "Notes: " + book.notes
  );
  const newBookDelBtn = createElementWithClass("button", "del-button", "✖");

  newBookDelBtn.addEventListener("click", function () {
    delBtnFunction(newBookDelBtn);
  });

  newBookCard.appendChild(newBookTitle);
  newBookCard.appendChild(newBookAuthor);
  newBookCard.appendChild(newBookPages);
  newBookCard.appendChild(newBookHaveRead);
  newBookCard.appendChild(newBookNotes);
  newBookCard.appendChild(newBookDelBtn);
  bookCards.appendChild(newBookCard);
}

//add intial books on page load
myLibrary.forEach((book) => {
  addBookToPage(book);
});

//initilize bookID after adding books to library
let nextBookID =
  myLibrary.length === 0 ? 0 : myLibrary[myLibrary.length - 1].bookID + 1;

//-----------------------------Event Listeners-----------------------------//

//hides/unhides form and form button
addNewBookBtn.addEventListener("click", function () {
  newBookForm.classList.remove("hidden");
  addNewBookBtn.classList.add("hidden");
});

//Submit button for adding a book. Only works if form is valid
submitBookBtn.addEventListener("click", function (event) {
  // event.preventDefault();

  if (newBookForm.checkValidity()) {
    const newTitle = document.querySelector("#title").value;
    const newAuthor = document.querySelector("#author").value;
    const newPages = document.querySelector("#pages").value;
    const newHaveRead = document.querySelector("#haveRead").checked;
    const newNotes = document.querySelector("#notes").value;
    const bookID = nextBookID;

    //problem with using new book everytime?
    const newBook = new Book(
      newTitle,
      newAuthor,
      newPages,
      newHaveRead,
      newNotes,
      bookID
    );
    addBookToPage(newBook);

    newBookForm.classList.add("hidden");
    addNewBookBtn.classList.remove("hidden");
    newBookForm.reset();

    nextBookID++;
    //no submit form (no refresh page)
    event.preventDefault();
  } else {
    showError();
  }
});

//-------------Form Validation-------------//

//declarations
const newBookTitleInput = document.getElementById("title");
const newBookAuthorInput = document.getElementById("author");
const newBookPagesInput = document.getElementById("pages");

//add error ELs
newBookTitleInput.addEventListener("input", (event) => {
  showError();
});
newBookAuthorInput.addEventListener("input", (event) => {
  showError();
});
newBookPagesInput.addEventListener("input", (event) => {
  showError();
});

//handles all error cases
function showError() {
  //title
  if (newBookTitleInput.validity.tooLong) {
    newBookTitleInput.setCustomValidity("too long!");
  } else if (newBookTitleInput.validity.tooShort) {
    newBookTitleInput.setCustomValidity(
      `too short! needs ${
        newBookTitleInput.minLength - newBookTitleInput.value.length
      } more character(s)`
    );
  } else {
    newBookTitleInput.setCustomValidity("");
  }
  //author
  if (newBookAuthorInput.validity.tooLong) {
    newBookAuthorInput.setCustomValidity("too long!");
  } else if (newBookAuthorInput.validity.tooShort) {
    newBookAuthorInput.setCustomValidity(
      `too short! needs ${
        newBookAuthorInput.minLength - newBookAuthorInput.value.length
      } more character(s)`
    );
  } else {
    newBookAuthorInput.setCustomValidity("");
  }
  //pages
  if (newBookPagesInput.validity.typeMismatch) {
    newBookPagesInput.setCustomValidity("numbers, yo...");
  } else if (newBookPagesInput.validity.rangeOverflow) {
    newBookPagesInput.setCustomValidity("too much! go outside!");
  } else {
    newBookPagesInput.setCustomValidity("");
  }
}

//-----------------------------Testing-----------------------------//

//debugger
// document.querySelector("body").addEventListener("click", function () {
//   console.log("myLibrary: vvvv");
//   console.table(myLibrary);
//   console.log("nextBookID: " + nextBookID);
//   console.log("======================================================");
// });
