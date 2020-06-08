import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

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
    this.BookService.addBook(form);
    this.books = [{
      title: form.value.title,
      author: form.value.author,
      pages: form.value.pages,
      isRead:false,
      id:this.books.length+1,
    },...this.books];
    form.reset();
  }
  onEdit(book) {
   let tempBook =  this.books.find(b => b.id === book.id);
   tempBook = {...book};
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
