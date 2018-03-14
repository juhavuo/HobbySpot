import { Component } from '@angular/core';
import {
  IonicPage, LoadingController, NavController,
  NavParams,
} from 'ionic-angular';
import {HttpErrorResponse, HttpHeaders, HttpClient} from '@angular/common/http';
import {User} from '../../app/user';
import {MediaProvider} from '../../providers/media/media';
import {HomePage} from '../home/home';
import {LoginPage} from "../login/login";

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
              public mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController,
              public httpClient: HttpClient) {

  }

  user: User = {
    username: '',
    password: '',
    email: '',
  };

  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public register() {
    this.mediaProvider.register(this.user).subscribe(response => {
      console.log(response);
      this.mediaProvider.username = this.user.username;
      this.mediaProvider.password = this.user.password;
      this.mediaProvider.email = this.user.email;
      localStorage.setItem('token', response['token']);

      const body = {
        username: this.user.username,
        password: this.user.password,
        email: this.user.email
      };

      const settings = {
        headers: new HttpHeaders().set('Content-type', 'application/json'),
      };

      this.httpClient.post(this.apiUrl + '/login', body, settings).
      subscribe(response => {
        console.log(response['token']);
        localStorage.setItem('token', response['token']);
        let loader = this.loadingCtrl.create({
          content: "Welcome " + this.user.username,
          duration: 1500
        });
        loader.present();
        this.mediaProvider.isLoggedIn = true;
        this.navCtrl.setRoot(HomePage);

      });

    }, (error: HttpErrorResponse) => {
      let loader = this.loadingCtrl.create({
        content: "Username has already taken",
        duration: 1500
      });
      loader.present();
      console.log(error.error.message);
    });

  }

  cancel(){
    let loader = this.loadingCtrl.create({
      content: "Cancelling...",
      duration: 100
    });
    loader.present();
    this.navCtrl.setRoot(HomePage);
  }

}
