const bookList = document.getElementById("book-details");
const url = 'http://localhost:3000/books';
function ajaxGet(url,cb){
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(xhr.readyState==4){
        if(xhr.status==200){
            cb(false, JSON.parse(xhr.responseText))
        }
        else{
            cb(new Error("No such file is there.!!"))
        }
    }
    xhr.open('get', url, true)
    xhr.send();
 }
}

function callback(err, book){
    if(err){
        console.log("Error:"+ err)
    }
    else{
        display(book)
    }
}

function display(books){
    for(let book of books){
        bookList.innerHTML +=
        `<h3>Title: ${book.title}</h3>
        <h3>Author: ${book.author}</h3>
        <h3>Price: ${book.price}/h3><br>`
    }
}

ajaxGet("http://localhost:3000/books", callback)
