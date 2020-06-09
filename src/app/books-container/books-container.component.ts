import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss']
})
export class BooksContainerComponent implements OnInit {

  constructor(private BookService:BookService) { }
  books;
  ngOnInit(): void {
    this.BookService.getBooks().subscribe(books => {
      this.books = books;
    })
  }
  deleteBook(bookToDelete) {
    this.BookService.deleteBook(bookToDelete);
    this.books = [...this.books.filter(book => book.id !== bookToDelete.id )]
  }
  onNewBook(form) {
    const tempBook = {
      title: form.value.title,
      author: form.value.author,
      pages: ""+form.value.pages,
      isRead:false,
      id:uuid(),
    }
    this.BookService.addBook(tempBook);
    this.books = [tempBook,...this.books];
    form.reset();
  }
  onEdit(book) {
   this.books = [...this.books.map(b => {
    if ( b.id === book.id ) {
      b = {...book}
    }
    return b
   } )];
   this.BookService.updateBook(book);
  }
  onChangeRead(b) {
    this.books = [...this.books.map(book => {
      if(book.id === b.id) book.isRead = ! book.isRead;
      return book
    })];
    this.BookService.updateBook(b);
    
  }

}
