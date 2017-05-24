import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentHome } from '../parentHome/parentHome';
import { NurseHome } from '../nurseHome/nurseHome';
import { SuiteSelection } from '../suiteSelection/suiteSelection';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';
import { SignIn } from '../signIn/signIn'

@Component({
  templateUrl: 'SignupPage.html'
})

export class SignupPage {
  nurseHome = NurseHome;
  parentHome = ParentHome;
  suiteSelection = SuiteSelection;

  public signupForm:FormGroup;
  public loading:Loading;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
      private auth: AuthService, public formBuilder: FormBuilder,
      public alertCtrl: AlertController, public loadingCtrl: LoadingController,
      private storage: Storage) {

    this.signupForm = formBuilder.group({
      parentName: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        EmailValidator.isValid
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required,

      ])]
    }, {validator: SignupPage.passwordsMatch});
  }

  static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    let pwd1 = cg.get('password');
    let pwd2 = cg.get('confirmPassword');
    let rv: {[error: string]: any} = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv['passwordMismatch'] = true;
    }
    return rv;
  }

  signupComplete(){
    console.log("Sign up implemented here")
  }

  clearForm(){
    this.signupForm.reset();
  }

}
