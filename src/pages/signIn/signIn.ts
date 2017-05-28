import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentHome } from '../parentHome/parentHome';
import { NurseHome } from '../nurseHome/nurseHome';
import { SuiteSelection } from '../suiteSelection/suiteSelection';
import { MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';
import { SignupPage } from '../SignupPage/SignupPage';
import { PasswordReset } from '../password-reset/password-reset';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'signIn.html'
})

export class SignIn {
  nurseHome = NurseHome;
  parentHome = ParentHome;
  suiteSelection = SuiteSelection;

  public signinForm:FormGroup;
  public loading:Loading;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
      private auth: AuthService, public formBuilder: FormBuilder,
      public alertCtrl: AlertController, public loadingCtrl: LoadingController,
      private storage: Storage, public menuCtrl: MenuController) {

    this.menuCtrl.enable(false, 'myMenu');

    this.signinForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  signIn() {

    // this.auth.signIn();

    if (!this.signinForm.valid){
      let alert = this.alertCtrl.create({
        message: "Invalid Email or Password",
        buttons: [
          {
            text: "dismiss",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    }
    else {

      // var isParent;
      var ref =firebase.database().ref('/users');

      this.auth.signIn(this.signinForm.value.email, this.signinForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          var signin = this;
          ref.on("value", function(snapshot){
          var usertype;
          for(var i in snapshot.val()){
            console.log(snapshot.val()[i].email)
            if(snapshot.val()[i].email==signin.signinForm.value.email){
              usertype=snapshot.val()[i].type;
            }
          }
          if(usertype==="parent"){
            // signin.navCtrl.setRoot(ParentHome);
            signin.navCtrl.setRoot(ParentHome, {
              foreignKey: signin.signinForm.value.email,
            });
          }
          else{
            signin.navCtrl.setRoot(NurseHome);
          }

        })

            this.storage.set('type', 'parent');
        });
        console.log("success", authData);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: "Invalid login credentials",
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
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword(){
    this.navCtrl.push(PasswordReset);
  }

  // Used for quick testing of views for different user types (parent, nurse), without actual user accounts
  // openNewRoot(page) {
  //     if (page == NurseHome) {
  //     this.storage.set('type', 'nurse');
  //     } else {
  //     this.storage.set('type', 'parent');
  //       }
  //   this.navCtrl.setRoot(page);
  // }

}
