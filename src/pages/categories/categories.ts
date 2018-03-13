import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ForwardedTaginformation} from "../../models/ForwardedTaginformation";
import {CommentInfo} from "../../models/CommentInfo";
import {CategoriesInfo} from "../../models/CategoriesInfo";
import {MediaProvider} from "../../providers/media/media";
import {Mediafile} from "../../models/Mediafile";
import {TagInfo} from "../../models/TagInfo";
import {FileRequest} from "../../models/FileRequest";
import {CommentsPage} from "../comments/comments";
import {LoginPage} from "../login/login";

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  data: any;
  categoriesInfo: ForwardedTaginformation[];
  usedCInfo: ForwardedTaginformation[];
  tagInfos: TagInfo[];
  category_tag: string;
  additionalTags: string[];
  requestedFiles: FileRequest[] = [];
  reqFile: FileRequest;
  paramsForChat: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public mediaProvider: MediaProvider,
              public loadigCtrl: LoadingController) {
    this.navParams.get('paramsForCategories');
    this.data = this.navParams.data;
    this.categoriesInfo = this.data.category_infos;
    this.category_tag = this.data.catag;

  }

  ionViewDidLoad(){
    for(let i = 0; i<this.categoriesInfo.length;++i) {
      this.tagInfos = this.categoriesInfo[i].taginfo;
      if (this.tagInfos.length > 2) {
        if (this.mediaProvider.containsTag(this.tagInfos, this.category_tag)) {
          console.log(this.tagInfos);
          this.mediaProvider.requestMedia(this.tagInfos[2].file_id).subscribe((filereq: FileRequest) => {
            this.additionalTags = [];
            this.additionalTags = this.mediaProvider.getAdditionalTags(this.categoriesInfo[i].taginfo);
            console.log(this.additionalTags);
            this.reqFile = filereq;
            this.reqFile.tags = this.additionalTags;
            this.requestedFiles.push(this.reqFile);
          });

        }
      }
    }
    console.log(this.requestedFiles);
  }

  goToChat(reqFile: FileRequest){
    this.paramsForChat = {
      filerequest: reqFile
    }
    if (localStorage.getItem('token') !== null) {
      this.navCtrl.push(CommentsPage, this.paramsForChat);
    }else{
      this.navCtrl.push(LoginPage);
    }
  }

}
