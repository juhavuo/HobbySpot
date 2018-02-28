import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../app/user';
import {MediaProvider} from '../../providers/media/media';
import {HomePage} from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider) {

  }

  user: User = {
    username: '',
    password: '',
    email: '',
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    this.mediaProvider.register(this.user).subscribe(response => {
      console.log(response);
      this.mediaProvider.username = this.user.username;
      this.mediaProvider.password = this.user.password;
      this.mediaProvider.email = this.user.email;
      this.navCtrl.setRoot(HomePage);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });

  }

  public home(){
    this.navCtrl.setRoot(HomePage);
  }

}
