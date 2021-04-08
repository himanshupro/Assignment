export class Book {
    title:string;
    author:string;
    rating:number;
    price:number
    isbn:number;

    constructor(title:string, author:string, rating:number, price:number, isbn:number) {
      this.title = title,
      this.author = author,
      this.rating = rating,
      this.price = price,
      this.isbn = isbn
    }
  }