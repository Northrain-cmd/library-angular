import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books$ = new BehaviorSubject(JSON.parse(localStorage.getItem('books')) || [
    {title:'Lord Of The Rings 1',author:"J.R.R.Tolkien",pages:'359',isRead:false,id:uuid()},
    {title:'Lord Of The Rings 2',author:"J.R.R.Tolkien",pages:'359',isRead:false,id:uuid()},
    {title:'Lord Of The Rings 3',author:"J.R.R.Tolkien",pages:'359',isRead:true,id:uuid()}
  ]);
  addBook(newBook) {
    this.books$.next([ newBook, ...this.books$.getValue()]);
    console.log(this.books$.getValue());
    localStorage.setItem('books',JSON.stringify(this.books$.getValue()));
  }
  updateBook(updatedBook) {
    this.books$.next([...this.books$.getValue().map( book => {
      if(book.id === updatedBook.id) {
        book = {...updatedBook};
      }
      return book;
    })])
    console.log(this.books$.getValue());
    localStorage.setItem('books',JSON.stringify(this.books$.getValue()));
  }
  deleteBook(bookToDelete) {
    this.books$.next([...this.books$.getValue().filter(book => book.id !== bookToDelete.id)])
    console.log(this.books$.getValue());
    localStorage.setItem('books',JSON.stringify(this.books$.getValue()));
  }
  checkIfBookExists(title, author) {
    console.log(this.books$.getValue())
    return this.books$.getValue().find(book => book.title.trim().toLowerCase() === title.trim().toLowerCase() && book.author.trim().toLowerCase() === author.trim().toLowerCase()) ? true : false
  }
  constructor() { 
  }
}
