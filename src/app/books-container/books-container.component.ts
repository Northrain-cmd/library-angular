import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss']
})
export class BooksContainerComponent implements OnInit {

  constructor(private BookService:BookService) { }
  books:any;
  changeReadStatus(title) {
    const newBook = this.books.find( book => book.title === title);
    newBook.isRead = ! newBook.isRead;
    this.BookService.updateBook(newBook);
  }
  ngOnInit(): void {
    this.BookService.getBooks().subscribe(books => {
      this.books = books;
    })
  }

}
