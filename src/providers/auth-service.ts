import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  signIn(email, password): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

}
