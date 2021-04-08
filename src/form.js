const APIURL = "http://localhost:3000";

const book = data => {
    return fetch(`${APIURL}/books`, {
        method:"POST", 
        mode:"cors",
        cache:"no-cache",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json());
    
};

window.onload = () => {
    const bookForm = document.forms.bookForm;
    bookForm.method = "POST";
    bookForm.target = "_blank";
    bookForm.action = "";

    bookForm.addEventListener("submit", e => {
        e.preventDefault();
        
        const id = document.getElementById("id").value;
        const isbn = document.getElementById("isbn").value;
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const price = document.getElementById("price").value;
        const rating = document.getElementById("rating").value;
        const votes = document.getElementById("votes").value;
        const series = document.getElementById("series").value;
        const seriesIndex = document.getElementById("seriesIndex").value;
        const releaseDate = document.getElementById("releaseDate").value;

        let error = [];

        if(!id) {
            error.push("Id is required !");
        }
        if(!isbn) {
            error.push("ISBN is required !");
        }
        if(!title) {
            error.push("Title is required !");
        }
        if(!author) {
            error.push("Author is required !");
        }
        if(!pages) {
            error.push("Page number is required !");
        }
        if(!price) {
            error.push("Price is required !");
        }
        if(!rating) {
            error.push("Rating is required !");
        }
        if(!votes) {
            error.push("Votes is required !");
        }
        if(!series) {
            error.push("Series is required !");
        }
        if(!seriesIndex) {
            error.push("Series Index is required !");
        }
        if(!releaseDate) {
            error.push("Release Date is required !");
        }

        if(error.length > 0){
            alert(error.join(" "));
            return;
        }

        book({
                id,
                isbn,
                title,
                author,
                pages,
                price,
                rating,
                votes,
                series,
                seriesIndex,
                releaseDate
            }).then(response => {
            alert(`${response.id} ${response.isbn} ${response.title} ${response.author} ${response.pages} ${response.price} ${response.rating}
            ${response.votes} ${response.series} ${response.seriesIndex} ${response.releaseDate} has been filled. `)
            alert("Book details has been submitted successfully.")
            });
    });
};
