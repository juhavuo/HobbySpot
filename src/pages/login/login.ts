import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {HomePage} from '../home/home';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
              public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
        this.navCtrl.setRoot(HomePage);
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.status = error.error.message;
      });

  }

  public home(){
    this.navCtrl.setRoot(HomePage);
  }
}
