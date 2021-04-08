import {Book} from './book.js';  

  // BookManager Class: Handle UI Tasks
  export class BookManager 
  {
   
        static displayBooks():any
    {
      const books = Store.getBooks();
  
      books.forEach((book:any) => BookManager.addBookToList(book));
    }

    static addBookToList(book:Book) 
    {
      const list:any = document.querySelector('#book-list');
  
      const row:any = document.createElement('tr') ;
  
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.rating}</td
        <td>${book.price}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteBook(elem:any) {
      if(elem.classList.contains('delete')) {
        elem.parentElement.parentElement.remove();
      }
    }

    static clearFields() {
      (document.querySelector('#title') as HTMLInputElement).value = '';
      (document.querySelector('#author') as HTMLInputElement).value = '';
      (document.querySelector('#rating') as HTMLInputElement).value= '';
      (document.querySelector('#price') as HTMLInputElement).value= '';
      (document.querySelector('#isbn') as HTMLInputElement).value = '';
    }
  
  
    static showAlert(message:string, className:string) {
      const div:any = <HTMLElement>document.createElement('div') ;
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container:any = (document.querySelector('.container') as HTMLInputElement);
      const form:any = (document.querySelector('#book-form') as HTMLInputElement);
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => (document.querySelector('.alert')as HTMLInputElement).remove(), 3000);
    }

  }
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books') || '{}') ;
      }
  
      return books;
    }
  
    static addBook(book:any) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn:any) {
      const books = Store.getBooks();
  
      books.forEach((book:any, index:number) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }

  }
  // Event: Add a Book
  (document.querySelector('#book-form') as HTMLInputElement).addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const title = (document.querySelector('#title') as HTMLInputElement).value;
    const author = (document.querySelector('#author') as HTMLInputElement).value;
    const rating = (document.querySelector('#rating') as HTMLInputElement).value;
    const price = (document.querySelector('#price') as HTMLInputElement).value;
    const isbn = (document.querySelector('#isbn') as HTMLInputElement).value;
  
  
    // Validate
    if(title === '' || author === '' || rating ===''  || price === '' || isbn === '' ) {
      BookManager.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate book
      const book:Book = new Book(title, author, Number(rating), Number(price), Number(isbn));
  
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
(document.querySelector('#book-list') as HTMLElement).addEventListener('click', (e) => {
  // Remove book from BookManager
  BookManager.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  BookManager.showAlert('Book Removed', 'success');
});


 



