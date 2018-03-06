import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FileRequest} from "../../models/FileRequest";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  data: any;
  reqfile: FileRequest = {
    file_id: 0,
    user_id: 0,
    filename: '',
    title: '',
    description: '',
    media_type: '',
    mime_type: '',
    time_added: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navParams.get('paramsForChat');
    this.data = this.navParams.data;
    this.reqfile = this.data.filerequest;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}
