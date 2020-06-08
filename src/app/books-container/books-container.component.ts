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
    this.BookService.deleteBook(bookToDelete).subscribe( books => this.books = books);
    console.log(this.books)
  }
  onNewBook(form) {
    this.BookService.addBook(form)
    form.reset();
  }

}
