// UI Class: Handle UI Tasks
var BookList = /** @class */ (function () {
    function BookList() {
    }
    BookList.displayBooks = function () {
        var books = Store.getBooks();
        books.forEach(function (book) { return BookList.addBookToList(book); });
    };
    BookList.addBookToList = function (book) {
        var list = document.querySelector('#book-list');
        var row = document.createElement('tr');
        row.innerHTML = "\n        <td>" + book.title + "</td>\n        <td>" + book.author + "</td>\n        <td>" + book.rating + "</td\n        <td>" + book.price + "</td>\n        <td>" + book.isbn + "</td>\n        <td><a href=\"#\" class=\"btn btn-danger btn-sm delete\">X</a></td>\n      ";
        list.appendChild(row);
    };
    BookList.deleteBook = function (elem) {
        if (elem.classList.contains('delete')) {
            elem.parentElement.parentElement.remove();
        }
    };
    BookList.clearFields = function () {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#rating').value = '';
        document.querySelector('#price').value = '';
        document.querySelector('#isbn').value = '';
    };
    return BookList;
}());
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
//Search Book: By Author
var SearchBook = /** @class */ (function () {
    function SearchBook() {
    }
    SearchBook.myFunction = function () {
        var input = document.getElementById("myInput");
        var filter = input.value.toUpperCase();
        var table = document.getElementById("myTable");
        var tr = table.getElementsByTagName("tr");
        for (var i = 0; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                var textvalue = td.textContent || td.innerText;
                if (textvalue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
        }
    };
    return SearchBook;
}());
SearchBook.myFunction();
// Event: Display Books
document.addEventListener('DOMContentLoaded', BookList.displayBooks);
// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', function (e) {
    // Remove book from UI
    BookList.deleteBook(e.target);
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Clear fields
    BookList.clearFields();
});
export {};
