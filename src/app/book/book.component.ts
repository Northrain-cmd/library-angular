import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
  @Input() book;
  @Output() delete = new EventEmitter;
  editMode = false;
  constructor(private BookService:BookService) { }
  ngOnInit(): void {
  }
  changeReadStatus() {
    this.book.isRead = ! this.book.isRead;
    this.BookService.updateBook(this.book)
  }
  deleteBook() {
    this.delete.emit(this.book);
  }
 
  onEdit(form) {
    console.log(form.errors)
    this.editMode = ! this.editMode;
    this.book.title = form.title.value;
    this.book.author = form.author.value;
    this.book.pages = form.pages.value;
    this.BookService.updateBook(this.book);
  }

}
