import { Component } from '@angular/core';
import {
  IonicPage, NavController,
  NavParams,
} from 'ionic-angular';
import {User} from '../../app/user';
import {MediaProvider} from '../../providers/media/media';
import {Mediafile} from "../../models/Mediafile";
import {UserInfo} from "../../models/UserInfo";


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


  data: any;
  unfilteredFiles: Mediafile[] = [];
  filteredFiles: Mediafile[] = [];
  users: UserInfo = {
    user_id: 0,
  username: '',
  email: '',
  full_name: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public mediaProvider: MediaProvider) {

    this.navParams.get('paramsForProfile');
    this.data = this.navParams.data;
    this.unfilteredFiles = this.data.files;
    console.log(this.data.files);


  }

  /*
  users: User = {
    username: '',
    password: '',
    email: '',
  };*/
  //method to get Users username show in the profile page
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.mediaProvider.getCurrentUser().subscribe((response: UserInfo) =>{
      this.users = response;
      
      for(let i = 0; i < this.unfilteredFiles.length;++i){
        if(this.unfilteredFiles[i].user_id === this.users.user_id){
          this.filteredFiles.push(this.unfilteredFiles[i]);
        }
      }
      
      /*
        this.users.username = response['username']
        this.users.*/
    });
  }
}
