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
  requestedFiles: FileRequest[] = [];

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
            this.requestedFiles.push(filereq);
            });
        }
      }
    }
    console.log(this.requestedFiles);
  }

}
