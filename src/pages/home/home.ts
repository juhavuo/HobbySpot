import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {ChannelsPage} from "../channels/channels";
import {MediaProvider} from "../../providers/media/media";
import {ChannelInfo} from "../../models/ChannelInfo";
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
  tagInfo: TagInfo[];
  channeltags: string[] = [];
  channelInfos: ChannelInfo[] = [];
  chInfo: ChannelInfo = {
    channel_tag: '',
    category_tags: []
  };
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

          if (this.tagInfo.length>1){ //first check if there is channel tag
            let tagindex = this.channeltags.indexOf(this.tagInfo[1].tag);
            console.log('I am channel tag and my value is:' + tagindex);
            if(tagindex<0){ // no channel of this name allready
              this.channeltags.push(this.tagInfo[1].tag);
              console.log(this.tagInfo[1].tag +', tag to show');
              if(this.tagInfo.length>2){ // is there category tags
                this.chInfo = {
                  channel_tag: this.tagInfo[1].tag,
                  category_tags: [this.tagInfo[2].tag]
                };
              }else{
                this.chInfo = {
                  channel_tag: this.tagInfo[1].tag
                }
              }
              this.channelInfos.push(this.chInfo);
            }else {
              if (this.tagInfo.length > 2) {
                if (this.channelInfos[tagindex].category_tags.length == 0) {
                  this.channelInfos[tagindex].category_tags = [this.tagInfo[2].tag];
                }else{
                  if(this.channelInfos[tagindex].category_tags.indexOf(this.tagInfo[2].tag)<0) {
                    this.channelInfos[tagindex].category_tags.push(this.tagInfo[2].tag);
                  }
                }
              }
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


  goToChannel(chInfo: ChannelInfo){
    console.log(chInfo.channel_tag);
    for (let i = 0; i< chInfo.category_tags.length;++i){
      console.log(chInfo.category_tags[i]);
    }
    this.navCtrl.push(ChannelsPage,chInfo);
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

