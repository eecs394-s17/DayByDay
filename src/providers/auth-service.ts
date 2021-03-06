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
  private authState: Observable<firebase.User>;
  public currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth) {
    this.authState = afAuth.authState;
    this.afAuth.authState.subscribe((user: firebase.User) => {
        this.currentUser = user;
    });
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

  signup(email: string, password: string, parentName): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      firebase.database().ref('/users').push({
        email: email,
        parentName: parentName,
        type: 'parent',
        UID: newUser.uid,
        lastLogin: 0,
      });
    });
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  getFirebaseId() {
    //console.log(firebase.auth().currentUser.uid);
    return firebase.auth().currentUser.uid;
  }

}
