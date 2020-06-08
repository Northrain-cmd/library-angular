import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books = [
    {title:'Lord Of The Rings 1',author:"J.R.R.Tolkien",pages:'359',isRead:false,id:uuid()},
    {title:'Lord Of The Rings 2',author:"J.R.R.Tolkien",pages:'359',isRead:false,id:uuid()},
    {title:'Lord Of The Rings 3',author:"J.R.R.Tolkien",pages:'359',isRead:true,id:uuid()}
  ];
  getBooks ():Observable<{}[]> {
    return of(this.books)
  }
  addBook(form) {
    this.books = [ {
      title: form.value.title,
      author: form.value.author,
      pages: form.value.pages,
      isRead:false,
      id: uuid(),
    } , ...this.books];
    console.log(this.books)
  }
  updateBook(updatedBook) {
    let newBooks = this.books.map( book => {
      if(book.id === updatedBook.id) {
        book = {...updatedBook};
      }
      return book;
    })
    this.books = [...newBooks];
    console.log(this.books)
  }
  deleteBook(bookToDelete) {
    this.books = [...this.books.filter(book => book.id !== bookToDelete.id)]
    console.log(this.books)
  }
  checkIfBookExists(title, author) {
    return this.books.find(book => book.title.trim().toLowerCase() === title.trim().toLowerCase() && book.author.trim().toLowerCase() === author.trim().toLowerCase()) ? true : false
  }
  constructor() { }
}
