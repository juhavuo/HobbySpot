import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FileRequest} from "../../models/FileRequest";
import {MediaProvider} from "../../providers/media/media";
import {CommentInfo} from "../../models/CommentInfo";
import {UserInfo} from "../../models/UserInfo";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'comments.html',
})
export class CommentsPage {

  data: any;
  reqfile: FileRequest = {
    file_id: 0,
    user_id: 0,
    filename: '',
    title: '',
    description: '',
    media_type: '',
    mime_type: '',
    time_added: '',
    user_name: ''
  };

  comments: CommentInfo[] = [];
  commenter: UserInfo;
  uploader: UserInfo;

  addedDescription: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
    this.navParams.get('paramsForChat');
    this.data = this.navParams.data;
    this.reqfile = this.data.filerequest;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.mediaProvider.getUserInfo(this.reqfile.user_id).subscribe( (userResponse: UserInfo) => {
      this.uploader = userResponse;
      this.reqfile.user_name = userResponse.username;
      console.log(this.reqfile.user_name);
      console.log(this.reqfile.user_id);
    });
    this.getCommensRequest();
  }

  addAComment(){
    this.mediaProvider.addComment(this.reqfile.file_id).subscribe(res => {
      console.log(res);
      this.getCommensRequest();
    });
  }

  getCommensRequest() {
    this.mediaProvider.getCommentsByFileId(this.reqfile.file_id).subscribe((commentResponse: CommentInfo[]) => {
      this.comments = commentResponse;

      for (let i = 0; i < this.comments.length; ++i) {
        this.mediaProvider.getUserInfo(this.comments[i].user_id).subscribe((response2: UserInfo) => {
          this.commenter = response2;
          this.comments[i].user_name = this.commenter.username;
        });
      }
    });
  }

}
