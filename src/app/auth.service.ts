import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid = new Subject();
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((res) => {
      if (res && res.uid) {
        console.log('Logged In');
        this.uid.next(res.uid);
      } else {
        console.log('Logged Out');
      }
    });
  }
}
