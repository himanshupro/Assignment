
const bookList = document.querySelector('#book-list');
const searchBook = document.querySelector('.search');


let url = 'http://localhost:3000/books';
  
const showMyBook = async(search) => {
    
    if(search){
        url += `?id=${search}`
    }
    const response = await fetch(url);
    const books = await response.json();
    console.log(books);
    let output = '';
    books.forEach(book => {
        output += `<tr>
            <td><img src="${book.cover}" width="60" height="100"></td>
            <td>${book.id}</td>
            <td>${book.isbn}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.price}</td>
            <td>${book.rating}</td>
            <td>${book.votes}</td>
            <td><a href="bookDetails.html?id=${book.id}" >Details</a></td> 
            </tr>`;  
    })

    bookList.innerHTML = output;
}
    searchBook.addEventListener('submit', (e)=>{
        console.log(searchBook)
        e.preventDefault();
        showMyBook(searchBook.search.value.trim());

    })
    window.addEventListener('DOMContentLoaded',()=>showMyBook());


