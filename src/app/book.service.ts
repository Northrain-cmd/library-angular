import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books = [
    {title:'Lord Of The Rings 1',author:"J.R.R.Tolkien",pages:'359',isRead:false, id:1},
    {title:'Lord Of The Rings 2',author:"J.R.R.Tolkien",pages:'359',isRead:false, id:2},
    {title:'Lord Of The Rings 3',author:"J.R.R.Tolkien",pages:'359',isRead:true, id:3}
  ];
  getBooks ():Observable<{}[]> {
    return of(this.books)
  }
  updateBook(updatedBook) {
    let newBook = this.books.find( book => book.title === updatedBook.title);
    newBook = {...updatedBook};
    console.log(this.books)
  }
  constructor() { }
}
