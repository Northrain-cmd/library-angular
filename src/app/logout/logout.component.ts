import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BookService } from '../book.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  signOut() {
    this.bookService.clearBooks();
    this.router.navigate(['']);
  }
  constructor(public router: Router, private bookService: BookService ) { }
  ngOnInit(): void {
  }

}
