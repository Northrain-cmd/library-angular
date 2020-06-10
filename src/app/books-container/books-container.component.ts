import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss']
})
export class BooksContainerComponent implements OnInit {

  constructor(public BookService:BookService, public router:Router) { }
  books;
  ngOnInit(): void {
  }
  deleteBook(bookToDelete) {
    this.BookService.deleteBook(bookToDelete);
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
    form.reset();
  }
  onEdit(book) {
   this.BookService.updateBook(book);
  }
  onChangeRead(b) {
    this.BookService.updateBook(b);
    
  }

}
