import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books = [
    {title:'Lord Of The Rings 1',author:"J.R.R.Tolkien",pages:'359',isRead:false,},
    {title:'Lord Of The Rings 2',author:"J.R.R.Tolkien",pages:'359',isRead:false,},
    {title:'Lord Of The Rings 3',author:"J.R.R.Tolkien",pages:'359',isRead:true,}
  ];
  getBooks ():Observable<{}[]> {
    return of(this.books)
  }
  addBook(form) {
    this.books = [ {
      title: form.title,
      author: form.author,
      pages: form.pages,
      isRead:false
    } , ...this.books];
    console.log("Book Added!")
  }
  updateBook(updatedBook) {
    let newBook = this.books.find( book => book === updatedBook);
    newBook = {...updatedBook};
    console.log(this.books);
    return of(this.books);
  }
  deleteBook(bookToDelete) {
    this.books = [...this.books.filter(book => book !== bookToDelete)]
    console.log(this.books)
    return of(this.books)
  }
  checkIfBookExists(title, author) {
    return this.books.find(book => book.title.trim().toLowerCase() === title.trim().toLowerCase() && book.author.trim().toLowerCase() === author.trim().toLowerCase()) ? true : false
  }
  constructor() { }
}
