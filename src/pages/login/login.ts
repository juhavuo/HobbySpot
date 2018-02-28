import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";


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
  password: string;
  email: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(){
    console.log('uname: ' + this.username);
    console.log('pwd ' + this.password);
    console.log('email: ' + this.email);


  }
}
