import { Book } from './book.js';
// BookManager Class: Handle UI Tasks
var BookManager = /** @class */ (function () {
    function BookManager() {
    }
    BookManager.displayBooks = function () {
        var books = Store.getBooks();
        books.forEach(function (book) { return BookManager.addBookToList(book); });
    };
    BookManager.addBookToList = function (book) {
        var list = document.querySelector('#book-list');
        var row = document.createElement('tr');
        row.innerHTML = "\n        <td>" + book.title + "</td>\n        <td>" + book.author + "</td>\n        <td>" + book.rating + "</td\n        <td>" + book.price + "</td>\n        <td>" + book.isbn + "</td>\n        <td><a href=\"#\" class=\"btn btn-danger btn-sm delete\">X</a></td>\n      ";
        list.appendChild(row);
    };
    BookManager.deleteBook = function (elem) {
        if (elem.classList.contains('delete')) {
            elem.parentElement.parentElement.remove();
        }
    };
    BookManager.clearFields = function () {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#rating').value = '';
        document.querySelector('#price').value = '';
        document.querySelector('#isbn').value = '';
    };
    BookManager.showAlert = function (message, className) {
        var div = document.createElement('div');
        div.className = "alert alert-" + className;
        div.appendChild(document.createTextNode(message));
        var container = document.querySelector('.container');
        var form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(function () { return document.querySelector('.alert').remove(); }, 3000);
    };
    return BookManager;
}());
export { BookManager };
// Store Class: Handles Storage
var Store = /** @class */ (function () {
    function Store() {
    }
    Store.getBooks = function () {
        var books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books') || '{}');
        }
        return books;
    };
    Store.addBook = function (book) {
        var books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    };
    Store.removeBook = function (isbn) {
        var books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    };
    return Store;
}());
// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', function (e) {
    // Prevent actual submit
    e.preventDefault();
    // Get form values
    var title = document.querySelector('#title').value;
    var author = document.querySelector('#author').value;
    var rating = document.querySelector('#rating').value;
    var price = document.querySelector('#price').value;
    var isbn = document.querySelector('#isbn').value;
    // Validate
    if (title === '' || author === '' || rating === '' || price === '' || isbn === '') {
        BookManager.showAlert('Please fill in all fields', 'danger');
    }
    else {
        // Instatiate book
        var book = new Book(title, author, Number(rating), Number(price), Number(isbn));
        // Add Book to UI
        BookManager.addBookToList(book);
        // Add book to store
        Store.addBook(book);
        // Clear fields
        BookManager.clearFields();
        // Show success message
        BookManager.showAlert('Book Added', 'success');
    }
});
// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', function (e) {
    // Remove book from BookManager
    BookManager.deleteBook(e.target);
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show success message
    BookManager.showAlert('Book Removed', 'success');
});
