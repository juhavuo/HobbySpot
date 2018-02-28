import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChannelInfo} from "../../models/ChannelInfo";
import {MediaProvider} from "../../providers/media/media";
import {Mediafile} from "../../models/Mediafile";
import {HttpErrorResponse} from "@angular/common/http";
import {TagInfo} from "../../models/TagInfo";
import {CategoriesPage} from "../categories/categories";
import {CategoriesInfo} from "../../models/CategoriesInfo";

/**
 * Generated class for the ChannelsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {

  channelInfo:ChannelInfo;
  paramsForCategories: CategoriesInfo;
  shownTags: TagInfo[] = [];

  filedata: any;
  mediafiles: Mediafile[] =[];
  avatarImages: Mediafile[] = [];
  face: Mediafile = {
    file_id: 0,
  filename: '',
  filesize: 0,
  title: '',
  description: '',
  user_id: 0,
  media_type: '',
  mime_type: '',
  time_added: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public mediaProvider: MediaProvider) {
    this.navParams.get('paramsForChannel');
    this.channelInfo = this.navParams.data;
    console.log(this.channelInfo);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelsPage');

    this.mediaProvider.getAllMediaWithTag(this.channelInfo.channel_name)
      .subscribe((response:Mediafile[]) => {
        console.log(response);
        if(response !== null && response !== undefined){
          this.mediafiles = response;
        }
      });

  }

  goToCategories(fileId:number){
    console.log('file-id: '+fileId);
    this.paramsForCategories = {
      "file_id": fileId
    };
    this.navCtrl.push(CategoriesPage,this.paramsForCategories);
  }

}
