import { Component } from '@angular/core';
import {
  IonicPage, NavController,
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
              public mediaProvider: MediaProvider) {

  }

  users: User = {
    username: '',
    password: '',
    email: '',
  };
  //method to get Users username show in the profile page
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.mediaProvider.getCurrentUser().subscribe(response =>{
        this.users.username = response['username']
    });
  }
}
