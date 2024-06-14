const myLibrary = [];

const bookCards = document.querySelector("#book-cards");

function Book(title, author, pages, haveRead, notes) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = Boolean(haveRead);
  this.notes = notes;
  addBookToMyLibrary(this);
}

Book.prototype.haveReadMessage = () => this.haveRead ? "read" : "not read yet";
Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.haveReadMessage()}`;
};



function addBookToMyLibrary(book) {
  myLibrary.push(book);
}

const book0 = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const book1 = new Book("The Shining", "Stephen King", 303, true);
const book2 = new Book("The Road", "Cormac McCarthy", 244, false);
const book3 = new Book("Moby Dick", "Herman Melville", 478, false);






myLibrary.forEach((book) => {
  addBookToPage(book);
});

function addBookToPage(book) {

  const newBookLink = document.createElement("a");
  newBookLink.className = "book-link";
  newBookLink.setAttribute("href", "");
  
  const newBookCard = document.createElement("div");
  newBookCard.className = "book-card";
  
  const newBookTitle = document.createElement("div");
  newBookTitle.className = "title";
  newBookTitle.textContent = book.title;
  
  const newBookAuthor = document.createElement("div");
  newBookAuthor.className = "author";
  newBookAuthor.textContent = book.author;
  
  const newBookPages = document.createElement("div");
  newBookPages.className = "pages";
  newBookPages.textContent = book.pages + " pages";
  
  const newBookHaveRead = document.createElement("div");
  newBookHaveRead.className = "haveRead";
  newBookHaveRead.textContent = book.haveReadMessage();
  if (book.haveRead) {
    newBookHaveRead.style = "color: green";
  } else {newBookHaveRead.style = "color: red";}

  const newBookNotes = document.createElement("div");
  newBookNotes.className = "notes";
  newBookNotes.textContent = "Notes: " + book.notes;
    
  newBookCard.appendChild(newBookTitle);
  newBookCard.appendChild(newBookAuthor);
  newBookCard.appendChild(newBookPages);
  newBookCard.appendChild(newBookHaveRead);
  newBookCard.appendChild(newBookNotes);

  newBookLink.appendChild(newBookCard);
  
  bookCards.appendChild(newBookLink);
}

const newBookForm = document.querySelector("form");
const addNewBookBtn = document.querySelector(".add-new-book");

addNewBookBtn.addEventListener("click", function() {
  newBookForm.classList.remove("hidden");
  addNewBookBtn.classList.add("hidden");
});




const submitBookBtn = document.querySelector("#submit-book-btn");
submitBookBtn.addEventListener("click", function(event) {
  event.preventDefault();
  
  
  if (newBookForm.checkValidity()) {
  
    const newTitle = document.querySelector("#title").value;
    const newAuthor = document.querySelector("#author").value;
    const newPages = document.querySelector("#pages").value;
    const newHaveRead = document.querySelector("#haveRead").checked;
    const newNotes = document.querySelector("#notes").value;
  
    const newBook = new Book(newTitle, newAuthor, newPages, newHaveRead, newNotes); //needs notes
    addBookToPage(newBook);

    newBookForm.classList.add("hidden");
    addNewBookBtn.classList.remove("hidden"); 
    newBookForm.reset();
  }



});




// document.querySelector("body").addEventListener("click", () => console.log(Object.getPrototypeOf(newHaveRead)));
// document.querySelector("body").addEventListener("click", () => console.log(newHaveRead.checked));

