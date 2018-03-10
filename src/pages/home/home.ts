import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {ChannelsPage} from "../channels/channels";
import {MediaProvider} from "../../providers/media/media";
import {ChannelInfo} from "../../models/ChannelInfo";
import {Mediafile} from "../../models/Mediafile";
import {TagInfo} from "../../models/TagInfo";
import {LoginPage} from '../login/login';
import {RegisterPage} from '../register/register';
import {UploadPage} from '../upload/upload';
import {TabsPage} from '../tabs/tabs';
import {LogoutPage} from '../logout/logout';
import {getResponseURL} from '@angular/http/src/http_utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  items: Array<string>;
  mediafiles: Mediafile[] = [];
  tagInfo: TagInfo[];
  channels: string[] = [];
  paramsForChannel: any;
  mainTag = 'HobbySpotTest';
  myInput: string;

  constructor(
    public navCtrl: NavController,
    public mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.mediaProvider.getAllMediaWithTag(this.mainTag).
      subscribe((res: Mediafile[]) => {
        this.mediafiles = res;
        console.log(this.mediafiles.length);
        for (let i = 0; i < this.mediafiles.length; ++i) {
          console.log(this.mediafiles[i].title);
          this.mediaProvider.showTagsByFile(this.mediafiles[i].file_id).
            subscribe((res2: TagInfo[]) => {
              this.tagInfo = res2;
              if (this.tagInfo.length >= 2) {
                if (this.channels.indexOf(this.tagInfo[1].tag) < 0) {
                  this.channels.push(this.tagInfo[1].tag);
                }
              }
            });
        }
      });
  }

  login() {
    if (localStorage.getItem('token') !== null) {
      console.log('You are already logged in');
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  register() {
    this.navCtrl.setRoot(RegisterPage);
  }

  upload() {
    if (localStorage.getItem('token') !== null) {
      console.log('Upload page');
      let loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 1500
      });
      loader.present();
      this.navCtrl.setRoot(UploadPage);
    }
  }

  logout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      console.log('logging out');
      let loader = this.loadingCtrl.create({
        content: "Logging out",
        duration: 1500
      });
      loader.present();
      this.navCtrl.setRoot(LogoutPage);
    }
  }

  goToChannel(channelname: string) {
    this.paramsForChannel = {
      "channel_name": channelname
    };
    this.navCtrl.push(ChannelsPage, this.paramsForChannel);
  }


  // search bar functions-------------------------------------------------------
  setItems() {
    this.items = this.channels; // array of tags in here
    //this.tagInfo;
    
  }

  onInput(ev:any) {
    this.setItems();
    console.log(ev);
    let setVal = ev.target.value;
    if (setVal && setVal.trim() != '') {
      this.items = this.items.filter(function(item) {
        return item.toLowerCase().includes(setVal.toLowerCase());
      });
    }
  }
  // ---------------------------------------------------------------------------

}


