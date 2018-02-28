import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChannelInfo} from "../../models/ChannelInfo";
import {MediaProvider} from "../../providers/media/media";
import {Mediafile} from "../../models/Mediafile";

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

  filedata: any;
  mediafiles: Mediafile[];

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
          for (let i; i<this.mediafiles.length;++i){

          }
        }
      });


  }

}
