import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
  @Input() book;
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() changeRead = new EventEmitter();
  editMode = false;
  constructor(private BookService:BookService) { }
  ngOnInit(): void {
  }
  changeReadStatus() {
   this.changeRead.emit(this.book);
  }
  deleteBook() {
    this.delete.emit(this.book);
  }
 
  onEdit(form) {
    this.editMode = ! this.editMode;
    this.book.title = form.title.value;
    this.book.author = form.author.value;
    this.book.pages = form.pages.value.toString();
    this.edit.emit(this.book)
  }

}
