const bookChunk = document.querySelector('.book-list');
const addBookForm = document.querySelector('.add-book-form');
const priceVal = document.getElementById('price');
const buttonSubmit = document.querySelector('.add-button');



const url = 'http://localhost:3000/books/';

let bookBox = '';

const showBookDetails = (books) => {
    books.forEach( book => {
        bookBox += `
        <div class="book-list">
        <div class="details">
            <div class="book-body" data-id=${book.id} >
               <h3 class="book-title" style="margin-left : 30%">Title: ${book.title}</h3>
                <h3 class="book-id">ID: ${book.id}</h3>
                <h3 class="book-author">Author: ${book.author}</h3>
                <p class="book-details"><h3>Description:</h3> ${book.description}</p>
                <h3 class="book-id"> ISBN# ${book.isbn}</h3>
                <h3 class="book-rating"> Rating: ${book.rating}</h3>
                <h3 class="book-price">Price: ${book.price}</h3>
                <a href="#"  class="book-link" id="delete-book" style="padding-right: 20px;">Delete</a>
                <a href="#" class="book-link" id="edit-book">Edit</a>
                <br><br>
            </div>
        </div>
        </div>
        `
    })
    bookChunk.innerHTML = bookBox;
}

//get- read book
//method get
fetch('http://localhost:3000/books/')
    .then(res => res.json())
    .then(data => {
        showBookDetails(data);
}).catch(err => {
    console.log(err);
})

bookChunk.addEventListener('click', (e) => {
   e.preventDefault();

   let deleteButton = e.target.id == 'delete-book';
//    let editBook = e.target.id == 'edit-book';

   let id = e.target.parentElement.dataset.id;
    console.log(id)
   //delete - remove the existing book
   //method - delete

   if(deleteButton) {
       fetch(`${url}/${id}`, {
           method: 'DELETE'
        
       })
       .then(response => response.json())
       .then(() => location.reload())
       .catch(err => {
           console.log(err)
       })
   }
   
   if(editBook)
   {
       const parent = e.target.parentElement;
       let priceContent = parent.querySelector('.book-price').textContent;

       priceVal.value = priceContent;
   }


   //Update - update the existing price of book
   //method - Patch

   buttonSubmit.addEventListener('click', (e)=> {
       e.preventDefault()

   fetch(`${url}/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type ': 'application/json'
        },
        body: JSON.stringify({
            price: priceVal.value,
        })
    })  
    .then(res => res.json())
    .then(() => location.reload())
    .catch(err => {
        console.log(err);
    })
   
   })

});


   