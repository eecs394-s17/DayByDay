import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'password-reset.html'
})

export class PasswordReset {

  public resetPasswordForm:FormGroup;
  public loading:Loading;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController,
      private auth: AuthService, public formBuilder: FormBuilder,
      public alertCtrl: AlertController, public loadingCtrl: LoadingController,
      private storage: Storage) {

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }

  resetPassword(){
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.auth.resetPassword(this.resetPasswordForm.value.email)
      .then((user) => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: "We just sent you a reset link to your email",
            buttons: [
              {
                text: "Ok",
                role: 'cancel',
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();
        });
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
          let errorAlert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [{ text: "Ok", role: 'cancel' }]
          });
          errorAlert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
