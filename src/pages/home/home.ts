import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {ChannelsPage} from "../channels/channels";
import {MediaProvider} from "../../providers/media/media";
import {ForwardedTaginformation} from "../../models/ForwardedTaginformation";
import {Mediafile} from "../../models/Mediafile";
import {TagInfo} from "../../models/TagInfo";
import {RegisterPage} from '../register/register';
import {UploadPage} from '../upload/upload';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mediafiles: Mediafile[] = [];
  tagInfo: TagInfo[] = [];
  channeltags:string[] = [];
  channelInfos: ForwardedTaginformation[] = [];

  paramsForChannel: any;

  mainTag = 'HobbySpotTest';

  constructor(public navCtrl: NavController, public mediaProvider: MediaProvider, public menuCtrl: MenuController){

  }


  ionViewDidLoad() {
    this.mediaProvider.getAllMediaWithTag(this.mainTag).subscribe((res: Mediafile[]) => {
      this.mediafiles=res;
      console.log(this.mediafiles.length);
      for(let i = 0; i < this.mediafiles.length;++i){

        this.mediaProvider.showTagsByFile(this.mediafiles[i].file_id).subscribe((res2: TagInfo[]) => {
          this.tagInfo = res2;
          if(this.tagInfo.length>1){
            this.channelInfos.push({
              taginfo: this.tagInfo
            });
            let channeltagindex = this.channeltags.indexOf(this.tagInfo[1].tag);
            if(channeltagindex<0){
              this.channeltags.push(this.tagInfo[1].tag);
            }
          }
        });
      }
    });
  }



  login(){
    if (localStorage.getItem('token') !==null){
    }else {
      this.navCtrl.push(LoginPage);
    }
  }

  register(){
    this.navCtrl.setRoot(RegisterPage);
  }

  upload(){
    this.navCtrl.setRoot(UploadPage);
  }

  logout(){
    if (localStorage.removeItem('token') !== null){
      this.navCtrl.setRoot(LoginPage);
    } else {
      console.log('First log in to log out');
    }
  }


  goToChannel(channeltag: string){
    this.paramsForChannel= {
      chtag: channeltag,
      channel_infos: this.channelInfos
    }

    this.navCtrl.push(ChannelsPage,this.paramsForChannel);
  }

  openMenu() {
    this.menuCtrl.open();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }



}

