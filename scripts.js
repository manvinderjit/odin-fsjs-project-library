let myLibrary = [];

function Book(title, author, pages, read) {    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    
}

function addBookToLibrary(newBook) {  
  myLibrary.push(newBook);
}

function addButtonEventListener (){

  var btns = document.querySelectorAll('.button-read-toggle');
  btns.forEach(function (btn) {
    btn.addEventListener('click', function() {      
      toggleBookReadStatus(btn.id);
      repopulateTable();

      addButtonEventListener();
    });
  });

  var removeBtns = document.querySelectorAll('.button-remove-book');
  removeBtns.forEach(function (btn) {
    btn.addEventListener('click', function() {      
      removeBook(btn.id);
      repopulateTable();
      addButtonEventListener();
    });
  });
  
}

function toggleBookReadStatus(_bookId) {
  myLibrary[_bookId-1].read = !myLibrary[_bookId-1].read;  
}

function removeBook(_bookId) {
  let newLibraryArray = myLibrary.splice(_bookId-1, 1);
  
}

function repopulateTable (){
  tableBooksTable.removeChild(tableBooksTable.getElementsByTagName("tbody")[0]);
  tableBooksTable.appendChild(populateBooks());
}

function clearForm (){
  document.getElementById("book-name").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-pages").value = "";
}

function addBookFromFormData (){
  const newBook = new Book(
                        document.getElementById("book-name").value,
                        document.getElementById("book-author").value,
                        document.getElementById("book-pages").value,
                        false
    );
    addBookToLibrary(newBook);
    clearForm();
}

const btn = document.getElementById('button-toggle-form');

const form = document.getElementById('form-add-new-book');
form.style.display = 'none';

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookFromFormData();
  repopulateTable();
  addButtonEventListener();
  
});


btn.addEventListener('click', () => {
  if (form.style.display == 'none') {
    // this SHOWS the form
    form.style.display = 'block';
  } else {
    // this HIDES the form
    form.style.display = 'none';
  }
});

const newBook1 = new Book("An Awesome Book", "Awesome Writer", "300", false);
const newBook2 = new Book("Another Awesome Book", "Another Awesome Writer", "500", false);
const newBook3 = new Book("3rd Awesome Book", "3rd Awesome Writer", "700", false);

addBookToLibrary(newBook1);
addBookToLibrary(newBook2);
addBookToLibrary(newBook3);

const tableBooksTable = document.getElementById('books-table');

// Generate the tbody tag populated with the books for the table 
function populateBooks (){

  let tableBooksTableBody = document.createElement('tbody');
  let i = 1;

  myLibrary.forEach((book) => {
    let newBookRow = document.createElement("tr");
    let newBookSNo = document.createElement("td");
    let newBookSNoValue = document.createTextNode(i);
    newBookSNo.appendChild(newBookSNoValue);
    newBookRow.appendChild(newBookSNo);
    

    for(let property in book){      
      let newColumn = document.createElement("td");
      let newColumnData = document.createTextNode(book[property]);
      newColumn.appendChild(newColumnData);
      newBookRow.appendChild(newColumn);
    }
    
    let newColumnReadButton = document.createElement("td");
    let buttonBookReadToggle = document.createElement("button");  
    buttonBookReadToggle.type = "button";
    buttonBookReadToggle.innerText = "Toggle Read";
    buttonBookReadToggle.id = i;
    buttonBookReadToggle.classList.add("button-read-toggle");
    newColumnReadButton.appendChild(buttonBookReadToggle);
    newBookRow.appendChild(newColumnReadButton);

    let newColumnRemoveButton = document.createElement("td");
    let buttonBookRemove = document.createElement("button");
    buttonBookRemove.type = "button";
    buttonBookRemove.innerText = "Remove Book";
    buttonBookRemove.id = i;
    buttonBookRemove.classList.add("button-remove-book");
    newColumnRemoveButton.appendChild(buttonBookRemove);
    newBookRow.appendChild(newColumnRemoveButton);
    
    // console.log(book);


    // let newBookTitle = document.createElement("td");
    // let newBookTitleValue = document.createTextNode(book.title);
    // newBookTitle.appendChild(newBookTitleValue);

    // let newBookAuthor = document.createElement("td");
    // let newBookAuthorValue = document.createTextNode(book.author);
    // newBookAuthor.appendChild(newBookAuthorValue);

    // let newBookPages = document.createElement("td");
    // let newBookPagesValue = document.createTextNode(book.pages);
    // newBookPages.appendChild(newBookPagesValue);

    // let newBookRead = document.createElement("td");
    // let newBookReadValue = document.createTextNode(book.read);
    // newBookRead.appendChild(newBookReadValue);

    
    // newBookRow.appendChild(newBookTitle);
    // newBookRow.appendChild(newBookAuthor);
    // newBookRow.appendChild(newBookPages);
    // newBookRow.appendChild(newBookRead);
    
    // newBookRow.createElement(td);

    tableBooksTableBody.appendChild(newBookRow);
    
    i++;

  });
  
  //returns the <tbody> tag with book data
  return tableBooksTableBody;
  
}

tableBooksTable.appendChild(populateBooks());

addButtonEventListener();
