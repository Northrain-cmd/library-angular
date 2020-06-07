import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
  @Input() book;
  @Output() readChanged = new EventEmitter;
  constructor() { }
  changeReadStatus(title) {
    this.readChanged.emit(title)
  }
  ngOnInit(): void {
  }

}
