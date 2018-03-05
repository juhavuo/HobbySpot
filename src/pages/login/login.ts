import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {MediaProvider} from '../../providers/media/media';
import {LoadingController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  status: string;
  username: string;
  password: any;
  email: any;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpClient: HttpClient,
              public mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  cancel(){
    let loader = this.loadingCtrl.create({
      content: "Cancelling...",
      duration: 100
    });
    loader.present();
    this.navCtrl.setRoot(HomePage);
  }

  public login(){

    console.log('username: ' + this.username);
    console.log('password: ' + this.password);
    console.log('email: ' + this.email);

    const body = {
      username: this.username,
      password: this.password,
      email: this.email,
    };

    const settings = {
      headers: new HttpHeaders().set('Content-type', 'application/json'),
    };

    this.httpClient.post(this.apiUrl + '/login', body, settings).
      subscribe(response => {
        console.log(response['token']);
        localStorage.setItem('token', response['token']);
        let loader = this.loadingCtrl.create({
          content: "Logging in...",
          duration: 1500
        });
        loader.present();
        this.navCtrl.setRoot(HomePage);
        this.mediaProvider.isLoggedIn = true;
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.status = error.error.message;
        let loader = this.loadingCtrl.create({
          content: "Your username or password is incorrect",
          duration: 1500
        });
        loader.present();
        console.log('Username or password is incorrect');
        this.navCtrl.setRoot(LoginPage);
      });
  }
}
