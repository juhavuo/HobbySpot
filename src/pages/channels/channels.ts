import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ForwardedTaginformation} from "../../models/ForwardedTaginformation";
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

  data:any;
  channelInfos:ForwardedTaginformation[];
  paramsForCategories: any;
  ftagInformation: ForwardedTaginformation[] = [];
  channel_tag:string;
  categorytags: string[] =[];
  tagInfos: TagInfo[];

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
    this.data = this.navParams.data;
    this.channelInfos = this.data.channel_infos;
    this.channel_tag = this.data.chtag;
    console.log(this.channel_tag);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelsPage');

    for (let i = 0; i < this.channelInfos.length; ++i) {
      this.tagInfos = this.channelInfos[i].taginfo;
      if (this.tagInfos.length > 2) {
        if (this.mediaProvider.containsTag(this.tagInfos,this.channel_tag)) {
          this.ftagInformation.push({
            taginfo: this.tagInfos
          });
          let categorytag = this.mediaProvider.getTagMarkedWith(this.tagInfos,'ca');
          if(categorytag.length>0) {
            let categorytagindex = this.categorytags.indexOf(categorytag);
            if(categorytagindex<0){
              this.categorytags.push(categorytag);
            }
          }

        }
      }
    }
  }

  goToCategories(categoryTag:string){

    this.paramsForCategories = {
      catag: 'ca:'+categoryTag,
      category_infos: this.ftagInformation
    };

    this.navCtrl.push(CategoriesPage,this.paramsForCategories);
  }

}
