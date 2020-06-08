import { Component, OnInit, Output, EventEmitter, ɵɵresolveBody } from '@angular/core';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  @Output() newBook = new EventEmitter;
  bookForm = new FormGroup({
    title: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
    ]),
    author: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
    ]),
    pages: new FormControl('',[
      Validators.required,
      Validators.min(1),
    ]),
  })
  isUnique = true;
  showForm = false;
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isUnique = ! this.bookService.checkIfBookExists(this.bookForm.value.title,this.bookForm.value.author);
    if(this.isUnique) {
      this.newBook.emit(this.bookForm);
    }  else {
      return
    }
    
   
    
  }

}
