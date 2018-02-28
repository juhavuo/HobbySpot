import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChannelInfo} from "../../models/ChannelInfo";
import {CategoriesInfo} from "../../models/CategoriesInfo";
import {MediaProvider} from "../../providers/media/media";
import {Mediafile} from "../../models/Mediafile";

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

  categoriesInfo: CategoriesInfo;
  file: Mediafile = {
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
    this.navParams.get('paramsForCategories');
    this.categoriesInfo = this.navParams.data;
    console.log(this.categoriesInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
    this.mediaProvider.getFileWithId(this.categoriesInfo.file_id).subscribe((res:Mediafile) =>{
      this.file = res;
    });
  }

}
