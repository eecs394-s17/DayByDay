import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentHome } from '../parentHome/parentHome';
import { NurseHome } from '../nurseHome/nurseHome';
import { SuiteSelection } from '../suiteSelection/suiteSelection';
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
    if (!this.signupForm.valid){
      let alert = this.alertCtrl.create({
        message: "Invalid entries",
        buttons: [
          {
            text: "dismiss",
            role: 'cancel'
          }
        ]
      });
      alert.present();
      console.log(this.signupForm.value);
    } else {
      this.auth.signup(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.parentName)
      .then( authData => {
        this.loading.dismiss()
        this.navCtrl.setRoot(SignIn);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }

  }

  clearForm(){
    this.signupForm.reset();
  }

}
