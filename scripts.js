class Book {

  constructor (title = 'Not Specified', author = 'Not Specified', pages = 0, read = false) {    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

class Library { 
  
  constructor() {
    this.myLibrary = [];    
  }

  addBookToLibrary(newBook) {  
    this.myLibrary.push(newBook);
  }

  // Toggle book read status
  toggleBookReadStatus(_bookId) {
    this.myLibrary[_bookId-1].read = !this.myLibrary[_bookId-1].read;  
  }

  // Remove book from the array
  removeBook(_bookId) {
    return this.myLibrary.splice(_bookId-1, 1);  
  }
 
}

// Add sample books to the table
const newBook1 = new Book("An Awesome Book", "Awesome Writer", "300", false);
const newBook2 = new Book("Another Awesome Book", "Another Awesome Writer", "500", false);
const newBook3 = new Book("3rd Awesome Book", "3rd Awesome Writer", "700", false);

let myCreatedLibrary = new Library();

myCreatedLibrary.addBookToLibrary(newBook1);
myCreatedLibrary.addBookToLibrary(newBook2);
myCreatedLibrary.addBookToLibrary(newBook3);

const btn = document.getElementById('button-toggle-form');

const form = document.getElementById('form-add-new-book');
form.style.display = 'none';

// Reference the table object
const tableBooksTable = document.getElementById('books-table');

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookFromFormData();
  repopulateTable();
  addButtonEventListener();
  
});

// show/hide the form on button click
btn.addEventListener('click', () => {
  if (form.style.display == 'none') {
    // this SHOWS the form
    form.style.display = 'block';
  } else {
    // this HIDES the form
    form.style.display = 'none';
  }
});

// Add event listeners for Toogle Read and Remove Book buttons
const addButtonEventListener = () => {

  var btns = document.querySelectorAll('.button-read-toggle');
  btns.forEach(function (btn) {
    btn.addEventListener('click', function() {      
      myCreatedLibrary.toggleBookReadStatus(btn.id);
      repopulateTable();

      addButtonEventListener();
    });
  });

  var removeBtns = document.querySelectorAll('.button-remove-book');
  removeBtns.forEach(function (btn) {
    btn.addEventListener('click', function() {      
      myCreatedLibrary.removeBook(btn.id);
      repopulateTable();
      addButtonEventListener();
    });
  });

}

// Repopulate the table 
const repopulateTable = () => {
  tableBooksTable.removeChild(tableBooksTable.getElementsByTagName("tbody")[0]);
  tableBooksTable.appendChild(populateBooks());
}

// Clears the add new book form
const clearForm = () => {
  document.getElementById("book-name").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-pages").value = "";
}

// Adds a new book to the table from the form data
const addBookFromFormData = () => {
  const newBook = new Book(
                        document.getElementById("book-name").value,
                        document.getElementById("book-author").value,
                        document.getElementById("book-pages").value,
                        false
    );
    myCreatedLibrary.addBookToLibrary(newBook);
    clearForm();
}

// Generate the tbody tag populated with the books for the table 
const populateBooks = () => {

  let tableBooksTableBody = document.createElement('tbody');
  let i = 1;

  myCreatedLibrary.myLibrary.forEach((book) => {

    // Create a new <tr> for each book
    let newBookRow = document.createElement("tr");

    let newBookSNo = document.createElement("td");
    let newBookSNoValue = document.createTextNode(i);
    newBookSNo.appendChild(newBookSNoValue);
    newBookRow.appendChild(newBookSNo);
    
    // Create a new td for each property of the book 
    for(let property in book){      
      let newColumn = document.createElement("td");
      let newColumnData = document.createTextNode(book[property]);
      newColumn.appendChild(newColumnData);
      newBookRow.appendChild(newColumn);
    }
    
    // Add the Toggle Read button
    let newColumnReadButton = document.createElement("td");
    let buttonBookReadToggle = document.createElement("button");  
    buttonBookReadToggle.type = "button";
    buttonBookReadToggle.innerText = "Toggle Read";
    buttonBookReadToggle.id = i;
    buttonBookReadToggle.classList.add("button-read-toggle");
    newColumnReadButton.appendChild(buttonBookReadToggle);
    newBookRow.appendChild(newColumnReadButton);

    // Add the Remove Book button
    let newColumnRemoveButton = document.createElement("td");
    let buttonBookRemove = document.createElement("button");
    buttonBookRemove.type = "button";
    buttonBookRemove.innerText = "Remove Book";
    buttonBookRemove.id = i;
    buttonBookRemove.classList.add("button-remove-book");
    newColumnRemoveButton.appendChild(buttonBookRemove);
    newBookRow.appendChild(newColumnRemoveButton);     

    // Add <tr> tag to the <tbody> 
    tableBooksTableBody.appendChild(newBookRow);
    
    i++;

  });
  
  //returns the <tbody> tag with book data
  return tableBooksTableBody;
  
}

// append the <tbody> tag to the table
tableBooksTable.appendChild(populateBooks());

addButtonEventListener();