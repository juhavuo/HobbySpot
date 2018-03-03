import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChannelInfo} from "../../models/ChannelInfo";
import {CommentInfo} from "../../models/CommentInfo";
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

  categoriesInfo: ChannelInfo;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public mediaProvider: MediaProvider) {
    this.navParams.get('paramsForCategories');
    this.categoriesInfo = this.navParams.data;
    console.log(this.categoriesInfo);
  }

}
