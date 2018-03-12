import { Component } from '@angular/core';
import {
  IonicPage, LoadingController, NavController,
  NavParams,
} from 'ionic-angular';
import {User} from '../../app/user';
import {MediaProvider} from '../../providers/media/media';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public loadingCtrl: LoadingController) {

  }

  users: User = {
    username: '',
    password: '',
    email: '',
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
}
