import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  uid;
  books$;
  firstUse: boolean;
  subscription;
  addBook(newBook) {
    const user = this.db.doc(`users/${this.uid}`);
    this.books$.next([newBook, ...this.books$.getValue()]);
    user.update({ books: this.books$.getValue() }).then(() => {});
  }
  updateBook(updatedBook) {
    const user = this.db.doc(`users/${this.uid}`);
    this.books$.next([
      ...this.books$.getValue().map((book) => {
        if (book.id === updatedBook.id) {
          book = { ...updatedBook };
        }
        return book;
      }),
    ]);
    user.update({ books: this.books$.getValue() }).then(() => {});
  }
  clearBooks() {
    this.books$.next([]);
    this.subscription.unsubscribe;
  }
  getUserBooks() {
    this.subscription = this.auth.uid
      .pipe(skipWhile((val) => val === undefined))
      .subscribe((uid) => {
        this.uid = uid;
        this.db
          .doc(`users/${this.uid}`)
          .valueChanges()
          .subscribe((data: any) => {
            if (data === undefined) {
              this.db.doc(`users/${this.uid}`).set({
                books: [
                  {
                    title: 'Angular',
                    author: 'Google',
                    pages: '314',
                    isRead: false,
                    id: uuid(),
                  },
                  {
                    title: 'Is',
                    author: 'Google',
                    pages: '15',
                    isRead: false,
                    id: uuid(),
                  },
                  {
                    title: 'Awesome',
                    author: 'Google',
                    pages: '926',
                    isRead: true,
                    id: uuid(),
                  },
                ],
              });
            } else {
              this.books$.next(data.books);
            }
          });
      });
      
  }
  deleteBook(bookToDelete) {
    const user = this.db.doc(`users/${this.uid}`);
    this.books$.next([
      ...this.books$.getValue().filter((book) => book.id !== bookToDelete.id),
    ]);
    user.update({ books: this.books$.getValue() }).then(() => {});
  }
  checkIfBookExists(title, author) {
    return this.books$
      .getValue()
      .find(
        (book) =>
          book.title.trim().toLowerCase() === title.trim().toLowerCase() &&
          book.author.trim().toLowerCase() === author.trim().toLowerCase()
      )
      ? true
      : false;
  }
  constructor(private db: AngularFirestore, private auth: AuthService) {
    this.books$ = new BehaviorSubject([]);
  }
}
