import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid;
  constructor(private auth:AngularFireAuth) {
    this.auth.authState.subscribe(res => {
      if (res && res.uid){
        console.log("Logged In")
        this.uid = res.uid;
      }  else {
        console.log('Logged Out')
      }
    })
   }
}
