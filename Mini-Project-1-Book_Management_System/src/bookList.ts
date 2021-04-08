
import {Book} from './book.js';
  
  // UI Class: Handle UI Tasks
  class BookList 
  {
    static displayBooks() 
    {
      const books:any = Store.getBooks();
  
      books.forEach((book:any) => BookList.addBookToList(book));
    }

    static addBookToList(book:any) 
    {
      const list:any = document.querySelector('#book-list');
  
      const row:any = document.createElement('tr');
  
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
   
  }
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books') || '{}');
      }
  
      return books;
    }
  
    static addBook(book:Book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn:string) {
      const books = Store.getBooks();
  
      books.forEach((book:any, index:number) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    } 

 }

 //Search Book: By Author
class SearchBook{

 static myFunction() {
  let input = document.getElementById("myInput") as HTMLInputElement
  let filter = input.value.toUpperCase();
  let table = document.getElementById("myTable") as HTMLTableElement 
  var tr = table.getElementsByTagName("tr"); 

  for(var i=0;i<tr.length;i++) {
    var td = tr[i].getElementsByTagName("td")[1] 
    if(td) 
    {
      var textvalue = td.textContent || td.innerText;
      if(textvalue.toUpperCase().indexOf(filter)>-1)
      {
        tr[i].style.display = "";
      }
      else 
      {
        tr[i].style.display = "none";
      }
    }
  }
}
}
SearchBook.myFunction();

  // Event: Display Books
 document.addEventListener('DOMContentLoaded', BookList.displayBooks);

  // Event: Remove a Book
 (document.querySelector('#book-list') as HTMLInputElement).addEventListener('click', (e:any) => {
    // Remove book from UI
   BookList.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent) ;
  
     // Clear fields
     BookList.clearFields();
  });
