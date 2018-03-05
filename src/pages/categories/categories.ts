import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ForwardedTaginformation} from "../../models/ForwardedTaginformation";
import {CommentInfo} from "../../models/CommentInfo";
import {CategoriesInfo} from "../../models/CategoriesInfo";
import {MediaProvider} from "../../providers/media/media";
import {Mediafile} from "../../models/Mediafile";
import {TagInfo} from "../../models/TagInfo";
import {FileRequest} from "../../models/FileRequest";

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public mediaProvider: MediaProvider) {
    this.navParams.get('paramsForCategories');
    this.data = this.navParams.data;
    this.categoriesInfo = this.data.category_infos;
    this.category_tag = this.data.catag;

  }

  ionViewDidLoad(){
    for(let i = 0; i<this.categoriesInfo.length;++i){
      this.tagInfos = this.categoriesInfo[i].taginfo;
      if(this.tagInfos.length>2){
        if(this.tagInfos[2].tag === this.category_tag){
          console.log(this.tagInfos);
          this.mediaProvider.requestMedia(this.tagInfos[2].file_id).subscribe((filereq: FileRequest) =>{
            this.additionalTags = [];
            for (let j = 3; j < this.categoriesInfo[i].taginfo.length; ++j){
              this.additionalTags.push(this.categoriesInfo[i].taginfo[j].tag);
            }
            this.reqFile = filereq;
            this.reqFile.tags = this.additionalTags;
            this.requestedFiles.push(this.reqFile);
          });

        }
      }
    }
    console.log(this.requestedFiles);
  }

}
