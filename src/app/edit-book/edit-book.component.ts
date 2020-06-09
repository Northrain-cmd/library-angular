import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  @Input() book;
  @Output() editSubmit = new EventEmitter();
  model;
  isUnique = true;
  constructor(private BookService:BookService) { }
  ngOnInit(): void {
    this.model = {
      title:this.book.title,
      author:this.book.author,
      pages:this.book.pages,
    }
  }
  onSubmit(f) {
    if(f.title.value === this.book.title && f.author.value === this.book.author) {
      console.log(f.title.value);
      this.isUnique = true;
      this.editSubmit.emit(f);
     

    }  else {
      if (this.BookService.checkIfBookExists(f.title.value,f.author.value)) {
        this.isUnique = false;
      } else {
        console.log(f.title.value);
        this.isUnique = true;
        this.editSubmit.emit(f);

      }
     
    }
   
  }
  
 

}
