import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class BookService {
  uid;
  books$; 
  firstUse:boolean;
  addBook(newBook) {
    const user =  this.db.doc(`users/${this.uid}`);
    this.books$.next([ newBook, ...this.books$.getValue()]);
     user.update({books:this.books$.getValue()}).then(() => {
       console.log('Book Synced')
    });
  }
  updateBook(updatedBook) {
    const user =  this.db.doc(`users/${this.uid}`);
    this.books$.next([...this.books$.getValue().map( book => {
      if(book.id === updatedBook.id) {
        book = {...updatedBook};
      }
      return book;
    })])
    user.update({books:this.books$.getValue()}).then(() => {
      console.log('Book Synced');
   });
  }
  getUserBooks() { 
    this.auth.uid.subscribe(uid => this.uid = uid);
      console.log(this.uid);
       this.db.doc(`users/${this.uid}`).valueChanges().subscribe( (data:any) => {
         console.log(data)
     if(data ===undefined) {
      this.firstUse = true;
        this.books$.next([
          {title:'Lord Of The Rings 1',author:"J.R.R.Tolkien",pages:'359',isRead:false,id:uuid()},
          {title:'Lord Of The Rings 2',author:"J.R.R.Tolkien",pages:'359',isRead:false,id:uuid()},
          {title:'Lord Of The Rings 3',author:"J.R.R.Tolkien",pages:'359',isRead:true,id:uuid()}
         ]);
     } else {
       this.firstUse = false;
       this.books$.next(data.books);
     }   
    })
    if(this.firstUse) {
      this.db.doc(`users/${this.uid}`).update({books: [ 
        {title:'Lord Of The Rings 1',author:"J.R.R.Tolkien",pages:'359',isRead:false,id:uuid()},
        {title:'Lord Of The Rings 2',author:"J.R.R.Tolkien",pages:'359',isRead:false,id:uuid()},
        {title:'Lord Of The Rings 3',author:"J.R.R.Tolkien",pages:'359',isRead:true,id:uuid()}
       ]
     });
    }
  }
  deleteBook(bookToDelete) {
    const user =  this.db.doc(`users/${this.uid}`);
    this.books$.next([...this.books$.getValue().filter(book => book.id !== bookToDelete.id)])
    user.update({books:this.books$.getValue()}).then(() => {
      console.log('Book Synced')
   });
  }
  checkIfBookExists(title, author) {
    return this.books$.getValue().find(book => book.title.trim().toLowerCase() === title.trim().toLowerCase() && book.author.trim().toLowerCase() === author.trim().toLowerCase()) ? true : false
  }
  constructor(private db:AngularFirestore, private auth: AuthService) { 
    this.books$ = new BehaviorSubject([]);
  }
}
