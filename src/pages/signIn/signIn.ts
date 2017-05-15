import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentHome } from '../parentHome/parentHome';
import { NurseHome } from '../nurseHome/nurseHome';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';

@Component({
  templateUrl: 'signIn.html'

})
export class SignIn {
  nurseHome = NurseHome;
  parentHome = ParentHome;

  public signinForm:FormGroup;  
  public loading:Loading;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
      private auth: AuthService, public formBuilder: FormBuilder,
      public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.signinForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  signIn() {

    // this.auth.signIn();

    if (!this.signinForm.valid){
      console.log(this.signinForm.value);
    } else {
      this.auth.signIn(this.signinForm.value.email, this.signinForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(ParentHome);
        });
        console.log("success", authData);
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

  goToSignup(){
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(){
    this.navCtrl.push('PasswordResetPage');
  }

  openNewRoot(page) {
    this.navCtrl.setRoot(page);
  }

}
